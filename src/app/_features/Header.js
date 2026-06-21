"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Sum } from "../_icon/Sum";
import { Kino } from "../_icon/Kino";
import { Search } from "lucide-react";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Header() {
  const router = useRouter();

  const [genreOpen, setGenreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // 📱 Mobile search toggle
  const [genres, setGenres] = useState([]);

  const [value, setValue] = useState(""); // ✅ Search input state

  // 🎭 Genre list
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  const handleSearch = () => {
    const keyword = value.trim();
    if (!keyword) return;
    setSearchOpen(false); // 📱 Mobile search-г хаах
    router.push(`/search/${encodeURIComponent(keyword)}`); // 🔹 Search page рүү redirect
  };

  // 🎭 Genre dropdown (desktop + mobile-д дахин ашиглана)
  const genreMenu = (align = "left-0") => (
    <div
      className={`absolute top-full ${align} mt-2 w-72 max-w-[calc(100vw-2rem)] bg-background border border-border rounded-lg shadow-lg p-3 flex flex-wrap gap-2 z-50`}
    >
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genres/${genre.id}`}
          onClick={() => setGenreOpen(false)}
          className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-muted"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="w-full bg-background shadow-sm dark:shadow-none border-b border-border sticky top-0 z-40">
      <div className="w-full max-w-[1280px] mx-auto px-4 h-[59px] flex justify-between items-center gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#4338CA] italic text-base font-semibold shrink-0"
        >
          <Kino />
          <span>Movie</span>
        </Link>

        {/* Middle (desktop) */}
        <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
          {/* Genre */}
          <div className="relative">
            <button
              onClick={() => setGenreOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-md hover:bg-muted transition"
            >
              <Sum />
              <span className="text-foreground">Genre</span>
            </button>

            {genreOpen && genreMenu("left-0")}
          </div>

          {/* Search */}
          <div className="flex items-center border border-border rounded-md px-2 w-full max-w-[360px]">
            <input
              type="text"
              value={value} // ✅ State-д холбосон
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 min-w-0 h-[36px] text-foreground bg-transparent px-2 outline-none"
              placeholder="Search"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter дарахад
            />
            <button
              className="px-2 text-muted-foreground hover:text-foreground"
              onClick={handleSearch}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mobile genre */}
          <div className="relative md:hidden">
            <button
              onClick={() => setGenreOpen((prev) => !prev)}
              aria-label="Genre"
              className="w-9 h-9 flex justify-center items-center border border-border rounded-md hover:bg-muted transition"
            >
              <Sum />
            </button>
            {genreOpen && genreMenu("right-0")}
          </div>

          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search"
            className="md:hidden w-9 h-9 flex justify-center items-center border border-border rounded-md hover:bg-muted transition text-foreground"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center border border-border rounded-md px-2">
            <input
              type="text"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 min-w-0 h-[40px] text-foreground bg-transparent px-2 outline-none"
              placeholder="Search"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="px-2 text-muted-foreground hover:text-foreground"
              onClick={handleSearch}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
