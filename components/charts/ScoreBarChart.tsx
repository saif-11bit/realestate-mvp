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
      fill: CITY_COLORS[city.city.toLowerCase()] || '#6366f1',
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6b7280' }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#6b7280' }}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              color: '#111827',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="category"
          tick={{ fill: '#6b7280', fontSize: 11 }}
          angle={-15}
          textAnchor="end"
        />
        <YAxis domain={[0, 100]} tick={{ fill: '#6b7280' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#111827',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          formatter={(value) => typeof value === 'number' ? value.toFixed(1) : value}
        />
        <Legend
          formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
        />
        {cities.map((city) => (
          <Bar
            key={city.city}
            dataKey={city.city}
            fill={CITY_COLORS[city.city.toLowerCase()] || '#6366f1'}
            radius={[2, 2, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
