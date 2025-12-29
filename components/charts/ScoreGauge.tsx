'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  color?: string;
  label?: string;
}

export function ScoreGauge({
  score,
  maxScore = 100,
  size = 200,
  color,
  label,
}: ScoreGaugeProps) {
  const percentage = (score / maxScore) * 100;
  const remaining = 100 - percentage;

  const data = [
    { value: percentage, name: 'score' },
    { value: remaining, name: 'remaining' },
  ];

  const getColor = () => {
    if (color) return color;
    if (score >= 70) return '#10b981';
    if (score >= 50) return '#00d4ff';
    if (score >= 30) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="90%"
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor()} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color: getColor() }}>
          {score.toFixed(1)}
        </span>
        {label && <span className="text-sm text-gray-500 mt-1">{label}</span>}
      </div>
    </div>
  );
}
