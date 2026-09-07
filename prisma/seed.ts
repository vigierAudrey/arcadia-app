import {
  ActivityTrack,
  PublicationStatus,
  SequenceStatus,
  TeachingAreaKind,
} from "../src/generated/prisma/enums";
import { prisma } from "../src/server/db/prisma";

type InitialTeachingArea = {
  name: string;
  kind: TeachingAreaKind;
  learningSequences?: readonly InitialLearningSequence[];
};

type InitialLearningSequence = {
  title: string;
  description: string;
  lessons: readonly InitialLesson[];
};

type InitialLesson = {
  title: string;
  description?: string;
  activities?: readonly InitialActivity[];
};

type InitialJsonValue =
  | string
  | number
  | boolean
  | null
  | InitialJsonObject
  | InitialJsonValue[];

type InitialJsonObject = { [key: string]: InitialJsonValue };

type InitialActivity = {
  title: string;
  type: "content" | "qcm" | "true_false" | "sorting" | "matching";
  instructions: string;
  payload: InitialJsonObject;
};

type InitialClassroom = {
  name: string;
  teachingAreas: readonly InitialTeachingArea[];
};

type InitialLevel = {
  name: string;
  classrooms: readonly InitialClassroom[];
};

type InitialProgram = {
  name: string;
  levels: readonly InitialLevel[];
};

