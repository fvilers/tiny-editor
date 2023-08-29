import { test, expect } from '@jest/globals';
import Select from '../src/Select.js';

test('button', () => {
  expect(Select({ title: 'A title', options: [], defaultValue: '', onChange: () => { console.log('test') } })).toBeDefined()
})
