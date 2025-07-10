"use client";
import { useState, useEffect, useRef } from "react";
import PremiumModal from '@/components/PremiumModal';
import PremiumInput from '../../../components/PremiumInput';
import PremiumTextArea from '@/components/PremiumTextArea';
import PremiumImageDropzone from '@/components/PremiumImageDropzone';
import PremiumButton from '../../../components/PremiumButton';
import ChipsInput from '@/components/ChipsInput';
import type { Restaurant } from "./RestaurantList";

interface RestaurantData {
  id?: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  opening_hours?: unknown;
  logo_url?: string;
  cover_image_url?: string;
  emails?: string[];
  phones?: string[];
}

interface RestaurantModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: RestaurantData) => Promise<Restaurant>;
  initialData?: RestaurantData;
  mode: "create" | "edit";
}

const CLOUDINARY_CLOUD_NAME = "dqyiibusv";
const CLOUDINARY_UPLOAD_PRESET = "sticky";

export default function RestaurantModal({ open, onClose, onSave, initialData, mode }: RestaurantModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const normalize = (data?: RestaurantData): RestaurantData => ({
    ...data,
    name: data?.name ?? '',
    emails: data?.emails || [],
    phones: data?.phones || [],
  });
  const [form, setForm] = useState<RestaurantData>(normalize(initialData) || { name: "", description: "", address: "", phones: [], emails: [], website: "", opening_hours: {}, logo_url: "", cover_image_url: "" });
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const ref = useRef<HTMLDivElement>(null);

  // Logo upload
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);

  // Cover image upload
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(normalize(initialData) || { name: "", description: "", address: "", phones: [], emails: [], website: "", opening_hours: {}, logo_url: "", cover_image_url: "" });
      setStep(1);
    }
  }, [open, initialData]);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  // Progress indicator
  const progress = (step / totalSteps) * 100;

  // Step validation
  const canGoNext1 = form.name.trim().length > 0;
  const canGoNext2 = true; // No required fields on media step

  const handleLogoChange = async (file: File) => {
    setLogoError(null);
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm(prev => ({ ...prev, logo_url: data.secure_url }));
      } else {
        throw new Error('No URL returned');
      }
    } catch {
      setLogoError('Failed to upload logo. Please try again.');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleCoverChange = async (file: File) => {
    setCoverError(null);
    setCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm(prev => ({ ...prev, cover_image_url: data.secure_url }));
      } else {
        throw new Error('No URL returned');
      }
    } catch {
      setCoverError('Failed to upload cover image. Please try again.');
    } finally {
      setCoverUploading(false);
    }
  };

  return (
    <PremiumModal isOpen={open} onClose={onClose}>
      <div className="w-full">
        <div className="flex items-center mb-4">
          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-2 rounded-full bg-yellow-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="ml-4 text-xs text-gray-500">Step {step} of {totalSteps}</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{mode === "create" ? "Create new menu" : "Edit Restaurant"}</h2>
        <form
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (step === 1 && canGoNext1) {
              setStep(2);
            } else if (step === 2 && canGoNext2) {
              setStep(3);
            } else if (step === 3) {
              setSubmitting(true);
              try {
                // Save restaurant and get ID
                const saved = await onSave(form as RestaurantData);
                if (saved && saved.id) {
                  setForm(f => ({ ...f, id: saved.id }));
                  onClose();
                } else {
                  // fallback: reload or show error
                  alert('Failed to save restaurant.');
                }
              } finally {
                setSubmitting(false);
              }
            }
          }}
          className="flex flex-col gap-2"
        >
          {step === 1 && (
            <>
              <div className="mb-2 text-lg font-semibold">Information</div>
              <div className="form-block-spacing">
                <div className="text-xs text-gray-500 ml-1">What is the name of your restaurant/cafe etc?</div>
                <PremiumInput
                  label="Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-block-spacing">
                <div className="text-xs text-gray-500 ml-1">Describe your business</div>
                <PremiumTextArea
                  label="Description"
                  value={form.description || ""}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="flex justify-end mt-2">
                <PremiumButton type="submit" variant="secondary" disabled={!canGoNext1}>
                  Next
                </PremiumButton>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-2 text-lg font-semibold">Media</div>
              <div className="form-block-spacing">
                <label className="text-sm font-medium text-gray-700 mb-1">Logo</label>
                <PremiumImageDropzone
                  disabled={logoUploading}
                  value={form.logo_url || ''}
                  onChange={handleLogoChange}
                />
                {logoUploading && (
                  <div className="text-xs text-gray-500 mt-1">Uploading logo...</div>
                )}
                {logoError && (
                  <div className="text-xs text-red-500 mt-1">{logoError}</div>
                )}
              </div>
              <div className="form-block-spacing">
                <label className="text-sm font-medium text-gray-700 mb-1">Header Image</label>
                <PremiumImageDropzone
                  disabled={coverUploading}
                  value={form.cover_image_url || ''}
                  onChange={handleCoverChange}
                />
                {coverUploading && (
                  <div className="text-xs text-gray-500 mt-1">Uploading cover image...</div>
                )}
                {coverError && (
                  <div className="text-xs text-red-500 mt-1">{coverError}</div>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <PremiumButton type="button" variant="secondary" onClick={() => setStep(1)}>
                  Back
                </PremiumButton>
                <PremiumButton type="submit" variant="secondary">
                  Next
                </PremiumButton>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-2 text-lg font-semibold">Contact</div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col">
                  <div className="form-block-spacing">
                    <PremiumInput
                      label="Address"
                      value={form.address || ""}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    />
                  </div>
                  <div className="form-block-spacing">
                    <PremiumInput
                      label="Website"
                      value={form.website || ""}
                      onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="form-block-spacing">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Phones</span>
                      <span className="text-xs text-gray-400">Add phone and press Enter</span>
                    </div>
                    <ChipsInput
                      label=""
                      value={form.phones || []}
                      onChange={phones => setForm(f => ({ ...f, phones }))}
                      placeholder="Add phone"
                    />
                  </div>
                  <div className="form-block-spacing">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">Emails</span>
                      <span className="text-xs text-gray-400">Add email and press Enter</span>
                    </div>
                    <ChipsInput
                      label=""
                      value={form.emails || []}
                      onChange={emails => setForm(f => ({ ...f, emails }))}
                      placeholder="Add email"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <PremiumButton type="button" variant="secondary" onClick={() => setStep(2)}>
                  Back
                </PremiumButton>
                <PremiumButton type="submit" variant="secondary" disabled={submitting}>
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    mode === "create" ? "Create" : "Save Changes"
                  )}
                </PremiumButton>
              </div>
            </>
          )}
        </form>
      </div>
    </PremiumModal>
  );
} 