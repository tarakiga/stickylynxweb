import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';

export interface PremiumImageDropzoneProps {
  disabled?: boolean;
  value?: string | null;
  onChange?: (file: File) => void;
}

const PremiumImageDropzone: React.FC<PremiumImageDropzoneProps> = ({ disabled = false, value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange?.(file);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange?.(file);
    }
  };
  return (
    <div
      className={`font-[Asap] flex items-center border-2 border-dashed rounded-2xl px-4 py-3 bg-gray-50 transition-all duration-200 shadow-lg relative group min-h-[56px] ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 focus-within:border-yellow-500'}`}
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      aria-disabled={disabled}
    >
      {preview ? (
        <Image src={preview} alt="Preview" width={80} height={80} className="w-20 h-20 object-cover rounded-xl shadow mr-4" />
      ) : (
        <UploadCloud size={28} className="text-yellow-400 mr-3 flex-shrink-0" />
      )}
      <div className="flex flex-col justify-center">
        <span className="text-gray-700 font-medium leading-tight">{preview ? 'Change Image' : 'Drag & drop or click to upload'}</span>
        <span className="text-xs text-gray-400 leading-tight">PNG, JPG, GIF up to 5MB</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
      {disabled && <div className="absolute inset-0 bg-white/60 rounded-2xl" />}
    </div>
  );
};

export default PremiumImageDropzone; 