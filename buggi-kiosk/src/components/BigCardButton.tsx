type BigCardButtonProps = {
  icon: string;
  title: string;
  description: string;
  iconColor?: 'green' | 'orange';
  requiresLogin?: boolean;
};

const BigCardButton = ({ icon, title, description, iconColor = 'green', requiresLogin = false }: BigCardButtonProps) => {
  const iconBgColor = iconColor === 'green' 
    ? 'bg-green-500' 
    : 'bg-orange-500';

  return (
    <button
      type="button"
      className="group relative flex h-full w-full flex-col items-start justify-between overflow-hidden rounded-2xl bg-white p-8 text-left shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:border-2 hover:border-orange-400 active:scale-[0.98]"
    >
      {/* 로그인 필요 태그 */}
      {requiresLogin && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
          로그인 필요
        </div>
      )}

      {/* 상단: 아이콘 */}
      <div className="flex w-full items-start">
        <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-xl ${iconBgColor} text-white shadow-lg transition-transform duration-200 group-hover:scale-110`}>
          <span className="text-5xl">{icon}</span>
        </div>
      </div>

      {/* 하단: 텍스트 */}
      <div className="mt-6 flex w-full flex-1 flex-col justify-end">
        <h3 className="text-3xl font-bold text-gray-900 leading-tight">{title}</h3>
        <p className="mt-3 text-xl text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* 호버 시 오렌지 강조선 */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-200 group-hover:w-full" />
    </button>
  );
};

export default BigCardButton;

