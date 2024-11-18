import { useRef, useState } from "react";
import { CustomTooltip } from "./Tooltip";

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
import { Chart } from "react-chartjs-2";
import { getDesaturatedColor } from "../../utils/desaturateColors";
import {
  getMonthAbbreviations,
  getMonthFirstLetter,
} from "../../utils/getMonths";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export const ConsumeGraph = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hover, setHover] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

  const barraA = Array(12).fill(17);
  const barraB = [8, 15, 25, 30, 18, 15, 10, 27, 35, 19, 13, 12];

  const data: ChartData<"bar" | "line", number[], string> = {
    labels: !hover ? getMonthFirstLetter() : getMonthAbbreviations(),
    datasets: [
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
          display: hover,
        },
        ticks: {
          display: hover,
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
      onMouseLeave={() => {
        setHoveredIndex(null);
        setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
    >
      <Chart type="bar" data={data} options={options} />
      {tooltipData.visible && (
        <CustomTooltip
          x={tooltipData!.x}
          y={tooltipData!.y}
          visible={tooltipData.visible}
          datas={[
            {
              label: "Teste A",
              value: barraA[hoveredIndex!],
            },
            {
              label: "Teste B",
              value: barraA[hoveredIndex!],
            },
          ]}
        />
      )}
    </div>
  );
};
