import React , {useState,Suspense} from 'react'
import './App.css'
import {GoogleOAuthProvider} from '@react-oauth/google'
// Have to import Login page after
// import Login from './components/Jsx-Files/Login'
const Home =React.lazy(()=>import('./components/UserRouter/JSX/Home')) 
const HomeHost =React.lazy(()=>import('./components/HostRouter/JSX/HomeHost')) 
const About =React.lazy(()=>import('./components/UserRouter/JSX/About')) 
const NoteStateHost =React.lazy(()=>import('./components/HostRouter/JSX/Notestate'))
const ProfileHost=React.lazy(()=>import('./components/HostRouter/JSX/profileHost')) 
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
const ViewBookedHomes=React.lazy(()=>import('./components/UserRouter/JSX/ViewBookedHomes'))
const ToMessage=React.lazy(()=>import('./components/UserRouter/JSX/ToMessage'))
// import  useBackend from './components/UserRouter/JSX/FunctionToBackend'
const Payment=React.lazy(()=>import('./components/UserRouter/JSX/Payment'))
const NoteState=React.lazy(()=>import('./components/UserRouter/JSX/NoteState/NoteState'))

const Profile=React.lazy(()=>import('./components/UserRouter/JSX/profile'))
const FavouriteHomes=React.lazy(()=>import('./components/UserRouter/JSX/FavouriteHomes')) 
import Login from './components/UserRouter/JSX/Login'
const BookedHomes=React.lazy(()=>import('./components/UserRouter/JSX/BookedHomes'))
const SignUp=React.lazy(()=>import('./components/UserRouter/Jsx/SignUp')) 
const HostInterface=React.lazy(()=>import('./components/HostRouter/JSX/HostInterface'))
const TotalMessage=React.lazy(()=>import('./components/UserRouter/JSX/TotalMessage')) 
const TotalMessageHost=React.lazy(()=>import('./components/HostRouter/JSX/TotalMessageHost'))
// import Host from './components/Jsx-Files/HostDetails'
// import User from './components/Jsx-Files/UserInputs'
//  import TwoPage from './components/Jsx-Files/TwoPage'
const HomePersonal=React.lazy(()=>import('./components/UserRouter/JSX/HomePersonal'))
const ToMessageHost=React.lazy(()=>import('./components/HostRouter/JSX/ToMessageHost'))


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <NoteState>
      <NoteStateHost>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path={"/"} element={<Login/>}/> 
        <Route path={"/SignUp"} element={
          <Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><SignUp/></Suspense>}
          /> 
        <Route path={"/home"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><Home/></Suspense>}
          />
          <Route path={"ViewHomesBooked"} element={<Suspense fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }><ViewBookedHomes/></Suspense>}/>
        <Route path={"/About"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><About/></Suspense>}
          />
        <Route path={"/HomePersonal"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><HomePersonal/></Suspense>}
          />
          <Route path={"/ProfileHost"} element={<Suspense fallback={<div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}></div>}><ProfileHost/></Suspense>}/>
        <Route path={"/Favourites"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><FavouriteHomes/></Suspense>}
          />
        <Route path={"/BookedFav"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><BookedHomes/></Suspense>}
          />
        <Route path={"/Host"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><HomeHost/></Suspense>}
          />
        <Route path={"/HostHome"} element={
          <Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
>
            <HostInterface/>
          </Suspense>
        }/>
        <Route path={"/profile"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><Profile/></Suspense>}
          />
        <Route path={"/payment"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><Payment/></Suspense>}
          />
        <Route path={"/PersonalMessage"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><ToMessage/></Suspense>}
          />
        <Route path={"/AllMessages"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><TotalMessage/></Suspense>}
          />
        <Route path={"/HostMessages"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><TotalMessageHost/></Suspense>}
          />
        <Route path={"/ToMessageHost"} element={
<Suspense 
  fallback={
    <div style={{
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width:"100vw",
      backgroundColor: "#282c34"
    }}>
      Loading Host Interface...
    </div>
  }
><ToMessageHost/></Suspense>}
          />
      </Routes>
    </div>
    </BrowserRouter>
    </NoteStateHost>
    </NoteState>
    </GoogleOAuthProvider>
  )
}

export default App
