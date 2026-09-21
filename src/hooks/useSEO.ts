import { useEffect } from "react";
import { siteConfig } from "@/data/site";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export function useSEO({
  title,
  description,
  image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  url,
  type = "website",
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} — ${siteConfig.name}`;
    
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Standard meta
    updateMeta("description", description);
    updateMeta("title", fullTitle);

    // Open Graph
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:image", image, true);
    updateMeta("og:type", type, true);
    if (url) updateMeta("og:url", url, true);

    // Twitter
    updateMeta("twitter:title", fullTitle, true);
    updateMeta("twitter:description", description, true);
    updateMeta("twitter:image", image, true);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url || window.location.href);

    // Cleanup
    return () => {
      document.title = `${siteConfig.tagline} — ${siteConfig.name}`;
    };
  }, [title, description, image, url, type]);
}

export function useJsonLd(data: Record<string, any>) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
