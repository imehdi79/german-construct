/**
 * Monotonic id generator for form-builder schemas.
 *
 * Uses a module-level counter rather than `Math.random`/`crypto` on purpose:
 * schemas call `generateId()` at module-evaluation time, and the same modules
 * are evaluated in the same import order on both the server and the client.
 * A deterministic counter therefore yields identical ids on each side, which
 * keeps React hydration stable (ids end up on `<label htmlFor>` / `<input id>`).
 */
let counter = 0

export function generateId(): string {
  counter += 1
  return `fb-${counter}`
}
