"use client";

import { useState } from "react";
import Image from "next/image";

export default function MovieD({ movie, trailerKey }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isMovieOpen, setIsMovieOpen] = useState(false);

  return (
    <div className="text-foreground">
      {/* Hero section with backdrop */}
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-56 md:-mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          {movie.poster_path && (
            <div className="shrink-0 mx-auto md:mx-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={260}
                height={390}
                className="rounded-xl shadow-2xl ring-1 ring-border"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-32">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {movie.title}
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-500">
                <span>⭐</span>
                <span className="font-semibold">
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-muted-foreground text-sm">/ 10</span>
              </div>
            </div>

            {movie.tagline && (
              <p className="mt-2 italic text-muted-foreground">
                “{movie.tagline}”
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
              {movie.release_date && <span>{movie.release_date}</span>}
              {movie.runtime ? (
                <>
                  <span className="opacity-50">•</span>
                  <span>{movie.runtime} min</span>
                </>
              ) : null}
              {movie.original_language && (
                <>
                  <span className="opacity-50">•</span>
                  <span className="uppercase">{movie.original_language}</span>
                </>
              )}
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="border border-border bg-card/50 backdrop-blur px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => setIsMovieOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium shadow-lg hover:opacity-90 active:scale-95 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Movie
              </button>

              {trailerKey && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card/60 backdrop-blur hover:bg-card transition active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overview */}
        {movie.overview && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {movie.overview}
            </p>
          </div>
        )}

        {/* Extra info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pb-12">
          <InfoCard label="Status" value={movie.status} />
          <InfoCard
            label="Language"
            value={movie.original_language?.toUpperCase()}
          />
          <InfoCard
            label="Budget"
            value={
              movie.budget ? `$${movie.budget.toLocaleString()}` : "—"
            }
          />
          <InfoCard
            label="Revenue"
            value={
              movie.revenue ? `$${movie.revenue.toLocaleString()}` : "—"
            }
          />
        </div>
      </div>

      {isTrailerOpen && (
        <VideoModal
          title={`${movie.title} trailer`}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}

      {isMovieOpen && (
        <VideoModal
          title={`${movie.title} movie`}
          src={`https://www.vidking.net/embed/movie/${movie.id}`}
          onClose={() => setIsMovieOpen(false)}
          wide
        />
      )}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card/50">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium truncate">{value || "—"}</p>
    </div>
  );
}

function VideoModal({ title, src, onClose, wide }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          wide ? "max-w-6xl" : "max-w-4xl"
        } aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <iframe
          className="w-full h-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
