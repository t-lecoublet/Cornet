import { type Variant } from "../../../composables/useVariantProps";

export const DU_CHAT_PLACEMENTS = ["start", "end"] as const;
export type ChatPlacement = (typeof DU_CHAT_PLACEMENTS)[number];

export interface ChatItem {
  message?: string;
  image?: string;
  header?: string;
  footer?: string;
  placement?: ChatPlacement;
  variant?: Variant;
  customClass?: string;
}

export interface ChatProps {
  items?: ChatItem[];
  placement?: ChatPlacement;
  customClass?: string;
} 