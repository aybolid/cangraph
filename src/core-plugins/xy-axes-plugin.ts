import { drawLine, RenderStyle } from "../canvas-graphics";
import { ChartPlugin, PluginApplyPayload } from "../chart-plugin-interface";
import { Vec2D } from "../vector2d";

export const XY_AXIS_PLUGIN_ID = "xyAxisPlugin";

class XYAxisPlugin implements ChartPlugin {
  readonly id = XY_AXIS_PLUGIN_ID;

  style: RenderStyle = {};

  constructor(style?: RenderStyle) {
    this.style = style ?? this.style;
  }

  public prepare(): void {}

  public apply({ ctx, config }: PluginApplyPayload): void {
    // draw x axis
    drawLine(
      ctx,
      {
        start: Vec2D.new(config.padding, ctx.canvas.height - config.padding),
        end: Vec2D.new(
          ctx.canvas.width - config.padding,
          ctx.canvas.height - config.padding,
        ),
      },
      this.style,
    );
    // draw y axis
    drawLine(
      ctx,
      {
        start: Vec2D.new(config.padding, ctx.canvas.height - config.padding),
        end: Vec2D.from(config.padding),
      },
      this.style,
    );
  }
}

export { XYAxisPlugin };
