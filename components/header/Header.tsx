import React from "react";
import TopBar from "./TopBar";
import NavBar from "./Navber";
import NewsTicker from "./NewsTricker";

function Header() {
  return (
    <header className="bg-white border-b border-gray-500 py-5">
      <TopBar />
      <div className="mt-[12px] border-b-[3px] border-black">
      </div>
      <NavBar/>
      <NewsTicker/>
    </header>
  );
}

export default Header;
