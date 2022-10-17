import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin";
import "./App.css";
import AppContext from "./Context/AppContext";
import Home from "./Pages/Home";
import LoginUI from "./Pages/LoginUI";
import SinglePost from "./Components/SinglePost";
import Editor2 from "./Components/Editor2";
import ShowPosts from "./Components/ShowPosts";
import EditPost from "./Components/EditPost";
import Error404 from "./Pages/Error404";

function App() {
  let appContext = useContext(AppContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={appContext.auth ? <Admin /> : <Home />}>
          <Route index element={appContext.auth ? <ShowPosts /> : <Home />} />
        </Route>
        <Route path="singlepost/:id" element={<SinglePost />} />
        <Route
          path="/Admin"
          element={appContext.auth ? <Admin /> : <LoginUI />}
        >
          <Route index element={<ShowPosts />} />
          <Route path="/Admin/newpost" element={<Editor2 />} />
          <Route path="/Admin/allposts" element={<ShowPosts />} />
          <Route path="/Admin/singlepost/:id" element={<SinglePost />} />
          <Route path="/Admin/editpost/:id" element={<EditPost />} />
        </Route>
        <Route
          path="/login"
          element={appContext.auth ? <Admin /> : <LoginUI />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
