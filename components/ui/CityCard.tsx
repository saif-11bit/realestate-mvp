'use client';

import Link from 'next/link';
import { MapPin, Users, ArrowUpRight } from 'lucide-react';
import { RankBadge } from './RankBadge';
import { ScoreBar } from './ScoreBar';
import { CitySummary } from '@/lib/types';
import { getCityColor, getRating, formatPopulation } from '@/lib/data';

interface CityCardProps {
  city: CitySummary;
  rank: number;
  showDetails?: boolean;
}

export function CityCard({ city, rank, showDetails = false }: CityCardProps) {
  const color = getCityColor(city.city);
  const rating = getRating(city.scores.overall_score);

  return (
    <Link href={`/city/${city.city.toLowerCase()}`}>
      <div className="card-premium p-6 hover:border-[#d4a574]/40 transition-all duration-200 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <RankBadge rank={rank} size="md" />
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-[#d4a574] transition-colors flex items-center gap-1">
                {city.city}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="w-3 h-3" />
                <span>{city.state}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-3xl font-bold"
              style={{ color }}
            >
              {city.scores.overall_score.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">score</div>
          </div>
        </div>

        <ScoreBar score={city.scores.overall_score} color={color} showLabel={false} size="md" />

        <div className="flex items-center justify-between mt-4">
          <span
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${color}20`,
              color: color,
            }}
          >
            {rating.text}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Users className="w-3 h-3" />
            <span>{formatPopulation(city.population)}</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-400">
                {city.scores.real_estate_score.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">Real Estate</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-400">
                {city.scores.future_infrastructure_score.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">Infra</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-emerald-400">
                {city.scores.migration_score.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">Growth</div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
