import React from "react";
import { useSelector } from "react-redux";

function Homepage() {
  // const userData = useSelector((state) => state.user);
  const usercategory = useSelector((state) => state.category);
  console.log("Redux State (userData):", usercategory);
  return (
    <>
      <main className=" flex justify-center items-center">
        <div className=" border-2 border-rose-500 w-44 h-32">
          {
            <div>
              <h2>User Data</h2>
              <p>Name: {userData.Name}</p>
              <p>Username: {userData.Username}</p>
              <p>Email: {userData.Email}</p>
              <ul></ul>
              <p>
                {usercategory.map((item) => {
                  return <span key={item.id}>{item.title}</span>;
                })}
              </p>
            </div>
          }
        </div>
        <div></div>
      </main>
      <aside></aside>
    </>
  );
}

export default Homepage;
