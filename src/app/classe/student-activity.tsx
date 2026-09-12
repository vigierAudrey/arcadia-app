"use client";

import { useState } from "react";

import {
  parseActivityPayload,
  type ContentPayload,
  type MatchingPayload,
  type QcmPayload,
  type SortingPayload,
  type TrueFalsePayload,
} from "@/features/activities/activity-payload";

import { SpeakButton } from "@/features/accessibility/speak-button";

import styles from "./student-activity.module.css";

type StudentActivityProps = {
  activity: {
    title: string;
    type: string;
    instructions: string;
    payload: unknown;
  };
};

type StudentActivityItem = StudentActivityProps["activity"] & { id: string };

const activityTypeLabels = {
  content: "Fiche",
  qcm: "Quiz",
  true_false: "Vrai / Faux",
  sorting: "Jeu",
  matching: "Jeu",
} as const;

export function StudentActivityGroup({
  activities,
}: {
  activities: StudentActivityItem[];
}) {
  const groups: Array<{
    type: "content" | "qcm" | "true_false" | "game";
    activities: StudentActivityItem[];
  }> = (["content", "qcm", "true_false"] as const)
    .map((type) => ({
      type,
      activities: activities.filter((activity) => activity.type === type),
    }))
    .filter((group) => group.activities.length > 0);
  const games = activities.filter(
    (activity) => activity.type === "sorting" || activity.type === "matching",
  );
  if (games.length > 0) groups.push({ type: "game", activities: games });

  return (
    <div className={styles.activityGroups}>
      {groups.map((group) => (
        <details
          className={styles.activityGroup}
          key={group.type}
          open={group.type === "content"}
        >
          <summary className={styles.groupSummary}>
            <span>{group.type === "game" ? "Jeux" : activityTypeLabels[group.type]}</span>
            <small>{group.activities.length} activité(s)</small>
          </summary>
          <div className={styles.activityList}>
            {group.activities.map((activity) => (
              <StudentActivity activity={activity} key={activity.id} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

const choiceLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

/**
 * Texte lu à voix haute : titre, consigne, puis l'énoncé complet de l'activité,
 * y compris les réponses proposées pour que l'élève puisse choisir sans les lire.
 */
function buildSpeechText(
  activity: StudentActivityProps["activity"],
  payload: ReturnType<typeof parseActivityPayload>,
): string {
  const parts = [activity.title, activity.instructions];

  if (activity.type === "content") {
    parts.push((payload as ContentPayload).body);
  } else if (activity.type === "qcm") {
    const qcm = payload as QcmPayload;
    parts.push(qcm.question);
    qcm.choices.forEach((choice, index) => {
      parts.push(`Réponse ${choiceLetters[index] ?? index + 1} : ${choice.label}.`);
    });
  } else if (activity.type === "true_false") {
    parts.push((payload as TrueFalsePayload).statement);
    parts.push("Réponds par vrai ou par faux.");
  } else if (activity.type === "sorting") {
    const sorting = payload as SortingPayload;
    parts.push(sorting.prompt);
    parts.push(
      `Catégories : ${sorting.categories.map((category) => category.label).join(", ")}.`,
    );
    sorting.items.forEach((item, index) => {
      parts.push(`Élément ${index + 1} : ${item.label}.`);
    });
  } else {
    const matching = payload as MatchingPayload;
    parts.push(matching.prompt);
    matching.pairs.forEach((pair, index) => {
      parts.push(`Élément ${index + 1} : ${pair.left}.`);
    });
  }

  return parts.filter(Boolean).join(" ");
}

export function StudentActivity({ activity }: StudentActivityProps) {
  let payload: ReturnType<typeof parseActivityPayload>;

  try {
    payload = parseActivityPayload(activity.type, activity.payload);
  } catch {
    return (
      <article className={styles.activity}>
        <p className={styles.unavailable}>Activité momentanément indisponible.</p>
      </article>
    );
  }

  const contentPayload = payload as ContentPayload;
  const qcmPayload = payload as QcmPayload;
  const trueFalsePayload = payload as TrueFalsePayload;
  const sortingPayload = payload as SortingPayload;
  const matchingPayload = payload as MatchingPayload;

  return (
    <article className={styles.activity}>
      <div className={styles.activityHeader}>
        <span className={styles.activityTag}>
          {activityTypeLabels[activity.type as keyof typeof activityTypeLabels] ?? "Défi"}
        </span>
        <h3>{activity.title}</h3>
        <span className={styles.activitySpeak}>
          <SpeakButton about={activity.title} text={buildSpeechText(activity, payload)} />
        </span>
      </div>
      <p className={styles.instructions}>{activity.instructions}</p>
      {activity.type === "content" ? (
        <ContentActivity body={contentPayload.body} />
      ) : activity.type === "qcm" ? (
        <QcmActivity payload={qcmPayload} />
      ) : activity.type === "true_false" ? (
        <TrueFalseActivity payload={trueFalsePayload} />
      ) : activity.type === "sorting" ? (
        <SortingActivity payload={sortingPayload} />
      ) : (
        <MatchingActivity payload={matchingPayload} />
      )}
    </article>
  );
}

function ContentActivity({ body }: { body: string }) {
  return (
    <div className={styles.contentBody}>
      {body.split("\n\n").map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function QcmActivity({
  payload,
}: {
  payload: QcmPayload;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = checked && payload.correctChoiceIds.includes(selectedChoice ?? "");

  return (
    <div className={styles.interactiveBody}>
      <p className={styles.question}>{payload.question}</p>
      <div className={styles.choiceGrid} role="group" aria-label="Réponses possibles">
        {payload.choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          const isAnswer = checked && payload.correctChoiceIds.includes(choice.id);
          const isWrong = checked && isSelected && !isAnswer;

          return (
            <button
              aria-pressed={isSelected}
              className={`${styles.choice} ${isSelected ? styles.choiceSelected : ""} ${isAnswer ? styles.choiceCorrect : ""} ${isWrong ? styles.choiceWrong : ""}`}
              key={choice.id}
              onClick={() => {
                setSelectedChoice(choice.id);
                setChecked(false);
              }}
              type="button"
            >
              <span className={styles.choiceCursor} aria-hidden="true">
                {isAnswer ? "OK" : isWrong ? "NO" : "▸"}
              </span>
              {choice.label}
            </button>
          );
        })}
      </div>
      <div className={styles.actionRow}>
        <button
          className={styles.checkButton}
          disabled={!selectedChoice}
          onClick={() => setChecked(true)}
          type="button"
        >
          Vérifier
        </button>
        {checked ? (
          <p className={isCorrect ? styles.feedbackSuccess : styles.feedbackHint} role="status">
            {isCorrect ? "Bonne réponse !" : "Relis l'indice puis essaie encore."}
          </p>
        ) : null}
      </div>
      {checked && isCorrect && payload.explanation ? (
        <p className={styles.explanation}>{payload.explanation}</p>
      ) : null}
    </div>
  );
}

function TrueFalseActivity({
  payload,
}: {
  payload: TrueFalsePayload;
}) {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const checked = answer !== null;
  const isCorrect = answer === payload.correctAnswer;

  return (
    <div className={styles.interactiveBody}>
      <p className={styles.question}>{payload.statement}</p>
      <div className={styles.choiceGrid} role="group" aria-label="Vrai ou faux">
        {[true, false].map((value) => (
          <button
            aria-pressed={answer === value}
            className={`${styles.choice} ${answer === value ? styles.choiceSelected : ""}`}
            key={String(value)}
            onClick={() => setAnswer(value)}
            type="button"
          >
            <span className={styles.choiceCursor} aria-hidden="true">▸</span>
            {value ? "Vrai" : "Faux"}
          </button>
        ))}
      </div>
      {checked ? (
        <p className={isCorrect ? styles.feedbackSuccess : styles.feedbackHint} role="status">
          {isCorrect ? "Bonne réponse !" : "À revoir : lis la correction avec ton enseignant·e."}
        </p>
      ) : null}
      {checked && isCorrect && payload.explanation ? (
        <p className={styles.explanation}>{payload.explanation}</p>
      ) : null}
    </div>
  );
}

function SortingActivity({ payload }: { payload: SortingPayload }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const assignedCount = Object.keys(assignments).length;
  const score = payload.items.reduce(
    (total, item) => total + (assignments[item.id] === item.categoryId ? 1 : 0),
    0,
  );

  return (
    <div className={styles.interactiveBody}>
      <p className={styles.question}>{payload.prompt}</p>
      <div className={styles.sortingItems}>
        {payload.items.map((item) => {
          const categoryId = assignments[item.id];
          const isCorrect = checked && categoryId === item.categoryId;
          const isWrong = checked && categoryId && !isCorrect;

          return (
            <button
              className={`${styles.gameCard} ${selectedItem === item.id ? styles.gameCardSelected : ""} ${isCorrect ? styles.gameCardCorrect : ""} ${isWrong ? styles.gameCardWrong : ""}`}
              key={item.id}
              onClick={() => {
                setSelectedItem(item.id);
                setChecked(false);
              }}
              type="button"
            >
              <span className={styles.gameCardMark} aria-hidden="true">
                {categoryId ? "●" : "○"}
              </span>
              <span>{item.label}</span>
              {categoryId ? <small>{payload.categories.find((category) => category.id === categoryId)?.label}</small> : null}
            </button>
          );
        })}
      </div>
      <div className={styles.categoryGrid} aria-label="Catégories de classement">
        {payload.categories.map((category) => (
          <button
            className={styles.categoryButton}
            disabled={!selectedItem}
            key={category.id}
            onClick={() => {
              if (!selectedItem) return;
              setAssignments((current) => ({ ...current, [selectedItem]: category.id }));
              setSelectedItem(null);
              setChecked(false);
            }}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className={styles.actionRow}>
        <button
          className={styles.checkButton}
          disabled={assignedCount !== payload.items.length}
          onClick={() => setChecked(true)}
          type="button"
        >
          Vérifier
        </button>
        {checked ? <p className={score === payload.items.length ? styles.feedbackSuccess : styles.feedbackHint} role="status">Score : {score} / {payload.items.length}</p> : null}
      </div>
      {checked && score === payload.items.length && payload.explanation ? <p className={styles.explanation}>{payload.explanation}</p> : null}
    </div>
  );
}

function MatchingActivity({ payload }: { payload: MatchingPayload }) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const score = payload.pairs.reduce(
    (total, pair) => total + (matches[pair.id] === pair.id ? 1 : 0),
    0,
  );

  return (
    <div className={styles.interactiveBody}>
      <p className={styles.question}>{payload.prompt}</p>
      <p className={styles.gameHint}>Pour chaque indice, choisis le contrat qui correspond.</p>
      <div className={styles.matchingRows}>
        {payload.pairs.map((pair) => {
          const isCorrect = checked && matches[pair.id] === pair.id;
          const isWrong = checked && matches[pair.id] && !isCorrect;

          return (
            <div
              className={`${styles.matchingRow} ${isCorrect ? styles.gameCardCorrect : ""} ${isWrong ? styles.gameCardWrong : ""}`}
              key={pair.id}
            >
              <span className={styles.matchCard}>{pair.left}</span>
              <span className={styles.matchArrow} aria-hidden="true">→</span>
              <label className={styles.matchSelectLabel}>
                <span className={styles.srOnly}>Contrat pour : {pair.left}</span>
                <select
                  aria-label={`Contrat pour : ${pair.left}`}
                  className={styles.matchSelect}
                  onChange={(event) => {
                    setMatches((current) => ({ ...current, [pair.id]: event.target.value }));
                    setChecked(false);
                  }}
                  value={matches[pair.id] ?? ""}
                >
                  <option value="">Choisir...</option>
                  {payload.pairs.map((option) => (
                    <option key={option.id} value={option.id}>{option.right}</option>
                  ))}
                </select>
              </label>
            </div>
          );
        })}
      </div>
      <div className={styles.actionRow}>
        <button
          className={styles.checkButton}
          disabled={Object.keys(matches).length !== payload.pairs.length}
          onClick={() => setChecked(true)}
          type="button"
        >
          Vérifier
        </button>
        {checked ? <p className={score === payload.pairs.length ? styles.feedbackSuccess : styles.feedbackHint} role="status">Score : {score} / {payload.pairs.length}</p> : null}
      </div>
      {checked && score === payload.pairs.length && payload.explanation ? <p className={styles.explanation}>{payload.explanation}</p> : null}
    </div>
  );
}
