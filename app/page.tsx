import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Building2,
  GraduationCap,
  Heart,
  TrendingUp,
  Train,
  Users,
  Sparkles,
  Target,
  ChevronRight,
  Star,
  Zap,
  Shield,
  LineChart
} from 'lucide-react';
import { getAllCities } from '@/lib/data';
import { CITY_COLORS } from '@/lib/types';

export default function LandingPage() {
  const cities = getAllCities();
  const topCities = cities.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4a574]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4a574]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#d4a574]/10 border border-[#d4a574]/30 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-[#d4a574]" />
              <span className="text-[#d4a574]">The Future of City Intelligence</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Compare Cities</span>
              <span className="block text-gold-gradient mt-2">the CitySense Way</span>
            </h1>

            <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
              Life, health & value — not just price.
            </p>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              AI-powered city intelligence across 6 critical layers. Make informed real estate decisions backed by verified government data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
              >
                Explore Cities
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/compare"
                className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
              >
                Compare Now
                <BarChart3 className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[#d4a574]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: cities.length, label: 'Cities Analyzed' },
              { value: '6', label: 'Intelligence Layers' },
              { value: '15+', label: 'Data Sources' },
              { value: '100%', label: 'Verified Data' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-gradient mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Intelligence Layers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-gold-gradient">6 Layers</span> of City Intelligence
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive analysis across every dimension that matters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                key: 'healthcare_score' as const,
                label: 'Healthcare',
                icon: Heart,
                description: 'Hospital beds, medical colleges, NITI Health Index',
                color: '#ef4444'
              },
              {
                key: 'education_score' as const,
                label: 'Education',
                icon: GraduationCap,
                description: 'Universities, AICTE institutions, IIT/NIT/IIM presence',
                color: '#a855f7'
              },
              {
                key: 'real_estate_score' as const,
                label: 'Real Estate Health',
                icon: Building2,
                description: 'Price per sqft, YoY appreciation, rental yield',
                color: '#22c55e'
              },
              {
                key: 'future_infrastructure_score' as const,
                label: 'Future Infrastructure',
                icon: Train,
                description: 'Metro network, airport capacity, expressways',
                color: '#3b82f6'
              },
              {
                key: 'migration_score' as const,
                label: 'Migration & Demand',
                icon: Users,
                description: 'Population growth, IT/ITES presence, SEZ development',
                color: '#f59e0b'
              },
              {
                key: 'overall_score' as const,
                label: 'Liveability & Value',
                icon: TrendingUp,
                description: 'AQI, water stress, family ease, value efficiency',
                color: '#14b8a6'
              },
            ].map((layer) => {
              const Icon = layer.icon;
              const sortedCities = [...cities].sort((a, b) => b.scores[layer.key] - a.scores[layer.key]);
              const topCity = sortedCities[0];
              const topScore = topCity.scores[layer.key];

              return (
                <div
                  key={layer.key}
                  className="card-premium p-6 group hover:border-[#d4a574]/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${layer.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: layer.color }} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{topScore.toFixed(1)}<span className="text-sm text-gray-500">/100</span></div>
                      <div className="text-xs text-gray-500">{topCity.city} leads</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{layer.label}</h3>
                  <p className="text-sm text-gray-400">{layer.description}</p>

                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 mt-4 h-8">
                    {sortedCities.slice(0, 6).map((city, idx) => {
                      const score = city.scores[layer.key];
                      const height = (score / 100) * 100;
                      return (
                        <div
                          key={city.city}
                          className="flex-1 rounded-t transition-all duration-300 group-hover:opacity-80"
                          style={{
                            height: `${height}%`,
                            backgroundColor: idx === 0 ? layer.color : `${layer.color}40`,
                            minHeight: '4px'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-20 border-t border-[#d4a574]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Top Ranked <span className="text-gold-gradient">Cities</span>
              </h2>
              <p className="text-gray-400">
                Discover the highest-scoring investment destinations
              </p>
            </div>
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 text-[#d4a574] hover:text-[#e8c49a] transition-colors"
            >
              View all cities
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCities.map((city, index) => {
              const color = CITY_COLORS[city.city.toLowerCase()] || '#d4a574';
              const isTop3 = index < 3;

              return (
                <Link key={city.city} href={`/city/${city.city.toLowerCase()}`} className="group">
                  <div className={`card-premium p-6 h-full ${isTop3 ? 'border-[#d4a574]/30' : ''}`}>
                    {/* Rank badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-black' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black' :
                          index === 2 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-black' :
                          'bg-white/10 text-white'
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#d4a574]" fill="#d4a574" />
                        <span className="text-[#d4a574] font-semibold">{city.scores.overall_score.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* City info */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d4a574] transition-colors">
                      {city.city}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{city.state}</p>

                    {/* Score breakdown */}
                    <div className="space-y-2">
                      {[
                        { label: 'Healthcare', score: city.scores.healthcare_score },
                        { label: 'Real Estate', score: city.scores.real_estate_score },
                        { label: 'Infrastructure', score: city.scores.future_infrastructure_score },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-20">{item.label}</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.score}%`,
                                backgroundColor: color
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{item.score.toFixed(0)}</span>
                        </div>
                      ))}
                    </div>

                    {/* View details */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-gray-500">CitySense Score</span>
                      <span className="text-[#d4a574] text-sm font-medium group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-[#d4a574] hover:text-[#e8c49a] transition-colors"
            >
              View all {cities.length} cities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-20 border-t border-[#d4a574]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your <span className="text-gold-gradient">Perfect Match</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Different cities suit different investment profiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Earning Capital',
                subtitle: 'Best for Income',
                description: 'High rental yields, strong economic activity, IT/ITES presence',
                cities: ['Gurugram', 'Indore'],
                icon: TrendingUp,
                gradient: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                title: 'Living Value',
                subtitle: 'Best for Life & Long-term',
                description: 'Clean air, low stress, family-friendly, value efficiency',
                cities: ['Lucknow', 'Coimbatore', 'Jaipur'],
                icon: Heart,
                gradient: 'from-green-500/20 to-emerald-500/20'
              },
              {
                title: 'Future Upside',
                subtitle: 'Best for Growth',
                description: 'Infrastructure projects, metro expansion, SEZ development',
                cities: ['Lucknow', 'Nagpur', 'Indore'],
                icon: Zap,
                gradient: 'from-amber-500/20 to-orange-500/20'
              },
            ].map((profile, idx) => {
              const Icon = profile.icon;
              return (
                <div key={idx} className="card-premium p-8 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-50`} />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-[#d4a574]/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-[#d4a574]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{profile.title}</h3>
                    <p className="text-[#d4a574] text-sm font-medium mb-3">{profile.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-6">{profile.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {profile.cities.map((city) => (
                        <Link
                          key={city}
                          href={`/city/${city.toLowerCase()}`}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-[#d4a574]/50 hover:text-[#d4a574] transition-all"
                        >
                          {city}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why CitySense */}
      <section className="py-20 border-t border-[#d4a574]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Trust <span className="text-gold-gradient">CitySense?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Built on transparency, verified data, and comprehensive coverage of factors that matter for real estate investment.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Government Verified Sources',
                    description: 'Data from NITI Aayog, PIB, AICTE, and official government portals.'
                  },
                  {
                    icon: Target,
                    title: 'Objective Scoring',
                    description: 'Transparent methodology with weighted scoring across all six parameters.'
                  },
                  {
                    icon: LineChart,
                    title: 'Real-time Insights',
                    description: 'Updated data on infrastructure projects, price trends, and market dynamics.'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#d4a574]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#d4a574]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-premium p-8 border-[#d4a574]/30">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Compare Cities</h3>
                <p className="text-gray-400">Side-by-side analysis across all metrics</p>
              </div>

              {/* Preview comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-lg font-bold text-white mb-1">Gurgaon</div>
                  <div className="text-[#d4a574] text-sm">Earning Capital</div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">AQI</span>
                      <span className="text-red-400">Poor</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Stress</span>
                      <span className="text-red-400">High</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Value</span>
                      <span className="text-yellow-400">Low</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-[#d4a574]/30">
                  <div className="text-lg font-bold text-white mb-1">Tier-2 Cities</div>
                  <div className="text-[#d4a574] text-sm">Living Value</div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">AQI</span>
                      <span className="text-green-400">Cleaner</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Stress</span>
                      <span className="text-green-400">Low</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Value</span>
                      <span className="text-green-400">High</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/compare"
                className="btn-gold w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl"
              >
                Explore Tier-2 Cities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-12 border-t border-[#d4a574]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Powered by <span className="text-gold-gradient">Official Data</span></h3>
            <p className="text-gray-500">Verified sources from government portals and industry leaders</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

          <div className="flex animate-marquee">
            {[
              { name: 'NITI Aayog', abbr: 'NITI', color: '#d4a574' },
              { name: '99acres', abbr: '99', color: '#ef4444' },
              { name: 'PIB India', abbr: 'PIB', color: '#f59e0b' },
              { name: 'AICTE', abbr: 'AICTE', color: '#3b82f6' },
              { name: 'Knight Frank', abbr: 'KF', color: '#a855f7' },
              { name: 'Census India', abbr: 'GOI', color: '#22c55e' },
              { name: 'CBRE', abbr: 'CBRE', color: '#14b8a6' },
              { name: 'Govt of India', abbr: 'GOV', color: '#d4a574' },
              { name: 'NITI Aayog', abbr: 'NITI', color: '#d4a574' },
              { name: '99acres', abbr: '99', color: '#ef4444' },
              { name: 'PIB India', abbr: 'PIB', color: '#f59e0b' },
              { name: 'AICTE', abbr: 'AICTE', color: '#3b82f6' },
              { name: 'Knight Frank', abbr: 'KF', color: '#a855f7' },
              { name: 'Census India', abbr: 'GOI', color: '#22c55e' },
              { name: 'CBRE', abbr: 'CBRE', color: '#14b8a6' },
              { name: 'Govt of India', abbr: 'GOV', color: '#d4a574' },
            ].map((source, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center gap-3 mx-4 bg-white/5 border border-white/10 rounded-xl px-5 py-3"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${source.color}20` }}
                >
                  <span style={{ color: source.color }} className="font-bold text-xs">{source.abbr}</span>
                </div>
                <span className="text-gray-400 font-medium whitespace-nowrap">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[#d4a574]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#d4a574]/5 to-[#0a0a0a]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make <span className="text-gold-gradient">Smarter Decisions?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Explore comprehensive city intelligence and find the perfect destination for your next investment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
            >
              View Full Rankings
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/compare"
              className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg"
            >
              Compare Cities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
