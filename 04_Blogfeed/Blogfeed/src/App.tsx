import { useEffect, useState } from "react";
import "./index.css";
import logo from "./components/bloglogo.jpg";

import { Pageheader } from "./components/Pageheader";
import { Pagefooter } from "./components/Pagefooter";
import Blogcard from "./commons/Blogcard";
import Blogcards from "./commons/Blogcards";
import initialData from "./components/daten";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import { Blog_erstellen } from "./pages/Blog_erstellen";

function App() {
  const [data, setData] = useState(initialData);

  type BlogPost = {
    id: number;
    title: string;
    desc: string;
    date: string;
    image: string;
  };

  const addBlogPost = (blogPost: BlogPost) => {
    setData((prevData) => [...prevData, blogPost]);
  };

  return (
    <Router>
      <Pageheader />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/post/:id" element={<Blogs data={data} />} />
        <Route
          path="/createBlog"
          element={<Blog_erstellen addBlogPost={addBlogPost} />}
        />
      </Routes>
      <Pagefooter />
    </Router>
  );
}
type HomePageProps = {
  data: {
    id: number;
    title: string;
    desc: string;
    date: string;
    image: string;
  }[];
};

function HomePage({ data }: HomePageProps) {
  const firstItem = data.slice(0, 1);
  const restItems = data.slice(1);

  useEffect(() => {
    fetch("https://simple-blog-backend.dev.webundsoehne.com/api/v1/blogs").then;
  });

  return (
    <>
      <Blogcard
        id={firstItem[0].id}
        title={firstItem[0].title}
        desc={firstItem[0].desc}
        date={firstItem[0].date}
        image={firstItem[0].image}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {restItems.map((item) => (
          <Blogcards
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.desc}
            date={item.date}
            image={item.image}
          />
        ))}
      </section>
      <hr />
      <br />
      <br />
      <h2>Hallo</h2>
    </>
  );
}

export default App;
