import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <ScrollToTop />
    </div>
  );
}
