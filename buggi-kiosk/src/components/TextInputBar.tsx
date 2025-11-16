import { useState } from 'react';

type TextInputBarProps = {
  placeholder?: string;
  onSubmit?: (value: string) => void;
};

const TextInputBar = ({ placeholder = '무엇을 도와드릴까요?', onSubmit }: TextInputBarProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    setValue('');
  };

  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white px-6 py-4 shadow-lg">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="flex-1 border-none text-2xl outline-none placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-2xl bg-buggi-blue px-8 py-3 text-2xl font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-white hover:text-buggi-blue hover:ring-2 hover:ring-buggi-blue"
      >
        전송
      </button>
    </div>
  );
};

export default TextInputBar;

