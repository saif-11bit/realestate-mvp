'use client';

import { useState } from 'react';
import { getAllCities, getCityColor, getCityBySlug, formatNumber } from '@/lib/data';
import { SCORE_CATEGORIES } from '@/lib/types';
import { Check, ChevronRight, Star, TrendingUp, Heart, Users, Building2, Sparkles, ArrowRight, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const allCities = getAllCities();
  const [selectedCities, setSelectedCities] = useState<string[]>(
    allCities.slice(0, 2).map((c) => c.city)
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

  // Get full city data (with verified_data including price per sqft)
  const getFullCityData = (cityName: string) => {
    return getCityBySlug(cityName.toLowerCase());
  };

  // Get price per sqft for a city
  const getPricePerSqft = (cityName: string): number | null => {
    const fullData = getFullCityData(cityName);
    return fullData?.verified_data?.real_estate?.data?.avg_price_per_sqft_city ?? null;
  };

  // Determine city profile based on scores
  const getCityProfile = (city: typeof allCities[0]) => {
    const scores = city.scores;
    if (scores.real_estate_score > 70 && scores.migration_score > 65) {
      return { label: 'Earning Capital', color: '#3b82f6' };
    }
    if (scores.healthcare_score > 65 && scores.education_score > 60) {
      return { label: 'Living Value', color: '#22c55e' };
    }
    if (scores.future_infrastructure_score > 70) {
      return { label: 'Future Growth', color: '#f59e0b' };
    }
    return { label: 'Balanced', color: '#d4a574' };
  };

  // Get qualitative assessment
  const getQualitativeScore = (score: number, metric: string) => {
    if (metric === 'aqi' || metric === 'stress') {
      if (score < 40) return { text: 'Poor', color: '#ef4444' };
      if (score < 60) return { text: 'Moderate', color: '#eab308' };
      return { text: 'Good', color: '#22c55e' };
    }
    if (score >= 75) return { text: 'Excellent', color: '#22c55e' };
    if (score >= 60) return { text: 'Good', color: '#84cc16' };
    if (score >= 45) return { text: 'Moderate', color: '#eab308' };
    return { text: 'Low', color: '#ef4444' };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-[#d4a574] mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">CitySense Comparison</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Compare Cities <span className="text-gold-gradient">the CitySense Way</span>
          </h1>
          <p className="text-gray-400">Life, health & value — not just price.</p>
        </div>

        {/* City Selector */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {allCities.map((city) => {
            const isSelected = selectedCities.includes(city.city);
            const color = getCityColor(city.city);
            return (
              <button
                key={city.city}
                onClick={() => toggleCity(city.city)}
                className={`
                  px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2
                  ${isSelected
                    ? 'border-2'
                    : 'border border-white/10 hover:border-white/30 text-gray-400 bg-white/5'
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

        {/* Side-by-Side Comparison Cards */}
        <div className={`grid grid-cols-1 ${selectedCityData.length === 2 ? 'md:grid-cols-2' : selectedCityData.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 mb-8`}>
          {selectedCityData.map((city, index) => {
            const color = getCityColor(city.city);
            const profile = getCityProfile(city);
            const rank = allCities.findIndex(c => c.city === city.city) + 1;

            return (
              <div key={city.city} className="card-premium overflow-hidden">
                {/* City Image Header */}
                <div
                  className="h-32 relative"
                  style={{
                    background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{city.city}</h3>
                    <span
                      className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: `${profile.color}20`,
                        borderColor: `${profile.color}50`,
                        color: profile.color
                      }}
                    >
                      {profile.label}
                    </span>
                  </div>
                </div>

                {/* Score & Rank */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">CitySense Score</div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#d4a574]" fill="#d4a574" />
                        <span className="text-3xl font-black text-gold-gradient">
                          {city.scores.overall_score.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-sm">/100</span>
                      </div>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      #{rank}
                    </div>
                  </div>

                  {/* Qualitative Metrics */}
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <Heart className="w-3 h-3" /> Healthcare
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getQualitativeScore(city.scores.healthcare_score, 'default').color }}
                      >
                        {getQualitativeScore(city.scores.healthcare_score, 'default').text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${city.scores.healthcare_score}%`, backgroundColor: color }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <Building2 className="w-3 h-3" /> Real Estate
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getQualitativeScore(city.scores.real_estate_score, 'default').color }}
                      >
                        {getQualitativeScore(city.scores.real_estate_score, 'default').text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${city.scores.real_estate_score}%`, backgroundColor: color }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <Users className="w-3 h-3" /> Family Ease
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getQualitativeScore(city.scores.education_score, 'default').color }}
                      >
                        {getQualitativeScore(city.scores.education_score, 'default').text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${city.scores.education_score}%`, backgroundColor: color }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Future Upside
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getQualitativeScore(city.scores.future_infrastructure_score, 'default').color }}
                      >
                        {getQualitativeScore(city.scores.future_infrastructure_score, 'default').text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${city.scores.future_infrastructure_score}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>

                  {/* Price per Sqft */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs text-gray-500 mb-1">Avg. Price/Sqft</div>
                    <div className="flex items-center gap-1 text-lg font-bold text-white">
                      <IndianRupee className="w-4 h-4 text-[#d4a574]" />
                      <span>{getPricePerSqft(city.city) ? formatNumber(getPricePerSqft(city.city)!) : 'N/A'}</span>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="text-xs text-gray-500 mb-2">Best for</div>
                    <p className="text-sm text-[#d4a574] font-medium">
                      {profile.label === 'Earning Capital' ? 'Income & rental yield' :
                       profile.label === 'Living Value' ? 'Life & long-term value' :
                       profile.label === 'Future Growth' ? 'Capital appreciation' :
                       'Balanced investment'}
                    </p>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/city/${city.city.toLowerCase()}`}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-[#d4a574] hover:border-[#d4a574]/50 transition-all text-sm font-medium"
                  >
                    View Full Analysis
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <div className="card-premium overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">Detailed Score Comparison</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
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
                  <tr key={category.key} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <div className="font-medium text-white">{category.label}</div>
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
                              className={`text-2xl font-bold ${isMax ? '' : 'text-gray-500'}`}
                              style={{ color: isMax ? color : undefined }}
                            >
                              {score.toFixed(1)}
                            </span>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${score}%`, backgroundColor: color, opacity: isMax ? 1 : 0.5 }}
                              />
                            </div>
                            {isMax && (
                              <span className="text-xs bg-[#d4a574]/20 text-[#d4a574] px-2 py-0.5 rounded font-medium">
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
              {/* Price per Sqft Row */}
              <tr className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💰</span>
                    <div>
                      <div className="font-medium text-white">Avg. Price/Sqft</div>
                      <div className="text-xs text-gray-500">City average property price</div>
                    </div>
                  </div>
                </td>
                {selectedCityData.map((city) => {
                  const prices = selectedCityData.map((c) => getPricePerSqft(c.city)).filter((p): p is number => p !== null);
                  const price = getPricePerSqft(city.city);
                  const minPrice = Math.min(...prices);
                  const isLowest = price === minPrice && prices.length > 0;
                  const color = getCityColor(city.city);
                  return (
                    <td key={city.city} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span
                          className={`text-2xl font-bold flex items-center ${isLowest ? '' : 'text-gray-500'}`}
                          style={{ color: isLowest ? '#22c55e' : undefined }}
                        >
                          <IndianRupee className="w-5 h-5" />
                          {price ? formatNumber(price) : 'N/A'}
                        </span>
                        {isLowest && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-medium">
                            Most Affordable
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
              {/* Overall Score Row */}
              <tr className="bg-white/5">
                <td className="p-4">
                  <div className="font-bold text-lg text-white">Overall Score</div>
                </td>
                {selectedCityData.map((city) => {
                  const scores = selectedCityData.map((c) => c.scores.overall_score);
                  const maxScore = Math.max(...scores);
                  const isMax = city.scores.overall_score === maxScore;
                  const color = getCityColor(city.city);
                  return (
                    <td key={city.city} className="p-4 text-center">
                      <span
                        className={`text-3xl font-bold ${isMax ? '' : 'text-gray-500'}`}
                        style={{ color: isMax ? color : undefined }}
                      >
                        {city.scores.overall_score.toFixed(1)}
                      </span>
                      {isMax && (
                        <div className="mt-1">
                          <span className="text-xs bg-[#d4a574]/20 text-[#d4a574] px-2 py-0.5 rounded font-medium">
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
        </div>

        {/* CTA */}
        <div className="card-premium p-8 text-center border-[#d4a574]/30">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to <span className="text-gold-gradient">explore more?</span>
          </h3>
          <p className="text-gray-400 mb-6">
            Get detailed insights on individual cities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {selectedCityData.map((city) => (
              <Link
                key={city.city}
                href={`/city/${city.city.toLowerCase()}`}
                className="btn-outline-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium"
              >
                {city.city}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
