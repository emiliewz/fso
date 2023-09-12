import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
import { InfoContextProvider } from './InfoContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <InfoContextProvider>
        <App />
      </InfoContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)