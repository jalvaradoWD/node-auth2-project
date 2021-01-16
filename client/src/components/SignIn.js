import { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const SignIn = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await Axios.post(
        "http://localhost:5000/api/login",
        formState
      );

      setSubmitted(true);
      props.setTokenExist(true);
      localStorage.setItem("token", result.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  return !submitted ? (
    <form onSubmit={formSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={onFormChange}
          type="text"
          id="username"
          name="username"
          placeholder="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={onFormChange}
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
      </div>

      <button type="submit">Sign In</button>
    </form>
  ) : (
    <Redirect to="/" />
  );
};

export default SignIn;
