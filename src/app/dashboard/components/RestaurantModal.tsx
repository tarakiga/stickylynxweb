"use client";
import { useState, useEffect, useRef, ChangeEvent, DragEvent } from "react";

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
}

interface RestaurantModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: RestaurantData) => void;
  initialData?: RestaurantData;
  mode: "create" | "edit";
}

const CLOUDINARY_CLOUD_NAME = "dqyiibusv";
const CLOUDINARY_UPLOAD_PRESET = "sticky";

function useCloudinaryUpload(
  initialUrl?: string
): [string | undefined, boolean, string | null, (file: File) => void, (e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => void] {
  const [url, setUrl] = useState<string | undefined>(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setUrl(data.secure_url);
      } else {
        setError("Upload failed");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to upload');
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (file: File) => {
    uploadToCloudinary(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
    let file: File | undefined;
    if ("dataTransfer" in e && e.dataTransfer?.files?.[0]) {
      file = e.dataTransfer.files[0];
    } else if ("target" in e && (e.target as HTMLInputElement).files?.[0]) {
      file = (e.target as HTMLInputElement).files![0];
    }
    if (file) handleFile(file);
  };

  return [url, uploading, error, handleFile, handleChange];
}

export default function RestaurantModal({ open, onClose, onSave, initialData, mode }: RestaurantModalProps) {
  const [form, setForm] = useState<RestaurantData>(
    initialData || { name: "", description: "", address: "", phone: "", email: "", website: "", opening_hours: {}, logo_url: "", cover_image_url: "" }
  );
  const ref = useRef<HTMLDivElement>(null);

  // Logo upload
  const [logoUrl, logoUploading, logoError, , handleLogoChange] = useCloudinaryUpload(form.logo_url);
  // Cover image upload
  const [coverUrl, coverUploading, coverError, , handleCoverChange] = useCloudinaryUpload(form.cover_image_url);

  useEffect(() => {
    if (open) setForm(initialData || { name: "", description: "", address: "", phone: "", email: "", website: "", opening_hours: {}, logo_url: "", cover_image_url: "" });
  }, [open, initialData]);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setForm(f => ({ ...f, logo_url: logoUrl }));
  }, [logoUrl]);
  useEffect(() => {
    setForm(f => ({ ...f, cover_image_url: coverUrl }));
  }, [coverUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" tabIndex={-1} ref={ref}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative" role="dialog" aria-modal="true">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" aria-label="Close">&times;</button>
        <h2 className="text-xl font-bold mb-4">{mode === "create" ? "Create New Restaurant" : "Edit Restaurant"}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col gap-3"
        >
          <input
            className="border rounded px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Description"
            value={form.description || ""}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Address"
            value={form.address || ""}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Phone"
            value={form.phone || ""}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={form.email || ""}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Website"
            value={form.website || ""}
            onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
          />

          {/* Logo Upload */}
          <div
            className="border-2 border-dashed rounded px-3 py-4 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            tabIndex={0}
            onDrop={e => {
              e.preventDefault();
              handleLogoChange(e);
            }}
            onDragOver={e => e.preventDefault()}
            onClick={() => (document.getElementById("logo-upload") as HTMLInputElement)?.click()}
            aria-label="Upload logo"
          >
            {logoUploading ? (
              <span className="text-blue-600">Uploading...</span>
            ) : logoUrl ? (
              <img src={logoUrl} alt="Logo preview" className="h-16 w-16 object-contain mb-2" />
            ) : (
              <span className="text-gray-400">Drag & drop logo or click to browse</span>
            )}
            {logoError && <span className="text-red-600 text-xs mt-1">{logoError}</span>}
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
              tabIndex={-1}
            />
          </div>

          {/* Cover Image Upload */}
          <div
            className="border-2 border-dashed rounded px-3 py-4 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            tabIndex={0}
            onDrop={e => {
              e.preventDefault();
              handleCoverChange(e);
            }}
            onDragOver={e => e.preventDefault()}
            onClick={() => (document.getElementById("cover-upload") as HTMLInputElement)?.click()}
            aria-label="Upload cover image"
          >
            {coverUploading ? (
              <span className="text-blue-600">Uploading...</span>
            ) : coverUrl ? (
              <img src={coverUrl} alt="Cover preview" className="h-24 w-full object-cover mb-2 rounded" />
            ) : (
              <span className="text-gray-400">Drag & drop cover image or click to browse</span>
            )}
            {coverError && <span className="text-red-600 text-xs mt-1">{coverError}</span>}
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
              tabIndex={-1}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium" disabled={logoUploading || coverUploading}>
              {mode === "create" ? "Create" : "Save"}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 font-medium">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 