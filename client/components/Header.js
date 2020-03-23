import React from "react";
import Link from "next/link";
import { ViewerQuery } from "../src/queries";
import { useQuery } from "@apollo/client";

const Header = () => {
  const { data, loading } = useQuery(ViewerQuery, {
    fetchPolicy: "cache-only"
  });

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">Home</a>
          </Link>
          <Link href="/documentation">
            <a className="navbar-item">Documentation</a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {data && data.viewer ? (
                <Link href="/signout">
                  <a className="button is-light">Log Out</a>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <a className="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                  </Link>

                  <Link href="/login">
                    <a className="button is-light">Log in</a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
