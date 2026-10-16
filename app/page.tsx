import { Suspense } from "react";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import BuildStrip from "@/components/BuildStrip";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Blog from "@/components/Blog";
import { BlogSkeleton, ProjectsSkeleton } from "@/components/Skeletons";
import { site, socials } from "@/data/site";

// Re-check the database hourly so a failed build-time fetch heals itself.
export const revalidate = 3600;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.legalName,
  alternateName: site.name,
  jobTitle: site.role,
  url: site.url,
  email: "mailto:" + site.email,
  sameAs: socials.map((s) => s.href),
  knowsAbout: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
};

const page = () => {
  return (
    <div className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Home />
        <BuildStrip />
        <About />
        <Experience />
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
        <CurrentlyBuilding />
        <Services />
        <TechStack />
        <Process />
        <Suspense fallback={<BlogSkeleton />}>
          <Blog />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default page
