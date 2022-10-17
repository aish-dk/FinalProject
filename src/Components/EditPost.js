import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { editPostToDB } from "../Redux/action/post.action";
import toast from "react-hot-toast";

export default function EditPost() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  let { id } = useParams();
  let { post } = useSelector((state) => state);
  let [posted, setPost] = useState({});
  const [body, setBody] = useState("");
  let [title, setTitle] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let [summary, setSummary] = useState("");
  let [loading, setLoading] = useState(true);
  let [checkedState, setCheckedState] = useState(
    new Array(post.categories.length).fill(false)
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();

  async function fetchThePost() {
    try {
      setLoading(true);
      let response = await fetch(`http://localhost:3000/post/${id}`).then(
        (data) => data.json()
      );
      setPost(response);
      setLoading(false);
      setElements();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchThePost();
  }, []);
  function setElements() {
    setTitle(posted.title);
    setBody(posted.Body);
    setImageUrl(posted.image);
    setSummary(posted.summary);
  }
  useEffect(() => {
    setElements();
  }, [posted]);

  function editThePost() {
    let newCategory = setThePostCategory();
    let newPost = {
      title: title,
      summary: summary,
      AuthorId: 345,
      CategoryId: newCategory,
      CreatedAt: date,
      NoOfLike: 0,
      image: imageUrl,
      Body: body,
    };
    dispatch(editPostToDB(id, newPost));
    toast.success("Post Edited");
    navigate("/Admin/allposts");
  }
  function handleCheckBoxChange(position) {
    let newCheckedState = checkedState.map((element, index) => {
      return position === index ? !element : element;
    });
    setCheckedState(newCheckedState);
  }

  function setThePostCategory() {
    let newCategory = post.categories.filter((element, index) => {
      if (checkedState[index]) {
        return element;
      }
    });
    return newCategory;
  }
  return (
    <div className="overflow-x-hidden">
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="mb-20">
          {" "}
          <div className=" w-full pb-6 border-2 text-white bg-slate-900  ">
            <h1 className=" pl-3 pt-6 text-2xl inline-flex">
              Edit Post{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 ml-1 mt-2 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </h1>
          </div>
          <div className="flex justify-start pl-3 gap-x-6 flex-wrap mt-3">
            {post.categories.map((category, index) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    value={category}
                    checked={checkedState[index]}
                    onChange={() => {
                      handleCheckBoxChange(index);
                    }}
                  ></input>
                  <label>{category}</label>
                </div>
              );
            })}
          </div>
          <h1 className="mt-10 font-semibold pl-3 font-serif text-xl">Title</h1>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className=" w-full border border-1 h-14 mb-5 outline-none pl-3"
            placeholder="Enter the title here"
            required
          ></input>
          <h1 className="font-semibold pl-3 mt-5 font-serif text-xl">
            Content
          </h1>
          <ReactQuill theme="snow" value={body} onChange={setBody} />
          <h1 className="font-semibold pl-3 font-serif text-xl mt-5">
            Image URL
          </h1>
          <input
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
            }}
            className=" w-full border border-1 h-14 mt-2 outline-none pl-3"
            placeholder="paste the image url here"
          ></input>
          <h1 className="font-semibold pl-3 text-xl font-serif mt-5">
            Summary
          </h1>
          <input
            value={summary}
            onChange={(event) => {
              setSummary(event.target.value);
            }}
            className=" w-full border border-1 h-14 mt-2 outline-none pl-3"
            placeholder="Summary"
          ></input>
          <div className="flex absolute right-0  mr-4 pl-3">
            <button
              onClick={() => {
                editThePost();
              }}
              className="bg-slate-900 font-semibold align-middle  p-2 mt-3 w-32 inline-flex pl-8 rounded-md text-white"
            >
              Update{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 ml-1 mt-1 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
