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
  Plane,
  Hotel,
  CheckCircle2,
  ArrowUpRight,
  Star,
  Zap,
  ChevronRight
} from 'lucide-react';
import { getCityBySlug, getAllCitySlugs, getCityRank, getCityColor, getRating, formatPopulation, getAllCities } from '@/lib/data';
import { SCORE_CATEGORIES, CITY_COLORS, CityScores } from '@/lib/types';

export function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

// Radar Chart Component
function RadarChart({ scores, color }: { scores: CityScores; color: string }) {
  const categories: { key: keyof CityScores; label: string; shortLabel: string }[] = [
    { key: 'healthcare_score', label: 'Healthcare', shortLabel: 'Health' },
    { key: 'education_score', label: 'Education', shortLabel: 'Edu' },
    { key: 'real_estate_score', label: 'Real Estate', shortLabel: 'RE' },
    { key: 'future_infrastructure_score', label: 'Infrastructure', shortLabel: 'Infra' },
    { key: 'migration_score', label: 'Migration', shortLabel: 'Migr' },
    { key: 'hospitality_score', label: 'Hospitality', shortLabel: 'Hosp' },
  ];

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;
  const levels = 5;

  // Calculate points for each category
  const points = categories.map((cat, i) => {
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    const value = scores[cat.key] || 0;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      labelX: centerX + (maxRadius + 25) * Math.cos(angle),
      labelY: centerY + (maxRadius + 25) * Math.sin(angle),
      score: value,
      label: cat.shortLabel,
      fullLabel: cat.label,
    };
  });

  // Create the polygon path
  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative">
      <svg viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto radar-glow">
        {/* Background levels */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = (maxRadius / levels) * (i + 1);
          const levelPoints = categories.map((_, j) => {
            const angle = (Math.PI * 2 * j) / categories.length - Math.PI / 2;
            return {
              x: centerX + levelRadius * Math.cos(angle),
              y: centerY + levelRadius * Math.sin(angle),
            };
          });
          const levelPath = levelPoints.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
          return (
            <path
              key={i}
              d={levelPath}
              fill="none"
              stroke="rgba(212, 165, 116, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const endX = centerX + maxRadius * Math.cos(angle);
          const endY = centerY + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="rgba(212, 165, 116, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={polygonPath}
          fill={`${color}30`}
          stroke={color}
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={color}
            stroke="#0a0a0a"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {points.map((point, i) => (
          <text
            key={i}
            x={point.labelX}
            y={point.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-400 text-[10px] font-medium"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
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

  // Category ranks
  const categoryRanks = SCORE_CATEGORIES.map((cat) => {
    const sorted = [...allCities].sort((a, b) => b.scores[cat.key] - a.scores[cat.key]);
    const cityRank = sorted.findIndex((c) => c.city === city.city) + 1;
    return { ...cat, rank: cityRank, score: city.scores[cat.key] };
  });

  const sortedCategories = [...categoryRanks].sort((a, b) => b.score - a.score);
  const strengths = sortedCategories.slice(0, 2);

  // Determine best for
  const bestFor: string[] = [];
  if (city.scores.real_estate_score > 70) bestFor.push('Long-term investors');
  if (city.scores.education_score > 65) bestFor.push('Families');
  if (city.scores.future_infrastructure_score > 70) bestFor.push('Growth seekers');
  if (city.scores.migration_score > 65) bestFor.push('Hybrid workers');
  if (bestFor.length === 0) bestFor.push('Value seekers');

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
      education_score: '#a855f7',
      real_estate_score: '#22c55e',
      future_infrastructure_score: '#3b82f6',
      migration_score: '#ec4899',
    };
    return colors[key] || '#d4a574';
  };

  // Get price range
  const priceRange = city.verified_data?.real_estate?.data?.avg_price_per_sqft_city
    ? `₹${Math.round(city.verified_data.real_estate.data.avg_price_per_sqft_city * 0.7).toLocaleString()} - ${Math.round(city.verified_data.real_estate.data.avg_price_per_sqft_city * 1.3).toLocaleString()}/sq ft`
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Header */}
      <div className="relative">
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at top, ${color}40 0%, transparent 60%)`
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          {/* Back Link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#d4a574] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rankings
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* City Info */}
            <div className="flex-1">
              {/* City Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg"
                  style={{ backgroundColor: color, color: '#0a0a0a' }}
                >
                  #{rank}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{city.city}</h1>
                  <p className="text-gray-400 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {city.state}
                    <span className="text-gray-600">•</span>
                    <Users className="w-4 h-4" />
                    {formatPopulation(city.population)}
                  </p>
                </div>
              </div>

              {/* CitySense Score */}
              <div className="card-premium p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">CitySense Score</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-gold-gradient">{city.scores.overall_score.toFixed(1)}</span>
                      <span className="text-gray-500">/100</span>
                    </div>
                  </div>
                  <div
                    className="px-4 py-2 rounded-full font-semibold text-sm"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {rating.text}
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  <span className="text-[#d4a574] text-sm font-medium">
                    #{rank} in India
                  </span>
                  {priceRange && (
                    <>
                      <span className="text-gray-600">|</span>
                      <span className="text-gray-400 text-sm">{priceRange}</span>
                    </>
                  )}
                  {city.verified_data?.real_estate?.data?.price_appreciation_yoy && (
                    <>
                      <span className="text-gray-600">|</span>
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {city.verified_data.real_estate.data.price_appreciation_yoy}% YoY
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Best For */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Best For</div>
                <div className="flex flex-wrap gap-2">
                  {bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#d4a574]/10 border border-[#d4a574]/30 rounded-full text-[#d4a574] text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Strengths */}
              <div>
                <div className="text-sm text-gray-500 mb-2">Key Strengths</div>
                <div className="flex flex-wrap gap-2">
                  {strengths.map((cat) => (
                    <div
                      key={cat.key}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                    >
                      <span style={{ color: getCategoryColor(cat.key) }}>{getCategoryIcon(cat.key, "w-4 h-4")}</span>
                      <span className="text-sm font-medium text-gray-300">{cat.label}</span>
                      <span className="text-xs bg-[#d4a574]/20 text-[#d4a574] px-2 py-0.5 rounded-full">#{cat.rank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar Chart Card */}
            <div className="w-full lg:w-96">
              <div className="card-premium p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Score Across 6 Layers</h3>
                  <p className="text-sm text-gray-500">CitySense Intelligence</p>
                </div>
                <RadarChart scores={city.scores} color={color} />

                {/* Score Legend */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryRanks.map((cat) => (
                    <div key={cat.key} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getCategoryColor(cat.key) }}
                      />
                      <span className="text-gray-400">{cat.label.split(' ')[0]}</span>
                      <span className="ml-auto text-white font-medium">{cat.score.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Breakdown */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-gold-gradient">6 Layers</span>
            <span className="text-gray-400 font-normal text-lg">of Intelligence</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryRanks.map((category) => {
              const catColor = getCategoryColor(category.key);

              return (
                <div
                  key={category.key}
                  className="card-premium p-5 hover:border-[#d4a574]/40 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${catColor}20` }}
                      >
                        <span style={{ color: catColor }}>{getCategoryIcon(category.key)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{category.label}</h3>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end gap-3">
                    <div className="text-4xl font-black text-white">
                      {category.score.toFixed(0)}
                      <span className="text-sm text-gray-500 font-normal">/100</span>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${category.score}%`, backgroundColor: catColor }}
                        />
                      </div>
                    </div>
                    <div
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: category.rank <= 2 ? 'rgba(34, 197, 94, 0.2)' : category.rank <= 4 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: category.rank <= 2 ? '#22c55e' : category.rank <= 4 ? '#eab308' : '#ef4444'
                      }}
                    >
                      #{category.rank}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#d4a574]" />
            Detailed Metrics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Healthcare */}
            {city.verified_data?.healthcare?.data && (
              <div className="card-premium overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                  <Heart className="w-5 h-5 text-red-400" />
                  <h3 className="font-bold text-white">Healthcare Infrastructure</h3>
                  <span className="ml-auto text-2xl font-black text-red-400">{city.scores.healthcare_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.healthcare.data.hospital_beds_per_1000 && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.healthcare.data.hospital_beds_per_1000}</div>
                        <div className="text-xs text-gray-500 mt-1">Hospital Beds / 1000</div>
                      </div>
                    )}
                    {city.verified_data.healthcare.data.medical_colleges && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.healthcare.data.medical_colleges}</div>
                        <div className="text-xs text-gray-500 mt-1">Medical Colleges</div>
                      </div>
                    )}
                    {city.verified_data.healthcare.data.niti_health_index_score && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.healthcare.data.niti_health_index_score}</div>
                        <div className="text-xs text-gray-500 mt-1">NITI Health Index</div>
                      </div>
                    )}
                    {city.verified_data.healthcare.data.niti_health_index_rank && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">#{city.verified_data.healthcare.data.niti_health_index_rank}</div>
                        <div className="text-xs text-gray-500 mt-1">State Rank</div>
                      </div>
                    )}
                  </div>
                  {city.verified_data.healthcare.data.national_medical_institutes && city.verified_data.healthcare.data.national_medical_institutes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="text-xs text-gray-500 mb-2">Premier Institutions</div>
                      <div className="flex flex-wrap gap-2">
                        {city.verified_data.healthcare.data.national_medical_institutes.map((inst, i) => (
                          <span key={i} className="text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full font-medium">{inst}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Real Estate */}
            {city.verified_data?.real_estate?.data && (
              <div className="card-premium overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                  <Home className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold text-white">Real Estate Market</h3>
                  <span className="ml-auto text-2xl font-black text-green-400">{city.scores.real_estate_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.real_estate.data.avg_price_per_sqft_city && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">₹{city.verified_data.real_estate.data.avg_price_per_sqft_city.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">Avg Price / sqft</div>
                      </div>
                    )}
                    {city.verified_data.real_estate.data.price_appreciation_yoy && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-5 h-5" />
                          {city.verified_data.real_estate.data.price_appreciation_yoy}%
                        </div>
                        <div className="text-xs text-gray-500 mt-1">YoY Appreciation</div>
                      </div>
                    )}
                    {city.verified_data.real_estate.data.units_sold_2024 && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.real_estate.data.units_sold_2024.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">Units Sold (2024)</div>
                      </div>
                    )}
                    {city.verified_data.real_estate.data.inventory_absorption_months && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.real_estate.data.inventory_absorption_months} mo</div>
                        <div className="text-xs text-gray-500 mt-1">Inventory Absorption</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Education */}
            {city.verified_data?.education?.data && (
              <div className="card-premium overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-white">Education Ecosystem</h3>
                  <span className="ml-auto text-2xl font-black text-purple-400">{city.scores.education_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.education.data.universities_count && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.education.data.universities_count}</div>
                        <div className="text-xs text-gray-500 mt-1">Universities</div>
                      </div>
                    )}
                    {city.verified_data.education.data.aicte_approved_institutions && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.education.data.aicte_approved_institutions}</div>
                        <div className="text-xs text-gray-500 mt-1">AICTE Institutions</div>
                      </div>
                    )}
                    {city.verified_data.education.data.literacy_rate_district && (
                      <div className="bg-white/5 rounded-lg p-4 col-span-2">
                        <div className="text-2xl font-bold text-white">{city.verified_data.education.data.literacy_rate_district}%</div>
                        <div className="text-xs text-gray-500 mt-1">Literacy Rate</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10 flex-wrap">
                    {city.verified_data.education.data.iit_present && (
                      <span className="flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3" /> IIT
                      </span>
                    )}
                    {city.verified_data.education.data.nit_present && (
                      <span className="flex items-center gap-1 text-xs bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3" /> NIT
                      </span>
                    )}
                    {city.verified_data.education.data.iim_present && (
                      <span className="flex items-center gap-1 text-xs bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-full font-medium">
                        <CheckCircle2 className="w-3 h-3" /> IIM
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Infrastructure */}
            {city.verified_data?.future_infrastructure?.data && (
              <div className="card-premium overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <Train className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-white">Infrastructure & Connectivity</h3>
                  <span className="ml-auto text-2xl font-black text-blue-400">{city.scores.future_infrastructure_score.toFixed(0)}</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {city.verified_data.future_infrastructure.data.metro_phase_1_length_km && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.future_infrastructure.data.metro_phase_1_length_km} km</div>
                        <div className="text-xs text-gray-500 mt-1">Metro Network</div>
                      </div>
                    )}
                    {city.verified_data.future_infrastructure.data.airport_capacity_mppa && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white flex items-center gap-1">
                          <Plane className="w-5 h-5 text-gray-500" />
                          {city.verified_data.future_infrastructure.data.airport_capacity_mppa}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Airport Capacity (MPPA)</div>
                      </div>
                    )}
                    {city.verified_data.future_infrastructure.data.expressway_connectivity_km && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.future_infrastructure.data.expressway_connectivity_km} km</div>
                        <div className="text-xs text-gray-500 mt-1">Expressway</div>
                      </div>
                    )}
                    {city.verified_data.future_infrastructure.data.metro_phases_approved && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{city.verified_data.future_infrastructure.data.metro_phases_approved}</div>
                        <div className="text-xs text-gray-500 mt-1">Metro Phases</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10 flex-wrap">
                    {city.verified_data.future_infrastructure.data.bullet_train_corridor && (
                      <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full font-medium">
                        <Zap className="w-3 h-3" /> Bullet Train Corridor
                      </span>
                    )}
                    {city.verified_data.future_infrastructure.data.airport_expansion_planned && (
                      <span className="flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full font-medium">
                        <Plane className="w-3 h-3" /> Airport Expansion
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Compare CTA */}
        <section className="mb-12">
          <div className="card-premium p-8 text-center border-[#d4a574]/30">
            <h3 className="text-2xl font-bold text-white mb-3">
              See how <span className="text-gold-gradient">{city.city}</span> compares
            </h3>
            <p className="text-gray-400 mb-6">
              Compare {city.city} with other top investment destinations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/compare"
                className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl"
              >
                Compare Cities
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl"
              >
                View All Rankings
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
