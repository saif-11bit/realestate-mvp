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
        <PolarGrid stroke="rgba(212, 165, 116, 0.2)" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#6b7280', fontSize: 10 }}
          tickCount={5}
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
        <Legend
          formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
        />
        {cities.map((city) => (
          <Radar
            key={city.city}
            name={city.city}
            dataKey={city.city}
            stroke={CITY_COLORS[city.city.toLowerCase()] || '#d4a574'}
            fill={CITY_COLORS[city.city.toLowerCase()] || '#d4a574'}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}
