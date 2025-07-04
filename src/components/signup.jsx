import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUtils } from "../utils/api";
import Button from "./button";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  function updateEmail(event) {
    setEmail(event.target.value);
  }
  async function submitForm(event) {
    event.preventDefault();

    // validate b4 submitting
    if (!password1 || !password2 || !email) {
      // show error message or use alert to show error message
      setError("One or more of your required field is empty");
      return;
    }
    if (!email.endsWith(".com") && !email.endsWith(".org")) {
      // show error message or use alert to show error message
      setError("this does not follow a valid email pattern");
      return;
    }
    if (password1.length < 8) {
      // show error message or use alert to show error message
      setError("password length must be greater than 8");
      return;
    }
    if (password1 !== password2) {
      // show error message or use alert to show error message
      setError("both password do not match");
      return;
    }
    // API response form the server
    const res = await signupUtils(email, password1);
    console.log(res);
    if (res.success) {
      // start processing the email
      alert("Signup Successful .....");
      // redirect them to lo gin if signup was successfull
      navigate("/login");
    } else {
      setError(res.message);
      return;
    }

    setError(null);
    setEmail("");
    setPassword1("");
    setPassword2("");
  }
  return (
    <div>
      <h2> Signup </h2>
      {error !== null ? (
        <div className="error">{error}</div>
      ) : (
        <div>{error}</div>
      )}

      <form className="contact">
        <label>Email</label>
        <input type="email" name="email" value={email} onInput={updateEmail} />
        <label>Password</label>
        <input
          type="password"
          name="password1"
          value={password1}
          onInput={(event) => setPassword1(event.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onInput={(event) => setPassword2(event.target.value)}
        />

        <Button text="Signup" onClick={submitForm} />
        <div style={{ margin: "auto" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

//onSignup({ email, password1 });
