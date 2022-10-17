import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import heartgif from "../images/heartgif.gif";
import trash from "../images/trash.gif";
import {
  deletePostFromDB,
  fetchPostFromDB,
  updateLikeOnDB,
} from "../Redux/action/post.action";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/AppContext";

export default function SinglePost() {
  let { id } = useParams();
  let appContext = useContext(AppContext);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { posters } = useSelector((state) => state);
  function deletePost() {
    dispatch(deletePostFromDB(id, navigate));
    dispatch(fetchPostFromDB());
    navigate("/Admin/allposts");
  }
  let url = "http://localhost:3000/post/";

  let [loading, setLoading] = useState(true);
  let [post, setPost] = useState([]);

  async function getSinglePost() {
    try {
      let response = await fetch(url + id);
      let result = await response.json();
      setPost(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getSinglePost();
  }, [posters]);
  function Set() {
    return { __html: post.Body };
  }
  function likeButton() {
    dispatch(updateLikeOnDB(id, post));
    dispatch(fetchPostFromDB());
  }
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className=" flex flex-wrap">
            <div className=" w-3/4 border-r-2 border-b-2 border-gray-400 ">
              <h1 className="m-6 font-extrabold text-3xl px-5">{post.title}</h1>
            </div>
            <div className=" w-1/4 border-b-2 border-gray-400 bg-white">
              <div className="w-28 mx-auto ">
                <h1 className="mt-3 font-semibold text-md ">
                  {post.CreatedAt}
                </h1>
                <h3
                  onClick={() => {
                    likeButton();
                  }}
                  className=" inline-flex ml-4 cursor-pointer "
                >
                  <p>{post.NoOfLike}</p>
                  <img className=" w-10" src={heartgif} />
                </h3>
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-full">
            <div className=" mt-10 mx-auto">
              <img src={post.image} className=" h-96 rounded-md" />
            </div>
            <div className=" m-10 max-w-xl mx-auto ">
              <div dangerouslySetInnerHTML={Set()}></div>
            </div>
          </div>
          <div className=" m-4 max-w-xl mx-auto font-bold text-xl">
            Summary:
            <span className=" ml-4 font-thin text-sm ">{post.summary}</span>
          </div>
          <div className="w-full flex justify-end">
            {appContext.auth && (
              <div className=" inline-flex">
                <div className=" m-2">
                  <img
                    src={trash}
                    className="w-6 cursor-pointer"
                    onClick={() => {
                      deletePost();
                    }}
                  />
                </div>
                <div className=" m-2">
                  <Link to={`/Admin/editpost/${post.id}`}>
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
