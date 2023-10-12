import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import data from "../components/daten";

type BlogParamTypes = {
  id: string;
};

type BlogsProps = {
  data: {
    id: number;
    title: string;
    desc: string;
    date: string;
    image: string;
  }[];
};

const Blogs: React.FC<BlogsProps> = ({ data }) => {
  const { id } = useParams<BlogParamTypes>();
  const navigate = useNavigate();
  const blogPostIndex = data.findIndex((post) => post.id === Number(id));

  const handleNext = () => {
    if (blogPostIndex < data.length - 1) {
      navigate(`/post/${data[blogPostIndex + 1].id}`);
    }
  };

  const handlePrev = () => {
    if (blogPostIndex > 0) {
      navigate(`/post/${data[blogPostIndex - 1].id}`);
    }
  };

  if (blogPostIndex === -1) {
    return <div>Blogpost nicht gefunden</div>;
  }

  const { title, desc, date, image } = data[blogPostIndex];

  const isFirstPost = blogPostIndex === 0;
  const isLastPost = blogPostIndex === data.length - 1;

  return (
    <>
      <div className="pt-28 flex justify-between w-[90%] items-center m-auto">
        {!isFirstPost && (
          <button onClick={handlePrev} className="text-blue-500">
            &#10096;&#129152; Zum Vorherigen Blog
          </button>
        )}
        {!isLastPost && (
          <button onClick={handleNext} className="text-blue-500">
            Zum Nächsten Blog &#129154;&#10097;
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row px-10 pt-10 justify-center items-center">
        <div className="flex md:w-[50%]">
          <img src={image} alt={title} className="w-full h-auto" />
        </div>
        <div className="flex blogcard p-5 md:w-1/2">
          <h3 className="H2">{title}</h3>
          <br />
          <br />
          <hr />

          <p>
            Erstellt am: <span className="text-blue-500"> {date}</span>
          </p>
        </div>
      </div>
      <p className="p-10 lg:text-xl">{desc}</p>
    </>
  );
};

export default Blogs;
