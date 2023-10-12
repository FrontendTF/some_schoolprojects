import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

type Inputs = {
  title: string;
  desc: string;
  date: string;
  image: string;
};

const schema = yup.object().shape({
  title: yup.string().required(),
  desc: yup.string().required(),
  date: yup.string().required(),
  image: yup.string().required(),
});

type BlogPost = {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
};

type BlogErstellenProps = {
  addBlogPost: (blogPost: BlogPost) => void;
};

export const Blog_erstellen = ({ addBlogPost }: BlogErstellenProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (formData: Inputs) => {
    const blogPost: BlogPost = { ...formData, id: Date.now() };
    addBlogPost(blogPost);
    navigate("/");
  };

  return (
    <form
      className="py-40 flex flex-col items-center gap-1 bg-slate-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="H2 p-1">Blogerstellung</h2>
      <input
        type="text"
        placeholder="Titel"
        className="inputstyle"
        {...register("title")}
      />
      <input
        type="text"
        placeholder="Beschreibung"
        className="inputstyle"
        {...register("desc")}
      />
      <input
        type="text"
        placeholder="Datum"
        className="inputstyle"
        {...register("date")}
      />
      <input
        type="text"
        placeholder="Image"
        className="inputstyle"
        {...register("image")}
      />
      <button type="submit" className="bluebutton">
        Senden
      </button>
      <div>{errors.title?.message}</div>
      <div>{errors.desc?.message}</div>
      <div>{errors.date?.message}</div>
      <div>{errors.image?.message}</div>
    </form>
  );
};
