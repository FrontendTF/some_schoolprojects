import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(["movie", id], () =>
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=4ccfe8b9`).then((res) =>
      res.json()
    )
  );

  if (isLoading) return "Loading...";
  if (error) return `${(error as Error).message}`;

  return (
    <div className="w-11/12 mx-auto my-10 allptagsforDetailView">
      <div className="flex ">
        <div>
          <img src={data.Poster} alt={`${data.Title} `} className="w-3/4" />
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="H2 font-extrabold tracking-wide">{data.Title}</h2>
          <div className="flex">
            <p>{data.Year}</p>/<p>{data.Genre}</p>
          </div>
        </div>
      </div>

      <br />
      <div className="btags">
        <p>
          <b> Title</b>
          {data.Title}
        </p>
        <p>
          <b> Year </b>
          {data.Year}
        </p>
        <p>
          <b> Genre </b>
          {data.Genre}
        </p>
        <p>
          <b> Plot</b> {data.Plot}
        </p>
        <p>
          <b>Type</b> {data.Type}
        </p>
        <p>
          <b> Released </b>
          {data.Released}
        </p>
      </div>
    </div>
  );
}

export default MovieDetail;
