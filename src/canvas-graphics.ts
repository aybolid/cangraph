import { Vec2D } from "./vector2d";

type RenderFn<Args extends Array<unknown>> = (
  ctx: CanvasRenderingContext2D,
  ...args: Args
) => void;

export type RenderStyle = Partial<{
  strokeStyle: CanvasRenderingContext2D["strokeStyle"];
  fillStyle: CanvasRenderingContext2D["fillStyle"];
  lineWidth: CanvasRenderingContext2D["lineWidth"];
  lineCap: CanvasRenderingContext2D["lineCap"];
  lineJoin: CanvasRenderingContext2D["lineJoin"];
  miterLimit: CanvasRenderingContext2D["miterLimit"];
  shadowOffsetX: CanvasRenderingContext2D["shadowOffsetX"];
  shadowOffsetY: CanvasRenderingContext2D["shadowOffsetY"];
  shadowBlur: CanvasRenderingContext2D["shadowBlur"];
  shadowColor: CanvasRenderingContext2D["shadowColor"];
  globalAlpha: CanvasRenderingContext2D["globalAlpha"];
  globalCompositeOperation: CanvasRenderingContext2D["globalCompositeOperation"];
  font: CanvasRenderingContext2D["font"];
  textAlign: CanvasRenderingContext2D["textAlign"];
  textBaseline: CanvasRenderingContext2D["textBaseline"];
}>;

const drawLine: RenderFn<[{ start: Vec2D; end: Vec2D }, RenderStyle]> = (
  ctx,
  { start, end },
  style,
) => {
  withStyling(
    ctx,
    style,
  )(() => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  });
};

const drawCircle: RenderFn<[{ center: Vec2D; radius: number }, RenderStyle]> = (
  ctx,
  { center, radius },
  style,
) => {
  withStyling(
    ctx,
    style,
  )(() => {
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  });
};

const renderText: RenderFn<[{ text: string; position: Vec2D }, RenderStyle]> = (
  ctx,
  { text, position },
  style,
) => {
  withStyling(
    ctx,
    style,
  )(() => {
    ctx.fillText(text, position.x, position.y);
  });
};

export { drawLine, drawCircle, renderText };

const withStyling =
  (ctx: CanvasRenderingContext2D, style: RenderStyle) => (fn: () => void) => {
    const {
      strokeStyle: prevStrokeStyle,
      fillStyle: prevFillStyle,
      lineWidth: prevLineWidth,
      lineCap: prevLineCap,
      lineJoin: prevLineJoin,
      miterLimit: prevMiterLimit,
      shadowOffsetX: prevShadowOffsetX,
      shadowOffsetY: prevShadowOffsetY,
      shadowBlur: prevShadowBlur,
      shadowColor: prevShadowColor,
      globalAlpha: prevGlobalAlpha,
      globalCompositeOperation: prevGlobalCompositeOperation,
      font: prevFont,
      textAlign: prevTextAlign,
      textBaseline: prevTextBaseline,
    } = ctx;

    ctx.strokeStyle = style.strokeStyle ?? prevStrokeStyle;
    ctx.fillStyle = style.fillStyle ?? prevFillStyle;
    ctx.lineWidth = style.lineWidth ?? prevLineWidth;
    ctx.lineCap = style.lineCap ?? prevLineCap;
    ctx.lineJoin = style.lineJoin ?? prevLineJoin;
    ctx.miterLimit = style.miterLimit ?? prevMiterLimit;
    ctx.shadowOffsetX = style.shadowOffsetX ?? prevShadowOffsetX;
    ctx.shadowOffsetY = style.shadowOffsetY ?? prevShadowOffsetY;
    ctx.shadowBlur = style.shadowBlur ?? prevShadowBlur;
    ctx.shadowColor = style.shadowColor ?? prevShadowColor;
    ctx.globalAlpha = style.globalAlpha ?? prevGlobalAlpha;
    ctx.globalCompositeOperation =
      style.globalCompositeOperation ?? prevGlobalCompositeOperation;
    ctx.font = style.font ?? prevFont;
    ctx.textAlign = style.textAlign ?? prevTextAlign;
    ctx.textBaseline = style.textBaseline ?? prevTextBaseline;

    fn();

    ctx.strokeStyle = prevStrokeStyle;
    ctx.fillStyle = prevFillStyle;
    ctx.lineWidth = prevLineWidth;
    ctx.lineCap = prevLineCap;
    ctx.lineJoin = prevLineJoin;
    ctx.miterLimit = prevMiterLimit;
    ctx.shadowOffsetX = prevShadowOffsetX;
    ctx.shadowOffsetY = prevShadowOffsetY;
    ctx.shadowBlur = prevShadowBlur;
    ctx.shadowColor = prevShadowColor;
    ctx.globalAlpha = prevGlobalAlpha;
    ctx.globalCompositeOperation = prevGlobalCompositeOperation;
    ctx.font = prevFont;
    ctx.textAlign = prevTextAlign;
    ctx.textBaseline = prevTextBaseline;
  };
