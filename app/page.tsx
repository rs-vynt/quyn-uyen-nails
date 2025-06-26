import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedServices from "./components/FeaturedServices";
import FeaturedGallery from './components/FeaturedGallery'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <FeaturedServices/>
      <FeaturedGallery />
    </main>
  );
}
