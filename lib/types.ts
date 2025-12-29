// City scores interface
export interface CityScores {
  healthcare_score: number;
  hospitality_score: number;
  education_score: number;
  real_estate_score: number;
  future_infrastructure_score: number;
  migration_score: number;
  overall_score: number;
}

// City summary for comparative report
export interface CitySummary {
  city: string;
  state: string;
  population: number;
  scores: CityScores;
}

// Comparative report structure
export interface ComparativeReport {
  report_generated: string;
  cities: CitySummary[];
  ranking: string[];
}

// Source reference
export interface DataSource {
  name: string;
  url?: string;
  accessed_date?: string;
  reliability: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
}

// Healthcare data
export interface HealthcareData {
  hospital_beds_per_1000?: number;
  doctors_per_1000?: number;
  medical_colleges?: number;
  niti_health_index_score?: number;
  niti_health_index_rank?: string;
  aiims_present?: boolean;
  premier_medical_hub?: boolean;
  national_medical_institutes?: string[];
}

// Hospitality data
export interface HospitalityData {
  total_hotels_makemytrip?: number;
  total_hotels_oyo?: number;
  star_hotels_estimated?: number;
  average_occupancy_rate?: number;
  average_occupancy_rate_estimated?: number;
  tourism_type?: string;
}

// Education data
export interface EducationData {
  universities_count?: number;
  aicte_approved_institutions?: number;
  aicte_approved_colleges?: number;
  iit_present?: boolean;
  iit_name?: string;
  nit_present?: boolean;
  nit_name?: string;
  iim_present?: boolean;
  iim_name?: string;
  literacy_rate_district?: number;
}

// Real estate data
export interface RealEstateData {
  avg_price_per_sqft_city?: number;
  price_appreciation_yoy?: number;
  units_sold_2024?: number;
  units_sold_q1_2025?: number;
  sales_growth_yoy?: number;
  inventory_absorption_months?: number;
  luxury_segment_share?: number;
}

// Future infrastructure data
export interface FutureInfrastructureData {
  metro_phase_1_status?: string;
  metro_phase_1_length_km?: number;
  metro_phase_2_length_km?: number;
  metro_phases_approved?: number;
  railway_investment_crore?: number;
  expressway_connectivity_km?: number;
  airport_capacity_mppa?: number;
  airport_expansion_planned?: boolean;
  bullet_train_corridor?: boolean;
  smart_city_features?: string[];
}

// Migration/Employment data
export interface MigrationData {
  population_growth_rate?: number;
  national_avg_growth_rate?: number;
  fortune_500_companies?: number;
  it_companies?: number;
  startups?: number;
  major_employers?: string[];
}

// Verified data section
export interface VerifiedDataSection<T> {
  data: T;
  sources?: DataSource[];
  data_gaps?: string[];
}

// Full verified report
export interface CityVerifiedReport {
  report_generated: string;
  city: string;
  state: string;
  population: number;
  scores: CityScores;
  verified_data: {
    metadata?: {
      city: string;
      state: string;
      data_compiled_date: string;
      data_quality_notes: string;
    };
    population?: {
      value: number;
      growth_rate_yoy?: number;
      source?: DataSource;
    };
    healthcare?: VerifiedDataSection<HealthcareData>;
    hospitality?: VerifiedDataSection<HospitalityData>;
    education?: VerifiedDataSection<EducationData>;
    real_estate?: VerifiedDataSection<RealEstateData>;
    future_infrastructure?: VerifiedDataSection<FutureInfrastructureData>;
    migration_employment?: VerifiedDataSection<MigrationData>;
  };
}

// Score category info
export interface ScoreCategory {
  key: keyof Omit<CityScores, 'overall_score'>;
  label: string;
  icon: string;
  description: string;
}

// City color mapping
export const CITY_COLORS: Record<string, string> = {
  lucknow: '#ff6b6b',
  indore: '#4ecdc4',
  jaipur: '#a855f7',
  nagpur: '#f59e0b',
  coimbatore: '#10b981',
  gurugram: '#3b82f6',
};

// Score categories metadata
export const SCORE_CATEGORIES: ScoreCategory[] = [
  { key: 'healthcare_score', label: 'Healthcare', icon: '🏥', description: 'Hospital beds, doctors, medical colleges' },
  { key: 'hospitality_score', label: 'Hospitality', icon: '🏨', description: 'Hotels, occupancy rates, tourism' },
  { key: 'education_score', label: 'Education', icon: '🎓', description: 'Universities, IIT/NIT, literacy' },
  { key: 'real_estate_score', label: 'Real Estate', icon: '🏠', description: 'Prices, appreciation, sales growth' },
  { key: 'future_infrastructure_score', label: 'Infrastructure', icon: '🚇', description: 'Metro, railways, airports' },
  { key: 'migration_score', label: 'Migration', icon: '👥', description: 'Employment, population growth' },
];
