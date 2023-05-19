import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { url } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  const getData = async () => {
    try {
      let res = await axios.get(`${url}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setData(res.data.user);
    } catch (error) {
      navigate("/login");
    }
  };

  // const deleteUser = async (idx) => {
  //   let alterList = data.filter((val) => val._id === idx);
  //   console.log(alterList);
  //   let _id = alterList[0]._id;
  //   try {
  //     let res = await axios.delete(`${url}/users/${_id}`);
  //     toast.success(res.data.message);
  //     setData(alterList);
  //   } catch (error) {
  //     toast.error(error.response.message);
  //   }
  // };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="navbar">
        <DropdownButton id="dropdown-basic-button" title="User Profile">
          {token ? (
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => navigate("/login")}>
              Login
            </Dropdown.Item>
          )}
        </DropdownButton>
      </div>
      <Table striped bordered hover className="user-details">
        <thead>
          <tr>
            <th>S.No</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr style={{ height: "1rem" }} key={e._id}>
                <td>{i + 1}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.mobile}</td>
                <td>{e.role}</td>
                {/* <td>
                  <IconButton
                    onClick={() => deleteUser(e._id)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </td>
                <td>
                  <IconButton aria-label="delete" size="large">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
