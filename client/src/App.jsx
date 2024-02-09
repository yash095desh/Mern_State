import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Layout from './Layout'
import Privatepage from './Components/Privatepage'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'
import Listing from './Pages/Listing'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signIn' element={<SignIn/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/listing/:id' element={<Listing/>}/>
          <Route element={<Privatepage/>} >
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/createListing' element={<CreateListing/>}/>
              <Route path='/editListing/:id' element={<UpdateListing/>} />
          </Route>
      </Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App