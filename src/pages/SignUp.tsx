// Fake fetch
import fakeFetch from "scripts/fakeFetch";

// Node modules
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import ListInput from "components/ListInput";
import Fields from "data/fields-sign-up.json";
import { useUser } from "state/UserContext";
import iUser from "types/iUser";

export default function Login() {
  // Global state
  const navigate = useNavigate();
  const { setToken, setUser } = useUser();

  // Local state
  const [form, setForm] = useState({});

  // Properties
  const endPoint = "http://195.128.241.43:9090/api/v1/auth/register";
  const METHOD = "POST"
  const HEADERS = { "Content-type": "application/json; charset=UTF-8"};

  // Methods
  function onSubmit(event: FormEvent): void {
    event.preventDefault();

    fetch(endPoint, {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(form),})
      .then((response) => response.json())
      .then(onSuccess)
      .catch((error) => onFailure(error));
  }

  function onSuccess(result: any) {
    console.log("onSuccess result", result);
    setToken(result.token);
    setUser(result.user);
    console.log(result.user);
    alert("Registration Successfull. Welcome to Natflix!");
    navigate("/");
  }
  /*
  function onSuccess(result: any) {
    console.log("onSuccess result", result);

    alert("Welcome to Natflix!");
    setToken(result.token);
    setUser(result.user);
    navigate("/home");
  }*/

  function onFailure(error: string) {
    console.error(Error);
    alert(`Can't create an account because of ${error}`);
  }

  return (
    <div id="sign-up" className="auth">
      <div className="container">
        <h1>Set up your account</h1>
        <form onSubmit={(event) => onSubmit(event)}>
          <ListInput fields={Fields} state={[form, setForm]} />
          <button>Sign up</button>
        </form>
        <footer>
          <p>
            Already have an account? <Link to="/login">Sign in instead</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
