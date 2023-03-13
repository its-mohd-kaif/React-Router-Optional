import React from "react";
import { Link, useRouteError } from "react-router-dom";
// Error Component
function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"} type="button" class="btn btn-dark">
        Home
      </Link>
    </div>
  );
}

export default Error;
