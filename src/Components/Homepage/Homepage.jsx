import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Counter from "./Counter";
import { Link } from "react-router-dom";

function Homepage() {
  const userData = useSelector((state) => state.user);
  const usercategory = useSelector((state) => state.category);
  console.log("Redux State (userData):", usercategory);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  //whehter APi

  const [weatherData, setweatherData] = useState(null);
  const [NewsData, setNewsData] = useState(null);

  const [randomnews, setrandomnews] = useState(null);

  useEffect(() => {
    fetchwheatherData();
    fetchnewsApiData();
    setCurrentDateTime(new Date());
  }, []);

  useEffect(() => {
    if (NewsData && NewsData.articles && NewsData.articles.length > 0) {
      const newIndex = Math.floor(Math.random() * NewsData.articles.length);
      setrandomnews(newIndex);
    }
  }, [NewsData]);

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
    } catch (error) {
      console.log("Error in fetch wheter api", error);
    }
  };

  const fetchnewsApiData = async () => {
    try {
      const res = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=a93917ce3f214ceda19a137c703eba3f"
      );

      if (!res.ok) {
        throw new Error("News Network response was not ok");
      }

      const newsdata = await res.json();
      setNewsData(newsdata);
      console.log("News Data:", newsdata);
    } catch (error) {
      console.log(error);
    }
  };
  const formatLocalTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  return (
    <body className=" flex">
      <main className=" flex-col justify-center px-5 gap-2 items-center">
        <div className=" border-2 border-rose-500 px-10">
          {userData && usercategory ? (
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
          ) : (
            <p>Error in userData or userCategory</p>
          )}
        </div>
        <div className=" border-2 border-rose-400 w-auto h-auto px-10">
          <h1>fetching the whether APi</h1>
          {weatherData ? (
            <div>
              <h2>Weather in {weatherData.location.name}</h2>
              <h2>localtime in {weatherData.location.localtime}</h2>

              <p>last_updated: {weatherData.current.last_updated}</p>
              <p>temp_c: {weatherData.current.temp_c}°C</p>
              <p>Condition: {weatherData.current.condition.text}</p>
              <img
                src={weatherData.current.condition.icon}
                alt="Weather Icon"
              />
              <p>
                Local Time:{" "}
                {formatLocalTime(new Date(weatherData.location.localtime))}
              </p>
              <p>Current Date and Time: {formatLocalTime(currentDateTime)}</p>
              {/* Add more weather data as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Counter />
      </main>

      <aside>
        <h2>News API</h2>
        {NewsData && randomnews && NewsData.articles.length > 0 ? (
          <div>
            <p>{NewsData.articles[randomnews].title}</p>
            <p>{NewsData.articles[randomnews].publishedAt}</p>
            <img
              src={NewsData.articles[randomnews].urlToImage}
              alt="imagenotfound"
            />
            {/* Display other article details as needed */}

            <p className=" border-2 border-rose-400 h-auto p-container">
              {NewsData.articles[randomnews].content.replace(
                /\[\+\d+ chars\]/,
                ""
              )}
            </p>
          </div>
        ) : (
          <p>Loading news data...</p>
        )}
      </aside>
      <Link to="/Enterainment">Browse</Link>
    </body>
  );
}

export default Homepage;
