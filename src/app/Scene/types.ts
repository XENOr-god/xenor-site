export type SceneMode = "SIMULATION" | "VALIDATION" | "EXECUTION";

export type OverlayItem = {
  id: SceneMode;
  title: string;
  subtitle: string;
  top: string;
  right: string;
};