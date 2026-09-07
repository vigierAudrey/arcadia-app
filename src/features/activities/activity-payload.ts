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

const sortingCategorySchema = z
  .object({
    id: choiceIdSchema,
    label: shortTextSchema,
  })
  .strict();

export const sortingPayloadSchema = z
  .object({
    prompt: shortTextSchema,
    categories: z.array(sortingCategorySchema).min(2).max(6),
    items: z
      .array(
        z
          .object({
            id: choiceIdSchema,
            label: shortTextSchema,
            categoryId: choiceIdSchema,
          })
          .strict(),
      )
      .min(2)
      .max(18),
    explanation: explanationSchema,
  })
  .strict()
  .superRefine((payload, context) => {
    const categoryIds = new Set(payload.categories.map((category) => category.id));
    const itemIds = new Set<string>();

    if (categoryIds.size !== payload.categories.length) {
      context.addIssue({
        code: "custom",
        message: "Category identifiers must be unique.",
        path: ["categories"],
      });
    }

    for (const item of payload.items) {
      if (itemIds.has(item.id)) {
        context.addIssue({
          code: "custom",
          message: "Item identifiers must be unique.",
          path: ["items"],
        });
      }
      itemIds.add(item.id);
      if (!categoryIds.has(item.categoryId)) {
        context.addIssue({
          code: "custom",
          message: "Every item must reference an existing category.",
          path: ["items"],
        });
      }
    }
  });

export const matchingPayloadSchema = z
  .object({
    prompt: shortTextSchema,
    pairs: z
      .array(
        z
          .object({
            id: choiceIdSchema,
            left: shortTextSchema,
            right: shortTextSchema,
          })
          .strict(),
      )
      .min(2)
      .max(8),
    explanation: explanationSchema,
  })
  .strict()
  .superRefine((payload, context) => {
    const pairIds = new Set(payload.pairs.map((pair) => pair.id));
    const leftLabels = new Set(payload.pairs.map((pair) => pair.left));
    const rightLabels = new Set(payload.pairs.map((pair) => pair.right));

    if (pairIds.size !== payload.pairs.length) {
      context.addIssue({ code: "custom", message: "Pair identifiers must be unique.", path: ["pairs"] });
    }
    if (leftLabels.size !== payload.pairs.length || rightLabels.size !== payload.pairs.length) {
      context.addIssue({ code: "custom", message: "Pair labels must be unique.", path: ["pairs"] });
    }
  });

export const activityPayloadSchemas = {
  content: contentPayloadSchema,
  qcm: qcmPayloadSchema,
  true_false: trueFalsePayloadSchema,
  sorting: sortingPayloadSchema,
  matching: matchingPayloadSchema,
} as const;

export type ContentPayload = z.infer<typeof contentPayloadSchema>;
export type QcmPayload = z.infer<typeof qcmPayloadSchema>;
export type TrueFalsePayload = z.infer<typeof trueFalsePayloadSchema>;
export type SortingPayload = z.infer<typeof sortingPayloadSchema>;
export type MatchingPayload = z.infer<typeof matchingPayloadSchema>;
export type ActivityType = keyof typeof activityPayloadSchemas;

export function parseActivityPayload(type: string, payload: unknown) {
  if (!(type in activityPayloadSchemas)) {
    throw new Error("Unsupported activity type.");
  }

  const activityType = type as ActivityType;
  return activityPayloadSchemas[activityType].parse(payload);
}
