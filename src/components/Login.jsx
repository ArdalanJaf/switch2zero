import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api/API_URL";
import { useDispatch } from "react-redux";
import { setLogin } from "../app/configSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("TomTheAdmin");
  const [password, setPassword] = useState("secretPassword");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);
    try {
      const results = await axios.post(API_URL + "/login", {
        username: username,
        password: password,
      });
      setIsLoading(false);

      if (results.data.loginReturn) {
        dispatch(setLogin(results.data.loginReturn));
      } else {
        setError(results.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center px-5">
      <div className="mb-5">
        <div className="mb-3">
          <label>
            Username:{" "}
            <input
              className="form-control"
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              className="form-control"
              required
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
        <label>
          <input
            className="mb-4"
            type="checkbox"
            value={passwordShown}
            onChange={() => setPasswordShown(!passwordShown)}
          />{" "}
          show password
        </label>
        <div className="text-center">
          {isLoading ? (
            "loading..."
          ) : (
            <button
              className="btn btn-primary shadow"
              type="submit"
              onClick={() => handleSubmit()}
              disabled={username && password ? false : true}
            >
              Login
            </button>
          )}
        </div>
        {error && (
          <div className="mt-3 text-danger">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
