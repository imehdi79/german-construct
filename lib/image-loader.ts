'use client'

/**
 * TEMP (test mode): custom next/image loader that swaps EVERY image for a
 * https://placehold.co placeholder, regardless of the original `src`.
 *
 * Wired up via `images.loaderFile` in next.config.ts. Because a custom loader
 * bypasses Next's built-in optimizer, the browser requests these URLs directly.
 *
 * To restore real images: remove `loaderFile` from next.config.ts and delete
 * this file.
 */
interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

export default function placeholderLoader({ width }: LoaderArgs): string {
  // placehold.co only needs a size; use a 3:2 box so non-square layouts look
  // reasonable. `fill` images cover/contain this anyway.
  const height = Math.max(1, Math.round((width * 2) / 3))
  return `https://placehold.co/${width}x${height}`
}
