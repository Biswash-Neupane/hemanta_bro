import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Logo from "./logo/Logo";
import SearchBar from "./search/Search";
import LogOut from "./logout/LogOut";
import Notification from "./Notifications/Notifications";

const Header = (props) => {
  const [isSearchFocused, setSearchFocused] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={headerRef} className={`main-header ${props.className}`}>
      <Logo />
      <div className="search-container">
        <SearchBar
          isFocused={isSearchFocused}
          setIsFocused={setSearchFocused}
        />
      </div>
      <div className="notification-logout">
        <Notification />
        <LogOut />
      </div>
    </div>
  );
};

export default Header;
