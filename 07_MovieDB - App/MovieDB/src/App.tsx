import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieSearch from "./commans/MovieSearch";
import MovieList from "./commans/MovieList";
import MovieDetail from "./commans/MovieDetail";
import { Pagefooter } from "./components/pagefooter";

const queryClient = new QueryClient();

function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <MovieSearch
        onSearch={({ search }: { search: string }) => setSearch(search)}
      />
      {search && <MovieList search={search} />}
      <Pagefooter />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
