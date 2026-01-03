import { useRouter } from "next/navigation";
import Image from "next/image";

export const MovieCard = (props) => {
  const { image, title, rating, id } = props;

  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/movie-detail/${id}`)}
      className="cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <Image
        src={image}
        alt="Movie poster"
        width={230}
        height={340}
        className="object-cover rounded-md"
      />
      <div className="w-[213px] h-[56px] p-2 bg-white dark:bg-gray-800 rounded-md shadow-md mt-2">
        <p className="text-sm font-medium text-black dark:text-white">
          ⭐️ {rating}/10
        </p>
        <p className="text-base font-semibold text-black dark:text-white">
          {title}
        </p>
      </div>
    </div>
  );
};
