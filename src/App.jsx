// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Fragment } from "react"
import { Route, Routes } from "react-router-dom"
import ProductListPage from "./pages/productList"
import ProductDetailsPage from "./pages/productDetail"
import CartListPage from "./pages/cartList"

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button className='bg-black text-white font-bold' onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>

    <Fragment>
      <Routes>
        <Route path="/product-list" element={<ProductListPage/>}/>
        <Route path="/product-list/:id" element={<ProductDetailsPage/>}/>
        <Route path="/cart" element={<CartListPage/>}/>
      </Routes>
    </Fragment>
  )
}

export default App
