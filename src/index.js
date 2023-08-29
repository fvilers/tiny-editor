import React from 'react'
import ReactDOM from 'react-dom/client'
import Editor from './Editor.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App (props) {
  return React.createElement(Editor, {
    html: 'A <b>test</b> message',
    onChange: (html) => { console.log('app on change', html) }
  })
}

const app = document.getElementById('app')

if (app != null) {
  ReactDOM.createRoot(app).render(App({}))
}
