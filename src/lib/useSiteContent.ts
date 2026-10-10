"use client";

import { createContext, createElement, useContext, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "./siteContent";

const SiteContentContext = createContext<SiteContent>(defaultContent);

export function SiteContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return createElement(SiteContentContext.Provider, { value: content }, children);
}

export function useSiteContent() {
  return { content: useContext(SiteContentContext) };
}
