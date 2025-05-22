export const DU_JOIN_DIRECTIONS = ["horizontal", "vertical"] as const;
export type JoinDirection = (typeof DU_JOIN_DIRECTIONS)[number];

export interface JoinProps {
  as?: string;
  direction?: JoinDirection;
} 