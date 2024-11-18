import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import { getDesaturatedColor } from "../../utils/desaturateColors";
import { CustomTooltip } from "../ConsumeGraph/Tooltip";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export const EconomyGraph = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

  const linha = [2, 15, 28, 36, 10, 7, 12, 20, 15, 10, 5, 15];
  const barraA = [10, 20, 30, 40, 15, 10, 20, 30, 40, 15, 10, 20];
  const barraB = [10, 20, 30, 40, 15, 10, 20, 30, 40, 15, 10, 20];

  const data: ChartData<"bar" | "line", number[], string> = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        type: "line" as const,
        label: "Line Dataset",
        data: linha,
        borderColor: "#000000af",
        borderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#000000af",
        fill: false,
      },
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: barraA,
        backgroundColor: ({ dataIndex }: { dataIndex: number }) =>
          hoveredIndex === null || hoveredIndex === dataIndex
            ? "#ccedfd"
            : getDesaturatedColor("#ccedfd"),
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
      },
      {
        type: "bar" as const,
        label: "Bar Dataset",
        data: barraB,
        backgroundColor: ({ dataIndex }: { dataIndex: number }) =>
          hoveredIndex === null || hoveredIndex === dataIndex
            ? "#37a9fb"
            : getDesaturatedColor("#37a9fb"),
        barPercentage: 1,
        barThickness: 22,
        categoryPercentage: 1,
      },
    ],
  };

  const prevTooltipData = useRef(tooltipData);

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false, // Desabilita o tooltip padrão
        external: (context) => {
          const { chart, tooltip } = context;

          if (tooltip.opacity === 0) {
            if (tooltipData.visible) {
              setTooltipData((prev) => ({ ...prev, visible: false }));
            }
            return;
          }

          const { offsetLeft, offsetTop } = chart.canvas;

          // Só atualiza o estado se os valores mudarem
          if (
            prevTooltipData.current.x !== offsetLeft + tooltip.caretX ||
            prevTooltipData.current.y !== offsetTop + tooltip.caretY ||
            !tooltipData.visible
          ) {
            const newTooltipData = {
              x: offsetLeft + tooltip.caretX,
              y: offsetTop + tooltip.caretY,
              visible: true,
            };
            prevTooltipData.current = newTooltipData; // Atualiza a referência
            setTooltipData(newTooltipData);
          }
        },
      },
    },
    onHover: (_, chartElement) => {
      const newIndex = chartElement.length ? chartElement[0].index : null;
      newIndex !== hoveredIndex && setHoveredIndex(newIndex);
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{ width: "600px", height: "300px", position: "relative" }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Chart type="bar" data={data} options={options} />
      {tooltipData.visible && (
        <CustomTooltip
          x={tooltipData!.x}
          y={tooltipData!.y}
          visible={tooltipData.visible}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          datas={[
            {
              label: "Valor contratado",
              value: barraA[hoveredIndex!],
            },
            {
              label: "Valor consumido",
              value: barraB[hoveredIndex!],
            },
            {
              label: "Compra de energia",
              value: linha[hoveredIndex!],
            },
          ]}
        />
      )}
    </div>
  );
};
