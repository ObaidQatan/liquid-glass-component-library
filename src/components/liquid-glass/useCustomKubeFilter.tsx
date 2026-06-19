import { useMemo, type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import type { LiquidGlassSettings } from "./ThemeProvider";
import {
  KubeFilter,
  useKubeFilterId,
  kubePropsFromLiquidGlass,
} from "./kube";

export interface UseCustomKubeFilterResult {
  /** Full-quality filter URL for large surfaces. */
  filterUrl: string;
  /** Lite filter URL for small/medium surfaces. */
  liteFilterUrl: string;
  /** Render this somewhere in the React tree (sibling or portal). */
  Filter: ReactNode;
}

/**
 * Render a dedicated kube filter for a single component/subtree so it can use
 * liquid-glass settings that differ from the global ThemeProvider config.
 *
 * ⚠️ Performance note: every custom filter is a separate SVG filter graph and
 * its own set of backdrop-filter instances. Use sparingly for hero components
 * or small subtrees. Do not use this for every button/input — that would undo
 * the tiered/shared-filter optimizations.
 */
export function useCustomKubeFilter(
  overrides?: Partial<LiquidGlassSettings>
): UseCustomKubeFilterResult {
  const id = useKubeFilterId();
  const liteId = `${id}-lite`;
  const { liquidGlass } = useTheme();

  const settings = { ...liquidGlass, ...overrides };
  const baseProps = kubePropsFromLiquidGlass(settings);

  const filterUrl = `url(#${id})`;
  const liteFilterUrl = `url(#${liteId})`;

  const Filter = useMemo(
    () => (
      <KubeFilter
        id={id}
        liteId={liteId}
        width={1}
        height={1}
        normalized
        {...baseProps}
      />
    ),
    [id, liteId, baseProps]
  );

  return { filterUrl, liteFilterUrl, Filter };
}
