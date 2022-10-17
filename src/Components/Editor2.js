import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  postOnDB,
  addNewCategory,
} from "../Redux/action/post.action";

export default function MyComponent() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  let { post } = useSelector((state) => state);
  let dispatch = useDispatch();
  const [body, setBody] = useState("");
  let [title, setTitle] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let [summary, setSummary] = useState("");
  let [addNewCategoryButton, setAddNewCategoryButton] = useState(false);
  let [newCategoryValue, setNewCategoryValue] = useState("");
  let [checkedState, setCheckedState] = useState(
    new Array(post.categories.length).fill(false)
  );
  let navigate = useNavigate();
  function createNewPost() {
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
    dispatch(postOnDB(newPost));
    toast.success("Post Added Successfully");
    navigate("/Admin");
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
  function setNewCategory() {
    let newCategoryArray = [...post.categories, newCategoryValue];
    console.log(newCategoryArray);
    dispatch(addNewCategory(newCategoryArray));
    dispatch(fetchCategories());
    setCheckedState(new Array(post.categories.length).fill(false));
  }
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="overflow-x-hidden pb-20">
      <div className=" w-full pb-6 border-2 text-white bg-slate-900  ">
        <h1 className=" pl-3 pt-6 text-2xl inline-flex">
          Create Post{" "}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </h1>
      </div>
      <div className="flex justify-start gap-x-6 flex-wrap gap-y-3 pl-3 mt-3">
        {post.categories.map((category, index) => {
          return (
            <div className="flex gap-x-2 flex-wrap gap-y-3">
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
        <button
          onClick={() => {
            setAddNewCategoryButton(true);
          }}
        >
          +
        </button>
        {addNewCategoryButton && (
          <div className="flex gap-x-1">
            <input
              value={newCategoryValue}
              onChange={(e) => {
                setNewCategoryValue(e.target.value);
              }}
              className=" border border-1 outline-none"
              placeholder="Enter new category"
            ></input>
            <button
              onClick={() => {
                setNewCategory();
              }}
              className="bg-black text-white"
            >
              ADD
            </button>
          </div>
        )}
      </div>

      <h1 className="font-semibold pl-3 font-serif text-xl mt-5">Title</h1>
      <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        className=" w-full border border-1 h-14 mb-5 outline-none pl-3"
        placeholder="Enter the title here"
        required
      ></input>
      <h1 className="font-semibold pl-3  mt-5 font-serif text-xl">Content</h1>
      <ReactQuill theme="snow" value={body} onChange={setBody} />
      <h1 className="font-semibold pl-3  font-serif text-xl mt-5">Image URL</h1>
      <input
        value={imageUrl}
        onChange={(event) => {
          setImageUrl(event.target.value);
        }}
        className=" w-full border border-1 h-14 mt-2 outline-none pl-3"
        placeholder="Paste the image url here"
      ></input>
      <h1 className="font-semibold pl-3 text-xl font-serif  mt-5">Summary</h1>
      <input
        value={summary}
        onChange={(event) => {
          setSummary(event.target.value);
        }}
        className=" w-full border border-1 h-14 mt-2 outline-none pl-3"
        placeholder="Summary"
      ></input>
      <div className=" ml-96 absolute right-0 mr-4 pl-3">
        <button
          onClick={() => {
            createNewPost();
          }}
          className="bg-slate-900 font-semibold  p-2 mt-3 w-24 inline-flex pl-6 rounded-md text-white"
        >
          Post
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
  );
}
