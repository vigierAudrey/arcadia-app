/**
 * Mise en ligne des contenus pédagogiques — ajout seul, jamais d'écrasement.
 *
 * Ce script n'a rien à voir avec `pnpm db:seed`. Le seed rejoue TOUT le
 * catalogue de démonstration et ne doit jamais toucher la base en ligne. Ici,
 * au contraire :
 *
 *   - seules les séquences listées dans prisma/content/index.ts sont traitées ;
 *   - seul ce qui MANQUE est créé ;
 *   - aucune ligne existante n'est modifiée, déplacée, désarchivée ni supprimée ;
 *   - un contenu déjà présent est laissé tel quel et signalé dans le rapport.
 *
 * Le script est donc rejouable : le relancer deux fois ne crée rien la seconde
 * fois. Sans --apply, il n'écrit rien du tout et se contente d'afficher le plan.
 *
 *   pnpm pse:import            # simulation : aucune écriture
 *   pnpm pse:import --apply    # écrit réellement
 */
import {
  ActivityTrack,
  PublicationStatus,
  SequenceStatus,
} from "../src/generated/prisma/enums";
import { parseActivityPayload } from "../src/features/activities/activity-payload";
import { prisma } from "../src/server/db/prisma";
import { contentImports, type ContentImport } from "../prisma/content/index";
import { contentCorrections, type ContentCorrection } from "../prisma/content/corrections";

const apply = process.argv.includes("--apply");

const lines: string[] = [];
let creations = 0;

function willCreate(indent: number, label: string) {
  creations += 1;
  lines.push(`${" ".repeat(indent)}+ ${label}`);
}

function alreadyThere(indent: number, label: string) {
  lines.push(`${" ".repeat(indent)}= ${label} — déjà en ligne, laissé tel quel`);
}

let corrections = 0;
let refusals = 0;

/**
 * Renommages prévus mais pas encore écrits (mode simulation).
 *
 * Sans cette mémoire, la simulation mentirait : une séance renommée serait
 * ensuite cherchée sous son nouveau titre, introuvable, et annoncée comme « à
 * créer » — alors qu'en mode --apply le renommage a lieu d'abord et la séance
 * est bien retrouvée. Clé : [identifiant du parent, nouveau titre] ;
 * valeur : titre encore en base.
 */
const plannedRenames = new Map<string, string>();

function renameKey(parentId: string, title: string): string {
  return JSON.stringify([parentId, title]);
}

function planRename(parentId: string, from: string, to: string) {
  plannedRenames.set(renameKey(parentId, to), from);
}

/** Titre sous lequel la ligne existe encore en base, renommage non écrit compris. */
function currentTitle(parentId: string, title: string): string {
  return plannedRenames.get(renameKey(parentId, title)) ?? title;
}

function willCorrect(label: string) {
  corrections += 1;
  lines.push(`  ~ ${label}`);
}

function refused(label: string) {
  refusals += 1;
  lines.push(`  ! ${label}`);
}

/** Interrompt l'import avec un message lisible, sans trace technique. */
class ImportError extends Error {}

