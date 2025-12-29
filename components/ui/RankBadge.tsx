interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
}

export function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const getBadgeStyles = () => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-yellow-900 shadow-yellow-400/20';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700 shadow-gray-300/20';
      case 3:
        return 'bg-gradient-to-br from-orange-400 to-amber-600 text-orange-900 shadow-orange-400/20';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div
      className={`
        ${sizes[size]}
        ${getBadgeStyles()}
        rounded-full flex items-center justify-center font-bold shadow-lg
      `}
    >
      #{rank}
    </div>
  );
}
