import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../App";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./auth.css";
import { Checkbox, FormControlLabel } from "@mui/material";

const CreateSchemaValidation = yup.object({
  firstName: yup.string().required("Please Enter Your FirstName"),
  lastName: yup.string().required("Please Enter Your LastName"),
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

const Signup = () => {
  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  //Session Storage Clean Sequrity purpose
  useEffect(() => {
    localStorage.clear("token");
  }, []);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: CreateSchemaValidation,
      onSubmit: (val) => {
        SignupAccount(val);
      },
    });

  let SignupAccount = async (val) => {
    let { firstName, lastName, email, password } = val;
    let payload = { firstName, lastName, email, password };
    try {
      let res = await axios.post(`${url}/users/signup`, payload);
      // console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="signup-container">
      <Form className="signup-form" onSubmit={handleSubmit}>
        <h5>Signup Here!</h5>
        <Form.Group className="mb-3">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={values.firstName}
            onBlur={handleBlur}
            placeholder="Enter FirstName"
            onChange={handleChange}
          />
        </Form.Group>
        {touched.firstName && errors.firstName ? (
          <p style={{ color: "red" }}>{errors.firstName}</p>
        ) : (
          ""
        )}

        <Form.Group className="mb-3">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter LastName"
            name="lastName"
            value={values.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Form.Group>
        {touched.lastName && errors.lastName ? (
          <p style={{ color: "red" }}>{errors.lastName}</p>
        ) : (
          ""
        )}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div>
          <p>
            Already have an account? <Link to={"/login"}>Log in</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
