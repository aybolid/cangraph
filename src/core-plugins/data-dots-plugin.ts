import { drawCircle, drawLine, RenderStyle } from "../canvas-graphics";
import { ChartPlugin, PluginApplyPayload } from "../chart-plugin-interface";
import { Vec2D } from "../vector2d";
import { DATA_PLUGIN_ID, isDataPlugin } from "./data-plugin";

export const DATA_DOTS_PLUGIN_ID = "dataDotsPlugin";

type DataDotsPluginConfig = {
  withConnectingLines: boolean;
};

const DEFAULT_CONFIG = {
  withConnectingLines: false,
} as const satisfies DataDotsPluginConfig;

class DataDotsPlugin implements ChartPlugin {
  readonly id = DATA_DOTS_PLUGIN_ID;

  private style: RenderStyle = {};
  private config: DataDotsPluginConfig = DEFAULT_CONFIG;

  constructor(config?: Partial<DataDotsPluginConfig>, style?: RenderStyle) {
    this.style = style ?? this.style;
    this.config = { ...this.config, ...config };
  }

  public prepare(): void {}

  public apply({ ctx, plugins, config }: PluginApplyPayload): void {
    const dataPlugin = plugins[DATA_PLUGIN_ID];
    if (!isDataPlugin(dataPlugin)) {
      throw new Error("Data plugin not found or corrupted");
    }
    const { data } = dataPlugin.getArtifacts();

    const plot = {
      width: ctx.canvas.width - config.padding * 2,
      height: ctx.canvas.height - config.padding * 2,
    };

    data.forEach((d, idx, self) => {
      const dataPosition = Vec2D.new(
        config.padding + d.normalizedX * plot.width,
        ctx.canvas.height - config.padding - d.normalizedY * plot.height,
      );

      if (idx !== 0 && this.config.withConnectingLines) {
        const prevData = self[idx - 1];
        const prevDataPosition = Vec2D.new(
          config.padding + prevData.normalizedX * plot.width,
          ctx.canvas.height -
            config.padding -
            prevData.normalizedY * plot.height,
        );
        drawLine(ctx, { start: prevDataPosition, end: dataPosition }, {});
      }

      drawCircle(
        ctx,
        {
          center: dataPosition,
          radius: 5, // TODO: make configurable
        },
        this.style,
      );
    });
  }
}

export { DataDotsPlugin };
