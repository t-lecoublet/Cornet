import { type Variant } from "../../../composables/useVariantProps"

export const DU_CHAT_PLACEMENTS = ["start", "end"] as const;
export type DuChatPlacement = (typeof DU_CHAT_PLACEMENTS)[number];

// Tailwind-scan safelist: du-chat-item.vue's useVariantMapping(props, 'chat-bubble')
// builds these literals at runtime; keep them here so they're always scanned.
export const DU_CHAT_BUBBLE_VARIANTS = ["default", "chat-bubble-primary", "chat-bubble-secondary", "chat-bubble-accent", "chat-bubble-neutral", "chat-bubble-info", "chat-bubble-success", "chat-bubble-warning", "chat-bubble-error"] as const;
export type DuChatBubbleVariant = (typeof DU_CHAT_BUBBLE_VARIANTS)[number];

export interface DuChatItemData {
  message?: string;
  image?: string;
  header?: string;
  footer?: string;
  placement?: DuChatPlacement;
  variant?: Variant;
  customClass?: string;
}

/**
 * Generic over the item type: a consumer's own fields (an author id, a
 * timestamp) stay typed inside `#message-N`, `#header-N` and friends.
 */
export interface DuChatProps<T extends DuChatItemData = DuChatItemData> {
  items?: T[];
  placement?: DuChatPlacement;
  customClass?: string;
} 