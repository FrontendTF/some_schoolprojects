import React from "react";

export const Pagefooter = () => {
  return (
    <section className="bg-slate-50">
      <div className="p-5 mx-5 flex flex-col gap-5">
        <h2 className="text-2xl">
          <b>Movie App</b> / <i>by Coding School</i>
        </h2>
        <p>created in 2022 / July</p>
        <p>
          Created with: The OMDb API is a RESTful web service to obtain movie
          information, all content and images on the site are contributed and
          maintained by our users. More Infos on the Api you can find here -{" "}
          <a
            href="https://www.omdbapi.com/"
            className="underline text-blue-800"
          >
            https://www.omdbapi.com/
          </a>
        </p>
      </div>
    </section>
  );
};
