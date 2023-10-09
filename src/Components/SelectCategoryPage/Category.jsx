import React, { useEffect, useState } from "react";
import SelectData from "./SelectData.json";
import { useNavigate } from "react-router-dom";

function Category() {
  const [selectimage, setselectimage] = useState([]);
  const [Eroors, setErros] = useState("");
  const navigate = useNavigate();

  const handlimageclick = (image) => {
    if (selectimage.includes(image)) {
      setselectimage(
        selectimage.filter((selectimage) => selectimage !== image)
      );
    } else if (selectimage.length <= 5) {
      setselectimage([...selectimage, image]);
    }
  };

  const handleDeleteImage = (imagetodelete) => {
    setselectimage((previmgdelete) =>
      previmgdelete.filter((image) => image !== imagetodelete)
    );
  };
  useEffect(() => {
    if (selectimage.length < 3) {
      setErros("Minimum 3 category required");
    } else {
      setErros("");
    }
  }, [selectimage]);

  const nextpage = () => {
    if (selectimage.length >= 3) {
      console.log("Selected Images:");
      selectimage.forEach((image) => {
        console.log(image.name);
      });

      navigate("/Homepage");
    }
  };

  return (
    <div className=" flex justify-evenly  items-center">
      <div className="selected-images">
        <h2>Selected Images</h2>
        <ul>
          {selectimage.map((image) => (
            <li key={image.id}>
              {image.title}
              <button onClick={() => handleDeleteImage(image)}>X</button>
            </li>
          ))}
        </ul>
        {Eroors && <p>{Eroors}</p>}
      </div>
      <div className=" flex justify-evenly">
        {SelectData.map((image) => (
          <div
            key={image.id}
            onClick={() => handlimageclick(image)}
            className=" flex-col mx-4 w-20 h-15 border-red-50"
          >
            <p>{image.title}</p>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
      <button onClick={nextpage}>Next</button>
    </div>
  );
}

export default Category;
