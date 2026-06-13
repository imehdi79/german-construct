import { germanCities } from "./germanCities";
import type { FieldOption } from "@/components/Form-Builder/types";

/**
 * Options for the "Auftragsort" location field — every German city from
 * `germanCities`, sorted alphabetically (German locale), with a trailing
 * "Sonstiger Ort" escape hatch. Rendered as an autocomplete so the long list
 * stays searchable.
 */
export const locationOptions: FieldOption[] = [
  ...[...germanCities]
    .sort((a, b) => a.localeCompare(b, "de"))
    .map((city) => ({ label: city, value: city })),
  { label: "Sonstiger Ort", value: "Sonstiger Ort" },
];
