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

export function subset<T>(a: T[], subsetSize: number): T[] {
  if (!Array.isArray(a)) {
    throw Error('Must provide an array')
  }
  const n = a.length
  if (subsetSize < 1 || subsetSize > n) {
    throw Error('Subset size must be positive and cannot exceed array size')
  }

  const s = new Set<number>()
  while (s.size != subsetSize) {
    const i = Math.floor(Math.random() * n)
    s.add(i)
  }

  return Array.from(s).map((index) => a[index])
}

export function capitalize(s: string): string {
  if (typeof s != 'string') {
    throw Error('Input must be a string')
  }
  return s.length == 0 ? s : s[0].toUpperCase() + s.substring(1)
}
