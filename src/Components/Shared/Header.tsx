import React, { useEffect, useState } from "react";
import classes from "../../assets/Modules/Header.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { GenericObject } from "./ObjectModals";
import { TransFormString } from "./StaticText";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // State for dropdown menu
  const [size, setSize] = useState<GenericObject>({
    width: undefined,
    height: undefined,
  });
  function useShouldShowLayout() {
    const location = useLocation();
    const pathsWithoutLayout = ["/Login", "/Register"];
    return !pathsWithoutLayout.includes(location.pathname);
  }
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const dropdownToggleHandler = () => {
    setDropdownOpen((p) => !p);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>
          {TransFormString.appName}
        </h2>

        {!useShouldShowLayout() ? (
          ""
        ) : (
          <>
            <nav
              className={`${classes.header__content__nav} ${
                menuOpen ? classes.isMenu : ""
              }`}
            >
              <ul>
                <li>
                  <a href="/">Change State</a>
                </li>
                {size.width > 768 ? (
                  // Desktop view with user icon and dropdown
                  <li
                    className={classes.header__content__user}
                    onMouseEnter={dropdownToggleHandler}
                    onMouseLeave={closeDropdown}
                  >
                    <FaUserCircle className={classes.userIcon} />
                    {dropdownOpen && (
                      <ul className={classes.dropdownMenu}>
                        <li>
                          <a href="/profile">Profile</a>
                        </li>
                        <li>
                          <a href="/change-password">Change Password</a>
                        </li>
                        <li>
                          <a href="/logout">Logout</a>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  // Mobile view with user options in the menu
                  <>
                    <li>
                      <a href="/profile">Profile</a>
                    </li>
                    <li>
                      <a href="/change-password">Change Password</a>
                    </li>
                    <li>
                      <a href="/logout">Logout</a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <div className={classes.header__content__toggle}>
              {!menuOpen ? (
                <BiMenuAltRight onClick={menuToggleHandler} />
              ) : (
                <AiOutlineClose onClick={menuToggleHandler} />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
