import { z } from "zod";

const shortTextSchema = z.string().trim().min(1).max(500);
const explanationSchema = z.string().trim().min(1).max(4_000).optional();
const choiceIdSchema = z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/);

export const contentPayloadSchema = z
  .object({
    body: z.string().trim().min(1).max(30_000),
  })
  .strict();

export const qcmPayloadSchema = z
  .object({
    question: shortTextSchema,
    choices: z
      .array(
        z
          .object({
            id: choiceIdSchema,
            label: shortTextSchema,
          })
          .strict(),
      )
      .min(2)
      .max(8),
    correctChoiceIds: z.array(choiceIdSchema).min(1).max(8),
    explanation: explanationSchema,
  })
  .strict()
  .superRefine((payload, context) => {
    const choiceIds = new Set(payload.choices.map((choice) => choice.id));

    if (choiceIds.size !== payload.choices.length) {
      context.addIssue({
        code: "custom",
        message: "Choice identifiers must be unique.",
        path: ["choices"],
      });
    }

    for (const correctChoiceId of payload.correctChoiceIds) {
      if (!choiceIds.has(correctChoiceId)) {
        context.addIssue({
          code: "custom",
          message: "Every correct answer must reference an existing choice.",
          path: ["correctChoiceIds"],
        });
      }
    }
  });

export const trueFalsePayloadSchema = z
  .object({
    statement: shortTextSchema,
    correctAnswer: z.boolean(),
    explanation: explanationSchema,
  })
  .strict();

export const activityPayloadSchemas = {
  content: contentPayloadSchema,
  qcm: qcmPayloadSchema,
  true_false: trueFalsePayloadSchema,
} as const;

export type ActivityType = keyof typeof activityPayloadSchemas;

export function parseActivityPayload(type: string, payload: unknown) {
  if (!(type in activityPayloadSchemas)) {
    throw new Error("Unsupported activity type.");
  }

  const activityType = type as ActivityType;
  return activityPayloadSchemas[activityType].parse(payload);
}
