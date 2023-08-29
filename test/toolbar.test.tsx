import React from 'react'
import { test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toolbar from '../src/Toolbar.js'

const s = new Map<string, string | boolean>()

test('toolbar', () => {
  expect(Toolbar({ state: s, options: ['bold'], onChange: () => { console.log('test') } })).toBeDefined()
})

test('toolbar with button and select', async () => {
  // ARRANGE
  render(<Toolbar state={s} options={['font', 'bold', '|']} onChange={() => { console.log('t2') } } />)

  // ASSERT
  expect(screen.getAllByRole<HTMLButtonElement>('button').length).toBe(1)
})
