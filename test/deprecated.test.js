import { jest, test, expect } from '@jest/globals'
import { execCommand, queryCommandState, queryCommandValue } from '../src/deprecated.js'

global.document.execCommand = jest.fn()
global.document.queryCommandState = jest.fn()
global.document.queryCommandValue = jest.fn()

test('exec', () => {
  expect(execCommand).toBeDefined()
  execCommand('bold', false, false)
  expect(global.document.execCommand).toBeCalled()
})

test('queryState', () => {
  expect(queryCommandState).toBeDefined()
  queryCommandState('bold')
  expect(global.document.queryCommandState).toBeCalled()
})

test('queryValue', () => {
  expect(queryCommandValue).toBeDefined()
  queryCommandValue('fontname')
  expect(global.document.queryCommandValue).toBeCalled()
})
