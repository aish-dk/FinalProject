import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AppContext from "../Context/AppContext";

export default function PostCard(props) {
  let appContext = useContext(AppContext);
  return (
    // <div className="h-30 w-80 m-10 center shadow-lg mr-4 p-8 rounded-md flex flex-col justify-between hover:shadow-2xl">

    <div className="flex flex-col gap-y-4 relative ">
      <img src={props.posts.image} className="h-80 w-96 mx-auto widthauto" />
      <h6 className="text-sm text-left mx-auto w-96 flex widthauto">
        {props.posts.CreatedAt}{" "}
        <div className="flex gap-x-1">
          {props.posts.CategoryId.map((category) => {
            return <p>•{category}</p>;
          })}
        </div>
      </h6>
      {appContext.auth ? (
        <Link to={`/Admin/singlepost/${props.posts.id}`}>
          <h1 className="text-md font-serif text-left mx-auto w-96 widthauto">
            {props.posts.title}
          </h1>
        </Link>
      ) : (
        <Link to={`/singlepost/${props.posts.id}`}>
          <h1 className="text-md font-serif text-left mx-auto w-96 widthauto">
            {props.posts.title}
          </h1>
        </Link>
      )}

      <h6 className="text-sm text-left mx-auto w-96 widthauto">Admin </h6>

      <div className="mx-auto w-96 bg-black widthauto">
        <hr className=" " />
      </div>
      <div className="text-left  mx-auto w-96 flex widthauto">
        {props.posts.NoOfLike}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </div>

      {/* <h3 className="text-center mt-3">{props.posts.summary}</h3> */}

      {/* <h3>{props.posts.Body}</h3> */}
      {/* <div dangerouslySetInnerHTML={Set()}></div> */}
    </div>
  );
}

// className="m-7 cardbg text-white w-full border border-transparent shadow-lg mr-4 p-8 rounded-md flex flex-col justify-between hover:shadow-2xl hover:border hover:border-blue-600"
