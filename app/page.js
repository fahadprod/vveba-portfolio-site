'use client'

import Contact from "@/components/contact";
import Footer from "@/components/footer";
import HeroHeader from "@/components/hero-header";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const menuIcon = document.querySelector(".menu-icon");
    const container = document.querySelector(".container");

    menuIcon.addEventListener("click", () => {
      container.classList.toggle("change");
    });

  }, []);
  return (
    <div className="container">
      <Navbar />
      <HeroHeader />
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}
