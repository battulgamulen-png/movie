"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/_features/Header";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = "/search/movie?query=${searchValue}&language=en-US&page=${page}";

export default function SearchPage() {
  const { searchValue } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // 🎬 Search movies
  useEffect(() => {
    if (!searchValue) return;

    fetch(`${BASE_URL}/search/movie?query=${searchValue}&include_adult=false`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [searchValue]);

  // 🎭 Genre list
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-[1400px] mx-auto mt-6 flex gap-10">
        {/* LEFT CONTENT */}
        <main className="flex-1">
          <h1 className="text-xl font-semibold mb-2">Search results</h1>

          <p className="text-sm text-gray-500 mb-6">
            {movies.length} results for “{searchValue}”
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="cursor-pointer">
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/no-image.png"
                      }
                      alt={movie.title}
                      fill
                      className="object-cover hover:scale-105 transition"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>

                  <p className="text-xs text-gray-500">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[300px] border-l pl-6">
          <h2 className="font-semibold text-lg mb-1">Search by genre</h2>
          <p className="text-sm text-gray-500 mb-4">
            See lists of movies by genre
          </p>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="px-3 py-1.5 text-sm rounded-full border
                         hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