async function importSequence(
  transaction: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  entry: ContentImport,
) {
  const path = `${entry.program} / ${entry.level} / ${entry.classroom} / ${entry.teachingArea}`;
  lines.push(`\n${path}`);

  const program = await transaction.program.findFirst({
    where: { name: entry.program, archivedAt: null },
    select: { id: true },
  });

  if (!program) {
    const programs = await transaction.program.findMany({ select: { name: true } });
    throw new ImportError(
      `Programme « ${entry.program} » introuvable. En base : ${names(programs)}.`,
    );
  }

  const level = await transaction.level.findFirst({
    where: { programId: program.id, name: entry.level, archivedAt: null },
    select: { id: true },
  });

  if (!level) {
    const levels = await transaction.level.findMany({
      where: { programId: program.id },
      select: { name: true },
    });
    throw new ImportError(
      `Niveau « ${entry.level} » introuvable sous « ${entry.program} ». En base : ${names(levels)}.`,
    );
  }

  const classroom = await transaction.classroom.findFirst({
    where: { levelId: level.id, name: entry.classroom, archivedAt: null },
    select: { id: true },
  });

  if (!classroom) {
    const classrooms = await transaction.classroom.findMany({
      where: { levelId: level.id },
      select: { name: true },
    });
    throw new ImportError(
      `Classe « ${entry.classroom} » introuvable sous « ${entry.program} / ${entry.level} ». En base : ${names(classrooms)}. Créer la classe depuis /admin, puis relancer.`,
    );
  }

  // ── Enseignement (TeachingArea) ────────────────────────────────────────────
  const existingArea = await transaction.teachingArea.findFirst({
    where: { classroomId: classroom.id, name: entry.teachingArea },
    select: { id: true, archivedAt: true },
  });

  if (existingArea?.archivedAt) {
    throw new ImportError(
      `L'enseignement « ${entry.teachingArea} » de ${entry.classroom} est archivé. Le désarchiver depuis /admin puis relancer : ce script ne désarchive rien.`,
    );
  }

  let teachingAreaId = existingArea?.id ?? null;

  if (teachingAreaId) {
    alreadyThere(2, `enseignement « ${entry.teachingArea} »`);
  } else {
    willCreate(2, `enseignement « ${entry.teachingArea} »`);

    if (apply) {
      const createdArea = await transaction.teachingArea.create({
        data: {
          classroomId: classroom.id,
          name: entry.teachingArea,
          kind: entry.teachingAreaKind,
          position: await nextPosition(
            transaction.teachingArea.aggregate({
              where: { classroomId: classroom.id },
              _max: { position: true },
            }),
          ),
        },
        select: { id: true },
      });
      teachingAreaId = createdArea.id;
    }
  }

  // ── Séquence ───────────────────────────────────────────────────────────────
  const existingSequence = teachingAreaId
    ? await transaction.learningSequence.findFirst({
        where: { teachingAreaId, title: entry.sequence.title },
        select: { id: true, archivedAt: true },
      })
    : null;

  if (existingSequence?.archivedAt) {
    throw new ImportError(
      `La séquence « ${entry.sequence.title} » existe mais est archivée. La désarchiver depuis /admin puis relancer : ce script ne désarchive rien.`,
    );
  }

  let sequenceId = existingSequence?.id ?? null;

  if (sequenceId) {
    alreadyThere(4, `séquence « ${entry.sequence.title} »`);
  } else {
    willCreate(4, `séquence « ${entry.sequence.title} » (ouverte aux élèves)`);

    if (apply && teachingAreaId) {
      const createdSequence = await transaction.learningSequence.create({
        data: {
          teachingAreaId,
          title: entry.sequence.title,
          description: entry.sequence.description,
          position: await nextPosition(
            transaction.learningSequence.aggregate({
              where: { teachingAreaId },
              _max: { position: true },
            }),
          ),
          status: SequenceStatus.OPEN,
        },
        select: { id: true },
      });
      sequenceId = createdSequence.id;
    }
  }

  // ── Séances et activités ───────────────────────────────────────────────────
  for (const initialLesson of entry.sequence.lessons) {
    const existingLesson = sequenceId
      ? await transaction.lesson.findFirst({
          where: { sequenceId, title: currentTitle(sequenceId, initialLesson.title) },
          select: { id: true, archivedAt: true },
        })
      : null;

    if (existingLesson?.archivedAt) {
      alreadyThere(6, `séance « ${initialLesson.title} » — archivée, ses activités sont ignorées`);
      continue;
    }

    let lessonId = existingLesson?.id ?? null;

    if (lessonId) {
      alreadyThere(6, `séance « ${initialLesson.title} »`);
    } else {
      willCreate(6, `séance « ${initialLesson.title} »`);

      if (apply && sequenceId) {
        const createdLesson = await transaction.lesson.create({
          data: {
            sequenceId,
            title: initialLesson.title,
            description: initialLesson.description,
            position: await nextPosition(
              transaction.lesson.aggregate({
                where: { sequenceId },
                _max: { position: true },
              }),
            ),
            publicationStatus: PublicationStatus.PUBLISHED,
          },
          select: { id: true },
        });
        lessonId = createdLesson.id;
      }
    }

    // Les nouvelles activités se placent APRÈS celles déjà en ligne : l'ordre
    // existant, éventuellement réorganisé depuis /admin, n'est jamais bousculé.
    let position = lessonId
      ? await nextPosition(
          transaction.activity.aggregate({
            where: { lessonId },
            _max: { position: true },
          }),
        )
      : 0;

    for (const initialActivity of initialLesson.activities ?? []) {
      const existingActivity = lessonId
        ? await transaction.activity.findFirst({
            where: { lessonId, title: initialActivity.title },
            select: { id: true },
          })
        : null;

      if (existingActivity) {
        alreadyThere(8, `activité « ${initialActivity.title} »`);
        continue;
      }

      willCreate(8, `activité « ${initialActivity.title} » (${initialActivity.type})`);

      if (apply && lessonId) {
        await transaction.activity.create({
          data: {
            lessonId,
            title: initialActivity.title,
            type: initialActivity.type,
            instructions: initialActivity.instructions,
            payload: initialActivity.payload,
            track: ActivityTrack.CORE,
            position,
            publicationStatus: PublicationStatus.PUBLISHED,
          },
          select: { id: true },
        });
      }

      position += 1;
    }
  }
}

/**
 * Applique une correction nominative sur une ligne déjà en ligne.
 *
 * Rien n'est écrit si la valeur en base ne correspond pas exactement à
 * `from` : une retouche faite depuis /admin n'est jamais écrasée, elle est
 * signalée. C'est la seule écriture de ce script qui modifie une ligne
 * existante, et elle exige une entrée explicite dans prisma/content/corrections.ts.
 */
