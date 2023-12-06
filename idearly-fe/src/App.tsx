import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routing'
import GlobalStyle from './styles/global'
import { ThemeProvider } from '@emotion/react'
import theme from './styles/theme'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

export default App
