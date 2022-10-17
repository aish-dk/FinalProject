import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchPostFromDB } from "../Redux/action/post.action";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

export default function ShowPosts() {
  let { post } = useSelector((state) => state);
  let [loading, setLoading] = useState(true);
  let [searchResults, setSearchResults] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let dispatch = useDispatch();
  let [selectedCategory, setSelectedCategory] = useState("");
  let [categoryResults, setCategoryResults] = useState([]);
  function chooseCategory() {
    let results = post.post.filter((singlePost) => {
      let flag = 0;
      singlePost.CategoryId.map((category) => {
        if (category === selectedCategory) {
          flag = 1;
        }
      });
      if (flag === 1) {
        return singlePost;
      }
    });
    setCategoryResults(results);
  }

  useEffect(() => {
    chooseCategory();
  }, [selectedCategory]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      await dispatch(fetchPostFromDB()).then(setLoading(false));
      dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
    }
  }
  function searchPost() {
    setSelectedCategory("");
    if (searchTerm) {
      let b = new RegExp(`${searchTerm}`, "i");
      let results = post.post.filter((singlePost) => {
        if (singlePost.title.search(b) !== -1) {
          return singlePost;
        }
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="w-full overflow-x-hidden bg-gray-100 min-h-screen pb-10">
          <div className="w-full flex justify-around px-16 top-nav paddingleft0 widthauto remove-flex">
            <div className="flex gap-x-5 flex-wrap gap-y-3 mt-3 ">
              <button
                className="border border-gray-300 text-sm p-1"
                onClick={() => {
                  setSelectedCategory("");
                }}
              >
                All Categories
              </button>
              {post.categories.map((category) => {
                return (
                  <button
                    className="border border-gray-300 text-sm p-1"
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <div className=" widthauto">
              <div className="w-full p-3 flex ml-8 gap-x-5 relative widthauto marginleft0 margintop2  ">
                <input
                  placeholder="Search Posts"
                  className="pl-2 border w-96 outline-none searchbar-width-auto  h-8 rounded-2xl bg-slate-100 border-black widthauto "
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    searchPost();
                  }}
                  className="  rounded-md text-white absolute top-4 right-12 position-searchicon   "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 rounded-2xl "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className=" mt-20  ">
            {searchResults.length > 0 ? (
              <div className="flex gap-x-24 gap-y-20  justify-around flex-wrap">
                {searchResults.map((post) => {
                  return <PostCard posts={post} />;
                })}
              </div>
            ) : (
              <div>
                {selectedCategory ? (
                  <div>
                    {categoryResults.length > 0 && (
                      <div className="flex gap-x-24 gap-y-20  justify-around flex-wrap">
                        {categoryResults.map((singlePost) => {
                          return <PostCard posts={singlePost} />;
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-x-24 gap-y-20  justify-around flex-wrap">
                    {post &&
                      post.post.length > 0 &&
                      post.post.map((posts, index) => {
                        return (
                          <div>
                            <PostCard key={index} posts={posts} />
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
