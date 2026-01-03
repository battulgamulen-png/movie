"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = "YOUR_TMDB_API_TOKEN_HERE"; // энд өөрийн TMDB API token-ээ тавина

export default function HeroSection({ id }) {
  const [videoId, setVideoId] = useState(null); // selected YouTube video key
  const [moviesData, setMoviesData] = useState([]);

  async function getData() {
    if (!id) return;
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMoviesData(data?.results || []);
    } catch (error) {
      console.error("API дуудахад алдаа гарлаа:", error);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  // TMDB-с хамгийн эхний YouTube trailer-ийг сонгоно
  const trailer = moviesData.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  return (
    <Carousel>
      <CarouselContent className="w-full">
        {Array.from({ length: 2 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="w-full h-full">
              <CardContent className="flex items-center justify-center p-0">
                <div className="relative w-full h-[600px] flex-shrink-0 overflow-x-scroll m-0">
                  <img
                    src="Hero.jpg"
                    alt="Hero Background"
                    className="inset-0 w-full h-full object-cover -z-10 bg-center bg-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent -z-10"></div>

                  <div className="absolute bottom-[60px] left-[80px] text-white max-w-[400px]">
                    <p className="text-gray-300 text-sm mb-2">Now Playing:</p>
                    <p className="text-3xl font-semibold mb-2">Wicked</p>
                    <p className="text-yellow-400 text-sm mb-4">⭐ 6.9 / 10</p>
                    <p className="text-gray-200 text-[14px] leading-relaxed mb-5">
                      Elphaba, a misunderstood young woman because of her green
                      skin, and Glinda, a popular girl, become friends at Shiz
                      University in the Land of Oz. After an encounter with the
                      Wonderful Wizard of Oz, their friendship reaches a
                      crossroads.
                    </p>

                    {trailer && (
                      <button
                        onClick={() => setVideoId(trailer.key)}
                        className="bg-[#f4f4f5] text-black rounded-[8px] px-4 py-2 font-medium hover:bg-white/80 transition"
                      >
                        ▶ Watch Trailer
                      </button>
                    )}

                    {videoId && (
                      <div className="fixed flex justify-center items-center inset-0 bg-black/80 z-50 backdrop-blur-md">
                        <div className="relative w-[800px] h-[450px]">
                          <button
                            onClick={() => setVideoId(null)}
                            className="absolute top-2 right-2 text-white text-xl font-bold z-50"
                          >
                            ✕
                          </button>
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="YouTube trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

