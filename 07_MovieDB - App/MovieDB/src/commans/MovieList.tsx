import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function MovieList({ search }: { search: string }) {
  const { isLoading, error, data } = useQuery(["search", search], () =>
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=4ccfe8b9`).then((res) =>
      res.json()
    )
  );

  if (isLoading) return "Loading...";
  if (error) return `Ein Fehler ist aufgetreten: ${(error as Error).message}`;
  if (data.Response === "False")
    return (
      <p className="font-bold pl-5 underline bg-red-400 w-1/2 text-center justify-center mx-auto rounded-lg">
        {data.Error}
      </p>
    );

  type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
  };

  return (
    <div className="p-5 mx-5 flex flex-col gap-5">
      <h2 className="H2 font-bold"> Results</h2>
      <div className="flex flex-col md:flex-row justify-between border-b-2">
        <p className="H3">Title</p>
        <div className="flex justify-between md:w-1/2">
          <span className="H3">Year</span>
          <span className="H3">Type</span>
          <span className="H3">Detailview</span>
        </div>
      </div>

      {data.Search.map((item: Movie) => (
        <div
          key={item.imdbID}
          className="flex flex-col md:flex-row border-b-2 justify-between"
        >
          <div>
            <h2 className="font-semibold md:font-normal">{item.Title}</h2>
          </div>
          <div className="flex md:w-1/2 justify-between gap-2">
            <div>{item.Year}</div>
            <div>{item.Type}</div>
            <div>
              <Link to={`/detail/${item.imdbID}`}>
                <button className="bg-gradient-to-r from-red-300 to-red-400 px-3 py-1 rounded-md text-white font-semibold">
                  Show More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
