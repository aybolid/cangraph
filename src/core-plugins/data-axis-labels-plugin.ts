import { renderText } from "../canvas-graphics";
import { ChartPlugin, PluginApplyPayload } from "../chart-plugin-interface";
import { Vec2D } from "../vector2d";
import { DATA_PLUGIN_ID, isDataPlugin } from "./data-plugin";

export const DATA_AXIS_LABELS_PLUGIN_ID = "dataAxisLabelsPlugin";

class DataAxisLabelsPlugin implements ChartPlugin {
  readonly id = DATA_AXIS_LABELS_PLUGIN_ID;

  constructor() {}

  public prepare(): void {}

  public apply({ plugins, config, ctx }: PluginApplyPayload): void {
    const dataPlugin = plugins[DATA_PLUGIN_ID];
    if (!isDataPlugin(dataPlugin)) {
      throw new Error("Data plugin not found or corrupted");
    }
    const { data } = dataPlugin.getArtifacts();

    if (config.padding <= 10) {
      console.warn("Padding is too small. Labels may be cut off");
    }

    const plot = {
      width: ctx.canvas.width - config.padding * 2,
      height: ctx.canvas.height - config.padding * 2,
    };

    renderText(
      ctx,
      {
        text: "0",
        position: Vec2D.new(config.padding, plot.height + config.padding + 2),
      },
      { textBaseline: "top" },
    );

    data.forEach((d) => {
      const dataPosition = Vec2D.new(
        config.padding + d.normalizedX * plot.width,
        ctx.canvas.height - config.padding - d.normalizedY * plot.height,
      );

      if (d.normalizedX !== 0) {
        renderText(
          ctx,
          {
            text: d.original.x.toString(),
            position: Vec2D.new(
              dataPosition.x,
              plot.height + config.padding + 2,
            ),
          },
          { textBaseline: "top" },
        );
      }
      if (d.normalizedY !== 0) {
        renderText(
          ctx,
          {
            text: d.original.y.toString(),
            position: Vec2D.new(config.padding - 12, dataPosition.y),
          },
          {},
        );
      }
    });
  }
}

export { DataAxisLabelsPlugin };
