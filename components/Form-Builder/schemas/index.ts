import { bodenarbeitenSchema } from "./groundWork";
import { fugenarbeitenSchema } from "./jointingWork";
import { naturalStoneWorkschema } from "./naturalStoneWork";
import { estricharbeitenSchema } from "./screedWork";
import { fliesenarbeitenSchema } from "./tilingwork";
import { fußbodenheizungSchema } from "./underfloorHeating";

export const formSchemas = {
  Bodenarbeiten: bodenarbeitenSchema,
  Estricharbeiten: estricharbeitenSchema,
  Fliesenarbeiten: fliesenarbeitenSchema,
  Fugenarbeiten: fugenarbeitenSchema,
  Fußbodenheizung: fußbodenheizungSchema,
  Natursteinarbeiten: naturalStoneWorkschema,
} satisfies Record<string, unknown>;
