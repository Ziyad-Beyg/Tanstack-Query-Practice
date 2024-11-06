import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <>
      <nav id="nav">
        <Header />
      </nav>
      <Outlet />
      <HashLink to={"#nav"}>
        <button
          className={`fixed bottom-10 right-20 bg-green-600 text-white font-mono p-2 rounded-full transition-opacity duration-500 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          TOP
        </button>
      </HashLink>
      <Footer />
    </>
  );
};

export default MainLayout;
