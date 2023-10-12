import React from "react";

export const Pagefooter = () => {
  return (
    <section className="bg-blue-600 text-white flex flex-col gap-10 items-center text-center sm:gap-20 sm:text-left py-20">
      <div className="flex flex-col gap-10 sm:gap-40 sm:flex-row">
        <div className="flex flex-col">
          <h3 className="uppercase font-bold">Coding-School-Blog</h3>
          <br />
          <p>Siemensstraße 20</p>
          <p>9020 Klagenfurt am Wörthersee</p>
          <a
            href="tel:0676843223246"
            title="Anrufen"
            className="hover:underline"
          >
            0676843223246
          </a>
        </div>
        <div className="font-semibold flex flex-col">
          <p>Lass uns Freunde sein</p>
          <br />
          <p>Logos</p>
        </div>
      </div>
      <p>©2023/ Coding-School am Wörthersee</p>
    </section>
  );
};
