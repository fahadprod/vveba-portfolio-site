'use client';

import { useEffect } from "react";

export const useScrollAnimation = (refs) => {
 useEffect(() => {
  const observer = new IntersectionObserver(
   (entries) => {
    entries.forEach((entry) => {
     console.log('Observed:', entry.target); 
     if (entry.isIntersecting) {
      entry.target.classList.add('show');
     } else {
      entry.target.classList.remove('show');
     }
    });
   },
   {threshold: 0.1}
  );

  refs.current.forEach((ref) => {
   if (ref) observer.observe(ref);
  });

  return () => {
   refs.current.forEach((ref) => {
    if (ref) observer.unobserve(ref);
   });
  };
 }, [refs]);
};
