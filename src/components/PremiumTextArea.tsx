import React, { useState } from 'react';

export interface PremiumTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const PremiumTextArea: React.FC<PremiumTextAreaProps> = ({ label, error, disabled = false, value, ...props }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || (!!value && value !== '');
  return (
    <div className="relative form-block-spacing font-[Asap]">
      <fieldset
        className={`
          relative rounded-lg border-2 transition-all duration-200
          ${isActive ? 'border-yellow-500' : error ? 'border-red-400' : 'border-gray-200'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          px-2 pt-0 pb-0
        `}
      >
        <legend
          className={`
            px-2 text-sm transition-all duration-200
            ${isActive ? 'text-yellow-600 font-semibold' : 'text-gray-400'}
          `}
          style={{
            fontSize: isActive ? '0.75rem' : '1rem',
            transform: isActive ? 'translateY(-1.2em)' : 'translateY(0.6em)',
            transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
            width: 'auto',
            maxWidth: '100%',
            padding: '0 4px',
            display: 'inline-block',
          }}
        >
          {label}
        </legend>
        <textarea
          className={`
            w-full min-h-[120px] bg-transparent px-2 py-3 rounded-lg outline-none
            text-gray-900 transition-all duration-150 resize-none
            ${error ? 'border-red-400 ring-2 ring-red-200' : ''}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          {...props}
          placeholder={undefined}
          disabled={disabled}
        />
      </fieldset>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default PremiumTextArea;
