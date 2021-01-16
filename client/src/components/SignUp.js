import { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const SignUp = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const [formState, setFormState] = useState({
    username: "",
    department: "",
    password: "",
  });

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await Axios.post(
        "http://localhost:5000/api/register",
        formState
      );

      props.setTokenExist(true);
      setSubmitted(true);

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
      <FormGroup>
        <Label htmlFor="department">Department</Label>
        <Input
          onChange={onFormChange}
          type="text"
          id="department"
          name="department"
          placeholder="department"
        />
      </FormGroup>
      <Button type="submit">Sign Up</Button>
    </Form>
  ) : (
    <Redirect to="/" />
  );
};

export default SignUp;
