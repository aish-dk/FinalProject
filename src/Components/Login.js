import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import "./formik.css";

export default function Login() {
  let appContext = useContext(AppContext);
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async function (values) {
      navigate("/Admin");
      await appContext
        .checkAuth(values.username, values.password)
        .then(nav())
        .then(showError());
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required!"),
      password: Yup.string().required("Password is required"),
    }),
  });

  function nav() {
    {
      appContext.loading
        ? console.log("loading")
        : appContext.auth && navigate("/Admin");
    }
  }
  function showError() {
    appContext.loading
      ? console.log("loading from error")
      : appContext.auth
      ? setErrorMessage(false)
      : setErrorMessage(true);
  }
  useEffect(() => {
    nav();
    showError();
  }, [appContext.loading]);
  useEffect(() => {
    setErrorMessage(false);
  }, []);

  return (
    <div className="form-holder">
      <form
        className="flex flex-col text-white "
        onSubmit={formik.handleSubmit}
      >
        {/* <label htmlFor="username">User Name: </label> */}
        <input
          type="text"
          className={` bgcolor border border-white  h-10 mt-10 pl-2 ${
            formik.touched.username && formik.errors.username
              ? "red-border"
              : "grey-border"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Username"
          name="username"
          id="username"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="error  text-red-800">{formik.errors.username}</span>
        )}
        <br />

        {/* Password field */}

        {/* <label htmlFor="password">Password: </label> */}
        <input
          type="password"
          className={`bgcolor border border-white text-white h-10 pl-2 ${
            formik.touched.password && formik.errors.password
              ? "red-border"
              : "grey-border"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
          name="password"
          id="password"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="error text-red-800">{formik.errors.password}</span>
        )}

        <button
          className="bg-white text-black w-44 p-2 mt-10 rounded-lg "
          type="submit"
        >
          Log In
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-5">incorrect username or password</p>
        )}
      </form>
    </div>
  );
}
