import { useSyncExternalStore } from "react";

export type Route = {
  pathname: string;
  search: string;
  searchParams: URLSearchParams;
};

let cachedRoute: Route | null = null;

function getRoute(): Route {
  const pathname = window.location.pathname;
  const search = window.location.search;
  if (cachedRoute && cachedRoute.pathname === pathname && cachedRoute.search === search) {
    return cachedRoute;
  }
  cachedRoute = {
    pathname,
    search,
    searchParams: new URLSearchParams(search),
  };
  return cachedRoute;
}

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

export function useRoute() {
  return useSyncExternalStore<Route>(subscribe, getRoute, getRoute);
}

export function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
