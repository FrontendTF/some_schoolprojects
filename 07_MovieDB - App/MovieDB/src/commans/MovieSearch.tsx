import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Pageheader } from "../components/pageheader";

const schema = yup.object().shape({
  search: yup.string().required(),
});

function MovieSearch({
  onSearch,
}: {
  onSearch: (data: { search: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Pageheader />
      <section className="bg-slate-50">
        <div className="p-5 border-b-4 mx-4">
          <h2 className="font-bold">Name of Movie/Series/episode *</h2>
          <form
            onSubmit={handleSubmit(onSearch)}
            className="flex flex-col gap-5"
          >
            <input
              {...register("search")}
              className="border-2 rounded-md p-1 w-11/12 md:w-1/2"
              placeholder="type here ..."
            />

            {errors.search && <p>{errors.search.message}</p>}

            <button
              type="submit"
              className="bg-blue-400 flex px-5 py-2 rounded-md w-1/2 md:w-1/5 justify-center text-white font-bold tracking-wider "
            >
              search
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default MovieSearch;
