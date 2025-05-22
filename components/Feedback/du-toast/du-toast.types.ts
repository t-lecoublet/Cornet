export const DU_TOAST_HORIZONTAL_POSITIONS = ["start", "center", "end"] as const;
export type ToastHorizontalPosition = (typeof DU_TOAST_HORIZONTAL_POSITIONS)[number];

export const DU_TOAST_VERTICAL_POSITIONS = ["top", "middle", "bottom"] as const;
export type ToastVerticalPosition = (typeof DU_TOAST_VERTICAL_POSITIONS)[number];

export interface ToastProps {
  horizontalPosition?: ToastHorizontalPosition;
  verticalPosition?: ToastVerticalPosition;
  to?: string;
} 