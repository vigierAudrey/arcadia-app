export type LiveAvatar = {
  id: string;
  label: string;
  color: "yellow" | "cyan" | "magenta" | "green" | "red" | "violet";
  accessory: "cap" | "glasses" | "star" | "bolt" | "band" | "crown";
};

export const LIVE_AVATARS = [
  { id: "pac-yellow-cap", label: "Pac Jaune", color: "yellow", accessory: "cap" },
  { id: "pac-cyan-glasses", label: "Pac Bleu", color: "cyan", accessory: "glasses" },
  { id: "pac-magenta-star", label: "Pac Rose", color: "magenta", accessory: "star" },
  { id: "pac-green-band", label: "Pac Vert", color: "green", accessory: "band" },
  { id: "pac-red-bolt", label: "Pac Rouge", color: "red", accessory: "bolt" },
  { id: "pac-violet-crown", label: "Pac Violet", color: "violet", accessory: "crown" },
  { id: "blob-yellow-glasses", label: "Blob Jaune", color: "yellow", accessory: "glasses" },
  { id: "blob-cyan-star", label: "Blob Bleu", color: "cyan", accessory: "star" },
  { id: "blob-magenta-band", label: "Blob Rose", color: "magenta", accessory: "band" },
  { id: "blob-green-bolt", label: "Blob Vert", color: "green", accessory: "bolt" },
  { id: "blob-red-crown", label: "Blob Rouge", color: "red", accessory: "crown" },
  { id: "blob-violet-cap", label: "Blob Violet", color: "violet", accessory: "cap" },
] as const satisfies readonly LiveAvatar[];

export type LiveAvatarId = (typeof LIVE_AVATARS)[number]["id"];

const liveAvatarById = new Map<string, LiveAvatar>(
  LIVE_AVATARS.map((avatar) => [avatar.id, avatar]),
);

export function getLiveAvatar(avatarId: string) {
  return liveAvatarById.get(avatarId) ?? null;
}

export function isLiveAvatarId(avatarId: string) {
  return liveAvatarById.has(avatarId);
}
