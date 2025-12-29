'use client';

import { useState } from 'react';
import { getAllCities, getCityColor } from '@/lib/data';
import { CityRadarChart } from '@/components/charts/CityRadarChart';
import { ScoreBarChart } from '@/components/charts/ScoreBarChart';
import { ScoreBar } from '@/components/ui/ScoreBar';
import { SCORE_CATEGORIES } from '@/lib/types';
import { Check } from 'lucide-react';

export default function ComparePage() {
  const allCities = getAllCities();
  const [selectedCities, setSelectedCities] = useState<string[]>(
    allCities.slice(0, 3).map((c) => c.city)
  );

  const toggleCity = (cityName: string) => {
    if (selectedCities.includes(cityName)) {
      if (selectedCities.length > 2) {
        setSelectedCities(selectedCities.filter((c) => c !== cityName));
      }
    } else if (selectedCities.length < 4) {
      setSelectedCities([...selectedCities, cityName]);
    }
  };

  const selectedCityData = allCities.filter((c) => selectedCities.includes(c.city));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Compare Cities</h1>
      <p className="text-gray-500 mb-8">Select 2-4 cities to compare their scores</p>

      {/* City Selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {allCities.map((city) => {
          const isSelected = selectedCities.includes(city.city);
          const color = getCityColor(city.city);
          return (
            <button
              key={city.city}
              onClick={() => toggleCity(city.city)}
              className={`
                px-4 py-2 rounded-lg border-2 font-medium transition-all flex items-center gap-2
                ${isSelected
                  ? ''
                  : 'border-gray-200 hover:border-gray-300 text-gray-500'
                }
              `}
              style={{
                borderColor: isSelected ? color : undefined,
                backgroundColor: isSelected ? `${color}15` : undefined,
                color: isSelected ? color : undefined,
              }}
            >
              {isSelected ? <Check className="w-4 h-4" /> : <div className="w-4 h-4" />}
              {city.city}
            </button>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Radar Comparison</h3>
          <CityRadarChart cities={selectedCityData} height={400} />
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Score Breakdown</h3>
          <ScoreBarChart cities={selectedCityData} height={400} />
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4 text-gray-500 font-medium">Category</th>
              {selectedCityData.map((city) => (
                <th
                  key={city.city}
                  className="text-center p-4 font-bold"
                  style={{ color: getCityColor(city.city) }}
                >
                  {city.city}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCORE_CATEGORIES.map((category) => {
              const scores = selectedCityData.map((c) => c.scores[category.key]);
              const maxScore = Math.max(...scores);
              return (
                <tr key={category.key} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{category.label}</div>
                        <div className="text-xs text-gray-500">{category.description}</div>
                      </div>
                    </div>
                  </td>
                  {selectedCityData.map((city) => {
                    const score = city.scores[category.key];
                    const isMax = score === maxScore;
                    const color = getCityColor(city.city);
                    return (
                      <td key={city.city} className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className={`text-2xl font-bold ${isMax ? '' : 'text-gray-400'}`}
                            style={{ color: isMax ? color : undefined }}
                          >
                            {score.toFixed(1)}
                          </span>
                          <div className="w-24">
                            <ScoreBar
                              score={score}
                              showLabel={false}
                              size="sm"
                              color={color}
                            />
                          </div>
                          {isMax && (
                            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-medium">
                              Best
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* Overall Score Row */}
            <tr className="bg-gray-50">
              <td className="p-4">
                <div className="font-bold text-lg text-gray-900">Overall Score</div>
              </td>
              {selectedCityData.map((city) => {
                const scores = selectedCityData.map((c) => c.scores.overall_score);
                const maxScore = Math.max(...scores);
                const isMax = city.scores.overall_score === maxScore;
                const color = getCityColor(city.city);
                return (
                  <td key={city.city} className="p-4 text-center">
                    <span
                      className={`text-3xl font-bold ${isMax ? '' : 'text-gray-400'}`}
                      style={{ color: isMax ? color : undefined }}
                    >
                      {city.scores.overall_score.toFixed(1)}
                    </span>
                    {isMax && (
                      <div className="mt-1">
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-medium">
                          #1 Overall
                        </span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-8 card p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-3">City Colors</h4>
        <div className="flex flex-wrap gap-4">
          {selectedCityData.map((city) => (
            <div key={city.city} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getCityColor(city.city) }}
              />
              <span className="text-sm text-gray-700">{city.city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
