import { ChartBuilder } from "./chart-builder";
import { DataAreaPlugin } from "./core-plugins/data-area-plugin";
import { DataAxisLabelsPlugin } from "./core-plugins/data-axis-labels-plugin";
import { DataBarsPlugin } from "./core-plugins/data-bars-plugin";
import { DataDotsPlugin } from "./core-plugins/data-dots-plugin";
import { XYAxisPlugin } from "./core-plugins/xy-axes-plugin";
import { XyDataPlugin } from "./core-plugins/xy-data-plugin";

const chartContainer = document.getElementById("chartContainer");
if (chartContainer === null) {
  throw new Error("Chart container not found");
}

const chartBuilder = new ChartBuilder(chartContainer, {
  width: 500,
  height: 500,
  padding: 20,
});

chartBuilder.addPlugin([
  new XyDataPlugin([
    { x: 0, y: 0 },
    { x: 10, y: 23 },
    { x: 20, y: 120 },
    { x: 30, y: 44 },
    { x: 40, y: 45 },
    { x: 50, y: 32 },
    { x: 60, y: 90 },
    { x: 70, y: 111 },
    { x: 80, y: 95 },
    { x: 90, y: 23 },
    { x: 100, y: 100 },
    { x: 110, y: 0 },
  ]),

  new DataBarsPlugin(
    { barsFromAxis: { x: true, y: true } },
    { style: { strokeStyle: "lightgray" } },
  ),
  // new DataDotsPlugin({ withConnectingLines: false }, { fillStyle: "red" }),
  new XYAxisPlugin({ strokeStyle: "gray" }),
  new DataAxisLabelsPlugin(),
  new DataAreaPlugin({ fillStyle: "#0000ff20" }),
]);

const { canvas } = chartBuilder.render();
canvas.style.border = "1px solid black";
