import { ChartPlugin } from "../chart-plugin-interface";

export const XY_DATA_PLUGIN_ID = "xyDataPlugin";

type Data = Array<{
  x: number;
  y: number;
  meta?: Record<PropertyKey, unknown>;
}>;

type PreparedData = Array<{
  normalizedX: number;
  normalizedY: number;
  original: Data[number];
}>;

class XyDataPlugin implements ChartPlugin {
  readonly id = XY_DATA_PLUGIN_ID;

  readonly data: Data;

  maxX: number = 0;
  maxY: number = 0;
  preparedData: PreparedData = [];

  constructor(data: Data) {
    this.data = data;
  }

  public getArtifacts(): { data: PreparedData; maxX: number; maxY: number } {
    return { data: this.preparedData, maxX: this.maxX, maxY: this.maxY };
  }

  public prepare(): void {
    this.maxX = Math.max(...this.data.map((d) => d.x));
    this.maxY = Math.max(...this.data.map((d) => d.y));

    this.preparedData = this.data.map((d) => {
      return {
        normalizedX: d.x / this.maxX,
        normalizedY: d.y / this.maxY,
        original: d,
      };
    });
  }

  public apply(): void {}
}

const isXyDataPlugin = (plugin: ChartPlugin): plugin is XyDataPlugin => {
  return plugin?.id === XY_DATA_PLUGIN_ID && plugin instanceof XyDataPlugin;
};

export { XyDataPlugin, isXyDataPlugin };
