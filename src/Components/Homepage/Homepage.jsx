import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Homepage() {
  const userData = useSelector((state) => state.user);
  const usercategory = useSelector((state) => state.category);
  console.log("Redux State (userData):", usercategory);

  //whehter APi

  const [weatherData, setweatherData] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchwheatherData();
  }, []);

  const fetchwheatherData = async () => {
    try {
      const response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=30ef2adf71ae4ef7a5d171126230710&q=Delhi&aqi=no"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setweatherData(data);
      setloading(false);
    } catch (error) {
      console.log("Error in fetch wheter api", error);
      setloading(false);
    }
  };
  return (
    <>
      <main className=" flex justify-center px-5 gap-2 items-center">
        <div className=" border-2 border-rose-500 px-10">
          {
            <div>
              <h2>User Data</h2>
              <p>Name: {userData.Name}</p>
              <p>Username: {userData.Username}</p>
              <p>Email: {userData.Email}</p>

              <p className=" px-2">
                {usercategory.map((item) => {
                  return (
                    <span key={item.id} className=" px-2">
                      {item.title}
                    </span>
                  );
                })}
              </p>
            </div>
          }
        </div>
        <div className=" border-2 border-rose-400 w-auto h-auto px-10">
          <h1>fetching the whether APi</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2>Weather in {weatherData.location.name}</h2>
              <h2>localtime in {weatherData.location.localtime}</h2>
              <h2>localtime_epoch in {weatherData.location.localtime_epoch}</h2>
              <p>last_updated: {weatherData.current.last_updated}</p>
              <p>temp_c: {weatherData.current.temp_c}°C</p>
              <p>Condition: {weatherData.current.condition.text}</p>
              <img
                src={`https:${weatherData.current.condition.icon}`}
                alt="Weather Icon"
              />

              {/* Add more weather data as needed */}
            </div>
          )}
        </div>
      </main>
      <aside></aside>
    </>
  );
}

export default Homepage;
