import { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

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
    <Form onSubmit={formSubmit}>
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          onChange={onFormChange}
          type="text"
          id="username"
          name="username"
          placeholder="username"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={onFormChange}
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
      </FormGroup>

      <Button type="submit">Sign In</Button>
    </Form>
  ) : (
    <Redirect to="/" />
  );
};

export default SignIn;
