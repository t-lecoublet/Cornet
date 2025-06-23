export const CHAT_COLORS = [
  'chat-bubble-primary',
  'chat-bubble-secondary',
  'chat-bubble-accent',
  'chat-bubble-neutral',
  'chat-bubble-info',
  'chat-bubble-success',
  'chat-bubble-warning',
  'chat-bubble-error',
] as const

export type CHATColor = (typeof CHAT_COLORS)[number]

export const DU_CHAT_PLACEMENTS = ["start", "end"] as const;
export type ChatPlacement = (typeof DU_CHAT_PLACEMENTS)[number];

export interface ChatItem {
  message?: string;
  image?: string;
  header?: string;
  footer?: string;
  placement?: ChatPlacement;
  variant?: CHATColor;
  customClass?: string;
}

export interface ChatProps {
  items?: ChatItem[];
  placement?: ChatPlacement;
  customClass?: string;
} 