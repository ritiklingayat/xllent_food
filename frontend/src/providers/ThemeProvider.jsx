import { useEffect } from "react";

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.body.classList.add("bg-slate-50");
  }, []);

  return children;
}