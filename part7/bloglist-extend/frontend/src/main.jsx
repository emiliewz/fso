import ReactDOM from 'react-dom/client'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noticeReducer from './reducers/noticeReducer'

const store = createStore(noticeReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider >
)
