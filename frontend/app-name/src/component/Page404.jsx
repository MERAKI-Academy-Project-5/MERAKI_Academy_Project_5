import React from "react";
import Navbar from "./navbar";

const Page404 = () => {
  return (
    <div>
      <Navbar />
      <h1>404-PAGE NOT FOUND</h1>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
    </div>
  );
};

export default Page404;
