"use client";
import React, { useState } from "react";
import "./Styles/sidebar.css";
import axios from "axios";
import { SidebarData } from "./SidebarData";
import logo from "../Assets/Images/logo.png";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image";
import { useSession } from "next-auth/react";

const logout = () => {
  axios
    .get("/logout", {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data === "success") {
        window.location.href = "/login";
      }
    });
};

const NavbarSection = ({ ctx, sidebarCollapse, handleOnClick }) => {

  
  const HamburgerMenu = ({ handleOnClick }) => {
    return (
      <button
        className={`hamburgerMenu ${
          sidebarCollapse ? "hamburgerMenuOpen" : "hamburgerMenuClosed"
        }`}
        onClick={() => handleOnClick()}
      >
        <div />
        <div />
        <div />
      </button>
    );
  };
  return (
    <div className="navbar">
      <div className="navbarWrap">
        <div className="navbarRow">
          <HamburgerMenu handleOnClick={handleOnClick} />
        </div>
        <div className="navbarRow">
          {
            //if user is logged in
            ctx && (
              <div className="userNavbar ">
                <div className="userLogo">
                  <AccountCircleRoundedIcon />
                </div>
                <div className="userLogged">Logged as: {ctx.user.name}</div>
                <Link href="/api/auth/signout">
                <div
                  className="navbarFlex"
                 
                >
                
                  <div className="userLogo">
                    <LogoutRoundedIcon className="maincolor clickable" />
                  </div>
                  <div className="logout clickable">Logout</div>
                </div></Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ ctx, sidebarCollapse }) => {
  const pathname = usePathname()
  return (
    <div
      className={`Sidebar ${sidebarCollapse ? "SidebarOpen" : "SidebarClosed"}`}
    >
      <div className="SidebarLogoWrap">
        <div className="SidebarLogo">
          <Image src={logo} className="logo" alt="" />
        </div>
      </div>

      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
         
          return (
            <Link
             href={val.link}
              key={key}
              className={
                pathname===val.link ? "sidebar-active-link" : "sidebar-link"
              }
            >
              <li className="SidebarRow">
                <div className="RowIcon">{val.icon}</div>
                <div className="RowTitle">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

function Sidebar() {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const handleSidebarCollapse = () => {
    sidebarCollapse ? setSidebarCollapse(false) : setSidebarCollapse(true);
  };

  const {data} = useSession()

  return (
    <div className="SidebarWrapper">
      <NavbarSection
        ctx={data}
        handleOnClick={handleSidebarCollapse}
        sidebarCollapse={sidebarCollapse}
      />
      <SidebarSection ctx={data} sidebarCollapse={sidebarCollapse} />
    </div>
  );
}

export default Sidebar;
