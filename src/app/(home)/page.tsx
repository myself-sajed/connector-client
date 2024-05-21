"use client"
import Connector from "./Connector"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from "@/redux/store"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const Home = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 600000
      }
    }
  })

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Connector />
      </QueryClientProvider>
    </ReduxProvider>
  )
}

export default Home
