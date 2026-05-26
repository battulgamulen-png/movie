"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

const AUTOPLAY_MS = 6500;

export default function HeroSection() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [videoKey, setVideoKey] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        const filtered = (data?.results || [])
          .filter((m) => m.backdrop_path)
          .slice(0, 6);
        setMovies(filtered);
      } catch (err) {
        console.error("Hero fetch error:", err);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0 || videoKey) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % movies.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [movies.length, videoKey]);

  const goTo = (i) => {
    setIndex(((i % movies.length) + movies.length) % movies.length);
  };

  const playTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      const trailer =
        data?.results?.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        ) ||
        data?.results?.find(
          (v) => v.site === "YouTube" && v.type === "Teaser"
        );
      if (trailer?.key) setVideoKey(trailer.key);
    } catch (err) {
      console.error("Trailer fetch error:", err);
    }
  };

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[600px] bg-card animate-pulse" />
    );
  }

  const current = movies[index];

  return (
    <section className="relative w-full h-[600px] overflow-hidden group">
      {/* Slides */}
      {movies.map((movie, i) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority={i === 0}
            className={`object-cover transition-transform duration-[8000ms] ease-out ${
              i === index ? "scale-105" : "scale-100"
            }`}
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-end pb-20">
        <div className="max-w-2xl text-white">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary-foreground/80 bg-primary/30 backdrop-blur px-3 py-1 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Now Playing
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            {current.title}
          </h1>

          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-400/20 border border-yellow-400/40 text-yellow-300">
              ⭐ {current.vote_average?.toFixed(1)}
            </span>
            {current.release_date && (
              <span className="text-gray-200">
                {current.release_date.slice(0, 4)}
              </span>
            )}
            {current.original_language && (
              <span className="uppercase text-gray-300 tracking-wider">
                {current.original_language}
              </span>
            )}
          </div>

          <p className="mt-4 text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3 max-w-xl">
            {current.overview}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => router.push(`/movie-detail/${current.id}`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-black font-semibold shadow-lg hover:bg-white/90 active:scale-95 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>
            <button
              onClick={() => playTrailer(current.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 active:scale-95 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
              </svg>
              Trailer
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-2 mt-8">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-4 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur border border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition flex items-center justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Mini poster strip on the right (desktop only) */}
      <div className="hidden lg:flex absolute right-12 bottom-20 z-10 gap-3">
        {movies.slice(0, 5).map((m, i) => (
          <button
            key={m.id}
            onClick={() => goTo(i)}
            className={`relative w-20 h-28 rounded-md overflow-hidden ring-2 transition-all ${
              i === index
                ? "ring-white scale-110"
                : "ring-white/20 hover:ring-white/60 opacity-70 hover:opacity-100"
            }`}
          >
            {m.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                alt={m.title}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {/* Trailer modal */}
      {videoKey && (
        <div
          onClick={() => setVideoKey(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <button
              onClick={() => setVideoKey(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
