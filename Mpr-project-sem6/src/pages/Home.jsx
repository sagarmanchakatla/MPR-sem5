import Navbar from "../Component/Navbar";
import { useState } from "react";
// import Sample from "./Sample";
// import Sidebar from "../Component/Sidebar";

const Home = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      {token}
      {/* <Sample /> */}
    </>
  );
};

export default Home;
