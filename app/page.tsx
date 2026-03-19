import Contact from "@/app/components/Contact";
import Experience from "@/app/components/Experience";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Navbar from "@/app/components/Navbar";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
