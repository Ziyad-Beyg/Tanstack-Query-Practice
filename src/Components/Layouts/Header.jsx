import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex  justify-between p-6 bg-green-600 font-mono text-lg">
      <p>TanStack Practice</p>
      <ul className="flex gap-10 font-mono text-white">
        {[
          { path: "/", text: "HOME" },
          { path: "/old", text: "FETCH OLD" },
          { path: "/rq", text: "FETCH RQ" },
          { path: "/infinite-scrolling", text: "Infinite Scrolling" },
        ].map((currElem, index) => {
          return (
            <NavLink key={index} to={`${currElem?.path}`}>
              <li>
                <p>{currElem?.text}</p>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
