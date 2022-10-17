import { useState } from "react";
import { Tab } from "@headlessui/react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import doodle from "../images/doodle2.jpg";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LoginUI() {
  let navigate = useNavigate();
  let appContext = useState(AppContext);
  return (
    <div className="w-full min-h-screen bgcolor flex justify-between">
      <div className="w-2/5 h-screen loginpage-bg">
        <img className="h-full" src={doodle} />
      </div>

      <div className="w-96 px-2 py-16 sm:px-0 item-center mr-60 mt-16">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 ">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full h-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Login
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full mt-0 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Sign Up
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Login />
            </Tab.Panel>
            <Tab.Panel>
              <SignUp />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
