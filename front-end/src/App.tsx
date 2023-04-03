import { ToastContainer } from "react-toastify"
import Routes from "./routes"
import { injectStyle } from "react-toastify/dist/inject-style"

const App = () => {
  injectStyle()
  
  return (
    <div>
      <ToastContainer/>
      <Routes/>
    </div>
  )
}

export default App