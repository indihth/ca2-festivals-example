import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// import components
import Navbar from "./components/Navbar";

// import pages
import Home from "./pages/Home";
import FestivalsIndex from "./pages/festivals/Index";
import FestivalsShow from "./pages/festivals/Show";
import FestivalsCreate from "./pages/festivals/Create";
import FestivalsEdit from "./pages/festivals/Edit";
import PageNotFound from "./pages/PageNotFound";
import LoginForm from "./components/LoginForm";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  let protectedRoutes;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    // Only is authenticated, stores token in local storage so persists on page refresh
    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  // Only show protected routes if user is authenticated
  if (authenticated) {
    protectedRoutes = (
      <>
        <Route path="/festivals/create" element={<FestivalsCreate />} />
        <Route path="/festivals/:id/edit" element={<FestivalsEdit />} />
        <Route path="/festivals/:id" element={<FestivalsShow />} />
      </>
    );
  }
  // else {
  //   protectedRoutes = (
  //     <>
  //       <Route path="/festivals/create" element={<Navigate to="/" />} />
  //       <Route path="/festivals/:id/edit" element={<Navigate to="/" />} />
  //       <Route path="/festivals/:id" element={<Navigate to="/" />} />
  //     </>
  //   );
  // }

  return (
    <Router>
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated} />
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} /> } />
        <Route path="/festivals" element={<FestivalsIndex authenticated={authenticated} />} />
        {protectedRoutes}

        {/* <Route path="/festivals/create" element={(authenticated) ? (<FestivalsCreate />) : (<Navigate to="/" />)} /> */}
        {/* <Route path="/festivals/:id/edit" element={(authenticated) ? <FestivalsEdit /> : <Navigate to="/" />} />
        <Route path="/festivals/:id" element={(authenticated) ? <FestivalsShow /> : <Navigate to="/" />} /> */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