// Données d'initialisation uniquement : elles ne sont jamais importées par l'application.
const initialCatalog: readonly InitialProgram[] = [
  {
    name: "CAP",
    levels: [
      {
        name: "Terminale",
        classrooms: [
          {
            name: "T AGAA",
            teachingAreas: [
              { name: "Maths appliquées", kind: TeachingAreaKind.SUBJECT },
              {
                name: "PSE",
                kind: TeachingAreaKind.SUBJECT,
                learningSequences: [
                  {
                    title: "C1. Les différents contrats de travail",
                    description: "Module/thème référentiel ; la position indique uniquement l'ordre d'affichage.",
                    lessons: [
                      {
                        title: "Identifier les différents contrats de travail",
                        description: "Reconnaître un CDI, un CDD et un contrat d'apprentissage à partir d'indices simples.",
                        activities: [
                          {
                            title: "À retenir : les trois contrats",
                            type: "content",
                            instructions: "Lis cette fiche avant de relever le défi.",
                            payload: {
                              body: "Un contrat de travail fixe les règles entre un salarié et un employeur.\n\nCDI : contrat sans date de fin prévue.\n\nCDD : contrat avec une durée limitée ou un motif précis, par exemple un remplacement.\n\nApprentissage : contrat qui associe le travail et la formation.\n\nIndice à repérer : durée, motif du contrat, poste et alternance entre l'entreprise et le centre de formation.",
                            },
                          },
                          {
                            title: "Défi 01 : le contrat de remplacement",
                            type: "qcm",
                            instructions: "Choisis la bonne réponse, puis vérifie.",
                            payload: {
                              question: "Les Glycines recrutent une personne pour remplacer une agente absente pendant 3 semaines. Quel contrat correspond le mieux ?",
                              choices: [
                                { id: "cdi", label: "Un CDI" },
                                { id: "cdd", label: "Un CDD" },
                                { id: "apprentissage", label: "Un contrat d'apprentissage" },
                              ],
                              correctChoiceIds: ["cdd"],
                              explanation: "Le remplacement est prévu pour une durée limitée : c'est un indice de CDD.",
                            },
                          },
                          {
                            title: "Défi 02 : la durée du contrat",
                            type: "qcm",
                            instructions: "Repère l'indice qui caractérise le CDI.",
                            payload: {
                              question: "Quelle information permet d'identifier un CDI ?",
                              choices: [
                                { id: "date-fin", label: "Une date de fin prévue" },
                                { id: "sans-fin", label: "Aucune date de fin prévue" },
                                { id: "formation", label: "Une alternance avec un centre de formation" },
                              ],
                              correctChoiceIds: ["sans-fin"],
                              explanation: "Le CDI est un contrat sans date de fin prévue.",
                            },
                          },
                          {
                            title: "Défi 03 : travail et formation",
                            type: "qcm",
                            instructions: "Choisis le contrat qui associe emploi et formation.",
                            payload: {
                              question: "Une jeune personne travaille aux Glycines et prépare un diplôme en centre de formation. De quel contrat s'agit-il ?",
                              choices: [
                                { id: "cdi", label: "Un CDI" },
                                { id: "cdd", label: "Un CDD" },
                                { id: "apprentissage", label: "Un contrat d'apprentissage" },
                              ],
                              correctChoiceIds: ["apprentissage"],
                              explanation: "L'alternance entre travail et formation caractérise l'apprentissage.",
                            },
                          },
                          {
                            title: "Jeu : tri express des contrats",
                            type: "sorting",
                            instructions: "Sélectionne une carte, puis choisis sa catégorie.",
                            payload: {
                              prompt: "Classe chaque indice dans le bon contrat.",
                              categories: [
                                { id: "cdi", label: "CDI" },
                                { id: "cdd", label: "CDD" },
                                { id: "apprentissage", label: "Apprentissage" },
                              ],
                              items: [
                                { id: "cdi-fin", label: "Sans date de fin prévue", categoryId: "cdi" },
                                { id: "cdi-durable", label: "Poste durable", categoryId: "cdi" },
                                { id: "cdd-remplacement", label: "Remplacement d'une agente absente", categoryId: "cdd" },
                                { id: "cdd-limite", label: "Contrat de 3 semaines", categoryId: "cdd" },
                                { id: "app-formation", label: "Travail et formation", categoryId: "apprentissage" },
                                { id: "app-diplome", label: "Préparer un diplôme en alternance", categoryId: "apprentissage" },
                              ],
                              explanation: "Durable et sans fin prévue indiquent le CDI ; durée limitée ou remplacement indiquent le CDD ; travail et formation indiquent l'apprentissage.",
                            },
                          },
                          {
                            title: "Jeu : relie les indices",
                            type: "matching",
                            instructions: "Pour chaque indice, choisis le contrat qui correspond.",
                            payload: {
                              prompt: "Associe chaque indice au bon contrat.",
                              pairs: [
                                { id: "sans-fin", left: "Sans date de fin prévue", right: "CDI" },
                                { id: "remplacement", left: "Remplacement d'une agente absente", right: "CDD" },
                                { id: "alternance", left: "Travail + formation pour un diplôme", right: "Apprentissage" },
                              ],
                              explanation: "Chaque indice donne une information sur la durée ou l'organisation du contrat.",
                            },
                          },
                        ],
                      },
                      {
                        title: "Repérer les droits et obligations liés au contrat de travail",
                        description: "Distinguer ce que le salarié peut demander et ce qu'il doit respecter dans une situation professionnelle.",
                        activities: [
                          {
                            title: "À retenir : mes droits et mes obligations",
                            type: "content",
                            instructions: "Lis cette fiche avant de conseiller Lina.",
                            payload: {
                              body: "Un droit est ce que je peux demander ou recevoir.\n\nUne obligation est ce que je dois respecter.\n\nLe salarié respecte les horaires, le règlement intérieur, les consignes d'hygiène et de sécurité et la confidentialité.\n\nL'employeur respecte le contrat, informe sur le poste et donne les moyens de travailler.\n\nSi je ne comprends pas mon planning ou une règle, je demande une explication à une personne responsable.",
                            },
                          },
                          {
                            title: "Défi 01 : côté salarié",
                            type: "qcm",
                            instructions: "Repère l'obligation du salarié.",
                            payload: {
                              question: "Quelle action est une obligation du salarié aux Glycines ?",
                              choices: [
                                { id: "informations", label: "Recevoir les informations utiles" },
                                { id: "horaires", label: "Respecter les horaires" },
                                { id: "moyens", label: "Donner les moyens de travailler" },
                              ],
                              correctChoiceIds: ["horaires"],
                              explanation: "Le salarié doit respecter les horaires prévus par son planning.",
                            },
                          },
                          {
                            title: "Défi 02 : côté employeur",
                            type: "qcm",
                            instructions: "Repère ce que l'employeur doit faire.",
                            payload: {
                              question: "Quelle action est une obligation de l'employeur ?",
                              choices: [
                                { id: "contrat", label: "Respecter le contrat" },
                                { id: "confidentialite", label: "Respecter la confidentialité" },
                                { id: "planning", label: "Arriver à l'heure au travail" },
                              ],
                              correctChoiceIds: ["contrat"],
                              explanation: "L'employeur doit respecter le contrat et fournir les informations utiles au poste.",
                            },
                          },
                          {
                            title: "Défi 03 : le conseil à Lina",
                            type: "qcm",
                            instructions: "Choisis le conseil professionnel le plus adapté.",
                            payload: {
                              question: "Lina ne comprend pas son planning et arrive à 8 h 25 au lieu de 8 h. Que doit-elle faire ?",
                              choices: [
                                { id: "attendre", label: "Ne rien dire et recommencer" },
                                { id: "prevenir", label: "Prévenir le responsable et demander une explication" },
                                { id: "partir", label: "Partir sans prévenir" },
                              ],
                              correctChoiceIds: ["prevenir"],
                              explanation: "Lina doit respecter les horaires et prévenir le responsable en cas de difficulté.",
                            },
                          },
                          {
                            title: "Jeu : classe les responsabilités",
                            type: "sorting",
                            instructions: "Sélectionne une carte, puis choisis qui est concerné.",
                            payload: {
                              prompt: "Classe chaque action dans la bonne colonne.",
                              categories: [
                                { id: "droit", label: "Droit du salarié" },
                                { id: "salarié", label: "Obligation du salarié" },
                                { id: "employeur", label: "Obligation de l'employeur" },
                              ],
                              items: [
                                { id: "recevoir", label: "Recevoir les informations utiles", categoryId: "droit" },
                                { id: "respecter-horaires", label: "Respecter les horaires", categoryId: "salarié" },
                                { id: "securite", label: "Respecter les consignes de sécurité", categoryId: "salarié" },
                                { id: "contrat-employeur", label: "Respecter le contrat", categoryId: "employeur" },
                                { id: "moyens", label: "Donner les moyens de travailler", categoryId: "employeur" },
                                { id: "poste", label: "Informer sur le poste", categoryId: "employeur" },
                              ],
                              explanation: "Le salarié a des droits mais doit respecter les règles ; l'employeur doit respecter le contrat et fournir les informations et moyens nécessaires.",
                            },
                          },
                        ],
                      },
                      { title: "Lire les informations essentielles d'un contrat de travail" },
                    ],
                  },
                ],
              },
              { name: "Bloc 2", kind: TeachingAreaKind.BLOCK },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "BAC PRO",
    levels: [
      {
        name: "Seconde",
        classrooms: [
          { name: "2 AERO", teachingAreas: [] },
          { name: "2 CIEL", teachingAreas: [] },
        ],
      },
      {
        name: "Première",
        classrooms: [
          { name: "1 AERO", teachingAreas: [] },
          { name: "1 TCI", teachingAreas: [] },
        ],
      },
      {
        name: "Terminale",
        classrooms: [
          { name: "T AERO", teachingAreas: [] },
          { name: "T TCI", teachingAreas: [] },
        ],
      },
    ],
  },
];

async function seedCatalog() {
  await prisma.$transaction(async (transaction) => {
    for (const [programIndex, initialProgram] of initialCatalog.entries()) {
      const program = await transaction.program.upsert({
        where: { name: initialProgram.name },
        create: {
          name: initialProgram.name,
          position: programIndex,
        },
        update: {
          position: programIndex,
          archivedAt: null,
        },
        select: { id: true },
      });

      for (const [levelIndex, initialLevel] of initialProgram.levels.entries()) {
        const level = await transaction.level.upsert({
          where: {
            programId_name: {
              programId: program.id,
              name: initialLevel.name,
            },
          },
          create: {
            programId: program.id,
            name: initialLevel.name,
            position: levelIndex,
          },
          update: {
            position: levelIndex,
            archivedAt: null,
          },
          select: { id: true },
        });

        for (const [classroomIndex, initialClassroom] of initialLevel.classrooms.entries()) {
          const classroom = await transaction.classroom.upsert({
            where: {
              levelId_name: {
                levelId: level.id,
                name: initialClassroom.name,
              },
            },
            create: {
              levelId: level.id,
              name: initialClassroom.name,
              position: classroomIndex,
            },
            update: {
              position: classroomIndex,
              archivedAt: null,
            },
            select: { id: true },
          });

          for (const [teachingAreaIndex, initialTeachingArea] of initialClassroom.teachingAreas.entries()) {
            const teachingArea = await transaction.teachingArea.upsert({
              where: {
                classroomId_name: {
                  classroomId: classroom.id,
                  name: initialTeachingArea.name,
                },
              },
              create: {
                classroomId: classroom.id,
                name: initialTeachingArea.name,
                kind: initialTeachingArea.kind,
                position: teachingAreaIndex,
              },
              update: {
                kind: initialTeachingArea.kind,
                position: teachingAreaIndex,
                archivedAt: null,
              },
              select: { id: true },
            });

            for (const [sequenceIndex, initialSequence] of (
              initialTeachingArea.learningSequences ?? []
            ).entries()) {
              const sequence = await transaction.learningSequence.upsert({
                where: {
                  teachingAreaId_title: {
                    teachingAreaId: teachingArea.id,
                    title: initialSequence.title,
                  },
                },
                create: {
                  teachingAreaId: teachingArea.id,
                  title: initialSequence.title,
                  description: initialSequence.description,
                  position: sequenceIndex,
                  status: SequenceStatus.OPEN,
                },
                update: {
                  description: initialSequence.description,
                  position: sequenceIndex,
                  status: SequenceStatus.OPEN,
                  archivedAt: null,
                },
                select: { id: true },
              });

              for (const [lessonIndex, initialLesson] of initialSequence.lessons.entries()) {
                const lesson = await transaction.lesson.upsert({
                  where: {
                    sequenceId_title: {
                      sequenceId: sequence.id,
                      title: initialLesson.title,
                    },
                  },
                  create: {
                    sequenceId: sequence.id,
                    title: initialLesson.title,
                    description: initialLesson.description,
                    position: lessonIndex,
                    publicationStatus: PublicationStatus.PUBLISHED,
                  },
                  update: {
                    description: initialLesson.description,
                    position: lessonIndex,
                    publicationStatus: PublicationStatus.PUBLISHED,
                    archivedAt: null,
                  },
                  select: { id: true },
                });

                for (const [activityIndex, initialActivity] of (
                  initialLesson.activities ?? []
                ).entries()) {
                  await transaction.activity.upsert({
                    where: {
                      lessonId_title: {
                        lessonId: lesson.id,
                        title: initialActivity.title,
                      },
                    },
                    create: {
                      lessonId: lesson.id,
                      title: initialActivity.title,
                      type: initialActivity.type,
                      instructions: initialActivity.instructions,
                      payload: initialActivity.payload,
                      track: ActivityTrack.CORE,
                      position: activityIndex,
                      publicationStatus: PublicationStatus.PUBLISHED,
                    },
                    update: {
                      type: initialActivity.type,
                      instructions: initialActivity.instructions,
                      payload: initialActivity.payload,
                      track: ActivityTrack.CORE,
                      position: activityIndex,
                      publicationStatus: PublicationStatus.PUBLISHED,
                      archivedAt: null,
                    },
                    select: { id: true },
                  });
                }
              }
            }
          }
        }
      }
    }
  });
}

seedCatalog()
  .then(async () => {
    console.info("Development catalog seeded.");
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Development catalog seed failed.");
    await prisma.$disconnect();
    process.exitCode = 1;

    if (process.env.NODE_ENV === "development") {
      console.error(error instanceof Error ? error.message : "Unknown error");
    }
  });
