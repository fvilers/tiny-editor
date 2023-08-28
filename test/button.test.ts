import { test, expect } from '@jest/globals';
import Button from '../src/components/Button.js'

test('button', () => {
  expect(Button({ title: 'A title', onClick: () => { console.log('a test') } })).toBeDefined()
})
