import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { AdminForm, OrderForm } from "@/features/admin/admin-forms";
import { ClassAccessPanel } from "@/features/admin/class-access-panel";
import {
  getOpenItems,
  getToggleHref,
  type AdminSearchParams,
} from "@/features/admin/open-state";
import {
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "@/generated/prisma/enums";
import { getAdminCatalog } from "@/server/catalog/queries";
import type { CatalogEntityReference } from "@/server/catalog/validation";
import { requireAdminPage } from "@/server/auth/require-admin";

import { logoutAdminAction } from "./auth-actions";
import {
  archiveCatalogItemAction,
  changeLessonPublicationStatusAction,
  changeSequenceStatusAction,
  createCatalogItemAction,
  editCatalogItemAction,
  moveCatalogItemAction,
} from "./actions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Administration",
  description: "Administration du catalogue pédagogique d’ArcadiA.",
  robots: { index: false, follow: false },
};

const sequenceStatusLabels: Record<SequenceStatus, string> = {
  [SequenceStatus.DRAFT]: "Brouillon",
  [SequenceStatus.LOCKED]: "Verrouillée",
  [SequenceStatus.OPEN]: "Ouverte",
};

const publicationStatusLabels: Record<PublicationStatus, string> = {
  [PublicationStatus.DRAFT]: "Brouillon",
  [PublicationStatus.PUBLISHED]: "Publiée",
};

type CreateContext =
  | { type: "program" }
  | {
      type:
        "level" | "classroom" | "teachingArea" | "learningSequence" | "lesson";
      parentId: string;
    };

type EntityToolsProps = {
  index: number;
  label: string;
  name: string;
  reference: Exclude<
    CatalogEntityReference,
    { type: "learningSequence" } | { type: "lesson" }
  >;
  total: number;
  updatedAt: Date;
};

type AdminPageProps = {
  searchParams?: Promise<AdminSearchParams>;
};

function getSequenceStatusClass(status: SequenceStatus) {
  switch (status) {
    case SequenceStatus.OPEN:
      return styles.sequenceOpen;
    case SequenceStatus.LOCKED:
      return styles.sequenceLocked;
    case SequenceStatus.DRAFT:
      return styles.sequenceDraft;
  }
}

function TreeToggle({
  href,
  isOpen,
  label,
  title,
  meta,
  controls,
}: {
  href: string;
  isOpen: boolean;
  label: string;
  title: string;
  meta?: string;
  controls: string;
}) {
  return (
    <Link
      className={styles.treeToggle}
      href={href}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      <span className={styles.treeToggleIcon} aria-hidden="true">
        {isOpen ? "−" : "+"}
      </span>
      <span className={styles.treeToggleText}>
        <span>{label}</span>
        <strong>{title}</strong>
        {meta ? <small>{meta}</small> : null}
      </span>
    </Link>
  );
}

function CreateItemForm({
  context,
  label,
}: {
  context: CreateContext;
  label: string;
}) {
  const action = createCatalogItemAction.bind(null, context);
  const hasTitleAndDescription =
    context.type === "learningSequence" || context.type === "lesson";
  const isTeachingArea = context.type === "teachingArea";

  return (
    <details className={styles.createPanel}>
      <summary>＋ Ajouter {label}</summary>
      <AdminForm
        action={action}
        className={styles.compactForm}
        submitLabel="Ajouter"
      >
        <label>
          <span>{hasTitleAndDescription ? "Titre" : "Nom"}</span>
          <input
            name={hasTitleAndDescription ? "title" : "name"}
            type="text"
            required
            maxLength={
              hasTitleAndDescription ? 160 : isTeachingArea ? 120 : 100
            }
            autoComplete="off"
          />
        </label>
        {isTeachingArea ? (
          <label>
            <span>Type</span>
            <select name="kind" defaultValue={TeachingAreaKind.SUBJECT}>
              <option value={TeachingAreaKind.SUBJECT}>Matière</option>
              <option value={TeachingAreaKind.BLOCK}>Bloc</option>
            </select>
          </label>
        ) : null}
        {hasTitleAndDescription ? (
          <label>
            <span>Description facultative</span>
            <textarea name="description" maxLength={2_000} rows={3} />
          </label>
        ) : null}
      </AdminForm>
    </details>
  );
}

