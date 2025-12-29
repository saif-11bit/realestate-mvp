import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Users,
  Building2,
  GraduationCap,
  Heart,
  Train,
  Briefcase,
  Home,
  TrendingUp,
  Trophy,
  Target,
  Plane,
  Hotel,
  CheckCircle2,
  ArrowUpRight,
  Star,
  Zap
} from 'lucide-react';
import { getCityBySlug, getAllCitySlugs, getCityRank, getCityColor, getRating, formatPopulation, getAllCities } from '@/lib/data';
import { SCORE_CATEGORIES, CITY_COLORS } from '@/lib/types';

// Generate static paths for all cities
export function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  const allCities = getAllCities();

  if (!city) {
    notFound();
  }

  const rank = getCityRank(city.city);
  const color = getCityColor(city.city);
  const rating = getRating(city.scores.overall_score);

  // Find city's rank in each category
  const categoryRanks = SCORE_CATEGORIES.map((cat) => {
    const sorted = [...allCities].sort((a, b) => b.scores[cat.key] - a.scores[cat.key]);
    const cityRank = sorted.findIndex((c) => c.city === city.city) + 1;
    return { ...cat, rank: cityRank, score: city.scores[cat.key] };
  });

  // Best and areas to improve
  const sortedCategories = [...categoryRanks].sort((a, b) => b.score - a.score);
  const strengths = sortedCategories.slice(0, 2);
  const improvements = sortedCategories.slice(-2).reverse();

  const getCategoryIcon = (key: string, className: string = "w-5 h-5") => {
    const icons: Record<string, React.ReactNode> = {
      healthcare_score: <Heart className={className} />,
      hospitality_score: <Hotel className={className} />,
      education_score: <GraduationCap className={className} />,
      real_estate_score: <Home className={className} />,
      future_infrastructure_score: <Train className={className} />,
      migration_score: <Briefcase className={className} />,
    };
    return icons[key] || null;
  };

  const getCategoryColor = (key: string) => {
    const colors: Record<string, string> = {
      healthcare_score: '#ef4444',
      hospitality_score: '#f59e0b',
      education_score: '#8b5cf6',
      real_estate_score: '#10b981',
      future_infrastructure_score: '#3b82f6',
      migration_score: '#ec4899',
    };
    return colors[key] || '#6366f1';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}15 0%, ${color}05 50%, transparent 100%)` }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          {/* Back Link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rankings
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* City Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {/* Rank Badge */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  #{rank}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{city.city}</h1>
                  <div className="flex items-center gap-4 text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {city.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {formatPopulation(city.population)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-3 mt-6">
                <span
                  className="px-4 py-2 rounded-full font-semibold text-sm"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {rating.text}
                </span>
                <span className="text-gray-400 text-sm">Investment Rating</span>
              </div>

              {/* Key Strengths */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Key Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {strengths.map((cat) => (
                    <div
                      key={cat.key}
                      className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100"
                    >
                      <span style={{ color: getCategoryColor(cat.key) }}>{getCategoryIcon(cat.key, "w-4 h-4")}</span>
                      <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{cat.rank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Card */}
            <div className="w-full lg:w-80">
              <div
                className="rounded-2xl p-6 text-center relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative">
                  <div className="text-white/80 text-sm font-medium mb-2">Overall Score</div>
                  <div className="text-7xl font-black text-white mb-2">
                    {city.scores.overall_score.toFixed(1)}
                  </div>
                  <div className="text-white/60 text-sm">out of 100</div>

                  {/* Mini Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/20">
                    <div>
                      <div className="text-2xl font-bold text-white">{rank}</div>
                      <div className="text-xs text-white/60">Rank</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{allCities.length}</div>
                      <div className="text-xs text-white/60">Cities</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{strengths[0]?.rank || '-'}</div>
                      <div className="text-xs text-white/60">Best Cat.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Breakdown */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Score Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryRanks.map((category) => {
              const catColor = getCategoryColor(category.key);
              const percentage = category.score;

              return (
                <div
                  key={category.key}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${catColor}15` }}
                      >
                        <span style={{ color: catColor }}>{getCategoryIcon(category.key)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.label}</h3>
                        <p className="text-xs text-gray-400">{category.description}</p>
                      </div>
                    </div>
                    <div
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: category.rank <= 2 ? '#dcfce7' : category.rank <= 4 ? '#fef9c3' : '#fee2e2',
                        color: category.rank <= 2 ? '#16a34a' : category.rank <= 4 ? '#ca8a04' : '#dc2626'
                      }}
                    >
                      #{category.rank}
                    </div>
                  </div>

                  <div className="flex items-end gap-3">
                    <div className="text-4xl font-black" style={{ color: catColor }}>
                      {category.score.toFixed(0)}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%`, backgroundColor: catColor }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500" />
            Detailed Metrics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Healthcare */}
            {city.verified_data?.healthcare?.data && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ backgroundColor: '#fef2f2' }}>
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-gray-900">Healthcare Infrastructure</h3>
                  <span className="ml-auto text-2xl font-black text-red-500">{city.scores.healthcare_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.healthcare.data.hospital_beds_per_1000 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.healthcare.data.hospital_beds_per_1000}</div>
                        <div className="text-xs text-gray-500 mt-1">Hospital Beds / 1000</div>
                      </div>
                    )}
                    {city.verified_data.healthcare.data.medical_colleges && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.healthcare.data.medical_colleges}</div>
                        <div className="text-xs text-gray-500 mt-1">Medical Colleges</div>
                      </div>
                    )}
                    {city.verified_data.healthcare.data.niti_health_index_score && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.healthcare.data.niti_health_index_score}</div>
                        <div className="text-xs text-gray-500 mt-1">NITI Health Index</div>
                      </div>
                    )}
                    {city.verified_data.healthcare.data.niti_health_index_rank && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">#{city.verified_data.healthcare.data.niti_health_index_rank}</div>
                        <div className="text-xs text-gray-500 mt-1">State Rank</div>
                      </div>
                    )}
                  </div>
                  {city.verified_data.healthcare.data.national_medical_institutes && city.verified_data.healthcare.data.national_medical_institutes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-400 mb-2">Premier Institutions</div>
                      <div className="flex flex-wrap gap-2">
                        {city.verified_data.healthcare.data.national_medical_institutes.map((inst, i) => (
                          <span key={i} className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-full font-medium">{inst}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Real Estate */}
            {city.verified_data?.real_estate?.data && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ backgroundColor: '#ecfdf5' }}>
                  <Home className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-gray-900">Real Estate Market</h3>
                  <span className="ml-auto text-2xl font-black text-emerald-500">{city.scores.real_estate_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.real_estate.data.avg_price_per_sqft_city && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">₹{city.verified_data.real_estate.data.avg_price_per_sqft_city.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">Avg Price / sqft</div>
                      </div>
                    )}
                    {city.verified_data.real_estate.data.price_appreciation_yoy && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-emerald-600 flex items-center gap-1">
                          <TrendingUp className="w-5 h-5" />
                          {city.verified_data.real_estate.data.price_appreciation_yoy}%
                        </div>
                        <div className="text-xs text-gray-500 mt-1">YoY Appreciation</div>
                      </div>
                    )}
                    {city.verified_data.real_estate.data.units_sold_2024 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.real_estate.data.units_sold_2024.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">Units Sold (2024)</div>
                      </div>
                    )}
                    {city.verified_data.real_estate.data.inventory_absorption_months && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.real_estate.data.inventory_absorption_months} mo</div>
                        <div className="text-xs text-gray-500 mt-1">Inventory Absorption</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Education */}
            {city.verified_data?.education?.data && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ backgroundColor: '#faf5ff' }}>
                  <GraduationCap className="w-5 h-5 text-purple-500" />
                  <h3 className="font-bold text-gray-900">Education Ecosystem</h3>
                  <span className="ml-auto text-2xl font-black text-purple-500">{city.scores.education_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.education.data.universities_count && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.education.data.universities_count}</div>
                        <div className="text-xs text-gray-500 mt-1">Universities</div>
                      </div>
                    )}
                    {city.verified_data.education.data.aicte_approved_institutions && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.education.data.aicte_approved_institutions}</div>
                        <div className="text-xs text-gray-500 mt-1">AICTE Institutions</div>
                      </div>
                    )}
                    {city.verified_data.education.data.literacy_rate_district && (
                      <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.education.data.literacy_rate_district}%</div>
                        <div className="text-xs text-gray-500 mt-1">Literacy Rate</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 flex-wrap">
                    {city.verified_data.education.data.iit_present && (
                      <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3" /> IIT
                      </span>
                    )}
                    {city.verified_data.education.data.nit_present && (
                      <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3" /> NIT
                      </span>
                    )}
                    {city.verified_data.education.data.iim_present && (
                      <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3" /> IIM
                      </span>
                    )}
                    {!city.verified_data.education.data.iit_present && !city.verified_data.education.data.nit_present && !city.verified_data.education.data.iim_present && (
                      <span className="text-xs text-gray-400">No premier institutes data</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Infrastructure */}
            {city.verified_data?.future_infrastructure?.data && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ backgroundColor: '#eff6ff' }}>
                  <Train className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-gray-900">Infrastructure & Connectivity</h3>
                  <span className="ml-auto text-2xl font-black text-blue-500">{city.scores.future_infrastructure_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.future_infrastructure.data.metro_phase_1_length_km && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.future_infrastructure.data.metro_phase_1_length_km} km</div>
                        <div className="text-xs text-gray-500 mt-1">Metro Network</div>
                      </div>
                    )}
                    {city.verified_data.future_infrastructure.data.airport_capacity_mppa && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                          <Plane className="w-5 h-5 text-gray-400" />
                          {city.verified_data.future_infrastructure.data.airport_capacity_mppa}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Airport Capacity (MPPA)</div>
                      </div>
                    )}
                    {city.verified_data.future_infrastructure.data.expressway_connectivity_km && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.future_infrastructure.data.expressway_connectivity_km} km</div>
                        <div className="text-xs text-gray-500 mt-1">Expressway</div>
                      </div>
                    )}
                    {city.verified_data.future_infrastructure.data.metro_phases_approved && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{city.verified_data.future_infrastructure.data.metro_phases_approved}</div>
                        <div className="text-xs text-gray-500 mt-1">Metro Phases</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 flex-wrap">
                    {city.verified_data.future_infrastructure.data.bullet_train_corridor && (
                      <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
                        <Zap className="w-3 h-3" /> Bullet Train Corridor
                      </span>
                    )}
                    {city.verified_data.future_infrastructure.data.airport_expansion_planned && (
                      <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                        <Plane className="w-3 h-3" /> Airport Expansion
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Compare Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              See how {city.city} compares
            </h3>
            <p className="text-gray-400 mb-6">
              Compare {city.city} with other top investment destinations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Compare Cities
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View All Rankings
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
