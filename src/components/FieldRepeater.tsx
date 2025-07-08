import React from 'react';
import PremiumInput from './PremiumInput';

interface FieldRepeaterProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  inputProps?: React.ComponentProps<typeof PremiumInput>;
}

const FieldRepeater: React.FC<FieldRepeaterProps> = ({ label, value, onChange, inputProps }) => {
  const handleChange = (idx: number, val: string) => {
    const next = [...value];
    next[idx] = val;
    onChange(next);
  };
  const handleAdd = () => onChange([...value, '']);
  const handleRemove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-4">
      {value.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <PremiumInput
            {...inputProps}
            label={i === 0 ? label : ''}
            value={v}
            onChange={e => handleChange(i, e.target.value)}
          />
          <button
            type="button"
            className="text-red-500 px-2 py-1 rounded hover:bg-red-50"
            onClick={() => handleRemove(i)}
            aria-label="Remove field"
            disabled={value.length === 1}
          >
            &minus;
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-yellow-600 px-2 py-1 rounded hover:bg-yellow-50 w-fit mt-1"
        onClick={handleAdd}
        aria-label="Add field"
      >
        + Add
      </button>
    </div>
  );
};

export default FieldRepeater; 