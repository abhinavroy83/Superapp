import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MovieSearch = () => {
  const [responseData, setResponseData] = useState([]);
  const useCategory = useSelector((state) => state.category);
  console.log(useCategory)

  useEffect(() => {
    fetchmoviedata();
  }, []);

  const fetchmoviedata = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=57abbcbb70212586ce7032d82b824430"
      );
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {useCategory ? (
          <div>
            {useCategory.map((item) => {
                  return (
                    <span key={item.id} className=" px-2">
                      {item.title}
                    </span>
                  );
                })}
          </div>
        ) : (
          <p>Eroor</p>
        )}
      </div>

      <div>
        {responseData &&
        responseData.results &&
        responseData.results.length > 0 ? (
          <div>
            {responseData.results.map((data, index) => (
              <div key={index}>
                <p>{data.title}</p>
                <p>{data.media_type}</p>
                <img
                  src={
                    data.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${data.poster_path}`
                      : unavailable
                  }
                  alt="not available"
                />

                {/* <img src={data.backdrop_path} alt="not" /> */}
              </div>
            ))}
            {/* <h1>{responseData.results[0].title}</h1>
          <img src={responseData.results[0].poster_path} alt="not" /> */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      
    </div>
  );
};

export default MovieSearch;
