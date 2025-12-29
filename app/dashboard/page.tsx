'use client';

import { useState } from 'react';
import { getAllCities, getComparativeReport, getCityColor } from '@/lib/data';
import { CityRadarChart } from '@/components/charts/CityRadarChart';
import { ScoreBarChart } from '@/components/charts/ScoreBarChart';
import { CITY_COLORS, SCORE_CATEGORIES } from '@/lib/types';
import {
  ArrowRight,
  Trophy,
  Medal,
  Award,
  MapPin,
  Users,
  TrendingUp,
  LayoutGrid,
  List,
  Crown,
  Sparkles,
  ChevronRight,
  Heart,
  GraduationCap,
  Building2,
  Train,
  Briefcase,
  Hotel
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const cities = getAllCities();
  const report = getComparativeReport();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sort cities by selected category or overall score
  const sortedCities = selectedCategory
    ? [...cities].sort((a, b) => b.scores[selectedCategory as keyof typeof b.scores] - a.scores[selectedCategory as keyof typeof a.scores])
    : cities;

  const top3 = sortedCities.slice(0, 3);
  const restCities = sortedCities.slice(3);

  const formatPopulation = (pop: number) => {
    if (pop >= 10000000) return `${(pop / 10000000).toFixed(1)}Cr`;
    if (pop >= 100000) return `${(pop / 100000).toFixed(1)}L`;
    return pop.toLocaleString();
  };

  const getCategoryIcon = (key: string) => {
    const icons: Record<string, React.ReactNode> = {
      healthcare_score: <Heart className="w-4 h-4" />,
      hospitality_score: <Hotel className="w-4 h-4" />,
      education_score: <GraduationCap className="w-4 h-4" />,
      real_estate_score: <Building2 className="w-4 h-4" />,
      future_infrastructure_score: <Train className="w-4 h-4" />,
      migration_score: <Briefcase className="w-4 h-4" />,
    };
    return icons[key] || null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Real Estate Investment Rankings</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            City Leaderboard
          </h1>
        </div>
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Compare Cities
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Podium Section - Top 3 */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Crown className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">Top Investment Destinations</h2>
        </div>

        {/* Podium Display */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent rounded-3xl -z-10" />

          <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0 pt-8">
            {/* 2nd Place */}
            <div className="w-full md:w-80 order-2 md:order-1">
              <Link href={`/city/${top3[1]?.city.toLowerCase()}`} className="block group">
                <div className="relative">
                  {/* Podium stand */}
                  <div className="hidden md:block absolute -bottom-8 left-0 right-0 h-20 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg mx-4 shadow-inner">
                    <div className="absolute inset-x-0 top-3 text-center">
                      <span className="text-4xl font-black text-gray-400/50">2</span>
                    </div>
                  </div>

                  <div className="p-6 md:mr-0 md:rounded-r-none hover:shadow-xl transition-all relative overflow-hidden border border-gray-200 rounded-xl" style={{ background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)' }}>
                    {/* Silver accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300" />

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full flex items-center justify-center shadow-lg mb-4 ring-4 ring-gray-200">
                        <Medal className="w-8 h-8 text-gray-600" />
                      </div>

                      <div className="text-xs text-gray-400 font-bold tracking-widest mb-1">2ND PLACE</div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {top3[1]?.city}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{top3[1]?.state}</span>
                      </div>

                      <div
                        className="text-5xl font-black mb-1"
                        style={{ color: getCityColor(top3[1]?.city || '') }}
                      >
                        {top3[1]?.scores.overall_score.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-400 mb-4">Overall Score</div>

                      {/* Top strength */}
                      <div className="w-full pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-400 mb-2">Strongest Category</div>
                        {(() => {
                          const city = top3[1];
                          if (!city) return null;
                          const best = SCORE_CATEGORIES.reduce((a, b) =>
                            city.scores[a.key] > city.scores[b.key] ? a : b
                          );
                          return (
                            <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
                              {getCategoryIcon(best.key)}
                              <span className="text-sm font-medium text-gray-700">{best.label}</span>
                              <span className="text-sm font-bold text-gray-900">{city.scores[best.key].toFixed(0)}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* 1st Place - Elevated */}
            <div className="w-full md:w-96 order-1 md:order-2 md:-mb-8 relative z-10">
              <Link href={`/city/${top3[0]?.city.toLowerCase()}`} className="block group">
                <div className="relative">
                  {/* Podium stand */}
                  <div className="hidden md:block absolute -bottom-16 left-0 right-0 h-28 bg-gradient-to-b from-amber-300 to-amber-400 rounded-t-lg mx-2 shadow-lg">
                    <div className="absolute inset-x-0 top-4 text-center">
                      <span className="text-5xl font-black text-amber-500/50">1</span>
                    </div>
                  </div>

                  <div className="p-8 hover:shadow-2xl transition-all relative overflow-hidden border-2 border-amber-300 rounded-xl" style={{ background: 'linear-gradient(to bottom right, #fffbeb, #ffffff, #fefce8)' }}>
                    {/* Gold accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400" />

                    {/* Sparkle decorations */}
                    <div className="absolute top-4 right-4 text-amber-400 animate-pulse">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="absolute top-8 right-12 text-amber-300 animate-pulse delay-100">
                      <Sparkles className="w-3 h-3" />
                    </div>

                    {/* Leader badge */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        LEADER
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center mt-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl mb-4 ring-4 ring-amber-200 relative">
                        <Trophy className="w-10 h-10 text-white" />
                        <div className="absolute -inset-1 bg-amber-400/20 rounded-full animate-ping" />
                      </div>

                      <div className="text-xs text-amber-600 font-bold tracking-widest mb-1">1ST PLACE</div>
                      <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {top3[0]?.city}
                      </h3>

                      <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {top3[0]?.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {formatPopulation(top3[0]?.population || 0)}
                        </span>
                      </div>

                      <div
                        className="text-6xl font-black mb-1"
                        style={{ color: getCityColor(top3[0]?.city || '') }}
                      >
                        {top3[0]?.scores.overall_score.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-400 mb-6">Overall Score</div>

                      {/* Score breakdown */}
                      <div className="w-full grid grid-cols-3 gap-2 pt-4 border-t border-amber-100">
                        <div className="bg-blue-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-blue-600">{top3[0]?.scores.real_estate_score.toFixed(0)}</div>
                          <div className="text-xs text-blue-400">Real Estate</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-purple-600">{top3[0]?.scores.future_infrastructure_score.toFixed(0)}</div>
                          <div className="text-xs text-purple-400">Infrastructure</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-emerald-600">{top3[0]?.scores.migration_score.toFixed(0)}</div>
                          <div className="text-xs text-emerald-400">Growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* 3rd Place */}
            <div className="w-full md:w-80 order-3">
              <Link href={`/city/${top3[2]?.city.toLowerCase()}`} className="block group">
                <div className="relative">
                  {/* Podium stand */}
                  <div className="hidden md:block absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-lg mx-4 shadow-inner">
                    <div className="absolute inset-x-0 top-2 text-center">
                      <span className="text-4xl font-black text-orange-500/50">3</span>
                    </div>
                  </div>

                  <div className="p-6 md:ml-0 md:rounded-l-none hover:shadow-xl transition-all relative overflow-hidden border border-gray-200 rounded-xl" style={{ background: 'linear-gradient(to bottom right, #ffffff, #fff7ed)' }}>
                    {/* Bronze accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400" />

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4 ring-4 ring-orange-200">
                        <Award className="w-8 h-8 text-white" />
                      </div>

                      <div className="text-xs text-gray-400 font-bold tracking-widest mb-1">3RD PLACE</div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {top3[2]?.city}
                      </h3>

                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{top3[2]?.state}</span>
                      </div>

                      <div
                        className="text-5xl font-black mb-1"
                        style={{ color: getCityColor(top3[2]?.city || '') }}
                      >
                        {top3[2]?.scores.overall_score.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-400 mb-4">Overall Score</div>

                      {/* Top strength */}
                      <div className="w-full pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-400 mb-2">Strongest Category</div>
                        {(() => {
                          const city = top3[2];
                          if (!city) return null;
                          const best = SCORE_CATEGORIES.reduce((a, b) =>
                            city.scores[a.key] > city.scores[b.key] ? a : b
                          );
                          return (
                            <div className="flex items-center justify-center gap-2 bg-orange-50 rounded-full px-3 py-1.5">
                              {getCategoryIcon(best.key)}
                              <span className="text-sm font-medium text-gray-700">{best.label}</span>
                              <span className="text-sm font-bold text-gray-900">{city.scores[best.key].toFixed(0)}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Podium base */}
          <div className="hidden md:block h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl mt-0 mx-8 shadow-inner" />
        </div>
      </section>

      {/* Category Leaders */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Category Leaders</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {SCORE_CATEGORIES.map((category) => {
            const leader = [...cities].sort((a, b) => b.scores[category.key] - a.scores[category.key])[0];
            const leaderColor = getCityColor(leader.city);

            return (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(selectedCategory === category.key ? null : category.key)}
                className={`card p-4 text-left transition-all hover:shadow-md ${
                  selectedCategory === category.key ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">{getCategoryIcon(category.key)}</span>
                  <span className="text-xs font-medium text-gray-500 truncate">{category.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: leaderColor }}
                  />
                  <span className="font-semibold text-gray-900 truncate">{leader.city}</span>
                </div>
                <div className="text-lg font-bold mt-1" style={{ color: leaderColor }}>
                  {leader.scores[category.key].toFixed(0)}
                </div>
              </button>
            );
          })}
        </div>
        {selectedCategory && (
          <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
            <TrendingUp className="w-4 h-4" />
            <span>Showing rankings by {SCORE_CATEGORIES.find(c => c.key === selectedCategory)?.label}</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              (Reset)
            </button>
          </div>
        )}
      </section>

      {/* All Rankings */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory ? 'Category Rankings' : 'Complete Rankings'}
          </h2>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restCities.map((city, index) => {
              const rank = index + 4;
              const color = getCityColor(city.city);
              const scoreKey = selectedCategory as keyof typeof city.scores || 'overall_score';
              const score = city.scores[scoreKey];

              return (
                <Link key={city.city} href={`/city/${city.city.toLowerCase()}`} className="group">
                  <div className="card p-5 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          {rank}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {city.city}
                          </h3>
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <MapPin className="w-3 h-3" />
                            <span>{city.state}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color }}>
                          {score.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {selectedCategory ? SCORE_CATEGORIES.find(c => c.key === selectedCategory)?.label : 'score'}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 text-gray-500 font-medium text-sm">Rank</th>
                  <th className="text-left p-4 text-gray-500 font-medium text-sm">City</th>
                  <th className="text-left p-4 text-gray-500 font-medium text-sm hidden md:table-cell">State</th>
                  <th className="text-left p-4 text-gray-500 font-medium text-sm hidden lg:table-cell">Population</th>
                  <th className="text-right p-4 text-gray-500 font-medium text-sm">Score</th>
                  <th className="text-right p-4 text-gray-500 font-medium text-sm w-12"></th>
                </tr>
              </thead>
              <tbody>
                {sortedCities.map((city, index) => {
                  const rank = index + 1;
                  const color = getCityColor(city.city);
                  const scoreKey = selectedCategory as keyof typeof city.scores || 'overall_score';
                  const score = city.scores[scoreKey];

                  return (
                    <tr
                      key={city.city}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                          rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                          rank === 3 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {rank}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/city/${city.city.toLowerCase()}`}
                          className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {city.city}
                        </Link>
                      </td>
                      <td className="p-4 text-gray-500 hidden md:table-cell">{city.state}</td>
                      <td className="p-4 text-gray-500 hidden lg:table-cell">{formatPopulation(city.population)}</td>
                      <td className="p-4 text-right">
                        <span className="text-xl font-bold" style={{ color }}>
                          {score.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/city/${city.city.toLowerCase()}`}>
                          <ChevronRight className="w-5 h-5 text-gray-300 hover:text-blue-600 transition-colors" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Multi-Dimensional Comparison</h3>
          <CityRadarChart cities={cities.slice(0, 4)} height={350} />
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Score Distribution</h3>
          <ScoreBarChart cities={cities.slice(0, 4)} height={350} />
        </div>
      </section>

      {/* Report Info */}
      <section className="card p-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-600 font-medium">
              Report generated: {new Date(report.report_generated).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Data sources: NITI Aayog, 99acres, PropEquity, PIB, AICTE, Knight Frank, CBRE
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Compare all cities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
