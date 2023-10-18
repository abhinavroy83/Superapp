import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Counter from "./Counter";
import { Link } from "react-router-dom";
import "./Homepage.css";

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
        "http://api.weatherapi.com/v1/current.json?key=30ef2adf71ae4ef7a5d171126230710&q={bihar}&aqi=no"
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
    <div className="main">
      <div className=" flex-col justify-center px-5 gap-2 items-center">
        <div className="flex justify-between">
          <div className=" ">
            <div className="nameAndcategory">
              <div className="  userimage ">
                <img
                  src="https://s3-alpha-sig.figma.com/img/fb40/f748/ece2d5643cf2ffbd07a4d6221e0c51ff?Expires=1698624000&Signature=CUvaaUHj5UUAD4EAB5x9LSH14HLnQX8BkggYjpn64eVw2JtRMRPuHjHpZjWzLl0y8MdKb6RkYPtVYQVn3EPiywlmKhSlMxZPwKr-dNAL~GVr96hWKCs5lCVhSDRc8FRMlT-QiLIsISWUfCB-nY2S1-DX7T5gLklHs2DPz~dLstJ0qCPP-7CbQRlSeO~BjVE9B6us74Xdjk8gElPMrs9atWBC7sfBr2t7ewC6w~cM99888ymQajW6R2JfsSBAeoQwoi7~P~gjxR3peADknSB1f3dtO95ExPR8MM3J3S2B~rA9ay59sLxdjD-gQcca4bx6k1e5QFwfytNCL4tHcoPxNg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt="error"
                />
              </div>
              <div>
                {userData && usercategory ? (
                  <div>
                    <div className="userDetails">
                      <p>{userData.Name}</p>
                      <p>{userData.Email}</p>
                      <p id="username">{userData.Username}</p>
                    </div>

                    <div className="category_details">
                      {usercategory.map((item) => {
                        return (
                          <p key={item.id} className="category_title my-2">
                            {item.title}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p>Error in userData or userCategory</p>
                )}
              </div>
            </div>
            <div className="  whetherdatandtime">
              {weatherData ? (
                <div className=" mt-1.25">
                  <div className="date_time">
                    <p>
                      Current Date and Time: {formatLocalTime(currentDateTime)}
                    </p>
                    <h2>localtime in {weatherData.location.localtime}</h2>
                  </div>
                  <div className="whether_details">
                    <div className="whether_name">
                      <img
                        src={weatherData.current.condition.icon}
                        alt="Weather Icon"
                      />
                      <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="vr"></div>
                    <div className="whether_pressure">
                      <p id="pre_header">{weatherData.current.temp_c}°C</p>
                      <p>{weatherData.current.pressure_mb} mbar</p>
                      <p>Pressure</p>
                    </div>
                    <div className="vr"></div>
                    <div>
                      <div className="wind">
                        <p>{weatherData.current.wind_kph}km/h</p>
                        <p>Wind</p>
                      </div>
                      <div className="wind">
                        <p>{weatherData.current.humidity}%</p>
                        <p>Humidiy</p>
                      </div>
                    </div>
                  </div>
                  {/* Add more weather data as needed */}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="textarea">
            <p>All notes</p>
            <textarea name="" id="" cols="40" rows="18"></textarea>
          </div>
        </div>
        <div>
          <Counter />
        </div>
      </div>

      <div>
        {/* <h2>News API</h2> */}
        {NewsData && randomnews && NewsData.articles.length > 0 ? (
          <div className="newssection">
            <img
              src={NewsData.articles[randomnews].urlToImage}
              alt="imagenotfound"
            />
            <div className="details_article">
              <p className="header_article">
                {NewsData.articles[randomnews].title}
              </p>
              <p className="header_time">
                {NewsData.articles[randomnews].publishedAt}
              </p>
            </div>
            <div className="articles">
              <p>
                {NewsData.articles[randomnews].content.replace(
                  /\[\+\d+ chars\]/,
                  ""
                )}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading news data...</p>
        )}
        <Link to="/Enterainment" className="browse">
          <button>Browse</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
