import React from 'react'
import { jest, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/components/App.js'

global.document.execCommand = jest.fn<() => boolean>()
global.document.queryCommandState = jest.fn<() => boolean>()
global.document.queryCommandValue = jest.fn<() => string>()

test('app renders', () => {
  render(<App />)

  expect(screen.getAllByRole<HTMLButtonElement>('button').length).toBe(11)
})
