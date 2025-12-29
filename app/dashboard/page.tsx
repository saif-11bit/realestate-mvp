'use client';

import { useState } from 'react';
import { getAllCities, getComparativeReport, getCityColor } from '@/lib/data';
import { SCORE_CATEGORIES } from '@/lib/types';
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
  Hotel,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const cities = getAllCities();
  const report = getComparativeReport();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#d4a574] mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Real Estate Investment Rankings</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              City <span className="text-gold-gradient">Leaderboard</span>
            </h1>
          </div>
          <Link
            href="/compare"
            className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium"
          >
            Compare Cities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Podium Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Crown className="w-6 h-6 text-[#d4a574]" />
            <h2 className="text-2xl font-bold text-white">Top Investment Destinations</h2>
          </div>

          {/* Podium Display */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-0 pt-8">
              {/* 2nd Place */}
              <div className="w-full md:w-80 order-2 md:order-1">
                <Link href={`/city/${top3[1]?.city.toLowerCase()}`} className="block group">
                  <div className="relative">
                    <div className="hidden md:block absolute -bottom-8 left-0 right-0 h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg mx-4">
                      <div className="absolute inset-x-0 top-3 text-center">
                        <span className="text-4xl font-black text-gray-500/50">2</span>
                      </div>
                    </div>

                    <div className="card-premium p-6 md:mr-0 md:rounded-r-none relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500" />

                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-400 via-gray-200 to-gray-500 rounded-full flex items-center justify-center shadow-lg mb-4 ring-4 ring-gray-600">
                          <Medal className="w-8 h-8 text-gray-800" />
                        </div>

                        <div className="text-xs text-gray-500 font-bold tracking-widest mb-1">2ND PLACE</div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#d4a574] transition-colors mb-2">
                          {top3[1]?.city}
                        </h3>

                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{top3[1]?.state}</span>
                        </div>

                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-5 h-5 text-[#d4a574]" fill="#d4a574" />
                          <span
                            className="text-5xl font-black"
                            style={{ color: getCityColor(top3[1]?.city || '') }}
                          >
                            {top3[1]?.scores.overall_score.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">CitySense Score</div>

                        <div className="w-full pt-4 border-t border-white/10">
                          <div className="text-xs text-gray-500 mb-2">Strongest Category</div>
                          {(() => {
                            const city = top3[1];
                            if (!city) return null;
                            const best = SCORE_CATEGORIES.reduce((a, b) =>
                              city.scores[a.key] > city.scores[b.key] ? a : b
                            );
                            return (
                              <div className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                                <span className="text-[#d4a574]">{getCategoryIcon(best.key)}</span>
                                <span className="text-sm font-medium text-gray-300">{best.label}</span>
                                <span className="text-sm font-bold text-white">{city.scores[best.key].toFixed(0)}</span>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 1st Place */}
              <div className="w-full md:w-96 order-1 md:order-2 md:-mb-8 relative z-10">
                <Link href={`/city/${top3[0]?.city.toLowerCase()}`} className="block group">
                  <div className="relative">
                    <div className="hidden md:block absolute -bottom-16 left-0 right-0 h-28 bg-gradient-to-b from-[#d4a574] to-[#b8956a] rounded-t-lg mx-2 shadow-lg">
                      <div className="absolute inset-x-0 top-4 text-center">
                        <span className="text-5xl font-black text-[#c9a96e]/50">1</span>
                      </div>
                    </div>

                    <div className="card-premium p-8 relative overflow-hidden border-[#d4a574]/50">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d4a574] via-[#e8c49a] to-[#d4a574]" />

                      <div className="absolute top-4 right-4 text-[#d4a574] animate-pulse">
                        <Sparkles className="w-5 h-5" />
                      </div>

                      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-[#d4a574] to-[#b8956a] text-[#0a0a0a] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          LEADER
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center mt-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#d4a574] via-[#e8c49a] to-[#d4a574] rounded-full flex items-center justify-center shadow-xl mb-4 ring-4 ring-[#d4a574]/30 relative animate-pulse-glow">
                          <Trophy className="w-10 h-10 text-[#0a0a0a]" />
                        </div>

                        <div className="text-xs text-[#d4a574] font-bold tracking-widest mb-1">1ST PLACE</div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-[#d4a574] transition-colors mb-2">
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

                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-6 h-6 text-[#d4a574]" fill="#d4a574" />
                          <span
                            className="text-6xl font-black text-gold-gradient"
                          >
                            {top3[0]?.scores.overall_score.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-6">CitySense Score</div>

                        <div className="w-full grid grid-cols-3 gap-2 pt-4 border-t border-[#d4a574]/20">
                          <div className="bg-blue-500/10 rounded-lg p-2">
                            <div className="text-lg font-bold text-blue-400">{top3[0]?.scores.real_estate_score.toFixed(0)}</div>
                            <div className="text-xs text-blue-400/60">Real Estate</div>
                          </div>
                          <div className="bg-purple-500/10 rounded-lg p-2">
                            <div className="text-lg font-bold text-purple-400">{top3[0]?.scores.future_infrastructure_score.toFixed(0)}</div>
                            <div className="text-xs text-purple-400/60">Infra</div>
                          </div>
                          <div className="bg-green-500/10 rounded-lg p-2">
                            <div className="text-lg font-bold text-green-400">{top3[0]?.scores.migration_score.toFixed(0)}</div>
                            <div className="text-xs text-green-400/60">Growth</div>
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
                    <div className="hidden md:block absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-b from-orange-600 to-orange-700 rounded-t-lg mx-4">
                      <div className="absolute inset-x-0 top-2 text-center">
                        <span className="text-4xl font-black text-orange-500/50">3</span>
                      </div>
                    </div>

                    <div className="card-premium p-6 md:ml-0 md:rounded-l-none relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />

                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg mb-4 ring-4 ring-orange-900">
                          <Award className="w-8 h-8 text-white" />
                        </div>

                        <div className="text-xs text-gray-500 font-bold tracking-widest mb-1">3RD PLACE</div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#d4a574] transition-colors mb-2">
                          {top3[2]?.city}
                        </h3>

                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{top3[2]?.state}</span>
                        </div>

                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-5 h-5 text-[#d4a574]" fill="#d4a574" />
                          <span
                            className="text-5xl font-black"
                            style={{ color: getCityColor(top3[2]?.city || '') }}
                          >
                            {top3[2]?.scores.overall_score.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">CitySense Score</div>

                        <div className="w-full pt-4 border-t border-white/10">
                          <div className="text-xs text-gray-500 mb-2">Strongest Category</div>
                          {(() => {
                            const city = top3[2];
                            if (!city) return null;
                            const best = SCORE_CATEGORIES.reduce((a, b) =>
                              city.scores[a.key] > city.scores[b.key] ? a : b
                            );
                            return (
                              <div className="flex items-center justify-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5">
                                <span className="text-orange-400">{getCategoryIcon(best.key)}</span>
                                <span className="text-sm font-medium text-gray-300">{best.label}</span>
                                <span className="text-sm font-bold text-white">{city.scores[best.key].toFixed(0)}</span>
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

            <div className="hidden md:block h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl mt-0 mx-8" />
          </div>
        </section>

        {/* Category Leaders */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Category Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SCORE_CATEGORIES.map((category) => {
              const leader = [...cities].sort((a, b) => b.scores[category.key] - a.scores[category.key])[0];
              const leaderColor = getCityColor(leader.city);

              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(selectedCategory === category.key ? null : category.key)}
                  className={`card-premium p-4 text-left transition-all hover:border-[#d4a574]/40 ${
                    selectedCategory === category.key ? 'ring-2 ring-[#d4a574] border-[#d4a574]/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-500">{getCategoryIcon(category.key)}</span>
                    <span className="text-xs font-medium text-gray-500 truncate">{category.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: leaderColor }}
                    />
                    <span className="font-semibold text-white truncate">{leader.city}</span>
                  </div>
                  <div className="text-lg font-bold mt-1" style={{ color: leaderColor }}>
                    {leader.scores[category.key].toFixed(0)}
                  </div>
                </button>
              );
            })}
          </div>
          {selectedCategory && (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#d4a574]">
              <TrendingUp className="w-4 h-4" />
              <span>Showing rankings by {SCORE_CATEGORIES.find(c => c.key === selectedCategory)?.label}</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className="ml-2 text-gray-500 hover:text-gray-300"
              >
                (Reset)
              </button>
            </div>
          )}
        </section>

        {/* All Rankings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              {selectedCategory ? 'Category Rankings' : 'Complete Rankings'}
            </h2>
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-[#d4a574]/20 text-[#d4a574]' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-[#d4a574]/20 text-[#d4a574]' : 'text-gray-500 hover:text-gray-300'
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
                    <div className="card-premium p-5 hover:border-[#d4a574]/40 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 font-bold">
                            {rank}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-[#d4a574] transition-colors">
                              {city.city}
                            </h3>
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <MapPin className="w-3 h-3" />
                              <span>{city.state}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold" style={{ color }}>
                            {score.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {selectedCategory ? SCORE_CATEGORIES.find(c => c.key === selectedCategory)?.label : 'score'}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
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
            <div className="card-premium overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
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
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            rank === 1 ? 'bg-gradient-to-br from-[#d4a574] to-[#b8956a] text-[#0a0a0a]' :
                            rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-[#0a0a0a]' :
                            rank === 3 ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white' :
                            'bg-white/10 text-gray-400'
                          }`}>
                            {rank}
                          </div>
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/city/${city.city.toLowerCase()}`}
                            className="font-semibold text-white hover:text-[#d4a574] transition-colors"
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
                            <ChevronRight className="w-5 h-5 text-gray-600 hover:text-[#d4a574] transition-colors" />
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

        {/* Report Info */}
        <section className="card-premium p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-gray-300 font-medium">
                Report generated: {new Date(report.report_generated).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Data sources: NITI Aayog, 99acres, PropEquity, PIB, AICTE, Knight Frank, CBRE
              </p>
            </div>
            <Link
              href="/compare"
              className="btn-outline-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium"
            >
              Compare all cities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
