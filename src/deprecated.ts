export const execCommand = (command: string, showUI?: boolean, value?: string): boolean => document.execCommand(command, showUI, value)

export const queryCommandState = (command: string): boolean => document.queryCommandState(command)

export const queryCommandValue = (command: string): string => document.queryCommandValue(command)
