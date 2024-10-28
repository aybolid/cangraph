import { ChartBuilder, ChartConfig } from "./chart-builder";

export type PluginPreparePayload = {
  ctx: CanvasRenderingContext2D;
  config: ChartConfig;
};

export type PluginApplyPayload = {
  ctx: CanvasRenderingContext2D;
  config: ChartConfig;
  plugins: ChartBuilder["plugins"];
};

export interface ChartPlugin {
  readonly id: string;

  prepare(payload: PluginPreparePayload): void;
  apply(payload: PluginApplyPayload): void;
}
