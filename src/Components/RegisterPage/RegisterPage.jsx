import React, { useState } from "react";
import "./registerPage.css";
import myImage from "../../assets/image13.jpg";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(setUser(data));

    navigate("/Category");
  };

  return (
    <div className="registerMain flex justify-between">
      <div>
        <img src={myImage} alt="" className="registerImage" />
      </div>
      <div className="box2 flex justify-center">
        <p className="super">Super app</p>
        <p className="create_account">Create your new account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="">
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

          <input
            type="text"
            placeholder="Username"
            {...register("Username", { required: "Username required" })}
          />
          {errors.Username && <p>{errors.Username.message}</p>}
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
          <div className="flex check_box">
            <input
              id="check_input"
              type="checkbox"
              placeholder="Name"
              {...register("check", { required: true })}
            />
            {errors.check && <p>required</p>}
            <p>Share my registration data with Superapp</p>
          </div>
          <button type="submit" className="bg-green-400">
            SIGN UP
          </button>
        </form>
        <p className=" text-white">
          By clicking on Sign up. you agree to Superapp
          <span className=" text-green-600">Terms and Conditions of Use</span>
        </p>
      </div>
      {/* <Link to="/Category">sel</Link> */}
    </div>
  );
}

export default RegisterPage;
