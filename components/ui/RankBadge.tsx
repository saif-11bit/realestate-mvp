interface RankBadgeProps {
  rank: number;
  size?: 'sm' | 'md' | 'lg';
}

export function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const getBadgeStyles = () => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-[#d4a574] to-[#b8956a] text-[#0a0a0a] shadow-[#d4a574]/20';
      case 2:
        return 'bg-gradient-to-br from-gray-400 to-gray-500 text-[#0a0a0a] shadow-gray-400/20';
      case 3:
        return 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-500/20';
      default:
        return 'bg-white/10 text-gray-400 border border-white/20';
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
