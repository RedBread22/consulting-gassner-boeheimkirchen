"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Props = {
  eigennutzen: number;
  ueberschuss: number;
  label?: string;
};

const COLORS = ["#111111", "#D0D0CC"];

export function PieChartDisplay({ eigennutzen, ueberschuss, label }: Props) {
  const data = [
    { name: "Eigennutzen", value: eigennutzen },
    { name: "Überschuss", value: ueberschuss },
  ];

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
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-fg rounded-sm" />
          <span className="text-sm text-fg-muted">
            {eigennutzen}% Eigennutzen
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#D0D0CC] rounded-sm" />
          <span className="text-sm text-fg-muted">
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
