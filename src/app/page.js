import { Footer } from "./_features/Footer";
import Header from "./_features/Header";
import HeroSection from "./_features/Home/HeroSection";
import { MovieList } from "./_features/Home/MovieList";

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <HeroSection />
        <MovieList type="upcoming" />
        <MovieList type="popular" />
        <MovieList type="top_rated" />
        <Footer />
      </div>
    </>
  );
}
