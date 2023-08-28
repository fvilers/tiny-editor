import React, { type FC } from 'react'
import Editor from './Editor.js'

const App: FC<null> = () => {
  return <Editor html='A <b>test</b> message' onChange={(html) => { console.log('app on change', html) }}/>
}

export default App
