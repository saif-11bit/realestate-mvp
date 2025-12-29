'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CitySummary, CITY_COLORS, SCORE_CATEGORIES } from '@/lib/types';

interface ScoreBarChartProps {
  cities: CitySummary[];
  height?: number;
  category?: keyof CitySummary['scores'];
}

export function ScoreBarChart({ cities, height = 300, category }: ScoreBarChartProps) {
  // If a specific category is selected, show all cities for that category
  if (category) {
    const data = cities.map((city) => ({
      name: city.city,
      score: city.scores[category],
      fill: CITY_COLORS[city.city.toLowerCase()] || '#d4a574',
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#9ca3af' }}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(212, 165, 116, 0.3)',
              borderRadius: '8px',
              color: '#f5f5f5',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            }}
            formatter={(value) => typeof value === 'number' ? value.toFixed(1) : value}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Show grouped bar chart with all categories
  const data = SCORE_CATEGORIES.map((cat) => {
    const item: Record<string, string | number> = { category: cat.label };
    cities.forEach((city) => {
      item[city.city] = city.scores[cat.key];
    });
    return item;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis
          dataKey="category"
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          angle={-15}
          textAnchor="end"
        />
        <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(212, 165, 116, 0.3)',
            borderRadius: '8px',
            color: '#f5f5f5',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          }}
          formatter={(value) => typeof value === 'number' ? value.toFixed(1) : value}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
        />
        {cities.map((city) => (
          <Bar
            key={city.city}
            dataKey={city.city}
            fill={CITY_COLORS[city.city.toLowerCase()] || '#d4a574'}
            radius={[2, 2, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
