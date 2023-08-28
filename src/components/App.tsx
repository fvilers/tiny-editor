import React, { type FunctionComponent } from 'react'
import Editor from './Editor.js'

const App: FunctionComponent<null> = () => {
  return <Editor html='A <b>test</b> message' onChange={(html) => { console.log('app on change', html) }}/>
}

export default App
