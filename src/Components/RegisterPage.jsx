import React, { useState } from "react";
import "./registerPage.css";

import myImage from "../assets/image13.jpg";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    navigate("/select");
  };

  return (
    <div className="registerMain">
      <div>
        <img src={myImage} alt="" className="registerImage" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("Name", {
            required: "Name is required",
            maxLength: {
              value: 20,
              message: "Name should be less than 20 characters",
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Name should contain only letters",
            },
          })}
        />
        {errors.Name && <p>{errors.Name.message}</p>}
        {/* <input
          type="text"
          placeholder="Name"
          {...register("Name", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        {errors?.Name && <p>Name required</p>} */}
        <input
          type="text"
          placeholder="Username"
          {...register("Username", { required: true })}
        />
        {errors.Username && <p>Name required</p>}
        <input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true })}
        />
        {errors.Email && <p>Email required</p>}
        <input
          type="Number"
          placeholder="Number"
          {...register("Number", { required: true })}
        />
        {errors.Number && <p>Number required</p>}
        <input
          type="checkbox"
          placeholder="Name"
          {...register("check", { required: true })}
        />
        {errors.check && <p>required</p>}
        <button type="submit"></button>
      </form>
      {/* <Link to="/Select">sel</Link> */}
    </div>
  );
}

export default RegisterPage;
