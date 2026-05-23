"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Props = {
  eigennutzen: number;
  ueberschuss: number;
  label?: string;
  accentColor?: string;
};

const LIGHT_COLOR = "#D0D0CC";

export function PieChartDisplay({ eigennutzen, ueberschuss, label, accentColor }: Props) {
  const darkColor = accentColor || "#111111";
  const data = [
    { name: "Eigennutzen", value: eigennutzen },
    { name: "Überschuss", value: ueberschuss },
  ];
  const colors = [darkColor, LIGHT_COLOR];

  return (
    <div className="flex flex-col items-center">
      <div className="w-56 h-56 md:w-72 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="85%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: darkColor }} />
          <span className="text-sm font-sans" style={{ color: "#111111" }}>
            {eigennutzen}% Eigennutzen
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LIGHT_COLOR }} />
          <span className="text-sm font-sans" style={{ color: "#D0D0CC" }}>
            {ueberschuss}% Überschuss
          </span>
        </div>
      </div>
      {label && (
        <p className="text-xs text-fg-muted mt-3 text-center">{label}</p>
      )}
    </div>
  );
}
