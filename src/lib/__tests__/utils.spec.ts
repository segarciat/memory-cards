import { expect, test } from 'vitest'
import { shuffleArray } from '../utils'

test('Shuffles array in-place without changing the actual elements', () => {
    let a = [5, 1, 3, 7];

    shuffleArray(a);

    expect(new Set(a)).toStrictEqual(new Set([1, 3, 5, 7]))
})