function EntityTools({
  index,
  label,
  name,
  reference,
  total,
  updatedAt,
}: EntityToolsProps) {
  const updatedAtValue = updatedAt.toISOString();
  const editAction = editCatalogItemAction.bind(
    null,
    reference,
    updatedAtValue,
  );
  const moveAction = moveCatalogItemAction.bind(null, reference, index);
  const archiveAction = archiveCatalogItemAction.bind(
    null,
    reference,
    updatedAtValue,
  );

  return (
    <details className={styles.toolsPanel}>
      <summary>Modifier / archiver</summary>
      <div className={styles.toolsContent}>
        <AdminForm
          action={editAction}
          className={styles.compactForm}
          submitLabel="Enregistrer"
          submitVariant="secondary"
        >
          <label>
            <span>Renommer {label}</span>
            <input
              name="name"
              type="text"
              required
              defaultValue={name}
              maxLength={reference.type === "teachingArea" ? 120 : 100}
              autoComplete="off"
            />
          </label>
        </AdminForm>
        <OrderForm
          action={moveAction}
          canMoveUp={index > 0}
          canMoveDown={index < total - 1}
          className={styles.orderForm}
        />
        <AdminForm
          action={archiveAction}
          className={styles.archiveForm}
          confirmMessage={`Archiver ${label} « ${name} » ? Cette action est impossible tant que des éléments actifs y sont rattachés.`}
          submitLabel={`Archiver ${label}`}
          submitVariant="danger"
        >
          <strong>Archivage</strong>
          <p>Aucune suppression définitive ne sera effectuée.</p>
        </AdminForm>
      </div>
    </details>
  );
}

type CatalogSequence = Awaited<
  ReturnType<typeof getAdminCatalog>
>[number]["levels"][number]["classrooms"][number]["teachingAreas"][number]["learningSequences"][number];
type CatalogLesson = CatalogSequence["lessons"][number];

function SequenceTools({
  index,
  sequence,
  teachingAreaId,
  total,
}: {
  index: number;
  sequence: CatalogSequence;
  teachingAreaId: string;
  total: number;
}) {
  const reference = {
    type: "learningSequence",
    id: sequence.id,
    parentId: teachingAreaId,
  } as const;
  const updatedAtValue = sequence.updatedAt.toISOString();
  const editAction = editCatalogItemAction.bind(
    null,
    reference,
    updatedAtValue,
  );
  const statusAction = changeSequenceStatusAction.bind(
    null,
    reference,
    updatedAtValue,
  );
  const moveAction = moveCatalogItemAction.bind(
    null,
    reference,
    sequence.position,
  );
  const archiveAction = archiveCatalogItemAction.bind(
    null,
    reference,
    updatedAtValue,
  );

  return (
    <details className={styles.toolsPanel}>
      <summary>Modifier / archiver</summary>
      <div className={styles.toolsContent}>
        <AdminForm
          action={editAction}
          className={styles.compactForm}
          submitLabel="Enregistrer"
          submitVariant="secondary"
        >
          <label>
            <span>Titre</span>
            <input
              name="title"
              type="text"
              required
              defaultValue={sequence.title}
              maxLength={160}
              autoComplete="off"
            />
          </label>
          <label>
            <span>Description facultative</span>
            <textarea
              name="description"
              defaultValue={sequence.description ?? ""}
              maxLength={2_000}
              rows={3}
            />
          </label>
        </AdminForm>
        <AdminForm
          action={statusAction}
          className={styles.inlineForm}
          submitLabel="Changer l’état"
          submitVariant="secondary"
        >
          <label>
            <span>État</span>
            <select name="status" defaultValue={sequence.status}>
              <option value={SequenceStatus.DRAFT}>Brouillon</option>
              <option value={SequenceStatus.LOCKED}>Verrouillée</option>
              <option value={SequenceStatus.OPEN}>Ouverte</option>
            </select>
          </label>
        </AdminForm>
        <OrderForm
          action={moveAction}
          canMoveUp={index > 0}
          canMoveDown={index < total - 1}
          className={styles.orderForm}
        />
        <AdminForm
          action={archiveAction}
          className={styles.archiveForm}
          confirmMessage={`Archiver la séquence « ${sequence.title} » ? Elle disparaîtra du catalogue actif.`}
          submitLabel="Archiver la séquence"
          submitVariant="danger"
        >
          <strong>Archivage</strong>
          <p>
            L’archivage est refusé si des séances actives y sont rattachées.
          </p>
        </AdminForm>
      </div>
    </details>
  );
}

