import Image from "next/image";

export default function MovieD({ movie }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Title + Rating */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <div className="text-lg">⭐ {movie.vote_average?.toFixed(1)} / 10</div>
      </div>

      <p className="text-gray-500 mt-2">
        {movie.release_date} · {movie.runtime} min
      </p>

      {/* Images */}
      <div className="flex gap-6 mt-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          width={260}
          height={390}
          className="rounded-lg"
        />

        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          width={800}
          height={390}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-2 mt-6">
        {movie.genres?.map((genre) => (
          <span
            key={genre.id}
            className="border px-4 py-1 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* Overview */}
      <p className="mt-6 text-gray-700 leading-relaxed">{movie.overview}</p>

      {/* Extra info */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          <strong>Status:</strong> {movie.status}
        </p>
        <p>
          <strong>Language:</strong> {movie.original_language}
        </p>
        <p>
          <strong>Budget:</strong> ${movie.budget?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
