// Fake fetch
//import fakeFetch from "scripts/fakeFetch";

// Node modules
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// Project files
import ListInput from "components/ListInput";
import Fields from "data/fields-sign-in.json";
import { useUser } from "state/UserContext";

export default function Login() {
  // Global state
  const { setToken, setUser } = useUser();

  // Local state
  const [form, setForm] = useState({ email: "", password: "" });

  // Properties
  const endPoint = "http://192.168.10.206:9090/api/v1/auth/login";

  // Methods
  function onSubmit(event: FormEvent): void {
    event.preventDefault();

    const setup = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow", 
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    };

    // @ts-ignore
    fetch(endPoint, setup)
      .then((response) => response.json())
      .then((result) => onSuccess(result))
      .catch((error) => onFailure(error));
  }

  function onSuccess(result: any) {
    console.log("onSuccess result", result);
    setToken(result.token);
    setUser(result.user);
    console.log(result.user);
  }

  function onFailure(error: string) {
    console.error(error);
    alert(error);
  }

  return (
    <div id="sign-in" className="auth">
      <div className="container">
        <h1>Sign In</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          <ListInput fields={Fields} state={[form, setForm]} />
          <button className="primary">Sign in</button>
        </form>
        <footer>
          <p>
            New to Natflix? <Link to="/registration">Sign up now</Link>
          </p>
        </footer>
      </div>
      <div className="warning">
        <h2>⚠️ Note:</h2>
        <p>
          To login as a <b>Customer</b> use <code>customer@gmail.com</code> with
          password <code>customer</code>
        </p>
        <p>
          To login as an <b>Admin</b> use <code>admin@gmail.com</code> with
          password <code>admin</code>
        </p>
      </div>
    </div>
  );
}
