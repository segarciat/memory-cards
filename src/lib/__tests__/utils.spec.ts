import { expect, test } from 'vitest'
import { capitalize, shuffleArray, subset } from '../utils'

test('Shuffles array in-place without changing the actual elements', () => {
    let a = [5, 1, 3, 7];

    shuffleArray(a);

    expect(new Set(a)).toStrictEqual(new Set([1, 3, 5, 7]))
})

test('Array subset has desired size', () => {
    let a = [5, 2, 3, 11, 7]
    let subsetSize = 3

    let result = subset(a, subsetSize)

    expect(result.length).toBe(subsetSize)
})

test('Array subset contains a subset of the elements of the source', () => {
    let a = [5, 2, 3, 11, 7]
    let subsetSize = 3

    let result = subset(a, subsetSize)

    expect(a).containSubset(result)
})

test('Capitalizing makes first letter uppercase and rest lowercase', () => {
    let result = capitalize('meMoRy')

    expect(result).toBe('Memory')
})