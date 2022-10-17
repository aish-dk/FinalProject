import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import "./formik.css";
export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: function (values) {
      console.log(values);
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required!"),
      email: Yup.string()
        .email("Please enter proper email_id")
        .required("Email is required field"),
      phone: Yup.string()
        .min(10, "Number is invalid")
        .max(10, "Number is invalid")
        .required("Please enter phone number"),
      password: Yup.string().required("Password is required"),
    }),
  });
  return (
    <div className="form-holder">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        {/* <label htmlFor="username">User Name: </label> */}
        <input
          type="text"
          className={`bgcolor border border-white h-10 pl-2 mt-10 ${
            formik.touched.username && formik.errors.username
              ? "red-border"
              : "grey-border"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          name="username"
          id="username"
          placeholder="Username"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="error  text-red-800">{formik.errors.username}</span>
        )}
        <br />

        {/* Email */}
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          className={`bgcolor border border-white h-10 pl-2 ${
            formik.touched.email && formik.errors.email
              ? "red-border"
              : "grey-border"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
          id="email"
          placeholder="Email"
        />
        {/* Error for EMAIL */}
        {formik.touched.email && formik.errors.email && (
          <span className="error  text-red-800">{formik.errors.email}</span>
        )}

        <br></br>

        {/* Phone Number */}
        {/* <label htmlFor="phone">Phone Number:</label> */}
        <input
          type="text"
          className={`bgcolor border border-white h-10 pl-2 ${
            formik.touched.phone && formik.errors.phone
              ? "red-border"
              : "green-border"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          name="phone"
          id="phone"
          placeholder="Phone Number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <span className="error  text-red-800">{formik.errors.phone}</span>
        )}
        <br />

        {/* Password field */}

        {/* <label htmlFor="password">Password: </label> */}
        <input
          type="password"
          className={`bgcolor border border-white h-10 pl-2 ${
            formik.touched.password && formik.errors.password
              ? "red-border"
              : "grey-border"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          id="password"
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="error  text-red-800">{formik.errors.password}</span>
        )}
        <br />
        <div className="flex justify-end">
          <button
            className="bg-white text-black w-44 p-2 rounded-lg "
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
