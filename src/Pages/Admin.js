import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import bloglogo from "../images/blogwiz.png";

export default function Admin() {
  let navigate = useNavigate();
  let appContext = useContext(AppContext);
  function clickLogOut() {
    appContext.logout();
    navigate("/");
  }

  return (
    <div>
      <div className=" flex ">
        <div className="w-24 fixed  min-h-screen shadow-md bg-gray-50 normal-size">
          <div className="ml-4 mt-3 mb-3 flex ">
            <img className=" h-20 w-20 " alt="something" src={bloglogo} />
          </div>
          <hr />
          <div>
            <div className="relative mt-20 flex-1 px-4 sm:px-6 flex flex-col justify-between h-96">
              <div className=" text-xl font-semibold ml-4">
                <div className=" inline-flex ">
                  <Link to="/Admin/allposts">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </Link>
                </div>
                <hr />
                <div className=" mt-5">
                  <Link to="/Admin/allposts">
                    <h1 className="mb-2  inline-flex ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                        />
                      </svg>
                      <br />
                    </h1>
                  </Link>
                  <br />
                  <Link to="/Admin/newpost">
                    <h1 className="mb-2 mt-2  inline-flex ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </h1>
                  </Link>
                  <br />
                </div>
              </div>

              <div className=" ml-4 font-semibold text-xl">
                <button
                  onClick={() => {
                    clickLogOut();
                  }}
                  className=" flex flex-row"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-24 w-full min-h-screen overflow-x-hidden outlet-size widthauto">
          <div className="mobile-size flex w-full bg-gray-100 pl-5 gap-x-2">
            <Link to="/Admin/allposts">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            <Link to="/Admin/newpost">
              <h1 className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </h1>
            </Link>
            <button
              onClick={() => {
                clickLogOut();
              }}
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
            </button>
          </div>
          <Outlet />
        </div>
      </div>

      {/* <EditorContainer /> */}
    </div>
  );
}
