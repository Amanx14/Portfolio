import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  url?: string;
};

function ensureMeta(name: string, attr: "name" | "property" = "name") {
  const selector = `meta[${attr}="${name}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

export default function Seo(props: SeoProps) {
  const { title, description, url } = props;

  useEffect(() => {
    document.title = title;

    ensureMeta("description").content = description;

    // OpenGraph
    ensureMeta("og:title", "property").content = title;
    ensureMeta("og:description", "property").content = description;
    ensureMeta("og:type", "property").content = "website";
    if (url) ensureMeta("og:url", "property").content = url;

    // Twitter
    ensureMeta("twitter:card").content = "summary_large_image";
    ensureMeta("twitter:title").content = title;
    ensureMeta("twitter:description").content = description;
  }, [title, description, url]);

  return null;
}
