import React, { Fragment } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import PrivateRoute from "../../components/PrivateRoute"

function Test() {
    return (
        <div>This is a test</div>
    )
}

function Home() {

  const {logout} = useAuth0();

  return (
    <div>
      <div>Home</div>
      <button onClick={() => logout()}>Log out</button>
         <PrivateRoute path="/test" component={Test} />
    </div>
  );
}

export default Home;