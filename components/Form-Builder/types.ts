export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "dropzone"
  | "date"
  | "label";

export interface FieldOption {
  label: string;
  value: string;
  hasNote?: boolean;
  note?: string;
}

/** Per-field validation config — kept declarative so it survives schema serialisation. */
export interface FieldValidation {
  /** Minimum string length (text, textarea) or minimum selections (checkbox). */
  min?: number;
  /** Maximum string length (text, textarea) or maximum selections (checkbox). */
  max?: number;
  /** Regex pattern string (text, textarea). */
  pattern?: string;
  /** Human-readable message shown when `pattern` fails. */
  patternMessage?: string;
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  options?: FieldOption[];
  variant?: "normal" | "subtitle"; // used by label field
  required?: boolean;
  validation?: FieldValidation;
  /**
   * For dropzone fields: comma-separated MIME types or file extensions
   * passed directly to the <input accept="…"> attribute.
   * e.g. "image/*,application/pdf"
   * When omitted, any file type is accepted.
   */
  accept?: string;
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
  disabled?: boolean;
  mutex?: boolean; // only one field active at a time
}

export interface FieldComponentProps {
  field: Field;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  /** Validation error for this field (if any). */
  error?: string;
}

// ─── Raw value types as stored in the Zustand store ───────────────────────────
// Components cast richer objects into these union types to match FieldValue.
// Zod schemas handle the coercion back to typed shapes during validation.

export type FieldValue = string | string[];
export type FormValues = Record<string, FieldValue>;
