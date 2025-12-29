import { ComparativeReport, CityVerifiedReport, CitySummary, CITY_COLORS } from './types';

// Import JSON data directly (static imports for Next.js)
import comparativeData from '@/data/comparative_report.json';
import lucknowData from '@/data/lucknow_verified_report.json';
import indoreData from '@/data/indore_verified_report.json';
import jaipurData from '@/data/jaipur_verified_report.json';
import nagpurData from '@/data/nagpur_verified_report.json';
import coimbatoreData from '@/data/coimbatore_verified_report.json';
import gurugramData from '@/data/gurugram_verified_report.json';

// City data map
const cityDataMap: Record<string, CityVerifiedReport> = {
  lucknow: lucknowData as unknown as CityVerifiedReport,
  indore: indoreData as unknown as CityVerifiedReport,
  jaipur: jaipurData as unknown as CityVerifiedReport,
  nagpur: nagpurData as unknown as CityVerifiedReport,
  coimbatore: coimbatoreData as unknown as CityVerifiedReport,
  gurugram: gurugramData as unknown as CityVerifiedReport,
};

// Get comparative report
export function getComparativeReport(): ComparativeReport {
  return comparativeData as ComparativeReport;
}

// Get all cities with rankings
export function getAllCities(): CitySummary[] {
  const report = getComparativeReport();
  return report.cities.sort((a, b) => b.scores.overall_score - a.scores.overall_score);
}

// Get city by slug (lowercase name)
export function getCityBySlug(slug: string): CityVerifiedReport | null {
  const normalizedSlug = slug.toLowerCase();
  return cityDataMap[normalizedSlug] || null;
}

// Get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return Object.keys(cityDataMap);
}

// Get city color
export function getCityColor(cityName: string): string {
  const slug = cityName.toLowerCase();
  return CITY_COLORS[slug] || '#6366f1';
}

// Get ranking for a city
export function getCityRank(cityName: string): number {
  const report = getComparativeReport();
  const index = report.ranking.indexOf(cityName);
  return index >= 0 ? index + 1 : -1;
}

// Get rating text based on score
export function getRating(score: number): { text: string; color: string } {
  if (score >= 75) return { text: 'Excellent', color: 'text-green-400' };
  if (score >= 60) return { text: 'Good', color: 'text-blue-400' };
  if (score >= 45) return { text: 'Moderate', color: 'text-yellow-400' };
  if (score >= 30) return { text: 'Developing', color: 'text-orange-400' };
  return { text: 'Early Stage', color: 'text-red-400' };
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

// Format population
export function formatPopulation(pop: number): string {
  if (pop >= 10000000) return `${(pop / 10000000).toFixed(2)} Cr`;
  if (pop >= 100000) return `${(pop / 100000).toFixed(2)} L`;
  return formatNumber(pop);
}

// Get score color class
export function getScoreColorClass(score: number): string {
  if (score >= 70) return 'text-green-400';
  if (score >= 50) return 'text-cyan-400';
  if (score >= 30) return 'text-yellow-400';
  return 'text-red-400';
}

// Prepare radar chart data
export function prepareRadarData(cities: CitySummary[]) {
  const categories = [
    'Healthcare',
    'Hospitality',
    'Education',
    'Real Estate',
    'Infrastructure',
    'Migration',
  ];

  return categories.map((category, index) => {
    const scoreKeys = [
      'healthcare_score',
      'hospitality_score',
      'education_score',
      'real_estate_score',
      'future_infrastructure_score',
      'migration_score',
    ] as const;

    const dataPoint: Record<string, string | number> = { category };

    cities.forEach((city) => {
      dataPoint[city.city] = city.scores[scoreKeys[index]];
    });

    return dataPoint;
  });
}
