import React, { useEffect } from "react";
import "./style.css";
const NotFound = () => {
  // const handleGoToHome = () => {
  // Reload the current page
  // window.location.reload();
  // };
  let check = true;
  // useEffect(() => {
  //   window.location.reload();
  //   check = true;
  // }, [check]);

  if (check) {
    return (
      <>
        <h1>404 Page Not Found</h1>
        {/* <p class="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p> */}
        <section class="error-container">
          <span class="four">
            <span class="screen-reader-text">4</span>
          </span>
          <span class="zero">
            <span class="screen-reader-text">0</span>
          </span>
          <span class="four">
            <span class="screen-reader-text">4</span>
          </span>
        </section>
        <div class="link-container">
          <a target="_blank" href="/" class="more-link">
            Go To Home
          </a>
        </div>
      </>
    );
  } else {
    <></>;
  }
};

export default NotFound;