function LessonTools({
  index,
  lesson,
  sequenceId,
  total,
}: {
  index: number;
  lesson: CatalogLesson;
  sequenceId: string;
  total: number;
}) {
  const reference = {
    type: "lesson",
    id: lesson.id,
    parentId: sequenceId,
  } as const;
  const updatedAtValue = lesson.updatedAt.toISOString();
  const editAction = editCatalogItemAction.bind(
    null,
    reference,
    updatedAtValue,
  );
  const publicationAction = changeLessonPublicationStatusAction.bind(
    null,
    reference,
    updatedAtValue,
  );
  const moveAction = moveCatalogItemAction.bind(
    null,
    reference,
    lesson.position,
  );
  const archiveAction = archiveCatalogItemAction.bind(
    null,
    reference,
    updatedAtValue,
  );

  return (
    <details className={styles.toolsPanel}>
      <summary>Modifier / archiver</summary>
      <div className={styles.toolsContent}>
        <AdminForm
          action={editAction}
          className={styles.compactForm}
          submitLabel="Enregistrer"
          submitVariant="secondary"
        >
          <label>
            <span>Titre</span>
            <input
              name="title"
              type="text"
              required
              defaultValue={lesson.title}
              maxLength={160}
              autoComplete="off"
            />
          </label>
          <label>
            <span>Description facultative</span>
            <textarea
              name="description"
              defaultValue={lesson.description ?? ""}
              maxLength={2_000}
              rows={3}
            />
          </label>
        </AdminForm>
        <AdminForm
          action={publicationAction}
          className={styles.inlineForm}
          submitLabel="Changer l’état"
          submitVariant="secondary"
        >
          <label>
            <span>Publication</span>
            <select
              name="publicationStatus"
              defaultValue={lesson.publicationStatus}
            >
              <option value={PublicationStatus.DRAFT}>Brouillon</option>
              <option value={PublicationStatus.PUBLISHED}>Publiée</option>
            </select>
          </label>
        </AdminForm>
        <OrderForm
          action={moveAction}
          canMoveUp={index > 0}
          canMoveDown={index < total - 1}
          className={styles.orderForm}
        />
        <AdminForm
          action={archiveAction}
          className={styles.archiveForm}
          confirmMessage={`Archiver la séance « ${lesson.title} » ? Elle disparaîtra du sommaire actif.`}
          submitLabel="Archiver la séance"
          submitVariant="danger"
        >
          <strong>Archivage</strong>
          <p>
            L’archivage est refusé si des activités actives y sont rattachées.
          </p>
        </AdminForm>
      </div>
    </details>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await connection();
  const openItems = getOpenItems((await searchParams) ?? {});
  const admin = await requireAdminPage();
  const catalog = await getAdminCatalog();
  const classroomCount = catalog.reduce(
    (total, program) =>
      total +
      program.levels.reduce(
        (levelTotal, level) => levelTotal + level.classrooms.length,
        0,
      ),
    0,
  );
  const teachingCount = catalog.reduce(
    (total, program) =>
      total +
      program.levels.reduce(
        (levelTotal, level) =>
          levelTotal +
          level.classrooms.reduce(
            (classTotal, classroom) =>
              classTotal + classroom.teachingAreas.length,
            0,
          ),
        0,
      ),
    0,
  );

  return (
    <div className={styles.adminShell}>
      <header className={styles.topbar}>
        <BrandMark context="Administration" />
        <div className={styles.topbarActions}>
          <span className={styles.adminIdentity}>{admin.login}</span>
          <Link className={styles.studentLink} href="/">
            Voir l’espace élève
            <span aria-hidden="true">↗</span>
          </Link>
          <form action={logoutAdminAction}>
            <button className={styles.logoutButton} type="submit">
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <div className={styles.workspace}>
        <aside
          className={styles.sidebar}
          aria-label="Navigation administration"
        >
          <p className={styles.navLabel}>Gérer</p>
          <nav>
            <a className={styles.activeNavItem} href="#structure">
              <span aria-hidden="true">01</span>
              Structure pédagogique
            </a>
            <a className={styles.activeNavItem} href="#catalogue">
              <span aria-hidden="true">02</span>
              Séquences et séances
            </a>
            <span className={styles.disabledNavItem} aria-disabled="true">
              <span aria-hidden="true">03</span>
              Activités
            </span>
          </nav>
          <p className={styles.sidebarNote}>
            Modifiez la structure directement dans l’arborescence. Les activités
            restent volontairement en lecture seule pour cette étape.
          </p>
        </aside>

        <main className={styles.content} id="structure">
          <div className={styles.headingRow}>
            <div>
              <p className={styles.eyebrow}>Console de gestion // Catalogue</p>
              <h1>Structure pédagogique</h1>
              <p className={styles.intro}>
                Créez, renommez, ordonnez et archivez vos contenus jusqu’aux
                séances. Toutes les modifications sont enregistrées dans la base
                locale.
              </p>
            </div>
            <CreateItemForm
              context={{ type: "program" }}
              label="une formation"
            />
          </div>

          <ol
            className={styles.hierarchyPath}
            aria-label="Hiérarchie pédagogique"
          >
            <li>Formation</li>
            <li>Niveau</li>
            <li>Classe</li>
            <li>Enseignement</li>
            <li>Séquence</li>
            <li>Séance</li>
            <li>Activité</li>
          </ol>

          <section className={styles.stats} aria-label="Résumé du catalogue">
            <article>
              <strong>{catalog.length}</strong>
              <span>formations</span>
            </article>
            <article>
              <strong>{classroomCount}</strong>
              <span>classes</span>
            </article>
            <article>
              <strong>{teachingCount}</strong>
              <span>enseignements renseignés</span>
            </article>
          </section>

          <section
            className={styles.catalog}
            id="catalogue"
            aria-label="Hiérarchie pédagogique"
          >
            {catalog.map((program, programIndex) => {
              const programReference = {
                type: "program",
                id: program.id,
              } as const;
              const programOpen = openItems.has(program.id);
              const programPanelId = `panel-${program.id}`;

              return (
                <article
                  className={styles.programCard}
                  id={`node-${program.id}`}
                  key={program.id}
                >
                  <header className={styles.programHeader}>
                    <span className={styles.programIndex} aria-hidden="true">
                      {String(programIndex + 1).padStart(2, "0")}
                    </span>
                    <TreeToggle
                      href={getToggleHref(openItems, program.id)}
                      isOpen={programOpen}
                      label="Formation"
                      title={program.name}
                      meta={`${program.levels.length} niveau${program.levels.length > 1 ? "x" : ""}`}
                      controls={programPanelId}
                    />
                    <EntityTools
                      index={program.position}
                      label="la formation"
                      name={program.name}
                      reference={programReference}
                      total={catalog.length}
                      updatedAt={program.updatedAt}
                    />
                  </header>

                  {programOpen ? (
                    <div className={styles.levelList} id={programPanelId}>
                      {program.levels.map((level) => {
                        const levelReference = {
                          type: "level",
                          id: level.id,
                          parentId: program.id,
                        } as const;
                        const levelOpen = openItems.has(level.id);
                        const levelPanelId = `panel-${level.id}`;

                        return (
                          <section
                            className={styles.level}
                            id={`node-${level.id}`}
                            key={level.id}
                          >
                            <div className={styles.levelColumn}>
                              <div className={styles.levelHeading}>
                                <TreeToggle
                                  href={getToggleHref(openItems, level.id)}
                                  isOpen={levelOpen}
                                  label="Niveau"
                                  title={level.name}
                                  meta={`${level.classrooms.length} classe${level.classrooms.length > 1 ? "s" : ""}`}
                                  controls={levelPanelId}
                                />
                              </div>
                              <EntityTools
                                index={level.position}
                                label="le niveau"
                                name={level.name}
                                reference={levelReference}
                                total={program.levels.length}
                                updatedAt={level.updatedAt}
                              />
                            </div>

                            {levelOpen ? (
                              <div
                                className={styles.classGrid}
                                id={levelPanelId}
                              >
                                {level.classrooms.map((classroom) => {
                                  const classroomReference = {
                                    type: "classroom",
                                    id: classroom.id,
                                    parentId: level.id,
                                  } as const;
                                  const classroomOpen = openItems.has(
                                    classroom.id,
                                  );
                                  const classroomPanelId = `panel-${classroom.id}`;

                                  return (
                                    <article
                                      className={styles.classCard}
                                      id={`node-${classroom.id}`}
                                      key={classroom.id}
                                    >
                                      <div className={styles.classHeadingRow}>
                                        <div className={styles.classHeading}>
                                          <TreeToggle
                                            href={getToggleHref(
                                              openItems,
                                              classroom.id,
                                            )}
                                            isOpen={classroomOpen}
                                            label="Classe"
                                            title={classroom.name}
                                            meta={`${classroom.teachingAreas.length} enseignement${classroom.teachingAreas.length > 1 ? "s" : ""}`}
                                            controls={classroomPanelId}
                                          />
                                        </div>
                                        <EntityTools
                                          index={classroom.position}
                                          label="la classe"
                                          name={classroom.name}
                                          reference={classroomReference}
                                          total={level.classrooms.length}
                                          updatedAt={classroom.updatedAt}
                                        />
                                      </div>

                                      {classroomOpen ? (
                                        <div id={classroomPanelId}>
                                          <ClassAccessPanel
                                            classroomId={classroom.id}
                                            className={classroom.name}
                                            status={
                                              !classroom.classAccessCode
                                                ? "none"
                                                : classroom.classAccessCode
                                                      .active
                                                  ? "active"
                                                  : "disabled"
                                            }
                                          />

                                          {classroom.teachingAreas.length >
                                          0 ? (
                                            <ul
                                              className={styles.teachingList}
                                              aria-label={`Enseignements de ${classroom.name}`}
                                            >
                                              {classroom.teachingAreas.map(
                                                (teachingArea) => {
                                                  const teachingAreaReference =
                                                    {
                                                      type: "teachingArea",
                                                      id: teachingArea.id,
                                                      parentId: classroom.id,
                                                    } as const;
                                                  const teachingAreaOpen =
                                                    openItems.has(
                                                      teachingArea.id,
                                                    );
                                                  const teachingAreaPanelId = `panel-${teachingArea.id}`;

                                                  return (
                                                    <li
                                                      id={`node-${teachingArea.id}`}
                                                      key={teachingArea.id}
                                                    >
                                                      <div
                                                        className={
                                                          styles.teachingHeading
                                                        }
                                                      >
                                                        <div>
                                                          <TreeToggle
                                                            href={getToggleHref(
                                                              openItems,
                                                              teachingArea.id,
                                                            )}
                                                            isOpen={
                                                              teachingAreaOpen
                                                            }
                                                            label="Enseignement"
                                                            title={
                                                              teachingArea.name
                                                            }
                                                            meta={`${teachingArea.kind === TeachingAreaKind.BLOCK ? "Bloc" : "Matière"} · ${teachingArea.learningSequences.length} séquence${teachingArea.learningSequences.length > 1 ? "s" : ""}`}
                                                            controls={
                                                              teachingAreaPanelId
                                                            }
                                                          />
                                                        </div>
                                                        <EntityTools
                                                          index={
                                                            teachingArea.position
                                                          }
                                                          label="l’enseignement"
                                                          name={
                                                            teachingArea.name
                                                          }
                                                          reference={
                                                            teachingAreaReference
                                                          }
                                                          total={
                                                            classroom
                                                              .teachingAreas
                                                              .length
                                                          }
                                                          updatedAt={
                                                            teachingArea.updatedAt
                                                          }
                                                        />
                                                      </div>

                                                      {teachingAreaOpen ? (
                                                        <div
                                                          id={
                                                            teachingAreaPanelId
                                                          }
                                                        >
                                                          {teachingArea
                                                            .learningSequences
                                                            .length > 0 ? (
                                                            <ol
                                                              className={
                                                                styles.sequenceList
                                                              }
                                                            >
                                                              {teachingArea.learningSequences.map(
                                                                (
                                                                  sequence,
                                                                  sequenceIndex,
                                                                ) => {
                                                                  const sequenceOpen =
                                                                    openItems.has(
                                                                      sequence.id,
                                                                    );
                                                                  const sequencePanelId = `panel-${sequence.id}`;

                                                                  return (
                                                                    <li
                                                                      id={`node-${sequence.id}`}
                                                                      key={
                                                                        sequence.id
                                                                      }
                                                                    >
                                                                      <div
                                                                        className={
                                                                          styles.sequenceMain
                                                                        }
                                                                      >
                                                                        <TreeToggle
                                                                          href={getToggleHref(
                                                                            openItems,
                                                                            sequence.id,
                                                                          )}
                                                                          isOpen={
                                                                            sequenceOpen
                                                                          }
                                                                          label="Séquence"
                                                                          title={
                                                                            sequence.title
                                                                          }
                                                                          meta={`${sequence.lessons.length} séance${sequence.lessons.length > 1 ? "s" : ""}`}
                                                                          controls={
                                                                            sequencePanelId
                                                                          }
                                                                        />
                                                                        {sequence.description ? (
                                                                          <p>
                                                                            {
                                                                              sequence.description
                                                                            }
                                                                          </p>
                                                                        ) : null}
                                                                      </div>
                                                                      <span
                                                                        className={`${styles.sequenceStatus} ${getSequenceStatusClass(sequence.status)}`}
                                                                      >
                                                                        {
                                                                          sequenceStatusLabels[
                                                                            sequence
                                                                              .status
                                                                          ]
                                                                        }
                                                                      </span>
                                                                      <SequenceTools
                                                                        index={
                                                                          sequenceIndex
                                                                        }
                                                                        sequence={
                                                                          sequence
                                                                        }
                                                                        teachingAreaId={
                                                                          teachingArea.id
                                                                        }
                                                                        total={
                                                                          teachingArea
                                                                            .learningSequences
                                                                            .length
                                                                        }
                                                                      />
                                                                      {sequenceOpen ? (
                                                                        <div
                                                                          id={
                                                                            sequencePanelId
                                                                          }
                                                                          className={
                                                                            styles.sequencePanel
                                                                          }
                                                                        >
                                                                          {sequence
                                                                            .lessons
                                                                            .length >
                                                                          0 ? (
                                                                            <ol
                                                                              className={
                                                                                styles.lessonList
                                                                              }
                                                                              aria-label={`Séances de ${sequence.title}`}
                                                                            >
                                                                              {sequence.lessons.map(
                                                                                (
                                                                                  lesson,
                                                                                  lessonIndex,
                                                                                ) => (
                                                                                  <li
                                                                                    id={`node-${lesson.id}`}
                                                                                    key={
                                                                                      lesson.id
                                                                                    }
                                                                                  >
                                                                                    <div
                                                                                      className={
                                                                                        styles.lessonMain
                                                                                      }
                                                                                    >
                                                                                      <span>
                                                                                        Séance{" "}
                                                                                        {String(
                                                                                          lessonIndex +
                                                                                            1,
                                                                                        ).padStart(
                                                                                          2,
                                                                                          "0",
                                                                                        )}
                                                                                      </span>
                                                                                      <strong>
                                                                                        {
                                                                                          lesson.title
                                                                                        }
                                                                                      </strong>
                                                                                      {lesson.description ? (
                                                                                        <p>
                                                                                          {
                                                                                            lesson.description
                                                                                          }
                                                                                        </p>
                                                                                      ) : null}
                                                                                    </div>
                                                                                    <span
                                                                                      className={`${styles.lessonStatus} ${
                                                                                        lesson.publicationStatus ===
                                                                                        PublicationStatus.PUBLISHED
                                                                                          ? styles.lessonPublished
                                                                                          : styles.lessonDraft
                                                                                      }`}
                                                                                    >
                                                                                      {
                                                                                        publicationStatusLabels[
                                                                                          lesson
                                                                                            .publicationStatus
                                                                                        ]
                                                                                      }
                                                                                    </span>
                                                                                    <small>
                                                                                      {
                                                                                        lesson
                                                                                          ._count
                                                                                          .activities
                                                                                      }{" "}
                                                                                      activité
                                                                                      {lesson
                                                                                        ._count
                                                                                        .activities >
                                                                                      1
                                                                                        ? "s"
                                                                                        : ""}
                                                                                    </small>
                                                                                    <LessonTools
                                                                                      index={
                                                                                        lessonIndex
                                                                                      }
                                                                                      lesson={
                                                                                        lesson
                                                                                      }
                                                                                      sequenceId={
                                                                                        sequence.id
                                                                                      }
                                                                                      total={
                                                                                        sequence
                                                                                          .lessons
                                                                                          .length
                                                                                      }
                                                                                    />
                                                                                  </li>
                                                                                ),
                                                                              )}
                                                                            </ol>
                                                                          ) : (
                                                                            <p
                                                                              className={
                                                                                styles.emptyLesson
                                                                              }
                                                                            >
                                                                              Aucune
                                                                              séance
                                                                              dans
                                                                              cette
                                                                              séquence.
                                                                            </p>
                                                                          )}
                                                                          <CreateItemForm
                                                                            context={{
                                                                              type: "lesson",
                                                                              parentId:
                                                                                sequence.id,
                                                                            }}
                                                                            label="une séance"
                                                                          />
                                                                        </div>
                                                                      ) : null}
                                                                    </li>
                                                                  );
                                                                },
                                                              )}
                                                            </ol>
                                                          ) : (
                                                            <p
                                                              className={
                                                                styles.emptySequence
                                                              }
                                                            >
                                                              Aucune séquence
                                                              pour le moment.
                                                            </p>
                                                          )}
                                                          <CreateItemForm
                                                            context={{
                                                              type: "learningSequence",
                                                              parentId:
                                                                teachingArea.id,
                                                            }}
                                                            label="une séquence"
                                                          />
                                                        </div>
                                                      ) : null}
                                                    </li>
                                                  );
                                                },
                                              )}
                                            </ul>
                                          ) : (
                                            <p className={styles.emptyTeaching}>
                                              Aucun enseignement configuré
                                            </p>
                                          )}
                                          <CreateItemForm
                                            context={{
                                              type: "teachingArea",
                                              parentId: classroom.id,
                                            }}
                                            label="un enseignement"
                                          />
                                        </div>
                                      ) : null}
                                    </article>
                                  );
                                })}
                                <CreateItemForm
                                  context={{
                                    type: "classroom",
                                    parentId: level.id,
                                  }}
                                  label="une classe"
                                />
                              </div>
                            ) : null}
                          </section>
                        );
                      })}
                      <div className={styles.programAddRow}>
                        <CreateItemForm
                          context={{ type: "level", parentId: program.id }}
                          label="un niveau"
                        />
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}

            {catalog.length === 0 ? (
              <p className={styles.emptyCatalog}>
                Aucune formation active. Ajoutez la première formation
                ci-dessus.
              </p>
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}
