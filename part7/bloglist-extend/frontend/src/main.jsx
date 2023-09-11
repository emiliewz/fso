import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { InfoContextProvider } from './InfoContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <InfoContextProvider>
        <App />
    </InfoContextProvider>
)