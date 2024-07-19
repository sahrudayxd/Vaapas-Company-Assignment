import React, { useEffect, useState } from "react";
import "./index.css";

const MovieCard = ({ title, author, year }) => {
  const [dogImage, setDogImage] = useState("");

  useEffect(() => {
    const getDogImage = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message);
    };
    getDogImage();
  }, []);

  return (
    <div className="movie-card">
      <img src={dogImage} alt="Random Dog" className="dog-image" />
      <div className="movie-content">
        <h1 className="movie-title">{title}</h1>
        <p>
          <strong>Author: </strong>
          {author}
        </p>
        <p>
          <strong>Year: </strong>
          {year}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
