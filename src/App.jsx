import { HashRouter, NavLink, Routes, Route,Outlet,useParams  } from 'react-router-dom';
import { useNavigate, } from 'react-router-dom';
import { useState, useEffect} from "react";
import Homepage from './Home';
import Homedefault from './Homedefault';
import Loginpage from './Loginpage';
import Registpage from './Registpage';
import Todopage from './Todopage';
import Pagenotfound from './Pagenotfound';
import './all.css'

function App() {
 

  return (
    <>
      <Routes>
        <Route extra path="/"element={<Homepage/>}>
          <Route path="/" element={<Homedefault/>} />
          <Route path="login" element={<Loginpage/>} />
          <Route path="register" element={<Registpage />} />
        </Route>
        <Route path="/todolist" element={<Todopage/>} />
        <Route path="*" element={<Pagenotfound/>} />
        {/* <Route path="/post1" element={<Post />} >
        <Route path=":postID1" element={<PostID1 />} />
        </Route>
        <Route path="/post2" element={<Post />} >
        <Route path=":postID2" element={<PostID2 />} /> */}
        {/* </Route> */}
    </Routes>
    </>
  )
}

export default App
