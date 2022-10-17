import React, { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import doodle from "../images/doodle.png";
import ShowPosts from "../Components/ShowPosts";
import arrowdown from "../images/arrowdown.gif";
import gify from "../images/giphy.gif";
import { Link, Navigate, useNavigate } from "react-router-dom";
export default function Home() {
  let navigate = useNavigate();
  let appContext = useContext(AppContext);
  let [buttonClicked, setButtonClicked] = useState(false);
  return (
    <div>
      <div className=" bgcolor min-h-screen text-white flex  gap-x-20 justify-between wrapup ">
        <div className="flex flex-col">
          <h1 className="text-4xl main-heading roboto semi pl-28 mt-28">
            BlogWiz
          </h1>
          <p className=" text-6xl second-heading roboto pl-28 mt-16 ">
            {" "}
            Be Nerdy, Stay Wordy
          </p>
          <p className="pl-28 mt-5 para-main">Login to Create your Posts </p>
          <div className="para-main flex gap-x-10 ">
            <button
              onClick={() => {
                setButtonClicked(true);
                navigate("/login");
              }}
              className="ml-28 bg-white w-32 p-3 mt-10 h-16 text-black buttonsign rounded-2xl"
            >
              Login/SignUp
            </button>
            <a href="#post-area">
              <img className="w-16 h-16 mt-10" src={arrowdown} />
            </a>
          </div>
        </div>

        <div>
          <a></a>
        </div>
        <div className="w-1/2 doodly ">
          <img className="w-full h-screen bgimage" src={gify} />
        </div>
      </div>
      <div id="post-area" className="w-full flex bg-gray-100">
        <div className="ml-24 w-full min-h-screen overflow-x-hidden outlet-size">
          <ShowPosts />
        </div>
      </div>
    </div>
  );
}
