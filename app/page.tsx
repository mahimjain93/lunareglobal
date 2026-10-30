import MoonStage from "@/components/MoonStage";
import ScrollEffects from "@/components/ScrollEffects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Why from "@/components/sections/Why";
import Contact from "@/components/sections/Contact";
import { structuredData } from "@/lib/structured-data";

const jsonLd = structuredData();

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <MoonStage />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Process />
        <Why />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ScrollEffects />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
