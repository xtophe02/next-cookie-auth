import React from "react";
import Header from "./Header";

const Layout = ({ children, title, loggedIn=false }) => {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            {/*       <h2 className="subtitle">
        Hero subtitle
      </h2> */}
          </div>
        </div>
      </section>
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