async function applyCorrection(
  transaction: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  correction: ContentCorrection,
) {
  const where = `${correction.classroom} / ${correction.teachingArea} / ${correction.sequence}`;
  const target = correction.activity
    ? `activité « ${correction.activity} »`
    : correction.lesson
      ? `séance « ${correction.lesson} »`
      : `séquence « ${correction.sequence} »`;
  const label = `${target} — ${correction.field}`;

  const sequence = await transaction.learningSequence.findFirst({
    where: {
      title: correction.sequence,
      archivedAt: null,
      teachingArea: {
        name: correction.teachingArea,
        archivedAt: null,
        classroom: {
          name: correction.classroom,
          archivedAt: null,
          level: {
            name: correction.level,
            archivedAt: null,
            program: { name: correction.program, archivedAt: null },
          },
        },
      },
    },
    select: { id: true, description: true, title: true },
  });

  if (!sequence) {
    refused(`${label} : séquence introuvable sous ${where} — rien corrigé`);
    return;
  }

  let current: string | null;
  let write: (value: string) => Promise<unknown>;

  if (correction.lesson) {
    const lesson = await transaction.lesson.findFirst({
      where: {
        sequenceId: sequence.id,
        title: currentTitle(sequence.id, correction.lesson),
        archivedAt: null,
      },
      select: { id: true, title: true, description: true },
    });

    if (!lesson) {
      refused(`${label} : séance « ${correction.lesson} » introuvable — rien corrigé`);
      return;
    }

    if (correction.activity) {
      const activity = await transaction.activity.findFirst({
        where: { lessonId: lesson.id, title: correction.activity, archivedAt: null },
        select: { id: true, title: true, instructions: true },
      });

      if (!activity) {
        refused(`${label} : activité « ${correction.activity} » introuvable — rien corrigé`);
        return;
      }

      current =
        correction.field === "instructions"
          ? activity.instructions
          : correction.field === "title"
            ? activity.title
            : null;
      write = (value) =>
        transaction.activity.update({
          where: { id: activity.id },
          data: { [correction.field]: value },
          select: { id: true },
        });
    } else {
      current = correction.field === "title" ? lesson.title : lesson.description;

      if (correction.field === "title" && !apply) {
        planRename(sequence.id, lesson.title, correction.to);
      }

      write = (value) =>
        transaction.lesson.update({
          where: { id: lesson.id },
          data: { [correction.field]: value },
          select: { id: true },
        });
    }
  } else {
    current = correction.field === "title" ? sequence.title : sequence.description;
    write = (value) =>
      transaction.learningSequence.update({
        where: { id: sequence.id },
        data: { [correction.field]: value },
        select: { id: true },
      });
  }

  if (current === correction.to) {
    alreadyThere(2, `${label} — déjà corrigé`);
    return;
  }

  if (current !== correction.from) {
    refused(
      `${label} : le texte en ligne ne correspond pas à celui attendu, il a probablement été retouché depuis /admin — laissé tel quel`,
    );
    return;
  }

  willCorrect(`${label} → « ${correction.to.slice(0, 80)}${correction.to.length > 80 ? "…" : ""} »`);

  if (apply) {
    await write(correction.to);
  }
}

function names(entries: readonly { name: string }[]): string {
  return entries.map((entry) => entry.name).join(", ") || "aucun";
}

async function nextPosition(
  aggregate: Promise<{ _max: { position: number | null } }>,
): Promise<number> {
  const { _max } = await aggregate;
  return (_max.position ?? -1) + 1;
}

async function main() {
  // Toutes les activités sont validées AVANT la moindre écriture : une charge
  // utile invalide s'afficherait « momentanément indisponible » côté élève.
  for (const entry of contentImports) {
    for (const lesson of entry.sequence.lessons) {
      for (const activity of lesson.activities ?? []) {
        parseActivityPayload(activity.type, activity.payload);
      }
    }
  }

  await prisma.$transaction(
    async (transaction) => {
      // Les corrections d'abord : un titre corrigé doit être en place avant que
      // la passe de création ne cherche ce qui manque, sinon elle créerait un
      // doublon portant le nouveau titre.
      if (contentCorrections.length > 0) {
        lines.push("\nCorrections de contenus déjà en ligne");

        for (const correction of contentCorrections) {
          await applyCorrection(transaction, correction);
        }
      }

      for (const entry of contentImports) {
        await importSequence(transaction, entry);
      }
    },
    { timeout: 120_000 },
  );
}

main()
  .then(async () => {
    const suffix = `${corrections} correction(s)${refusals > 0 ? `, ${refusals} refusée(s)` : ""}`;

    console.info(
      apply
        ? `Contenus mis en ligne — ${creations} élément(s) créé(s), ${suffix}, le reste était déjà là.`
        : `SIMULATION — aucune écriture. ${creations} élément(s) seraient créés, ${suffix}.`,
    );
    console.info(lines.join("\n"));
    console.info(
      apply
        ? "\nLégende : + créé, ~ corrigé, = déjà en l'état, ! refusé (texte inattendu, laissé tel quel)."
        : "\nLégende : + serait créé, ~ serait corrigé, = déjà en l'état, ! refusé (texte inattendu, laissé tel quel).\nRelancer avec --apply pour écrire.",
    );

    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Import interrompu — aucune écriture n'a été conservée.");
    console.error(
      error instanceof ImportError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Erreur inconnue.",
    );

    await prisma.$disconnect();
    process.exitCode = 1;
  });
