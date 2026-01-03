"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../_features/Footer";
import Header from "../../_features/Header";
import { useParams } from "next/navigation";
import MovieD from "@/app/_components/MovieD";
import { Searchfliter } from "@/app/_components/Searchfliter";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Page() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);

  async function getData() {
    const response = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setDetailData(data);
  }

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {detailData && <MovieD movie={detailData} />}

      <Footer />
    </div>
  );
}
