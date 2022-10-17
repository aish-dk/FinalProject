import { FETCH_CATEGORIES, FETCH_POST } from "../actionType";

export const postOnDB = (newPost) => async () => {
  try {
    let response = await fetch(`http://localhost:3000/post`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  } catch (err) {
    console.log(err);
  }
};
export const fetchPostFromDB = () => async (dispatch) => {
  try {
    let response = await fetch(`http://localhost:3000/post/`).then((data) =>
      data.json()
    );
    dispatch({
      type: FETCH_POST,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePostFromDB = (id, navigate) => async (dispatch) => {
  try {
    let response = await fetch(`http://localhost:3000/post/${id}`, {
      method: "DELETE",
    }).then(fetchPostFromDB());
  } catch (err) {
    console.log(err);
  }
};

export const editPostToDB = (id, editedPost) => async (dispatch) => {
  let response = await fetch(`http://localhost:3000/post/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedPost),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(fetchPostFromDB());
};

export const updateLikeOnDB = (id, post) => async (dispatch) => {
  let newPost = { ...post, NoOfLike: ++post.NoOfLike };
  console.log(newPost);
  let response = await fetch(`http://localhost:3000/post/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchCategories = () => async (dispatch) => {
  try {
    let response = await fetch(`http://localhost:3000/categories`).then(
      (data) => data.json()
    );

    dispatch({
      type: FETCH_CATEGORIES,
      payload: response[0].categorylist,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addNewCategory = (newCategory) => async (dispatch) => {
  try {
    let response = await fetch(`http://localhost:3000/categories/1`, {
      method: "PATCH",
      body: JSON.stringify({ categorylist: newCategory }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(dispatch(fetchCategories()));
  } catch (err) {
    console.log(err);
  }
};
