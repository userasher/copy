import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful");
    navigate("/login");
  };
  // // ==== Doctormenu =====
  // const doctorMenu = [
  //   {
  //     name: "Home",
  //     path: "/",
  //     icon: "fa-solid fa-house",
  //   },
  //   {
  //     name: "Apply Form",
  //     path: "/apply-form",
  //     icon: "fa-solid fa-user-doctor",
  //   },
  //   // {
  //   //   name: "Add Documents",
  //   //   path: "/upload-image",
  //   //   icon: "fa-solid fa-user-doctor",
  //   // },
  //   // {
  //   //   name: "Delete Documents",
  //   //   path: "/add-documents",
  //   //   icon: "fa-solid fa-user-doctor",
  //   // },

  //   // {
  //   //   name: "Profile",
  //   //   path: `/users/profile/${user?._id}`,
  //   //   icon: "fa-solid fa-user",
  //   // },
  //   /***EXtra */

  //   // {
  //   //   name: "Profile",
  //   //   path: `/doctor/profile/${user?._id}`,
  //   //   icon: "fa-solid fa-user",
  //   // },
  // ];

  // =======Doctor menu====
  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Railway </h6>
              <hr />
            </div>
            <div className="">
              <div className="menu">
                {SidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <div className={`menu-item ${isActive && "active"}`}>
                        <i className={menu.icon}></i>
                        <Link to={menu.path}>{menu.name}</Link>
                      </div>
                    </>
                  );
                })}

                {/* for logout on navigation bar */}
                <div className={`menu-item `} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/login">Logout</Link>
                </div>
              </div>
            </div>
          </div>

          {/* for notification badge on homepage
           */}
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i class="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
