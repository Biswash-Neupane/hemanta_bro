import React from "react";

import Wrapper from "../components/wrapper/Wrapper";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

function NotFoundPage() {
  return (
    <Wrapper className="not-found-container">
      <Header className="not-found-header" />
      <Wrapper className="not-found-body">
        <Sidebar className="not-found-sidebar" />
        <Wrapper className="not-found-row1">
          <h1>404 Not Found</h1>
          <p>We can't find what you're looking for...</p>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

export default NotFoundPage;
