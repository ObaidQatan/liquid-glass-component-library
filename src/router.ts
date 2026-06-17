import { useSyncExternalStore } from "react";

export type Route = {
  pathname: string;
  search: string;
  searchParams: URLSearchParams;
};

function getRoute(): Route {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    searchParams: new URLSearchParams(window.location.search),
  };
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
