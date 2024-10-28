import { ChartPlugin } from "./chart-plugin-interface";

/** Chart builder configuration */
export type ChartConfig = {
  /** Width of the canvas. Parent's width if not provided */
  width: number | undefined;
  /** Height of the canvas. Parent's height if not provided */
  height: number | undefined;
  padding: number; // TODO: allow configure bottom, top, left, right padding
};

const DEFAULT_CONFIG = {
  width: undefined,
  height: undefined,
  padding: 40,
} as const satisfies ChartConfig;

class ChartBuilder {
  private readonly parent: HTMLElement;
  private readonly config: ChartConfig;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  private plugins: Record<ChartPlugin["id"], ChartPlugin> = {};

  constructor(parent: HTMLElement, config?: Partial<ChartConfig>) {
    this.parent = parent;
    this.config = { ...DEFAULT_CONFIG, ...config };

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.config.width ?? this.parent.clientWidth;
    this.canvas.height = this.config.height ?? this.parent.clientHeight;

    const ctx = this.canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("Failed to get canvas context");
    }
    this.ctx = ctx;
  }

  public addPlugin(plugin: ChartPlugin | ChartPlugin[]): void {
    if (Array.isArray(plugin)) {
      plugin.forEach((p) => this.addPlugin(p));
      return;
    }

    if (this.plugins[plugin.id] !== undefined) {
      throw new Error(`Plugin with id ${plugin.id} already exists`);
    }

    this.plugins[plugin.id] = plugin;
  }

  public build(): { ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement } {
    this.parent.appendChild(this.canvas);

    const plugins = Object.values(this.plugins);
    plugins.forEach((p) => p.prepare({ ctx: this.ctx, config: this.config }));
    plugins.forEach((p) =>
      p.apply({ ctx: this.ctx, config: this.config, plugins: this.plugins }),
    );

    return { ctx: this.ctx, canvas: this.canvas };
  }
}

export { ChartBuilder };
