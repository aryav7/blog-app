import "./App.css";
import Login from "./components/accounts/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/home/Home";
import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom'
import Header from "./components/header/Header";
import { useState } from "react";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import Update from "./components/create/Update";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

const PrivateRoute = ({isAuthenticated,...props})=>{

  return isAuthenticated?
  <>
        <Header/>
        <Outlet/>
  </>
  :
  <Navigate replace to='/login'/>
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <>
      <DataProvider>
        <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
          <Route exact path="/login" element= {<Login isUserAuthenticated={isUserAuthenticated} />}/>
          
          <Route exact path="/" element= {<PrivateRoute isAuthenticated={isAuthenticated}  />}>
          <Route exact path="/" element= {<Home />}/>
          </Route>

          <Route exact path="/create" element= {<PrivateRoute isAuthenticated={isAuthenticated}  />}>
          <Route exact path="/create" element= {<CreatePost />}/>
          </Route>

          <Route exact path="/details/:id" element= {<PrivateRoute isAuthenticated={isAuthenticated}  />}>
          <Route exact path="/details/:id" element= {<DetailView />}/>
          </Route>

          <Route exact path="/update/:id" element= {<PrivateRoute isAuthenticated={isAuthenticated}  />}>
          <Route exact path="/update/:id" element= {<Update />}/>
          </Route>

          <Route exact path="/about" element= {<PrivateRoute isAuthenticated={isAuthenticated}  />}>
          <Route exact path="/about" element= {<About/>}/>
          </Route>

          <Route exact path="/contact" element= {<PrivateRoute isAuthenticated={isAuthenticated}  />}>
          <Route exact path="/contact" element= {<Contact/>}/>
          </Route>
          </Routes>
        </div>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
