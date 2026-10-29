import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/" || pathname.endsWith("/index.html")) return "/";
  return pathname.replace(/\/+$/, "");
}

function readRoute(): string {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

/**
 * Rota atual baseada na URL real (History API), sem hash.
 * A Vercel reescreve rotas desconhecidas para index.html; o App decide
 * entre a página correspondente e a página 404.
 */
let currentRoute = readRoute();

export function getCurrentPath(): string {
  return currentRoute;
}

function syncRoute(): void {
  currentRoute = readRoute();
}

function subscribe(callback: () => void): () => void {
  const handler = () => {
    syncRoute();
    callback();
  };
  window.addEventListener("popstate", handler);
  window.addEventListener("routechange", handler);
  return () => {
    window.removeEventListener("popstate", handler);
    window.removeEventListener("routechange", handler);
  };
}

export function useRoute(): string {
  return useSyncExternalStore(subscribe, getCurrentPath, () => "/");
}

export function navigate(to: string): void {
  if (typeof window === "undefined") return;
  const target = normalizePath(to.startsWith("/") ? to : `/${to}`);
  if (getCurrentPath() === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", target);
  window.dispatchEvent(new Event("routechange"));
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
