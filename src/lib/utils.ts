/**
 * Shuffles an array in-place.
 * @param a The array to be shuffled in-place.
 */
export function shuffleArray<T>(a: T[]) {
  if (!Array.isArray(a)) {
    throw Error('Invalid input: not an array')
  }
  // Implement shuffle algorithm as in StdRandom in the book Algorithms (4th edition) by Sedgewick and Wayne
  const n = a.length
  for (let i = 0; i < n; i++) {
    const r = i + Math.floor(Math.random() * (n - i))
    // swap
    const temp = a[i]
    a[i] = a[r]
    a[r] = temp
  }
}

/**
 * Create an array containing a random subset of the elements of `a` of size `subsetSize`.
 * @param a The source array.
 * @param subsetSize The desired number of elements in the result.
 * @returns An array with `subsetSize` random elemets of `a`.
 */
export function subset<T>(a: T[], subsetSize: number): T[] {
  if (!Array.isArray(a)) {
    throw Error('Must provide an array')
  }

  const n = a.length
  if (subsetSize < 1 || subsetSize > n) {
    throw Error('Subset size must be positive and cannot exceed array size')
  }

  const aCopy = a.slice()
  shuffleArray(aCopy)
  return aCopy.slice(0, subsetSize);
}

/**
 * Capitalizes a string, making its character uppercase and remaining lowercase.
 * @param s A string.
 * @returns A capitalized version of `s`.
 * @example
 * capitalize('meMoRy') // 'Memory'
 */
export function capitalize(s: string): string {
  if (typeof s != 'string') {
    throw Error('Input must be a string')
  }
  return s.length == 0 ? s : s[0].toUpperCase() + s.substring(1).toLowerCase()
}
