import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  GraduationCap,
  Heart,
  MapPin,
  TrendingUp,
  Train,
  Shield,
  Zap,
  Target,
  Newspaper,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { getAllCities } from '@/lib/data';
import { CITY_COLORS } from '@/lib/types';

export default function LandingPage() {
  const cities = getAllCities();
  const topCities = cities.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Data-driven investment insights for Indian real estate</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Investment Destination
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Compare cities across healthcare, education, infrastructure, and real estate metrics.
              Make informed decisions backed by verified government data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Explore Rankings
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500/30 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-blue-500/40 transition-all"
              >
                Compare Cities
                <BarChart3 className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{cities.length}</div>
              <div className="text-gray-500 font-medium">Cities Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-500 font-medium">Key Metrics</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-500 font-medium">Data Sources</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-500 font-medium">Verified Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Analysis Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive City Analysis
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              See how cities compare across six critical dimensions
            </p>
          </div>

          {/* Category Comparison Grid */}
          <div className="space-y-6">
            {[
              {
                key: 'healthcare_score' as const,
                label: 'Healthcare',
                icon: Heart,
                bgColor: '#fef2f2',
                iconColor: '#dc2626',
                metrics: ['Hospital beds per 1000', 'Medical colleges', 'NITI Health Index']
              },
              {
                key: 'education_score' as const,
                label: 'Education',
                icon: GraduationCap,
                bgColor: '#faf5ff',
                iconColor: '#9333ea',
                metrics: ['Universities', 'AICTE institutions', 'IIT/NIT/IIM presence']
              },
              {
                key: 'real_estate_score' as const,
                label: 'Real Estate',
                icon: Building2,
                bgColor: '#ecfdf5',
                iconColor: '#059669',
                metrics: ['Price per sqft', 'YoY appreciation', 'Rental yield']
              },
              {
                key: 'future_infrastructure_score' as const,
                label: 'Infrastructure',
                icon: Train,
                bgColor: '#eff6ff',
                iconColor: '#2563eb',
                metrics: ['Metro network', 'Airport capacity', 'Expressways']
              },
              {
                key: 'migration_score' as const,
                label: 'Growth & Migration',
                icon: TrendingUp,
                bgColor: '#fffbeb',
                iconColor: '#d97706',
                metrics: ['Population growth', 'IT/ITES presence', 'SEZ development']
              },
              {
                key: 'hospitality_score' as const,
                label: 'Hospitality',
                icon: MapPin,
                bgColor: '#ecfeff',
                iconColor: '#0891b2',
                metrics: ['Hotel inventory', 'Tourism index', 'Short-term rental potential']
              },
            ].map((category) => {
              const Icon = category.icon;
              const sortedCities = [...cities].sort((a, b) => b.scores[category.key] - a.scores[category.key]);
              const topCity = sortedCities[0];
              const topScore = topCity.scores[category.key];

              return (
                <div key={category.key} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Category Info */}
                    <div className="flex items-center gap-4 lg:w-64 flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: category.bgColor }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.iconColor }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.label}</h3>
                        <p className="text-xs text-gray-400">{category.metrics.join(' • ')}</p>
                      </div>
                    </div>

                    {/* City Scores Bar */}
                    <div className="flex-1">
                      <div className="flex items-end gap-2 h-16">
                        {sortedCities.slice(0, 6).map((city, idx) => {
                          const score = city.scores[category.key];
                          const height = (score / 100) * 100;
                          const cityColor = CITY_COLORS[city.city.toLowerCase()] || '#6366f1';
                          const isTop = idx === 0;

                          return (
                            <div key={city.city} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className="w-full rounded-t-md transition-all duration-300 hover:opacity-80 relative group"
                                style={{
                                  height: `${height}%`,
                                  backgroundColor: cityColor,
                                  minHeight: '8px'
                                }}
                              >
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {score.toFixed(1)}
                                </div>
                              </div>
                              <span className={`text-xs truncate w-full text-center ${isTop ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>
                                {city.city.slice(0, 3)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Leader Badge */}
                    <div className="lg:w-40 flex-shrink-0 text-right">
                      <div className="inline-flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: CITY_COLORS[topCity.city.toLowerCase()] || '#6366f1' }}
                        />
                        <span className="text-sm font-medium text-gray-700">{topCity.city}</span>
                        <span className="text-sm font-bold text-gray-900">{topScore.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Compare All Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Cities Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Ranked Cities
            </h2>
            <p className="text-xl text-gray-500">
              Discover the highest-scoring investment destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {topCities.map((city, index) => {
              const color = CITY_COLORS[city.city.toLowerCase()] || '#3b82f6';
              const medals = ['bg-gradient-to-br from-yellow-400 to-amber-500', 'bg-gradient-to-br from-gray-300 to-gray-400', 'bg-gradient-to-br from-orange-400 to-amber-600'];
              return (
                <Link key={city.city} href={`/city/${city.city.toLowerCase()}`} className="group">
                  <div className="card p-8 text-center hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className={`w-16 h-16 ${medals[index]} rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg`}>
                      #{index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {city.city}
                    </h3>
                    <p className="text-gray-500 mb-4">{city.state}</p>
                    <div
                      className="text-4xl font-bold mb-2"
                      style={{ color }}
                    >
                      {city.scores.overall_score.toFixed(1)}
                    </div>
                    <p className="text-sm text-gray-400">Overall Score</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View all {cities.length} cities
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Infrastructure Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Latest Infrastructure Updates
                </h2>
              </div>
              <p className="text-gray-500 text-lg">
                Recent developments shaping real estate investment potential
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                city: 'Lucknow',
                title: 'Metro Phase 2 Expansion Approved',
                description: 'UP Cabinet approves 11 km extension connecting Charbagh to Vasant Kunj, expected to boost property values along the corridor by 15-20%.',
                date: 'Dec 2024',
                category: 'Metro Rail',
                impact: 'High',
                source: 'PIB India'
              },
              {
                city: 'Gurugram',
                title: 'Dwarka Expressway Fully Operational',
                description: 'The 29 km expressway connecting Delhi and Gurugram now fully operational, reducing travel time to IGI Airport to 20 minutes.',
                date: 'Dec 2024',
                category: 'Expressway',
                impact: 'High',
                source: 'NHAI'
              },
              {
                city: 'Jaipur',
                title: 'New International Airport Terminal',
                description: 'Jaipur International Airport Terminal 2 inaugurated with 6x capacity expansion, supporting 5 million additional passengers annually.',
                date: 'Nov 2024',
                category: 'Aviation',
                impact: 'High',
                source: 'AAI'
              },
              {
                city: 'Indore',
                title: 'Metro Rail Phase 1 Progress',
                description: 'Indore Metro Phase 1 achieves 60% completion. The 31.5 km network connecting major commercial hubs expected by 2026.',
                date: 'Dec 2024',
                category: 'Metro Rail',
                impact: 'Medium',
                source: 'MPMRCL'
              },
              {
                city: 'Nagpur',
                title: 'MIHAN SEZ Attracts Major Investment',
                description: 'Boeing and Tata announce aerospace manufacturing facility at MIHAN SEZ, creating 2,000+ direct jobs and boosting industrial real estate.',
                date: 'Nov 2024',
                category: 'Industrial',
                impact: 'High',
                source: 'Invest India'
              },
              {
                city: 'Coimbatore',
                title: 'Smart City Projects Near Completion',
                description: 'Coimbatore Smart City Phase 2 nearing completion with integrated command center, smart traffic, and 100 km fiber optic network.',
                date: 'Dec 2024',
                category: 'Smart City',
                impact: 'Medium',
                source: 'Smart Cities Mission'
              }
            ].map((news, index) => {
              const cityColor = CITY_COLORS[news.city.toLowerCase()] || '#3b82f6';
              const impactColors: Record<string, { bg: string; text: string }> = {
                'High': { bg: '#dcfce7', text: '#16a34a' },
                'Medium': { bg: '#fef9c3', text: '#ca8a04' },
                'Low': { bg: '#fee2e2', text: '#dc2626' }
              };
              const impact = impactColors[news.impact] || impactColors['Medium'];

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* City header */}
                  <div
                    className="px-5 py-3 flex items-center justify-between"
                    style={{ backgroundColor: `${cityColor}10` }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cityColor }}
                      />
                      <span className="font-semibold text-gray-900">{news.city}</span>
                    </div>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: cityColor, color: 'white' }}
                    >
                      {news.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                      {news.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          {news.date}
                        </div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: impact.bg, color: impact.text }}
                        >
                          {news.impact} Impact
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{news.source}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View more link */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
              <Newspaper className="w-4 h-4" />
              Data sourced from PIB, NHAI, AAI, and Smart Cities Mission
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Trust Our Analysis?
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                Our scoring methodology is built on transparency, verified data, and comprehensive coverage of factors that matter for real estate investment.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Government Verified Sources</h4>
                    <p className="text-gray-500">Data sourced from NITI Aayog, PIB, AICTE, and other official government portals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Objective Scoring</h4>
                    <p className="text-gray-500">Transparent methodology with weighted scoring across all six parameters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Interactive Comparison</h4>
                    <p className="text-gray-500">Compare up to 4 cities side-by-side with detailed breakdowns.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-3">Start Comparing Today</h3>
              <p className="text-blue-100 mb-6">
                Get detailed insights on healthcare, education, infrastructure, and real estate metrics for any city.
              </p>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Compare Cities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Banner */}
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Powered by Official Data Sources</h3>
            <p className="text-gray-500">Verified data from government portals and industry leaders</p>
          </div>
        </div>
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Scrolling banner */}
          <div className="flex animate-marquee">
            {[
              { name: 'NITI Aayog', abbr: 'NITI', color: '#1e40af' },
              { name: '99acres', abbr: '99', color: '#dc2626' },
              { name: 'PIB India', abbr: 'PIB', color: '#ea580c' },
              { name: 'AICTE', abbr: 'AICTE', color: '#0891b2' },
              { name: 'Knight Frank', abbr: 'KF', color: '#7c3aed' },
              { name: 'Census India', abbr: 'GOI', color: '#059669' },
              { name: 'CBRE', abbr: 'CBRE', color: '#065f46' },
              { name: 'Govt of India', abbr: 'GOV', color: '#b45309' },
              // Duplicate for seamless loop
              { name: 'NITI Aayog', abbr: 'NITI', color: '#1e40af' },
              { name: '99acres', abbr: '99', color: '#dc2626' },
              { name: 'PIB India', abbr: 'PIB', color: '#ea580c' },
              { name: 'AICTE', abbr: 'AICTE', color: '#0891b2' },
              { name: 'Knight Frank', abbr: 'KF', color: '#7c3aed' },
              { name: 'Census India', abbr: 'GOI', color: '#059669' },
              { name: 'CBRE', abbr: 'CBRE', color: '#065f46' },
              { name: 'Govt of India', abbr: 'GOV', color: '#b45309' },
            ].map((source, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center gap-3 mx-6 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: source.color }}
                >
                  <span className="text-white font-bold text-xs">{source.abbr}</span>
                </div>
                <span className="text-gray-700 font-medium whitespace-nowrap">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Smarter Investment Decisions?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our comprehensive city rankings and find the perfect destination for your next real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg"
            >
              View Full Rankings
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Compare Cities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
