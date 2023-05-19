import React, { useEffect, useState } from "react";
import "./auth.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Checkbox, FormControlLabel } from "@mui/material";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        handleClick(val);
      },
    });

  let handleClick = async (val) => {
    let { email, password } = val;
    let payload = { email, password };
    try {
      const res = await axios.post(`${url}/users/login`, payload);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      // console.log(res.data);
      navigate("/");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <Form className="container-form" onSubmit={handleSubmit}>
        <h5>Login Here!</h5>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Enter email"
            onBlur={handleBlur}
            value={values.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        {touched.email && errors.email ? (
          <p style={{ color: "red" }}>{errors.email}</p>
        ) : (
          ""
        )}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            type={show ? "text" : "password"}
          />
        </Form.Group>
        {touched.password && errors.password ? (
          <p style={{ color: "red" }}>{errors.password}</p>
        ) : (
          ""
        )}
        <FormControlLabel
          value="Show Password"
          control={<Checkbox onClick={() => setShow(!show)} />}
          label="Show Password"
          labelPlacement="Show Password"
        />
        <Link to={"/forgotpassword"}>Forgot Password</Link>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div>
          <p>
            Don't have an account? <Link to={"/signup"}>SingUp</Link>
          </p>
        </div>
        <div>
          <h5>Sample Login</h5>
          <p>Email : admin@gmail.com</p>
          <p>Password : admin123</p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
