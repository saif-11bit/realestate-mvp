import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  color?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  icon,
  color,
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-emerald-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="card p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: color || '#2563eb' }}
            >
              {value}
            </span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {trendValue && (
            <div className={`flex items-center gap-1 mt-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && <div className="text-2xl text-gray-400">{icon}</div>}
      </div>
    </div>
  );
}
