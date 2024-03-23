import React from "react";
import { LogoutBtn, Container, Logo } from "../index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-1 text-sm shadow  bg-slate-900 text-orange-500 w-full">
      {/* <Container> */}
      <nav className="flex">
        <div className="mr-4 w-1/2">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="flex justify-end ml-auto w-full items-center gap-2">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="flex w-full p-1 duration-200 text-neutral-200 bg-orange-600 hover:text-neutral-200 active:bg-neutral-200
                                active:text-orange-600 rounded-lg "
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
      {/* </Container> */}
    </header>
  );
}

export default Header;
