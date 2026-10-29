import { useSyncExternalStore, type AnchorHTMLAttributes, type ReactNode } from "react";

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/" || pathname.endsWith("/index.html")) return "/";
  return pathname.replace(/\/+$/, "");
}

const KNOWN_ROUTES = new Set([
  "/",
  "/abrir-empresa",
  "/simulador",
  "/prazos-fiscais",
  "/institucional",
  "/politica-de-privacidade",
  "/unidades/junqueiropolis",
  "/unidades/dracena",
]);

function readRoute(): string {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash;
  if (hash.startsWith("#/")) return normalizePath(hash.slice(1));
  const pathname = normalizePath(window.location.pathname);
  return KNOWN_ROUTES.has(pathname) ? pathname : "/";
}

/**
 * Rota atual. Âncoras internas (ex.: #conteudo) não alteram a rota.
 */
let currentRoute = readRoute();

export function getCurrentPath(): string {
  return currentRoute;
}

function syncRoute(): void {
  const hash = window.location.hash;
  if (hash.startsWith("#/")) {
    currentRoute = normalizePath(hash.slice(1));
    return;
  }
  if (!hash) {
    const pathname = normalizePath(window.location.pathname);
    currentRoute = KNOWN_ROUTES.has(pathname) ? pathname : "/";
  }
}

function subscribe(callback: () => void): () => void {
  const handler = () => {
    syncRoute();
    callback();
  };
  window.addEventListener("hashchange", handler);
  window.addEventListener("popstate", handler);
  return () => {
    window.removeEventListener("hashchange", handler);
    window.removeEventListener("popstate", handler);
  };
}

export function useRoute(): string {
  return useSyncExternalStore(subscribe, getCurrentPath, () => "/");
}

export function navigate(to: string): void {
  if (typeof window === "undefined") return;
  const target = to.startsWith("/") ? to : `/${to}`;
  if (getCurrentPath() === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = target;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={`#${to}`}
      onClick={(event) => {
        onClick?.(event);
        if (getCurrentPath() === to) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
