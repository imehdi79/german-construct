"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, ImageIcon } from "lucide-react";
import { inputClass } from "./fields";
import { cn } from "@/lib/utils";

/**
 * Admin image field: drag-and-drop / click to upload an image, which is stored
 * server-side and its public URL written back via `onChange`. The resolved path
 * stays editable in a text input (so an existing /gallery/… path can be kept or
 * a URL pasted manually). Shows a live preview.
 */
export function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File | null | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: data });
      const result = await res.json();
      if (result.success && result.url) onChange(result.url);
      else setError(result.message ?? "Upload fehlgeschlagen.");
    } catch {
      setError("Upload fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-xs font-medium text-gray-600">{label}</span>

      <div className="flex items-start gap-3">
        {/* Preview */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" sizes="80px" unoptimized />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <ImageIcon size={22} />
            </div>
          )}
        </div>

        {/* Dropzone */}
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors",
            busy ? "border-aman-gold/50 bg-aman-gold/5" : "border-gray-200 hover:border-aman-gold",
          )}
        >
          {busy ? (
            <Loader2 size={18} className="animate-spin text-aman-gold" />
          ) : (
            <Upload size={18} className="text-gray-400" />
          )}
          <span className="text-xs text-gray-500">
            {busy ? "Wird hochgeladen…" : "Bild hochladen oder hierher ziehen"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="sr-only"
            disabled={busy}
          />
        </label>
      </div>

      {/* Editable path (keep existing /gallery/… paths or paste a URL) */}
      <input
        type="text"
        value={value}
        placeholder="/uploads/… oder /gallery/…"
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
