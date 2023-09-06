import React from 'react'
import FormData from './components/FormData.js';
import Nav from './components/Nav.js';
import './index.css'

function App() {
  
  return (
    <div>
      <div className='d-flex justify-content-center mt-3 mb-4'>
        <Nav></Nav>
      </div>
      <div className='d-flex mt-3 justify-content-center row gy-3'>
        <FormData /> 
      </div>
    </div>
  )
}

export default App