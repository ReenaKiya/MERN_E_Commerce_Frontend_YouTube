import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();

  const { products, setFilteredData, logout, isAuthenticated, cart } =
    useContext(AppContext);
  // console.log("user cart = ", cart);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data?.category?.toLowerCase() == cat?.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data?.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar ">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E - Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="search product..."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>

                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">
                  profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("cameras")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphones")}
            >
              Hedphones
            </div>
            <div className="items" onClick={() => filterbyPrice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterbyPrice(25999)}>
              25999
            </div>
            <div className="items" onClick={() => filterbyPrice(49999)}>
              49999
            </div>
            <div className="items" onClick={() => filterbyPrice(69999)}>
              69999
            </div>
            <div className="items" onClick={() => filterbyPrice(89999)}>
              89999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
