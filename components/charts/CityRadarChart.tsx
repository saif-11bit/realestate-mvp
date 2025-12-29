'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { CitySummary, CITY_COLORS } from '@/lib/types';
import { prepareRadarData } from '@/lib/data';

interface CityRadarChartProps {
  cities: CitySummary[];
  height?: number;
}

export function CityRadarChart({ cities, height = 400 }: CityRadarChartProps) {
  const data = prepareRadarData(cities);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: '#4b5563', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#6b7280', fontSize: 10 }}
          tickCount={5}
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
        <Legend
          formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
        />
        {cities.map((city) => (
          <Radar
            key={city.city}
            name={city.city}
            dataKey={city.city}
            stroke={CITY_COLORS[city.city.toLowerCase()] || '#6366f1'}
            fill={CITY_COLORS[city.city.toLowerCase()] || '#6366f1'}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
