import './App.css'
// Have to import Login page after
// import Login from './components/Jsx-Files/Login'
import Home from './components/UserRouter/JSX/Home'
import HomeHost from './components/HostRouter/JSX/HomeHost'
import About from './components/UserRouter/JSX/About'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import NoteState from './components/UserRouter/JSX/NoteState/NoteState'

import FavouriteHomes from './components/UserRouter/JSX/FavouriteHomes'
import Login from './components/UserRouter/JSX/Login'
import BookedHomes from './components/UserRouter/JSX/BookedHomes'
import SignUp from './components/UserRouter/Jsx/SignUp'
// import Host from './components/Jsx-Files/HostDetails'
// import User from './components/Jsx-Files/UserInputs'
//  import TwoPage from './components/Jsx-Files/TwoPage'
import PrivateFavourite from './components/UserRouter/JSX/PrivateFavourite'

function App() {
  return (
    <NoteState>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path={"/"} element={<Login/>}/> 
        <Route path={"/SignUp"} element={<SignUp/>}/> 
        <Route path={"/home"} element={<Home/>}/>
        <Route path={"/About"} element={<About/>}/>
        <Route path={"/FavouriteHome"} element={<PrivateFavourite/>}/>
        <Route path={"/Favourites"} element={<FavouriteHomes/>}/>
        <Route path={"/BookedFav"} element={<BookedHomes/>}/>
        <Route path={"/Host"} element={<HomeHost/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
  )
}

export default App
