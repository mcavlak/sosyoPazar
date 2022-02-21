import Router from "../components/Router"
import React from 'react'
import CustomThemeProvider from "./CustomThemeProvider"


const App = () => {

  return (
    <CustomThemeProvider>
      <Router />
    </CustomThemeProvider>
  )
}

export default App