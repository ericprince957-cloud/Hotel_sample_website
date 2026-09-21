import { useEffect } from "react";
import { siteConfig } from "@/data/site";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} — ${siteConfig.name}`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export function useMetaDescription(description: string) {
  useEffect(() => {
    let meta = document.querySelector('meta[name="description"]');
    const previousContent = meta?.getAttribute("content") || "";

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", description);

    return () => {
      meta?.setAttribute("content", previousContent);
    };
  }, [description]);
}
