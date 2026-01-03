"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Searchfliter() {
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState([16, 35]); // Animation + Comedy
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  // 🎭 Genre list
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  // 🎬 Movies by genre
  useEffect(() => {
    fetch(
      `${BASE_URL}/discover/movie?with_genres=${selected.join(
        ","
      )}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [selected, page]);

  // genre toggle
  const toggleGenre = (id) => {
    setPage(1);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto flex gap-6 mt-6">
        {/* LEFT FILTER */}
        <aside className="w-[260px] border-r pr-4">
          <h2 className="font-semibold text-lg mb-3">Genres</h2>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`px-3 py-1.5 text-sm rounded-full border
                ${
                  selected.includes(genre.id)
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1">
          <p className="text-sm text-gray-500 mb-4">
            {movies.length} titles in "
            {genres
              .filter((g) => selected.includes(g.id))
              .map((g) => g.name)
              .join(", ")}
            "
          </p>

          {/* MOVIE GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movie-detail/${movie.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>

                  <p className="text-xs text-gray-500">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3 py-1">{page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
