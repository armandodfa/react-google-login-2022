import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /* google global */
    window.google.accounts.id.initialize({
      client_id:
        "891210672980-m6rj0eccq0qtct9olrvmrqr9vlhm5jfo.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
    window.google.accounts.id.prompt();
  }, []);
  return (
    <div className="App">
      <h1>React Google Login App</h1>
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      )}
    </div>
  );
}

export default App;
