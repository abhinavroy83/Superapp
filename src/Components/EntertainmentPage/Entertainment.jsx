import React, { useEffect, useState } from "react";

function Entertainment() {
  const [moviedata, setmoviedata] = useState([]);
  const [random, setradom] = useState(null);

  useEffect(() => {
    fetchmoviedata();
  }, []);

  useEffect(() => {
    if (moviedata && moviedata.length > 0) {
      const index = Math.floor(Math.random() * moviedata.length);
      setradom(index);
    }
  }, [moviedata]);
  const fetchmoviedata = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/shows/1/cast");
      const data = await response.json();
      setmoviedata(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {moviedata && random !== null && moviedata.length > 0 ? (
        <div>
          <div>
            {moviedata.map((data) => (
              <div key={data.person.id}>
                {/* Don't forget to add a unique key */}
                {data.character &&
                  data.character.image &&
                  data.character.image.medium && (
                    <img src={data.character.image.medium} alt="npt" />
                  )}
                {data.character &&
                  data.person &&
                  data.person.name&&(
                    <p>Name: {data.person.name}</p>
                  )}
              </div>
            ))}
          </div>

          <img src={moviedata[random].character.image.medium} alt="npt" />
          <p>`person name {moviedata[random].person.name}`</p>
          <p>namw :{moviedata[random].character.name}</p>
        </div>
      ) : (
        <p>Loading news data...</p>
      )}
    </div>
  );
}

export default Entertainment;
