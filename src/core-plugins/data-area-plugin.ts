import { fillRect, RenderStyle } from "../canvas-graphics";
import { ChartPlugin, PluginApplyPayload } from "../chart-plugin-interface";
import { Vec2D } from "../vector2d";
import { isXyDataPlugin, XY_DATA_PLUGIN_ID } from "./xy-data-plugin";

export const DATA_AREA_PLUGIN_ID = "dataAreaPlugin";

export class DataAreaPlugin implements ChartPlugin {
  readonly id = DATA_AREA_PLUGIN_ID;

  private style: RenderStyle = {};

  constructor(style?: RenderStyle) {
    this.style = style ?? this.style;
  }

  public prepare(): void {}

  public apply({ plugins, config, ctx }: PluginApplyPayload): void {
    const dataPlugin = plugins[XY_DATA_PLUGIN_ID];
    if (!isXyDataPlugin(dataPlugin)) {
      throw new Error("DataAreaPlugin requires XyDataPlugin");
    }
    const { data } = dataPlugin.getArtifacts();

    const plot = {
      width: ctx.canvas.width - config.padding * 2,
      height: ctx.canvas.height - config.padding * 2,
    };

    const dataRegion = new Path2D();
    dataRegion.moveTo(config.padding, plot.height + config.padding);

    data.forEach((d) => {
      const dataPosition = Vec2D.new(
        config.padding + d.normalizedX * plot.width,
        ctx.canvas.height - config.padding - d.normalizedY * plot.height,
      );

      dataRegion.lineTo(dataPosition.x, dataPosition.y);
    });
    dataRegion.lineTo(
      plot.width + config.padding,
      plot.height + config.padding,
    );
    dataRegion.lineTo(config.padding, plot.height + config.padding);

    ctx.clip(dataRegion);
    fillRect(
      ctx,
      { position: Vec2D.from(config.padding), size: plot },
      this.style,
    );
  }
}
