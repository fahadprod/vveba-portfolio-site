'use client'

import BlogSection from "@/components/blog-section";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import HeroHeader from "@/components/hero-header";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useEffect } from "react";


export default function Home() {
   const scrollProgress = useScrollProgress();

  useEffect(() => {
    const menuIcon = document.querySelector(".menu-icon");
    const container = document.querySelector(".container");

    menuIcon.addEventListener("click", () => {
      container.classList.toggle("change");
    });

  }, []);
  return (
    <div className="container">
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />
      <Navbar />
      <HeroHeader />
      <Skills/>
      <Projects/>
      <BlogSection/>
      <Contact/>
      <Footer/>
    </div>
  );
}
