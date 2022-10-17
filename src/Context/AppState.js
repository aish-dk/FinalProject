import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

export default function AppState(props) {
  let [auth, setAuth] = useState(checkLSStatus());
  let [loading, setLoading] = useState(true);
  let Admin = {
    username: "Admin",
    password:
      "688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6",
  };

  function checkLSStatus() {
    if (localStorage.getItem("Auth")) {
      return JSON.parse(localStorage.getItem("Auth"));
    } else {
      localStorage.setItem("Auth", JSON.stringify(false));
      return JSON.parse(localStorage.getItem("todos"));
    }
  }
  async function stringToHashConversion(password) {
    const textAsBuffer = new TextEncoder().encode(password);
    const hashBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      textAsBuffer
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const digest = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return digest;
  }

  async function checkAuth(username, password) {
    setLoading(true);
    await stringToHashConversion(password).then((results) =>
      checkTrue(username, results)
    );
  }
  function checkTrue(username, value) {
    if (username === Admin.username && value === Admin.password) {
      localStorage.setItem("Auth", JSON.stringify(true));
      setAuth(JSON.parse(localStorage.getItem("Auth")));
    }
    setLoading(false);
  }
  function logout() {
    localStorage.setItem("Auth", JSON.stringify(false));
    setAuth(JSON.parse(localStorage.getItem("Auth")));
  }
  return (
    <AppContext.Provider value={{ checkAuth, auth, loading, logout }}>
      {props.children}
    </AppContext.Provider>
  );
}
