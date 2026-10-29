import { useEffect } from "react";
import { SITE } from "./site";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  type?: "website" | "article";
  noindex?: boolean;
};

function upsertMeta(attribute: "name" | "property", key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function useSeo({ title, description, path, image, jsonLd, type = "website", noindex = false }: SeoProps): void {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const canonicalPath = path === "/" ? "/" : path;
    const url = `${SITE.url}${canonicalPath}`;
    const absoluteImage = `${SITE.url}${image ?? "/images/og-classe-a.jpg"}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:locale", "pt_BR");
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", absoluteImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const existing = document.getElementById("page-jsonld");
    if (existing) existing.remove();

    if (jsonLdString) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById("page-jsonld");
      if (script) script.remove();
    };
  }, [title, description, path, image, jsonLdString, type, noindex]);
}

export function buildUnitJsonLd(unit: {
  id: string;
  city: string;
  state: string;
  name: string;
  address: string;
  addressLines: string[];
  mapsQuery: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: unit.name,
    url: `${SITE.url}/unidades/${unit.id}`,
    description: `Contabilidade, abertura de empresa e troca de contabilidade em ${unit.city}/${unit.state}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: unit.addressLines[0],
      addressLocality: unit.city,
      addressRegion: unit.state,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: `${unit.city}/${unit.state}` },
    parentOrganization: {
      "@type": "AccountingService",
      name: SITE.name,
      url: SITE.url,
    },
    sameAs: [SITE.instagram.url],
    knowsAbout: [
      "Abertura de empresa",
      "Contabilidade geral",
      "Folha de pagamento",
      "Impostos",
      "Assessoria contábil",
      "Troca de contabilidade",
      "Desenquadramento do MEI",
    ],
  };
}
