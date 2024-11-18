import { CSSProperties, HTMLAttributes } from "react";

interface CustomTooltipProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  x: number;
  y: number;
  datas: { label: string; value: number }[];
}

export const CustomTooltip = ({
  visible,
  x,
  y,
  style,
  datas,
}: CustomTooltipProps) => {
  if (!visible) return null;

  const tooltipStyle: CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: 200,
    transform: "translateX(-50%)",
    background: "white",
    border: "1px solid #fff",
    borderRadius: "5px",
    padding: "10px",
    pointerEvents: "none",
    fontFamily: "Arial, sans-serif",
    fontSize: "15px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "opacity 0.3s ease",
    opacity: visible ? 1 : 0,
    ...style,
  };

  return (
    <div style={tooltipStyle}>
      {datas.map((data, i) => (
        <div
          key={i} // Adicionando uma chave única
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }} // Melhorando espaçamento entre itens
        >
          <span style={{ color: "red" }}>{data.label}</span>
          <span style={{ fontWeight: "bold" }}>{data.value} MWh</span>
        </div>
      ))}
    </div>
  );
};
