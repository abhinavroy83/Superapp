import React, { useEffect, useState } from "react";
import SelectData from "./SelectData.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../../store/categorySlice";
import "./Category.css";

function Category() {
  const [selectimage, setselectimage] = useState([]);
  const [Eroors, setErros] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlimageclick = (image) => {
    if (selectimage.includes(image)) {
      setselectimage(
        selectimage.filter((selectimage) => selectimage !== image)
      );
    } else if (selectimage.length <= 9) {
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
      dispatch(setCategory(selectimage));
      navigate("/Homepage");
    }
  };

  return (
    <div className="category_main  ">
      <div className="selected-images">
        <p className="header_name">Super app</p>
        <p className="choose_header">Choose your entertainment category</p>
        <div className=" flex flex-wrap justify-evenly items-start category_box">
          {selectimage.map((image) => (
            <div key={image.id} className="category_list">
              <p>{image.title}</p>
              <button onClick={() => handleDeleteImage(image)}>X</button>
            </div>
          ))}
        </div>
        {Eroors && <p className="error">{Eroors}</p>}
      </div>
      <div className="image_box">
        {SelectData.map((image) => (
          <div
            key={image.id}
            onClick={() => handlimageclick(image)}
            className="img_box"
            style={{ backgroundColor: image.backgroundColor }}
          >
            <p style={{ backgroundColor: image.backgroundColor }}>
              {image.title}
            </p>
            <img src={image.url} alt={image.name} className="w-20 h-15" />
          </div>
        ))}
        <button onClick={nextpage} className="next_button">
          Next
        </button>
      </div>
    </div>
  );
}

export default Category;
