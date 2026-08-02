import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./Routes"

import AuthProvider from "./Contexts/auth"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={2000}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
