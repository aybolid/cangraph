import { drawLine, RenderStyle } from "../canvas-graphics";
import { ChartPlugin, PluginApplyPayload } from "../chart-plugin-interface";
import { Vec2D } from "../vector2d";
import { isXyDataPlugin, XY_DATA_PLUGIN_ID } from "./xy-data-plugin";

export const DATA_BARS_PLUGIN_ID = "dataBarsPlugin";

type DataBarsPluginConfig = {
  barsFromAxis: {
    x: boolean;
    y: boolean;
  };
};

const DEFAULT_CONFIG = {
  barsFromAxis: {
    x: true,
    y: false,
  },
} as const satisfies DataBarsPluginConfig;

class DataBarsPlugin implements ChartPlugin {
  readonly id = DATA_BARS_PLUGIN_ID;

  private style: RenderStyle = {};
  private config: DataBarsPluginConfig = DEFAULT_CONFIG;

  constructor(config?: Partial<DataBarsPluginConfig>, style?: RenderStyle) {
    this.style = style ?? this.style;
    this.config = { ...this.config, ...config };
  }

  public prepare(): void {}

  public apply({ plugins, config, ctx }: PluginApplyPayload): void {
    const dataPlugin = plugins[XY_DATA_PLUGIN_ID];
    if (!isXyDataPlugin(dataPlugin)) {
      throw new Error("xy data plugin not found or corrupted");
    }
    const { data } = dataPlugin.getArtifacts();

    const plot = {
      width: ctx.canvas.width - config.padding * 2,
      height: ctx.canvas.height - config.padding * 2,
    };

    data.forEach((d) => {
      const dataPosition = Vec2D.new(
        config.padding + d.normalizedX * plot.width,
        ctx.canvas.height - config.padding - d.normalizedY * plot.height,
      );

      if (this.config.barsFromAxis.x) {
        drawLine(
          ctx,
          {
            start: Vec2D.new(dataPosition.x, plot.height + config.padding),
            end: dataPosition,
          },
          this.style,
        );
      }
      if (this.config.barsFromAxis.y) {
        drawLine(
          ctx,
          {
            start: Vec2D.new(config.padding, dataPosition.y),
            end: dataPosition,
          },
          this.style,
        );
      }
    });
  }
}

export { DataBarsPlugin };
