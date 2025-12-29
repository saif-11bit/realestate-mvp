'use client';

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  color?: string;
}

export function ScoreBar({
  score,
  maxScore = 100,
  showLabel = true,
  size = 'md',
  animated = true,
  color,
}: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;

  const getScoreColor = () => {
    if (score >= 70) return '#10b981, #34d399';
    if (score >= 50) return '#3b82f6, #60a5fa';
    if (score >= 30) return '#f59e0b, #fbbf24';
    return '#ef4444, #f87171';
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full rounded-full ${animated ? 'score-bar-animated' : ''}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: color || undefined,
            backgroundImage: color ? undefined : `linear-gradient(to right, ${getScoreColor()})`,
          }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span className="font-semibold text-white">{score.toFixed(1)}</span>
          <span>{maxScore}</span>
        </div>
      )}
    </div>
  );
}
