type AiWaveProps = {
  status?: 'idle' | 'listening' | 'thinking' | 'speaking';
};

const statusText: Record<NonNullable<AiWaveProps['status']>, string> = {
  idle: '대기 중',
  listening: '음성 인식 중...',
  thinking: '이해하는 중...',
  speaking: '답변 중...'
};

const AiWave = ({ status = 'idle' }: AiWaveProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-8 py-10 shadow-lg">
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl bg-buggi-blue/5">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className="mx-2 h-16 w-3 rounded-full bg-buggi-blue"
            style={{
              animation: `wave 1.2s ease-in-out ${index * 0.12}s infinite`,
              transformOrigin: 'center bottom'
            }}
          />
        ))}
      </div>
      <p className="text-2xl font-semibold text-buggi-blue">{statusText[status]}</p>
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
            50% { transform: scaleY(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default AiWave;

