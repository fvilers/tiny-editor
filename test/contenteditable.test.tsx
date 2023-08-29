import React from 'react'
import { test, expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContentEditable, { replaceCaret } from '../src/ContentEditable.js'

test('content editable renders', () => {
  render(<ContentEditable html='Hello' onChange={() => { console.log('test') } }/>)
  expect(screen.findByText<HTMLDivElement>('Hello')).toBeDefined()
})

test('replaceCaret', async () => {
  render(<ContentEditable html='Hello' onChange={() => { console.log('test') } }/>)
  const div = await screen.findByText<HTMLDivElement>('Hello')
  fireEvent.focus(div)
  replaceCaret(div)
  expect(screen.findByText<HTMLDivElement>('Hello')).toBeDefined()
})

test('type', async () => {
  render(<ContentEditable html='Hello' onChange={() => { console.log('test') } }/>)
  const div = await screen.findByText<HTMLDivElement>('Hello')
  fireEvent.focus(div)
  fireEvent.keyDown(div, { key: 'A', code: 'KeyA' })
  fireEvent.keyUp(div, { key: 'A', code: 'KeyA' })
  expect(screen.findByText<HTMLDivElement>('HelloA')).toBeDefined()
})

test('function ref', async () => {
  render(<ContentEditable
    html='Hello' onChange={() => { console.log('test') } }
    innerRef={() => { console.log('test') } }
  />)
  const div = await screen.findByText<HTMLDivElement>('Hello')
  expect(div).toBeDefined()
})
