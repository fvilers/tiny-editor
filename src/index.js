import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App.js'

const app = document.getElementById('app');

if (app != null) {
  ReactDOM.createRoot(app).render(App())
}
