import React, { useRef, useState } from 'react';
import PremiumInput from './PremiumInput';

interface ChipsInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

const ChipsInput: React.FC<ChipsInputProps> = ({ label, value, onChange, placeholder }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addChip = (chip: string) => {
    const trimmed = chip.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      addChip(input);
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      // Remove last chip on backspace
      onChange(value.slice(0, -1));
    }
  };

  const removeChip = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium mb-1">{label}</label>
      <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-2 py-2 bg-white min-h-[48px]">
        {value.map((chip, i) => (
          <span key={chip + i} className="flex items-center bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm font-medium">
            {chip}
            <button
              type="button"
              className="ml-2 text-yellow-600 hover:text-red-500 focus:outline-none"
              onClick={() => removeChip(i)}
              aria-label={`Remove ${chip}`}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="flex-1 min-w-[120px] border-none outline-none bg-transparent text-gray-900 py-1 px-2"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default ChipsInput; 