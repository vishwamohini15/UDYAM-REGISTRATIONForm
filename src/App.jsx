import { useState } from 'react'
import './App.css'
import UdyamForm from './component/UdyamForm'
import UdyamNavbar from './component/UdyamNavbar'
import UdyamFooter from './component/UdyamFooter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="main">
       <UdyamNavbar></UdyamNavbar>
        <div className='headline'>
          UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME</div>

        <UdyamForm></UdyamForm>

        <UdyamFooter></UdyamFooter>
       

    </div>
  )
}

export default App
