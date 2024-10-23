/**
 * Converts a number (`px`) to a `vh` value
 */
export const vh = (i: number): `${string}vh` => `${0.09259259259259259 * i}vh`;

/**
 * Converts a number (`px`) to a `vmin` value
 */
export const vmin = (i: number): `${string}vmin` =>
  `${0.09259259259259259 * i}vmin`;

/**
 * Converts a number (`px`) to a `vw` value
 */
export const vw = (i: number): `${string}vw` => `${0.05208 * i}vw`;
