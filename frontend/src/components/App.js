import Router from "../components/Router"
import React from 'react'
import CustomThemeProvider from "./CustomThemeProvider"
import ApiProvider from "../api/ApiProvider"
import { SnackbarProvider } from 'notistack';


const App = () => {

  return (
    <CustomThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <ApiProvider>
          <Router />
        </ApiProvider>
      </SnackbarProvider>
    </CustomThemeProvider>
  )
}

export default App