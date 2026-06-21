import { useRouter } from "next/navigation";
import Image from "next/image";

export const MovieCard = (props) => {
  const { image, title, rating, id } = props;

  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/movie-detail/${id}`)}
      className="cursor-pointer hover:scale-105 transition-transform duration-200 w-full"
    >
      <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden">
        <Image
          src={image}
          alt="Movie poster"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="w-full p-2 bg-card text-card-foreground rounded-md shadow-md mt-2 border border-border">
        <p className="text-xs sm:text-sm font-medium">
          ⭐️ {rating?.toFixed?.(1) ?? rating}/10
        </p>
        <p className="text-sm sm:text-base font-semibold line-clamp-1">
          {title}
        </p>
      </div>
    </div>
  );
};
