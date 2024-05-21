"use client"
import Connector from "./Connector"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from "@/redux/store"

const Home = () => {
  return (
    <ReduxProvider store={store}>
      <Connector />
    </ReduxProvider>
  )
}

export default Home
