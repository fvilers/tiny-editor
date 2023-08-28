import React, { type FC } from 'react'
import Editor from './Editor.js'

interface Props {
  title?: string
}

const App: FC<Props> = ({ title }: Props) => {
  return <Editor html='A <b>test</b> message' onChange={(html) => { console.log('app on change', html) }}/>
}

export default App
