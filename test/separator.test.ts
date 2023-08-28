import { test, expect } from '@jest/globals';
import Separator from '../src/components/Separator.js'

test('button', () => {
  expect(Separator({ title: 'A title', onClick: () => { console.log('a test') } })).toBeDefined()
})
