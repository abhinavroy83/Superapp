import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MovieSearch = () => {
  const useCategory = useSelector((state) => state.category);
  const [categoryMovies, setCategoryMovies] = useState({});

  useEffect(() => {
    const fetchMoviesForCategory = async (category) => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2ddc185422msh7a505ce71d867adp1311d9jsna67a7f51d280",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(
          `https://moviesdatabase.p.rapidapi.com/titles?genre=${category}&year=2022`,
          options
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Adjust data extraction based on the response structure of your new API
          const newMovies = data.results.slice(4,8);
          setCategoryMovies((prevMovies) => ({
            ...prevMovies,
            [category]: newMovies,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch movies for each category
    useCategory.forEach((category) => {
      fetchMoviesForCategory(category.title);
    });
  }, [useCategory]);

  return (
    <>
      {useCategory.map((category) => (
        <div key={category.id}>
          <p>{category.title}</p>
          <div className="flex">
            {categoryMovies[category.title]?.map((movie, idx) => {
              console.log(movie?.primaryImage?.url);
              return (
                <div key={idx} style={{ width: "20vw", margin: "2vw" }}>
                  {/* <p>{movie?.releaseYear?.year}</p> */}
                  <img
                    src={movie?.primaryImage?.url}
                    style={{
                      objectFit: "cover",
                      width: "20vw",
                      height: "20vh",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieSearch;
