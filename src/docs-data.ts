export interface DocsComponentEntry {
  id: string;
  name: string;
  file: string;
  category: string;
  description: string;
  usage: string;
  sourceCode: string;
  props: { name: string; type: string; required: boolean; description: string }[];
}

export const docsCategories = [
  "Theme & Glass Primitives",
  "Buttons & FABs",
  "Inputs, Toggles & Pickers",
  "Navigation",
  "Layout & Surfaces",
  "Data Display",
  "Feedback & Status",
  "Media & Content",
  "Overlays, Menus & Tooltips",
  "Modals, Drawers & Sheets",
];

export const docsComponents: DocsComponentEntry[] = [
  {
    "id": "glass-sheen",
    "name": "GlassSheen",
    "file": "src/components/liquid-glass/GlassSheen.tsx",
    "category": "Theme & Glass Primitives",
    "description": "Reusable specular sheen overlay for glass surfaces.",
    "usage": "<GlassSheen />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface GlassSheenProps {\n  className?: string;\n  opacity?: number;\n}\n\nexport function GlassSheen({ className, opacity = 0.12 }: GlassSheenProps) {\n  const { style, className: baseClass } = useGlassSurface({ variant: \"sheen\", opacity });\n  return <div className={cn(baseClass, className)} style={style} />;\n}\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "glass-top-highlight",
    "name": "GlassTopHighlight",
    "file": "src/components/liquid-glass/GlassTopHighlight.tsx",
    "category": "Theme & Glass Primitives",
    "description": "Reusable top highlight line used across glass components.",
    "usage": "<GlassTopHighlight />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface GlassTopHighlightProps {\n  className?: string;\n  opacity?: number;\n}\n\nexport function GlassTopHighlight({ className, opacity = 0.2 }: GlassTopHighlightProps) {\n  const { style, className: baseClass } = useGlassSurface({ variant: \"highlight\", opacity });\n  return <div className={cn(baseClass, className)} style={style} />;\n}\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "accordion",
    "name": "LiquidGlassAccordion",
    "file": "src/components/liquid-glass/LiquidGlassAccordion.tsx",
    "category": "Data Display",
    "description": "Collapsible accordion panels.",
    "usage": "<LiquidGlassAccordion />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion, AnimatePresence } from \"framer-motion\";\r\nimport { useState, type ReactNode } from \"react\";\r\nimport { ChevronDown } from \"lucide-react\";\r\n\r\ninterface AccordionItem {\r\n  id: string;\r\n  title: ReactNode;\r\n  content: ReactNode;\r\n  icon?: ReactNode;\r\n}\r\n\r\ninterface LiquidGlassAccordionProps {\r\n  items: AccordionItem[];\r\n  className?: string;\r\n  allowMultiple?: boolean;\r\n  defaultOpen?: string[];\r\n}\r\n\r\nexport function LiquidGlassAccordion({\r\n  items,\r\n  className,\r\n  allowMultiple = false,\r\n  defaultOpen = [],\r\n}: LiquidGlassAccordionProps) {\r\n  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));\r\n\r\n  const toggle = (id: string) => {\r\n    setOpenItems((prev) => {\r\n      const next = new Set(prev);\r\n      if (next.has(id)) {\r\n        next.delete(id);\r\n      } else {\r\n        if (!allowMultiple) next.clear();\r\n        next.add(id);\r\n      }\r\n      return next;\r\n    });\r\n  };\r\n\r\n  return (\r\n    <div className={cn(\"space-y-2\", className)}>\r\n      {items.map((item) => {\r\n        const isOpen = openItems.has(item.id);\r\n        return (\r\n          <motion.div\r\n            key={item.id}\r\n            className={cn(\r\n              \"overflow-hidden rounded-2xl\",\r\n              \"glass-blur-sm glass-surface glass-border\",\r\n              isOpen && \"glass-highlight\"\r\n            )}\r\n          >\r\n            <motion.button\r\n              whileTap={{ scale: 0.99 }}\r\n              onClick={() => toggle(item.id)}\r\n              className={cn(\r\n                \"flex w-full items-center gap-3 px-5 py-4 text-left transition-colors\",\r\n                isOpen ? \"text-[var(--lg-text)]\" : \"text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]\"\r\n              )}\r\n            >\r\n              {item.icon && (\r\n                <span className=\"flex-shrink-0 text-[var(--lg-text-muted)]\">{item.icon}</span>\r\n              )}\r\n              <span className=\"flex-1 text-sm font-medium\">{item.title}</span>\r\n              <motion.div\r\n                animate={{ rotate: isOpen ? 180 : 0 }}\r\n                transition={{ duration: 0.2 }}\r\n                className=\"flex-shrink-0 text-[var(--lg-text-muted)]\"\r\n              >\r\n                <ChevronDown size={16} />\r\n              </motion.div>\r\n            </motion.button>\r\n            <AnimatePresence initial={false}>\r\n              {isOpen && (\r\n                <motion.div\r\n                  initial={{ height: 0, opacity: 0 }}\r\n                  animate={{ height: \"auto\", opacity: 1 }}\r\n                  exit={{ height: 0, opacity: 0 }}\r\n                  transition={{ duration: 0.3, ease: \"easeInOut\" }}\r\n                >\r\n                  <div className=\"px-5 pb-4 text-sm text-[var(--lg-text-secondary)] leading-relaxed\">\r\n                    {item.content}\r\n                  </div>\r\n                </motion.div>\r\n              )}\r\n            </AnimatePresence>\r\n          </motion.div>\r\n        );\r\n      })}\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "items",
        "type": "AccordionItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "allowMultiple",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "defaultOpen",
        "type": "string[]",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "alert",
    "name": "LiquidGlassAlert",
    "file": "src/components/liquid-glass/LiquidGlassAlert.tsx",
    "category": "Feedback & Status",
    "description": "Theme-aware alert banners with status variants.",
    "usage": "<LiquidGlassAlert />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { X, AlertTriangle, CheckCircle, Info, AlertCircle } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface LiquidGlassAlertProps {\n  children: ReactNode;\n  className?: string;\n  variant?: \"info\" | \"success\" | \"warning\" | \"error\";\n  title?: string;\n  onClose?: () => void;\n  icon?: ReactNode;\n}\n\nconst variantStyles = {\n  info: {\n    border: \"border-liquid-blue/20\",\n    bg: \"bg-liquid-blue/8\",\n    icon: <Info size={18} className=\"text-liquid-blue\" />,\n    glow: \"bg-liquid-blue/10\",\n  },\n  success: {\n    border: \"border-liquid-emerald/20\",\n    bg: \"bg-liquid-emerald/8\",\n    icon: <CheckCircle size={18} className=\"text-liquid-emerald\" />,\n    glow: \"bg-liquid-emerald/10\",\n  },\n  warning: {\n    border: \"border-liquid-amber/20\",\n    bg: \"bg-liquid-amber/8\",\n    icon: <AlertTriangle size={18} className=\"text-liquid-amber\" />,\n    glow: \"bg-liquid-amber/10\",\n  },\n  error: {\n    border: \"border-liquid-rose/20\",\n    bg: \"bg-liquid-rose/8\",\n    icon: <AlertCircle size={18} className=\"text-liquid-rose\" />,\n    glow: \"bg-liquid-rose/10\",\n  },\n};\n\nexport function LiquidGlassAlert({\n  children,\n  className,\n  variant = \"info\",\n  title,\n  onClose,\n  icon,\n}: LiquidGlassAlertProps) {\n  const tapScale = useLiquidTapScale();\n  const v = variantStyles[variant];\n\n  return (\n    <motion.div\n      initial={{ opacity: 0, y: -10 }}\n      animate={{ opacity: 1, y: 0 }}\n      exit={{ opacity: 0, y: -10 }}\n      className={cn(\n        \"relative flex gap-3 rounded-2xl p-4\",\n        \"glass-blur-sm border\",\n        v.border,\n        v.bg,\n        className\n      )}\n    >\n      {/* Glow */}\n      <div className={cn(\"absolute -top-4 -left-4 h-16 w-16 rounded-full blur-2xl\", v.glow)} />\n      \n      <div className=\"relative flex-shrink-0 mt-0.5\">{icon || v.icon}</div>\n      <div className=\"relative flex-1 min-w-0\">\n        {title && (\n          <h4 className=\"text-sm font-semibold text-[var(--lg-text)] mb-1\">{title}</h4>\n        )}\n        <div className=\"text-sm text-[var(--lg-text-secondary)] leading-relaxed\">{children}</div>\n      </div>\n      {onClose && (\n        <motion.button\n          whileHover={{ scale: 1.1 }}\n          whileTap={{ scale: tapScale }}\n          onClick={onClose}\n          className=\"flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\n        >\n          <X size={16} />\n        </motion.button>\n      )}\n      {/* Top highlight */}\n      <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.15} />\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"info\" | \"success\" | \"warning\" | \"error\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": false,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element to display."
      }
    ]
  },
  {
    "id": "avatar",
    "name": "LiquidGlassAvatar",
    "file": "src/components/liquid-glass/LiquidGlassAvatar.tsx",
    "category": "Media & Content",
    "description": "Avatar with fallback, status, and ring.",
    "usage": "<LiquidGlassAvatar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport type { ReactNode } from \"react\";\r\n\r\ninterface LiquidGlassAvatarProps {\r\n  src?: string;\r\n  alt?: string;\r\n  fallback?: string | ReactNode;\r\n  className?: string;\r\n  size?: \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\r\n  status?: \"online\" | \"offline\" | \"away\" | \"busy\";\r\n  ring?: boolean;\r\n  ringColor?: string;\r\n}\r\n\r\nconst sizeStyles = {\r\n  xs: \"w-6 h-6 text-[10px]\",\r\n  sm: \"w-8 h-8 text-xs\",\r\n  md: \"w-10 h-10 text-sm\",\r\n  lg: \"w-14 h-14 text-base\",\r\n  xl: \"w-20 h-20 text-lg\",\r\n};\r\n\r\nconst statusColors = {\r\n  online: \"bg-liquid-emerald\",\r\n  offline: \"bg-[var(--lg-text-muted)]\",\r\n  away: \"bg-liquid-amber\",\r\n  busy: \"bg-liquid-rose\",\r\n};\r\n\r\nconst statusSizes = {\r\n  xs: \"w-1.5 h-1.5\",\r\n  sm: \"w-2 h-2\",\r\n  md: \"w-2.5 h-2.5\",\r\n  lg: \"w-3 h-3\",\r\n  xl: \"w-4 h-4\",\r\n};\r\n\r\nexport function LiquidGlassAvatar({\r\n  src,\r\n  alt,\r\n  fallback,\r\n  className,\r\n  size = \"md\",\r\n  status,\r\n  ring = false,\r\n  ringColor = \"rgba(255,255,255,0.15)\",\r\n}: LiquidGlassAvatarProps) {\r\n  const hasImage = src && src.length > 0;\r\n  const fallbackText =\r\n    typeof fallback === \"string\"\r\n      ? fallback\r\n          .split(\" \")\r\n          .map((w) => w[0])\r\n          .join(\"\")\r\n          .slice(0, 2)\r\n          .toUpperCase()\r\n      : fallback;\r\n\r\n  return (\r\n    <motion.div\r\n      whileHover={{ scale: 1.05 }}\r\n      className={cn(\"relative inline-flex\", className)}\r\n    >\r\n      <div\r\n        className={cn(\r\n          \"relative flex items-center justify-center rounded-full overflow-hidden\",\r\n          \"bg-gradient-to-br from-white/10 to-white/5\",\r\n          sizeStyles[size],\r\n        )}\r\n        style={ring ? { boxShadow: `0 0 0 2px ${ringColor}` } : undefined}\r\n      >\r\n        {hasImage ? (\r\n          <img\r\n            src={src}\r\n            alt={alt || \"Avatar\"}\r\n            className=\"h-full w-full object-cover\"\r\n          />\r\n        ) : (\r\n          <span className=\"font-semibold text-[var(--lg-text-secondary)]\">{fallbackText}</span>\r\n        )}\r\n        \r\n        {/* Glass overlay */}\r\n        <div className=\"absolute inset-0 rounded-full ring-1 ring-inset ring-white/10\" />\r\n      </div>\r\n      \r\n      {status && (\r\n        <span\r\n          className={cn(\r\n            \"absolute bottom-0 right-0 rounded-full ring-2 ring-[#0a0a0f]\",\r\n            statusColors[status],\r\n            statusSizes[size]\r\n          )}\r\n        />\r\n      )}\r\n    </motion.div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "src",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "alt",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "fallback",
        "type": "string | ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "size",
        "type": "\"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "status",
        "type": "\"online\" | \"offline\" | \"away\" | \"busy\"",
        "required": false,
        "description": ""
      },
      {
        "name": "ring",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "ringColor",
        "type": "string",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "badge",
    "name": "LiquidGlassBadge",
    "file": "src/components/liquid-glass/LiquidGlassBadge.tsx",
    "category": "Feedback & Status",
    "description": "Small status badge with dot and color variants.",
    "usage": "<LiquidGlassBadge />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport type { ReactNode } from \"react\";\r\n\r\ninterface LiquidGlassBadgeProps {\r\n  children: ReactNode;\r\n  className?: string;\r\n  variant?: \"default\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\";\r\n  size?: \"sm\" | \"md\";\r\n  dot?: boolean;\r\n}\r\n\r\nconst variantStyles = {\r\n  default: \"bg-[var(--lg-border)] text-[var(--lg-text-secondary)] border-[var(--lg-border-subtle)]\",\r\n  primary: \"bg-liquid-blue/15 text-liquid-blue border-liquid-blue/20\",\r\n  success: \"bg-liquid-emerald/15 text-liquid-emerald border-liquid-emerald/20\",\r\n  warning: \"bg-liquid-amber/15 text-liquid-amber border-liquid-amber/20\",\r\n  danger: \"bg-liquid-rose/15 text-liquid-rose border-liquid-rose/20\",\r\n  info: \"bg-liquid-cyan/15 text-liquid-cyan border-liquid-cyan/20\",\r\n};\r\n\r\nconst sizeStyles = {\r\n  sm: \"px-2 py-0.5 text-xs rounded-lg gap-1\",\r\n  md: \"px-2.5 py-1 text-xs rounded-xl gap-1.5\",\r\n};\r\n\r\nconst dotColors = {\r\n  default: \"bg-[var(--lg-text-muted)]\",\r\n  primary: \"bg-liquid-blue\",\r\n  success: \"bg-liquid-emerald\",\r\n  warning: \"bg-liquid-amber\",\r\n  danger: \"bg-liquid-rose\",\r\n  info: \"bg-liquid-cyan\",\r\n};\r\n\r\nexport function LiquidGlassBadge({\r\n  children,\r\n  className,\r\n  variant = \"default\",\r\n  size = \"md\",\r\n  dot = false,\r\n}: LiquidGlassBadgeProps) {\r\n  return (\r\n    <span\r\n      className={cn(\r\n        \"inline-flex items-center font-medium\",\r\n        \"glass-blur-sm border\",\r\n        variantStyles[variant],\r\n        sizeStyles[size],\r\n        className\r\n      )}\r\n    >\r\n      {dot && (\r\n        <span\r\n          className={cn(\r\n            \"h-1.5 w-1.5 rounded-full\",\r\n            dotColors[variant]\r\n          )}\r\n        />\r\n      )}\r\n      {children}\r\n    </span>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "dot",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "breadcrumb",
    "name": "LiquidGlassBreadcrumb",
    "file": "src/components/liquid-glass/LiquidGlassBreadcrumb.tsx",
    "category": "Navigation",
    "description": "Breadcrumb navigation with separators.",
    "usage": "<LiquidGlassBreadcrumb />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { ChevronRight, Home } from \"lucide-react\";\r\n\r\ninterface BreadcrumbItem {\r\n  label: string;\r\n  href?: string;\r\n  icon?: React.ReactNode;\r\n}\r\n\r\ninterface LiquidGlassBreadcrumbProps {\r\n  items: BreadcrumbItem[];\r\n  className?: string;\r\n  separator?: React.ReactNode;\r\n}\r\n\r\nexport function LiquidGlassBreadcrumb({\r\n  items,\r\n  className,\r\n  separator = <ChevronRight size={14} className=\"text-[var(--lg-text-muted)]\" />,\r\n}: LiquidGlassBreadcrumbProps) {\r\n  return (\r\n    <nav\r\n      className={cn(\r\n        \"inline-flex items-center gap-1.5 px-4 py-2 rounded-xl\",\r\n        \"glass-blur-sm glass-surface glass-border\",\r\n        className\r\n      )}\r\n    >\r\n      {items.map((item, i) => {\r\n        const isLast = i === items.length - 1;\r\n        return (\r\n          <div key={i} className=\"flex items-center gap-1.5\">\r\n            {i > 0 && separator}\r\n            {item.href ? (\r\n              <motion.a\r\n                href={item.href}\r\n                whileHover={{ scale: 1.03 }}\r\n                className=\"flex items-center gap-1.5 text-sm text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\r\n              >\r\n                {item.icon || (i === 0 && <Home size={14} />)}\r\n                {item.label}\r\n              </motion.a>\r\n            ) : (\r\n              <span\r\n                className={cn(\r\n                  \"flex items-center gap-1.5 text-sm\",\r\n                  isLast ? \"text-[var(--lg-text-secondary)] font-medium\" : \"text-[var(--lg-text-muted)]\"\r\n                )}\r\n              >\r\n                {item.icon || (i === 0 && <Home size={14} />)}\r\n                {item.label}\r\n              </span>\r\n            )}\r\n          </div>\r\n        );\r\n      })}\r\n    </nav>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "items",
        "type": "BreadcrumbItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "separator",
        "type": "React.ReactNode",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "button",
    "name": "LiquidGlassButton",
    "file": "src/components/liquid-glass/LiquidGlassButton.tsx",
    "category": "Buttons & FABs",
    "description": "Primary button with liquid ripple and glass surface styles.",
    "usage": "<LiquidGlassButton />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useCallback, type ReactNode, type MouseEvent } from \"react\";\nimport { useLiquidPress } from \"./useLiquidPress\";\nimport { LiquidGlassPressSplash } from \"./LiquidGlassPressSplash\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface RippleData {\n  id: number;\n  x: number;\n  y: number;\n}\n\ninterface LiquidGlassButtonProps {\n  children: ReactNode;\n  className?: string;\n  variant?: \"primary\" | \"secondary\" | \"ghost\" | \"danger\" | \"success\";\n  size?: \"sm\" | \"md\" | \"lg\";\n  icon?: ReactNode;\n  iconPosition?: \"left\" | \"right\";\n  fullWidth?: boolean;\n  loading?: boolean;\n  disabled?: boolean;\n  onClick?: () => void;\n  type?: \"button\" | \"submit\" | \"reset\";\n  fluid?: boolean;\n}\n\nconst variantStyles = {\n  primary:\n    \"glass-blur glass-surface-strong glass-border glass-highlight text-[var(--lg-text)]\",\n  secondary:\n    \"glass-blur-sm glass-surface glass-border-subtle glass-inner-glow text-[var(--lg-text)]\",\n  ghost:\n    \"bg-transparent hover:glass-surface text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]\",\n  danger:\n    \"glass-blur glass-surface glass-border glass-highlight text-liquid-rose\",\n  success:\n    \"glass-blur glass-surface glass-border glass-highlight text-liquid-emerald\",\n};\n\nconst sizeStyles = {\n  sm: \"px-4 py-2 text-sm rounded-xl gap-1.5\",\n  md: \"px-5 py-2.5 text-sm rounded-2xl gap-2\",\n  lg: \"px-7 py-3.5 text-base rounded-2xl gap-2.5\",\n};\n\nexport function LiquidGlassButton({\n  children,\n  className,\n  variant = \"primary\",\n  size = \"md\",\n  icon,\n  iconPosition = \"left\",\n  fullWidth = false,\n  loading = false,\n  disabled,\n  onClick,\n  type = \"button\",\n  fluid = true,\n}: LiquidGlassButtonProps) {\n  const tapScale = useLiquidTapScale();\n  const [ripples, setRipples] = useState<RippleData[]>([]);\n  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =\n    useLiquidPress<HTMLButtonElement>(disabled || loading);\n\n  const createRipple = useCallback(\n    (e: MouseEvent<HTMLButtonElement>) => {\n      if (disabled || loading) return;\n      const rect = e.currentTarget.getBoundingClientRect();\n      const x = e.clientX - rect.left;\n      const y = e.clientY - rect.top;\n      const id = Date.now();\n      setRipples((prev) => [...prev, { id, x, y }]);\n      setTimeout(() => {\n        setRipples((prev) => prev.filter((r) => r.id !== id));\n      }, 900);\n    },\n    [disabled, loading]\n  );\n\n  return (\n    <motion.button\n      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}\n      whileTap={{ scale: disabled || loading ? 1 : tapScale }}\n      disabled={disabled || loading}\n      onPointerDown={onPointerDown}\n      onPointerUp={onPointerUp}\n      onPointerLeave={onPointerLeave}\n      onPointerCancel={onPointerCancel}\n      onClick={(e: any) => {\n        createRipple(e);\n        onClick?.();\n      }}\n      type={type}\n      className={cn(\n        \"relative inline-flex items-center justify-center font-medium overflow-hidden isolate\",\n        \"transition-all duration-200\",\n        variantStyles[variant],\n        sizeStyles[size],\n        fullWidth && \"w-full\",\n        (disabled || loading) && \"opacity-50 cursor-not-allowed\",\n        className\n      )}\n    >\n      {/* Top highlight */}\n      <div className=\"pointer-events-none absolute inset-x-2 top-0 h-px glass-top-highlight rounded-full z-20\" />\n\n      {/* Liquid-glass press splash */}\n      {fluid && <LiquidGlassPressSplash press={press} size={140} />}\n\n      {/* Fluid compression shadow — mimics glass being pressed */}\n      {fluid && (\n        <motion.div\n          animate={{\n            opacity: press.isPressed ? 0.5 : 0,\n          }}\n          transition={{ duration: 0.15 }}\n          className=\"pointer-events-none absolute inset-0 rounded-[inherit] z-0\"\n          style={{\n            boxShadow:\n              \"inset 0 6px 18px rgba(0,0,0,0.28), inset 0 -2px 6px rgba(255,255,255,0.12)\",\n          }}\n        />\n      )}\n\n      {/* Subtle refraction blob */}\n      <div className=\"pointer-events-none absolute -top-8 -right-8 h-16 w-16 rounded-full glass-reflection blur-2xl z-0\" />\n\n      {/* Liquid ripple effects */}\n      <AnimatePresence>\n        {ripples.map((ripple) => (\n          <motion.span\n            key={ripple.id}\n            initial={{\n              scale: 0,\n              opacity: 0.55,\n              borderRadius: \"45% 55% 50% 50% / 55% 45% 50% 50%\",\n            }}\n            animate={{\n              scale: 2.8,\n              opacity: 0,\n              borderRadius: \"50%\",\n            }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}\n            className=\"absolute pointer-events-none z-0\"\n            style={{\n              left: ripple.x,\n              top: ripple.y,\n              width: 60,\n              height: 60,\n              marginLeft: -30,\n              marginTop: -30,\n              background:\n                \"radial-gradient(circle, var(--lg-ripple) 0%, transparent 65%)\",\n            }}\n          />\n        ))}\n      </AnimatePresence>\n\n      {loading && (\n        <motion.div\n          animate={{ rotate: 360 }}\n          transition={{ duration: 1, repeat: Infinity, ease: \"linear\" }}\n          className=\"mr-2 h-4 w-4 rounded-full border-2 border-current/30 border-t-current relative z-10\"\n        />\n      )}\n      {icon && iconPosition === \"left\" && !loading && (\n        <span className=\"flex-shrink-0 relative z-10\">{icon}</span>\n      )}\n      <span className=\"relative z-10\">{children}</span>\n      {icon && iconPosition === \"right\" && (\n        <span className=\"flex-shrink-0 relative z-10\">{icon}</span>\n      )}\n    </motion.button>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"primary\" | \"secondary\" | \"ghost\" | \"danger\" | \"success\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element to display."
      },
      {
        "name": "iconPosition",
        "type": "\"left\" | \"right\"",
        "required": false,
        "description": ""
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the component is disabled."
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": false,
        "description": "Callback when the element is clicked."
      },
      {
        "name": "type",
        "type": "\"button\" | \"submit\" | \"reset\"",
        "required": false,
        "description": "Input type or visual variant."
      },
      {
        "name": "fluid",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "calendar",
    "name": "LiquidGlassCalendar",
    "file": "src/components/liquid-glass/LiquidGlassCalendar.tsx",
    "category": "Data Display",
    "description": "Month calendar with highlighted and disabled dates.",
    "usage": "<LiquidGlassCalendar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { ChevronLeft, ChevronRight } from \"lucide-react\";\r\nimport { useState } from \"react\";\r\n\r\ninterface LiquidGlassCalendarProps {\r\n  value?: Date;\r\n  onChange?: (date: Date) => void;\r\n  className?: string;\r\n  minDate?: Date;\r\n  maxDate?: Date;\r\n  highlightedDates?: Date[];\r\n}\r\n\r\nconst DAYS = [\"Su\", \"Mo\", \"Tu\", \"We\", \"Th\", \"Fr\", \"Sa\"];\r\nconst MONTHS = [\r\n  \"January\", \"February\", \"March\", \"April\", \"May\", \"June\",\r\n  \"July\", \"August\", \"September\", \"October\", \"November\", \"December\",\r\n];\r\n\r\nfunction isSameDay(a: Date, b: Date) {\r\n  return (\r\n    a.getFullYear() === b.getFullYear() &&\r\n    a.getMonth() === b.getMonth() &&\r\n    a.getDate() === b.getDate()\r\n  );\r\n}\r\n\r\nexport function LiquidGlassCalendar({\r\n  value,\r\n  onChange,\r\n  className,\r\n  minDate,\r\n  maxDate,\r\n  highlightedDates = [],\r\n}: LiquidGlassCalendarProps) {\r\n  const [viewDate, setViewDate] = useState(value || new Date());\r\n  const today = new Date();\r\n\r\n  const year = viewDate.getFullYear();\r\n  const month = viewDate.getMonth();\r\n  const firstDay = new Date(year, month, 1).getDay();\r\n  const daysInMonth = new Date(year, month + 1, 0).getDate();\r\n\r\n  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));\r\n  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));\r\n\r\n  const isHighlighted = (d: number) =>\r\n    highlightedDates.some((h) =>\r\n      isSameDay(h, new Date(year, month, d))\r\n    );\r\n\r\n  const isDisabled = (d: number) => {\r\n    const date = new Date(year, month, d);\r\n    if (minDate && date < minDate) return true;\r\n    if (maxDate && date > maxDate) return true;\r\n    return false;\r\n  };\r\n\r\n  const isSelected = (d: number) =>\r\n    value && isSameDay(value, new Date(year, month, d));\r\n\r\n  const isToday = (d: number) => isSameDay(today, new Date(year, month, d));\r\n\r\n  return (\r\n    <div\r\n      className={cn(\r\n        \"w-full max-w-xs p-4 rounded-2xl\",\r\n        \"glass-blur-sm glass-surface glass-border glass-highlight\",\r\n        className\r\n      )}\r\n    >\r\n      {/* Header */}\r\n      <div className=\"flex items-center justify-between mb-4\">\r\n        <motion.button\r\n          whileHover={{ scale: 1.1 }}\r\n          whileTap={{ scale: 0.9 }}\r\n          onClick={prevMonth}\r\n          className=\"flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\r\n        >\r\n          <ChevronLeft size={14} />\r\n        </motion.button>\r\n        <span className=\"text-sm font-semibold text-[var(--lg-text)]\">\r\n          {MONTHS[month]} {year}\r\n        </span>\r\n        <motion.button\r\n          whileHover={{ scale: 1.1 }}\r\n          whileTap={{ scale: 0.9 }}\r\n          onClick={nextMonth}\r\n          className=\"flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\r\n        >\r\n          <ChevronRight size={14} />\r\n        </motion.button>\r\n      </div>\r\n\r\n      {/* Day headers */}\r\n      <div className=\"grid grid-cols-7 gap-1 mb-1\">\r\n        {DAYS.map((d) => (\r\n          <div key={d} className=\"text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--lg-text-muted)] py-1\">\r\n            {d}\r\n          </div>\r\n        ))}\r\n      </div>\r\n\r\n      {/* Days */}\r\n      <div className=\"grid grid-cols-7 gap-1\">\r\n        {Array.from({ length: firstDay }).map((_, i) => (\r\n          <div key={`empty-${i}`} />\r\n        ))}\r\n        {Array.from({ length: daysInMonth }).map((_, i) => {\r\n          const day = i + 1;\r\n          const disabled = isDisabled(day);\r\n          const selected = isSelected(day);\r\n          const highlighted = isHighlighted(day);\r\n          const todayMark = isToday(day);\r\n\r\n          return (\r\n            <motion.button\r\n              key={day}\r\n              whileHover={disabled ? {} : { scale: 1.15 }}\r\n              whileTap={disabled ? {} : { scale: 0.9 }}\r\n              onClick={() => !disabled && onChange?.(new Date(year, month, day))}\r\n              disabled={disabled}\r\n              className={cn(\r\n                \"relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all\",\r\n                selected\r\n                  ? \"bg-liquid-blue/30 text-white\"\r\n                  : todayMark\r\n                  ? \"text-liquid-blue font-bold\"\r\n                  : disabled\r\n                  ? \"text-[var(--lg-text-muted)] cursor-not-allowed\"\r\n                  : \"text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)]\",\r\n                highlighted && !selected && \"ring-1 ring-liquid-amber/40\"\r\n              )}\r\n            >\r\n              {day}\r\n              {todayMark && !selected && (\r\n                <span className=\"absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-liquid-blue\" />\r\n              )}\r\n            </motion.button>\r\n          );\r\n        })}\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "value",
        "type": "Date",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(date: Date) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "minDate",
        "type": "Date",
        "required": false,
        "description": ""
      },
      {
        "name": "maxDate",
        "type": "Date",
        "required": false,
        "description": ""
      },
      {
        "name": "highlightedDates",
        "type": "Date[]",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "card",
    "name": "LiquidGlassCard",
    "file": "src/components/liquid-glass/LiquidGlassCard.tsx",
    "category": "Layout & Surfaces",
    "description": "Basic glass card container with variants, padding, and hover lift.",
    "usage": "<LiquidGlassCard />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport type { ReactNode } from \"react\";\r\n\r\ninterface LiquidGlassCardProps {\r\n  children: ReactNode;\r\n  className?: string;\r\n  variant?: \"default\" | \"thick\" | \"thin\" | \"chrome\";\r\n  hover?: boolean;\r\n  padding?: \"none\" | \"sm\" | \"md\" | \"lg\";\r\n  border?: boolean;\r\n  highlight?: boolean;\r\n}\r\n\r\nconst variantStyles = {\r\n  default: \"glass-blur glass-surface\",\r\n  thick: \"glass-blur-lg glass-surface-strong\",\r\n  thin: \"glass-blur-sm glass-surface\",\r\n  chrome: \"glass-blur glass-surface-dark\",\r\n};\r\n\r\nconst paddingStyles = {\r\n  none: \"\",\r\n  sm: \"p-3\",\r\n  md: \"p-5\",\r\n  lg: \"p-7\",\r\n};\r\n\r\nexport function LiquidGlassCard({\r\n  children,\r\n  className,\r\n  variant = \"default\",\r\n  hover = true,\r\n  padding = \"md\",\r\n  border = true,\r\n  highlight = true,\r\n}: LiquidGlassCardProps) {\r\n  return (\r\n    <motion.div\r\n      whileHover={\r\n        hover\r\n          ? { scale: 1.01, y: -2, transition: { duration: 0.3, ease: \"easeOut\" } }\r\n          : undefined\r\n      }\r\n      className={cn(\r\n        \"relative overflow-hidden rounded-3xl\",\r\n        variantStyles[variant],\r\n        paddingStyles[padding],\r\n        border && \"glass-border\",\r\n        highlight && \"glass-highlight\",\r\n        className\r\n      )}\r\n    >\r\n      {/* Inner highlight line */}\r\n      <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\r\n      {/* Subtle reflection */}\r\n      <div className=\"pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--lg-reflection)] blur-3xl\" />\r\n      {children}\r\n    </motion.div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"thick\" | \"thin\" | \"chrome\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "hover",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "padding",
        "type": "\"none\" | \"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": ""
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "highlight",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "carousel",
    "name": "LiquidGlassCarousel",
    "file": "src/components/liquid-glass/LiquidGlassCarousel.tsx",
    "category": "Media & Content",
    "description": "Image/content carousel with arrows and indicators.",
    "usage": "<LiquidGlassCarousel />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { ChevronLeft, ChevronRight } from \"lucide-react\";\nimport { useState, useCallback, useEffect } from \"react\";\nimport { useLiquidTapScale, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface CarouselItem {\n  id: string;\n  content: React.ReactNode;\n}\n\ninterface LiquidGlassCarouselProps {\n  items: CarouselItem[];\n  className?: string;\n  autoPlay?: boolean;\n  interval?: number;\n  showIndicators?: boolean;\n  showArrows?: boolean;\n}\n\nexport function LiquidGlassCarousel({\n  items,\n  className,\n  autoPlay = false,\n  interval = 4000,\n  showIndicators = true,\n  showArrows = true,\n}: LiquidGlassCarouselProps) {\n  const transition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  const [current, setCurrent] = useState(0);\n  const [direction, setDirection] = useState(0);\n\n  const goTo = useCallback(\n    (index: number) => {\n      setDirection(index > current ? 1 : -1);\n      setCurrent((index + items.length) % items.length);\n    },\n    [current, items.length]\n  );\n\n  const next = useCallback(() => goTo(current + 1), [current, goTo]);\n  const prev = useCallback(() => goTo(current - 1), [current, goTo]);\n\n  useEffect(() => {\n    if (!autoPlay) return;\n    const timer = setInterval(next, interval);\n    return () => clearInterval(timer);\n  }, [autoPlay, interval, next]);\n\n  const variants = {\n    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),\n    center: { x: 0, opacity: 1 },\n    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),\n  };\n\n  return (\n    <div className={cn(\"relative overflow-hidden rounded-2xl\", className)}>\n      <div className=\"relative aspect-video\">\n        <AnimatePresence initial={false} custom={direction} mode=\"popLayout\">\n          <motion.div\n            key={items[current].id}\n            custom={direction}\n            variants={variants}\n            initial=\"enter\"\n            animate=\"center\"\n            exit=\"exit\"\n            transition={transition}\n            className=\"absolute inset-0\"\n          >\n            {items[current].content}\n          </motion.div>\n        </AnimatePresence>\n      </div>\n\n      {showArrows && items.length > 1 && (\n        <>\n          <motion.button\n            whileHover={{ scale: 1.1 }}\n            whileTap={{ scale: tapScale }}\n            onClick={prev}\n            className=\"absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full glass-blur-sm glass-surface glass-border text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] transition-colors\"\n          >\n            <ChevronLeft size={18} />\n          </motion.button>\n          <motion.button\n            whileHover={{ scale: 1.1 }}\n            whileTap={{ scale: tapScale }}\n            onClick={next}\n            className=\"absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full glass-blur-sm glass-surface glass-border text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] transition-colors\"\n          >\n            <ChevronRight size={18} />\n          </motion.button>\n        </>\n      )}\n\n      {showIndicators && items.length > 1 && (\n        <div className=\"absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5\">\n          {items.map((_, i) => (\n            <motion.button\n              key={i}\n              onClick={() => goTo(i)}\n              className={cn(\n                \"h-1.5 rounded-full transition-all duration-300\",\n                i === current\n                  ? \"w-6 bg-[var(--lg-text-muted)]\"\n                  : \"w-1.5 bg-[var(--lg-text-muted)] hover:bg-[var(--lg-text-muted)]\"\n              )}\n            />\n          ))}\n        </div>\n      )}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "items",
        "type": "CarouselItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "autoPlay",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "interval",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "showIndicators",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "showArrows",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "checkbox",
    "name": "LiquidGlassCheckbox",
    "file": "src/components/liquid-glass/LiquidGlassCheckbox.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Glass checkbox with indeterminate support.",
    "usage": "<LiquidGlassCheckbox />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { Check, Minus } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useLiquidTapScale, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface LiquidGlassCheckboxProps {\n  checked?: boolean;\n  indeterminate?: boolean;\n  onChange?: (checked: boolean) => void;\n  className?: string;\n  label?: string;\n  disabled?: boolean;\n  size?: \"sm\" | \"md\" | \"lg\";\n}\n\nconst sizeStyles = {\n  sm: { box: \"w-4 h-4 rounded-md\", icon: 10 },\n  md: { box: \"w-5 h-5 rounded-lg\", icon: 12 },\n  lg: { box: \"w-6 h-6 rounded-xl\", icon: 14 },\n};\n\nexport function LiquidGlassCheckbox({\n  checked = false,\n  indeterminate = false,\n  onChange,\n  className,\n  label,\n  disabled,\n  size = \"md\",\n}: LiquidGlassCheckboxProps) {\n  const tapScale = useLiquidTapScale();\n  const checkTransition = useLiquidTransition();\n  const uncheckedFill = useGlassSurface({ variant: \"fill\", opacity: 0.05 });\n  const s = sizeStyles[size];\n  const isActive = checked || indeterminate;\n\n  return (\n    <label\n      className={cn(\n        \"inline-flex items-center gap-3 cursor-pointer select-none\",\n        disabled && \"opacity-40 cursor-not-allowed\",\n        className\n      )}\n    >\n      <motion.div\n        whileTap={disabled ? {} : { scale: tapScale }}\n        onClick={() => !disabled && onChange?.(!checked)}\n        className={cn(\n          \"relative flex items-center justify-center flex-shrink-0\",\n          \"glass-blur-sm border transition-all duration-200\",\n          s.box,\n          isActive\n            ? \"bg-liquid-blue/30 border-liquid-blue/50\"\n            : \"border-white/10 hover:border-white/20\"\n        )}\n        style={isActive ? undefined : { background: uncheckedFill.style.background }}\n      >\n        {/* Top highlight */}\n        <GlassTopHighlight className=\"inset-x-1 top-0\" opacity={0.2} />\n        <AnimatePresence>\n          {isActive && (\n            <motion.div\n              initial={{ scale: 0, opacity: 0 }}\n              animate={{ scale: 1, opacity: 1 }}\n              exit={{ scale: 0, opacity: 0 }}\n              transition={checkTransition}\n            >\n              {indeterminate ? (\n                <Minus size={s.icon} className=\"text-white\" />\n              ) : (\n                <Check size={s.icon} className=\"text-white\" strokeWidth={3} />\n              )}\n            </motion.div>\n          )}\n        </AnimatePresence>\n      </motion.div>\n      {label && (\n        <span className={cn(\"text-sm\", disabled ? \"text-[var(--lg-text-muted)]\" : \"text-[var(--lg-text-secondary)]\")}>\n          {label}\n        </span>\n      )}\n    </label>\n  );\n}\n\n\n",
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label text."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the component is disabled."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      }
    ]
  },
  {
    "id": "chip",
    "name": "LiquidGlassChip",
    "file": "src/components/liquid-glass/LiquidGlassChip.tsx",
    "category": "Media & Content",
    "description": "Filter/removable chip component.",
    "usage": "<LiquidGlassChip />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport type { ReactNode } from \"react\";\r\nimport { X } from \"lucide-react\";\r\nimport { useLiquidPress } from \"./useLiquidPress\";\r\nimport { LiquidGlassPressSplash } from \"./LiquidGlassPressSplash\";\r\n\r\ninterface LiquidGlassChipProps {\r\n  children: ReactNode;\r\n  className?: string;\r\n  variant?: \"default\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\";\r\n  size?: \"sm\" | \"md\";\r\n  onRemove?: () => void;\r\n  onClick?: () => void;\r\n  active?: boolean;\r\n  icon?: ReactNode;\r\n}\r\n\r\nconst variantStyles = {\r\n  default: {\r\n    base: \"bg-[var(--lg-border-subtle)] text-[var(--lg-text-secondary)] border-[var(--lg-border-subtle)] hover:bg-[var(--lg-border)]\",\r\n    active: \"bg-[var(--lg-border)] text-[var(--lg-text)] border-[var(--lg-border)]\",\r\n  },\r\n  primary: {\r\n    base: \"bg-liquid-blue/8 text-liquid-blue/70 border-liquid-blue/15 hover:bg-liquid-blue/15\",\r\n    active: \"bg-liquid-blue/20 text-liquid-blue border-liquid-blue/30\",\r\n  },\r\n  success: {\r\n    base: \"bg-liquid-emerald/8 text-liquid-emerald/70 border-liquid-emerald/15 hover:bg-liquid-emerald/15\",\r\n    active: \"bg-liquid-emerald/20 text-liquid-emerald border-liquid-emerald/30\",\r\n  },\r\n  warning: {\r\n    base: \"bg-liquid-amber/8 text-liquid-amber/70 border-liquid-amber/15 hover:bg-liquid-amber/15\",\r\n    active: \"bg-liquid-amber/20 text-liquid-amber border-liquid-amber/30\",\r\n  },\r\n  danger: {\r\n    base: \"bg-liquid-rose/8 text-liquid-rose/70 border-liquid-rose/15 hover:bg-liquid-rose/15\",\r\n    active: \"bg-liquid-rose/20 text-liquid-rose border-liquid-rose/30\",\r\n  },\r\n  info: {\r\n    base: \"bg-liquid-cyan/8 text-liquid-cyan/70 border-liquid-cyan/15 hover:bg-liquid-cyan/15\",\r\n    active: \"bg-liquid-cyan/20 text-liquid-cyan border-liquid-cyan/30\",\r\n  },\r\n};\r\n\r\nconst sizeStyles = {\r\n  sm: \"px-2.5 py-1 text-xs rounded-lg gap-1\",\r\n  md: \"px-3 py-1.5 text-sm rounded-xl gap-1.5\",\r\n};\r\n\r\nexport function LiquidGlassChip({\r\n  children,\r\n  className,\r\n  variant = \"default\",\r\n  size = \"md\",\r\n  onRemove,\r\n  onClick,\r\n  active = false,\r\n  icon,\r\n}: LiquidGlassChipProps) {\r\n  const v = variantStyles[variant];\r\n  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =\r\n    useLiquidPress<HTMLButtonElement>(!onClick);\r\n\r\n  return (\r\n    <motion.button\r\n      whileHover={{ scale: onClick ? 1.04 : 1 }}\r\n      whileTap={{ scale: onClick ? 0.96 : 1 }}\r\n      onClick={onClick}\r\n      onPointerDown={onPointerDown}\r\n      onPointerUp={onPointerUp}\r\n      onPointerLeave={onPointerLeave}\r\n      onPointerCancel={onPointerCancel}\r\n      className={cn(\r\n        \"relative inline-flex items-center font-medium transition-all duration-200 overflow-hidden isolate\",\r\n        \"glass-blur-sm border\",\r\n        sizeStyles[size],\r\n        active ? v.active : v.base,\r\n        onClick && \"cursor-pointer\",\r\n        className\r\n      )}\r\n    >\r\n      {/* Liquid-glass press splash */}\r\n      {onClick && <LiquidGlassPressSplash press={press} size={90} />}\r\n\r\n      {icon && <span className=\"relative z-10 flex-shrink-0\">{icon}</span>}\r\n      <span className=\"relative z-10\">{children}</span>\r\n      {onRemove && (\r\n        <motion.span\r\n          whileHover={{ scale: 1.2 }}\r\n          whileTap={{ scale: 0.8 }}\r\n          onClick={(e) => {\r\n            e.stopPropagation();\r\n            onRemove();\r\n          }}\r\n          className=\"relative z-10 ml-0.5 flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--lg-border)] cursor-pointer\"\r\n        >\r\n          <X size={12} />\r\n        </motion.span>\r\n      )}\r\n    </motion.button>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "onRemove",
        "type": "() => void",
        "required": false,
        "description": ""
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": false,
        "description": "Callback when the element is clicked."
      },
      {
        "name": "active",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element to display."
      }
    ]
  },
  {
    "id": "color-picker",
    "name": "LiquidGlassColorPicker",
    "file": "src/components/liquid-glass/LiquidGlassColorPicker.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Color palette picker with custom hex input.",
    "usage": "<LiquidGlassColorPicker />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { useState } from \"react\";\r\n\r\ninterface LiquidGlassColorPickerProps {\r\n  value?: string;\r\n  onChange?: (color: string) => void;\r\n  className?: string;\r\n  colors?: string[];\r\n  showCustom?: boolean;\r\n}\r\n\r\nconst defaultColors = [\r\n  \"#ef4444\", \"#f97316\", \"#f59e0b\", \"#84cc16\", \"#22c55e\",\r\n  \"#10b981\", \"#06b6d4\", \"#3b82f6\", \"#6366f1\", \"#8b5cf6\",\r\n  \"#a855f7\", \"#d946ef\", \"#ec4899\", \"#f43f5e\", \"#78716c\",\r\n];\r\n\r\nexport function LiquidGlassColorPicker({\r\n  value,\r\n  onChange,\r\n  className,\r\n  colors = defaultColors,\r\n  showCustom = true,\r\n}: LiquidGlassColorPickerProps) {\r\n  const [customColor, setCustomColor] = useState(value || \"#3b82f6\");\r\n\r\n  return (\r\n    <div className={cn(\"w-full\", className)}>\r\n      <div className=\"grid grid-cols-5 gap-2\">\r\n        {colors.map((color) => (\r\n          <motion.button\r\n            key={color}\r\n            whileHover={{ scale: 1.15 }}\r\n            whileTap={{ scale: 0.9 }}\r\n            onClick={() => onChange?.(color)}\r\n            className={cn(\r\n              \"relative h-8 w-8 rounded-lg transition-all\",\r\n              value === color && \"ring-2 ring-white/50 ring-offset-2 ring-offset-transparent\"\r\n            )}\r\n            style={{ backgroundColor: color }}\r\n          >\r\n            {value === color && (\r\n              <motion.div\r\n                initial={{ scale: 0 }}\r\n                animate={{ scale: 1 }}\r\n                className=\"absolute inset-0 flex items-center justify-center\"\r\n              >\r\n                <div className=\"h-2 w-2 rounded-full bg-white shadow-sm\" />\r\n              </motion.div>\r\n            )}\r\n          </motion.button>\r\n        ))}\r\n      </div>\r\n\r\n      {showCustom && (\r\n        <div className=\"mt-3 flex items-center gap-3\">\r\n          <div\r\n            className=\"h-8 w-8 rounded-lg ring-1 ring-white/10 flex-shrink-0\"\r\n            style={{ backgroundColor: customColor }}\r\n          />\r\n          <div className=\"flex-1 flex items-center gap-2 glass-blur-sm glass-surface glass-border rounded-xl px-3 py-2\">\r\n            <span className=\"text-[var(--lg-text-muted)] text-xs\">#</span>\r\n            <input\r\n              type=\"text\"\r\n              value={customColor.replace(\"#\", \"\")}\r\n              onChange={(e) => {\r\n                const hex = e.target.value.replace(/[^0-9a-fA-F]/g, \"\").slice(0, 6);\r\n                const full = `#${hex}`;\r\n                setCustomColor(full);\r\n                if (hex.length === 6) onChange?.(full);\r\n              }}\r\n              className=\"flex-1 bg-transparent text-sm text-[var(--lg-text-secondary)] outline-none uppercase\"\r\n              maxLength={6}\r\n            />\r\n            <input\r\n              type=\"color\"\r\n              value={customColor}\r\n              onChange={(e) => {\r\n                setCustomColor(e.target.value);\r\n                onChange?.(e.target.value);\r\n              }}\r\n              className=\"h-5 w-5 rounded cursor-pointer border-0 p-0 bg-transparent\"\r\n            />\r\n          </div>\r\n        </div>\r\n      )}\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(color: string) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "colors",
        "type": "string[]",
        "required": false,
        "description": ""
      },
      {
        "name": "showCustom",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "command-palette",
    "name": "LiquidGlassCommandPalette",
    "file": "src/components/liquid-glass/LiquidGlassCommandPalette.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Cmd+K style searchable command palette.",
    "usage": "<LiquidGlassCommandPalette />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useEffect, useRef, useMemo } from \"react\";\nimport { Search, Command } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidOverlayVariants, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface CommandItem {\n  id: string;\n  label: string;\n  shortcut?: string;\n  icon?: React.ReactNode;\n  category?: string;\n  onSelect?: () => void;\n}\n\ninterface LiquidGlassCommandPaletteProps {\n  isOpen: boolean;\n  onClose: () => void;\n  items: CommandItem[];\n  placeholder?: string;\n}\n\nexport function LiquidGlassCommandPalette({\n  isOpen,\n  onClose,\n  items,\n  placeholder = \"Type a command or search...\",\n}: LiquidGlassCommandPaletteProps) {\n  const overlayVariants = useLiquidOverlayVariants();\n  const transition = useLiquidTransition();\n  const [query, setQuery] = useState(\"\");\n  const [selectedIndex, setSelectedIndex] = useState(0);\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  const filtered = useMemo(() => {\n    if (!query.trim()) return items;\n    const q = query.toLowerCase();\n    return items.filter(\n      (i) =>\n        i.label.toLowerCase().includes(q) ||\n        i.category?.toLowerCase().includes(q)\n    );\n  }, [query, items]);\n\n  const grouped = useMemo(() => {\n    const map = new Map<string, CommandItem[]>();\n    filtered.forEach((item) => {\n      const cat = item.category || \"General\";\n      if (!map.has(cat)) map.set(cat, []);\n      map.get(cat)!.push(item);\n    });\n    return map;\n  }, [filtered]);\n\n  useEffect(() => {\n    if (isOpen) {\n      setQuery(\"\");\n      setSelectedIndex(0);\n      setTimeout(() => inputRef.current?.focus(), 100);\n    }\n  }, [isOpen]);\n\n  useEffect(() => {\n    const handleKey = (e: KeyboardEvent) => {\n      if (!isOpen) return;\n      if (e.key === \"Escape\") onClose();\n      if (e.key === \"ArrowDown\") {\n        e.preventDefault();\n        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));\n      }\n      if (e.key === \"ArrowUp\") {\n        e.preventDefault();\n        setSelectedIndex((i) => Math.max(i - 1, 0));\n      }\n      if (e.key === \"Enter\") {\n        e.preventDefault();\n        const item = filtered[selectedIndex];\n        if (item) {\n          item.onSelect?.();\n          onClose();\n        }\n      }\n    };\n    window.addEventListener(\"keydown\", handleKey);\n    return () => window.removeEventListener(\"keydown\", handleKey);\n  }, [isOpen, filtered, selectedIndex, onClose]);\n\n  let globalIndex = 0;\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <motion.div\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          exit={{ opacity: 0 }}\n          className=\"fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4\"\n          onClick={onClose}\n        >\n          <div className=\"glass-backdrop\" />\n          <motion.div\n            {...overlayVariants}\n            transition={transition}\n            onClick={(e) => e.stopPropagation()}\n            className=\"relative w-full max-w-xl overflow-hidden rounded-2xl glass-blur-xl glass-surface glass-border glass-highlight-strong\"\n          >\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.3} />\n\n            {/* Search input */}\n            <div className=\"flex items-center gap-3 px-5 py-4 border-b border-[var(--lg-border-subtle)]\">\n              <Search size={18} className=\"text-[var(--lg-text-muted)] flex-shrink-0\" />\n              <input\n                ref={inputRef}\n                value={query}\n                onChange={(e) => {\n                  setQuery(e.target.value);\n                  setSelectedIndex(0);\n                }}\n                placeholder={placeholder}\n                className=\"flex-1 bg-transparent text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none text-sm\"\n              />\n              <div className=\"flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)] text-xs\">\n                <Command size={10} />\n                <span>K</span>\n              </div>\n            </div>\n\n            {/* Results */}\n            <div className=\"max-h-[50vh] overflow-y-auto py-2\">\n              {filtered.length === 0 ? (\n                <div className=\"px-5 py-8 text-center text-sm text-[var(--lg-text-muted)]\">\n                  No results found\n                </div>\n              ) : (\n                Array.from(grouped.entries()).map(([category, catItems]) => (\n                  <div key={category}>\n                    <div className=\"px-5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]\">\n                      {category}\n                    </div>\n                    {catItems.map((item) => {\n                      const idx = globalIndex++;\n                      const isSelected = idx === selectedIndex;\n                      return (\n                        <motion.button\n                          key={item.id}\n                          onMouseEnter={() => setSelectedIndex(idx)}\n                          onClick={() => {\n                            item.onSelect?.();\n                            onClose();\n                          }}\n                          className={cn(\n                            \"flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors\",\n                            isSelected\n                              ? \"bg-[var(--lg-border)]\"\n                              : \"hover:bg-[var(--lg-border-subtle)]\"\n                          )}\n                        >\n                          {item.icon && (\n                            <span className=\"text-[var(--lg-text-muted)]\">{item.icon}</span>\n                          )}\n                          <span className=\"flex-1 text-sm text-[var(--lg-text-secondary)]\">\n                            {item.label}\n                          </span>\n                          {item.shortcut && (\n                            <span className=\"text-xs text-[var(--lg-text-muted)] px-1.5 py-0.5 rounded bg-[var(--lg-border-subtle)]\">\n                              {item.shortcut}\n                            </span>\n                          )}\n                        </motion.button>\n                      );\n                    })}\n                  </div>\n                ))\n              )}\n            </div>\n          </motion.div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "items",
        "type": "CommandItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder text."
      }
    ]
  },
  {
    "id": "context-menu",
    "name": "LiquidGlassContextMenu",
    "file": "src/components/liquid-glass/LiquidGlassContextMenu.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Right-click context menu portaled to document.body.",
    "usage": "<LiquidGlassContextMenu />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useCallback, useEffect, useRef } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface MenuItem {\n  id: string;\n  label: string;\n  icon?: React.ReactNode;\n  shortcut?: string;\n  disabled?: boolean;\n  separator?: boolean;\n  onClick?: () => void;\n}\n\ninterface LiquidGlassContextMenuProps {\n  children: React.ReactNode;\n  items: MenuItem[];\n  className?: string;\n}\n\nexport function LiquidGlassContextMenu({\n  children,\n  items,\n  className,\n}: LiquidGlassContextMenuProps) {\n  const [isOpen, setIsOpen] = useState(false);\n  const [position, setPosition] = useState({ x: 0, y: 0 });\n  const triggerRef = useRef<HTMLDivElement>(null);\n  const menuRef = useRef<HTMLDivElement>(null);\n\n  const popover = useGlassSurface({ variant: \"popover\" });\n\n  const handleContextMenu = useCallback((e: React.MouseEvent) => {\n    e.preventDefault();\n    setPosition({ x: e.clientX, y: e.clientY });\n    setIsOpen(true);\n  }, []);\n\n  useEffect(() => {\n    if (!isOpen) return;\n\n    const handleClick = (e: MouseEvent) => {\n      const target = e.target as Node;\n      if (\n        !triggerRef.current?.contains(target) &&\n        !menuRef.current?.contains(target)\n      ) {\n        setIsOpen(false);\n      }\n    };\n\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\") setIsOpen(false);\n    };\n\n    window.addEventListener(\"mousedown\", handleClick);\n    window.addEventListener(\"keydown\", handleKeyDown);\n    return () => {\n      window.removeEventListener(\"mousedown\", handleClick);\n      window.removeEventListener(\"keydown\", handleKeyDown);\n    };\n  }, [isOpen]);\n\n  // Clamp position to viewport once we know the menu size\n  useEffect(() => {\n    if (!isOpen || !menuRef.current) return;\n    const rect = menuRef.current.getBoundingClientRect();\n    const padding = 12;\n    setPosition((pos) => ({\n      x: Math.min(Math.max(pos.x, padding), window.innerWidth - rect.width - padding),\n      y: Math.min(Math.max(pos.y, padding), window.innerHeight - rect.height - padding),\n    }));\n  }, [isOpen, items.length]);\n\n  const menu = (\n    <AnimatePresence>\n      {isOpen && (\n        <motion.div\n          ref={menuRef}\n          initial={{ opacity: 0, scale: 0.95 }}\n          animate={{ opacity: 1, scale: 1 }}\n          exit={{ opacity: 0, scale: 0.95 }}\n          transition={{ duration: 0.1 }}\n          style={{ left: position.x, top: position.y, ...popover.style }}\n          className={cn(\n            \"fixed z-[100] min-w-[180px] rounded-xl overflow-hidden\",\n            popover.className\n          )}\n          onClick={(e) => e.stopPropagation()}\n          onContextMenu={(e) => e.preventDefault()}\n        >\n          {/* Top highlight */}\n          <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />\n          {items.map((item, i) =>\n            item.separator ? (\n              <div key={`sep-${i}`} className=\"my-1 h-px bg-[var(--lg-border-subtle)] mx-2\" />\n            ) : (\n              <motion.button\n                key={item.id}\n                whileHover={item.disabled ? {} : { x: 2 }}\n                onClick={() => {\n                  if (!item.disabled) {\n                    item.onClick?.();\n                    setIsOpen(false);\n                  }\n                }}\n                className={cn(\n                  \"flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors\",\n                  item.disabled\n                    ? \"text-[var(--lg-text-muted)] cursor-not-allowed\"\n                    : \"text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)]\"\n                )}\n              >\n                {item.icon && <span className=\"text-[var(--lg-text-muted)]\">{item.icon}</span>}\n                <span className=\"flex-1\">{item.label}</span>\n                {item.shortcut && (\n                  <span className=\"text-[10px] text-[var(--lg-text-muted)] px-1.5 py-0.5 rounded bg-[var(--lg-border-subtle)]\">\n                    {item.shortcut}\n                  </span>\n                )}\n              </motion.button>\n            )\n          )}\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n\n  return (\n    <div ref={triggerRef} onContextMenu={handleContextMenu} className={cn(\"cursor-context-menu\", className)}>\n      {children}\n      {createPortal(menu, document.body)}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "items",
        "type": "MenuItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "controls",
    "name": "LiquidGlassControls",
    "file": "src/components/liquid-glass/LiquidGlassControls.tsx",
    "category": "Theme & Glass Primitives",
    "description": "Interactive panel to adjust blur, transparency, and saturation.",
    "usage": "<LiquidGlassControls />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { useTheme } from \"./ThemeProvider\";\nimport { LiquidGlassSlider } from \"./LiquidGlassSlider\";\nimport { SlidersHorizontal, RotateCcw, Sparkles } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { profileLabels } from \"./kube\";\nimport type { KubeProfile } from \"./kube\";\n\ninterface LiquidGlassControlsProps {\n  className?: string;\n}\n\nconst profiles: KubeProfile[] = [\n  \"convex-circle\",\n  \"convex-squircle\",\n  \"concave\",\n  \"lip\",\n];\n\nexport function LiquidGlassControls({ className }: LiquidGlassControlsProps) {\n  const {\n    mode,\n    glass,\n    setGlass,\n    resetGlass,\n    liquidGlass,\n    setLiquidGlass,\n    resetLiquidGlass,\n  } = useTheme();\n\n  const isLiquid = mode === \"liquid-glass\";\n\n  return (\n    <motion.div\n      initial={{ opacity: 0, y: 10 }}\n      animate={{ opacity: 1, y: 0 }}\n      className={cn(\n        \"relative w-full max-w-xs rounded-3xl p-5 overflow-hidden\",\n        \"glass-blur-xl glass-surface-strong glass-border\",\n        className\n      )}\n    >\n      <GlassTopHighlight className=\"inset-x-4 top-0\" opacity={0.3} />\n      <div className=\"flex items-center justify-between mb-5\">\n        <div className=\"flex items-center gap-2\">\n          {isLiquid ? (\n            <Sparkles size={16} className=\"text-liquid-blue\" />\n          ) : (\n            <SlidersHorizontal size={16} className=\"text-liquid-blue\" />\n          )}\n          <span className=\"text-sm font-semibold text-[var(--lg-text)]\">\n            {isLiquid ? \"Liquid Glass Controls\" : \"Glass Controls\"}\n          </span>\n        </div>\n        <motion.button\n          whileTap={{ scale: 0.9 }}\n          onClick={isLiquid ? resetLiquidGlass : resetGlass}\n          className=\"p-1.5 rounded-lg hover:bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)]\"\n        >\n          <RotateCcw size={14} />\n        </motion.button>\n      </div>\n\n      {isLiquid ? (\n        <div className=\"space-y-5\">\n          <div>\n            <span className=\"text-xs text-[var(--lg-text-secondary)] block mb-2\">\n              Surface profile\n            </span>\n            <div className=\"flex flex-wrap gap-2\">\n              {profiles.map((p) => (\n                <button\n                  key={p}\n                  onClick={() => setLiquidGlass({ profile: p })}\n                  className={cn(\n                    \"px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors\",\n                    liquidGlass.profile === p\n                      ? \"bg-liquid-blue text-white\"\n                      : \"bg-white/10 text-[var(--lg-text-secondary)] hover:bg-white/15\"\n                  )}\n                >\n                  {profileLabels[p]}\n                </button>\n              ))}\n            </div>\n          </div>\n\n          <LiquidGlassSlider\n            label=\"Bezel\"\n            value={liquidGlass.bezel}\n            min={8}\n            max={80}\n            onChange={(v) => setLiquidGlass({ bezel: v })}\n            valueFormatter={(v) => `${v}px`}\n          />\n          <LiquidGlassSlider\n            label=\"Refraction\"\n            value={liquidGlass.refraction}\n            min={0}\n            max={100}\n            onChange={(v) => setLiquidGlass({ refraction: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Thickness\"\n            value={liquidGlass.thickness}\n            min={10}\n            max={120}\n            onChange={(v) => setLiquidGlass({ thickness: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Light angle\"\n            value={liquidGlass.lightAngle}\n            min={-180}\n            max={180}\n            step={5}\n            onChange={(v) => setLiquidGlass({ lightAngle: v })}\n            valueFormatter={(v) => `${v}°`}\n          />\n          <LiquidGlassSlider\n            label=\"Specular\"\n            value={liquidGlass.specularOpacity}\n            min={0}\n            max={100}\n            onChange={(v) => setLiquidGlass({ specularOpacity: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Transparency\"\n            value={liquidGlass.transparency}\n            min={0}\n            max={100}\n            onChange={(v) => setLiquidGlass({ transparency: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Blur\"\n            value={liquidGlass.blur}\n            min={0}\n            max={100}\n            onChange={(v) => setLiquidGlass({ blur: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Saturation\"\n            value={liquidGlass.saturation}\n            min={0}\n            max={200}\n            onChange={(v) => setLiquidGlass({ saturation: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n        </div>\n      ) : (\n        <div className=\"space-y-5\">\n          <LiquidGlassSlider\n            label=\"Blur\"\n            value={glass.blur}\n            onChange={(v) => setGlass({ blur: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Transparency\"\n            value={glass.transparency}\n            onChange={(v) => setGlass({ transparency: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n          <LiquidGlassSlider\n            label=\"Saturation\"\n            value={glass.saturation}\n            onChange={(v) => setGlass({ saturation: v })}\n            valueFormatter={(v) => `${v}%`}\n          />\n        </div>\n      )}\n\n      <div className={cn(\"mt-5 pt-4 border-t border-[var(--lg-border)] grid gap-2 text-center\", isLiquid ? \"grid-cols-5\" : \"grid-cols-3\")}>\n        {isLiquid ? (\n          <>\n            <div className=\"space-y-0.5\">\n              <div className=\"text-xs font-semibold text-[var(--lg-text)]\">\n                {profileLabels[liquidGlass.profile]}\n              </div>\n              <div className=\"text-[10px] text-[var(--lg-text-muted)]\">Profile</div>\n            </div>\n            <div className=\"space-y-0.5\">\n              <div className=\"text-xs font-semibold text-[var(--lg-text)]\">\n                {liquidGlass.bezel}px\n              </div>\n              <div className=\"text-[10px] text-[var(--lg-text-muted)]\">Bezel</div>\n            </div>\n            <div className=\"space-y-0.5\">\n              <div className=\"text-xs font-semibold text-[var(--lg-text)]\">\n                {liquidGlass.refraction}%\n              </div>\n              <div className=\"text-[10px] text-[var(--lg-text-muted)]\">Refract</div>\n            </div>\n            <div className=\"space-y-0.5\">\n              <div className=\"text-xs font-semibold text-[var(--lg-text)]\">\n                {liquidGlass.thickness}%\n              </div>\n              <div className=\"text-[10px] text-[var(--lg-text-muted)]\">Thick</div>\n            </div>\n            <div className=\"space-y-0.5\">\n              <div className=\"text-xs font-semibold text-[var(--lg-text)]\">\n                {liquidGlass.saturation}%\n              </div>\n              <div className=\"text-[10px] text-[var(--lg-text-muted)]\">Sat</div>\n            </div>\n          </>\n        ) : (\n          <>\n            {[\n              {\n                label: \"Blur\",\n                value: `${Math.round((glass.blur / 100) * 60)}px`,\n              },\n              {\n                label: \"Alpha\",\n                value: `${Math.round((glass.transparency / 100) * 80)}%`,\n              },\n              {\n                label: \"Sat\",\n                value: `${glass.saturation}%`,\n              },\n            ].map((stat) => (\n              <div key={stat.label} className=\"space-y-0.5\">\n                <div className=\"text-xs font-semibold text-[var(--lg-text)]\">\n                  {stat.value}\n                </div>\n                <div className=\"text-[10px] text-[var(--lg-text-muted)]\">\n                  {stat.label}\n                </div>\n              </div>\n            ))}\n          </>\n        )}\n      </div>\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "dock",
    "name": "LiquidGlassDock",
    "file": "src/components/liquid-glass/LiquidGlassDock.tsx",
    "category": "Navigation",
    "description": "macOS-style floating dock.",
    "usage": "<LiquidGlassDock />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface DockItem {\n  id: string;\n  icon: ReactNode;\n  label: string;\n  onClick?: () => void;\n  badge?: number;\n  active?: boolean;\n}\n\ninterface LiquidGlassDockProps {\n  items: DockItem[];\n  className?: string;\n  position?: \"bottom\" | \"top\" | \"left\" | \"right\";\n}\n\nexport function LiquidGlassDock({\n  items,\n  className,\n  position = \"bottom\",\n}: LiquidGlassDockProps) {\n  const isVertical = position === \"left\" || position === \"right\";\n\n  return (\n    <div\n      className={cn(\n        \"fixed z-50\",\n        position === \"bottom\" && \"bottom-4 left-1/2 -translate-x-1/2\",\n        position === \"top\" && \"top-4 left-1/2 -translate-x-1/2\",\n        position === \"left\" && \"left-4 top-1/2 -translate-y-1/2\",\n        position === \"right\" && \"right-4 top-1/2 -translate-y-1/2\",\n        className\n      )}\n    >\n      <div\n        className={cn(\n          \"flex items-center gap-1 p-2 rounded-2xl\",\n          \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n          isVertical ? \"flex-col\" : \"flex-row\"\n        )}\n      >\n        {/* Top highlight */}\n        <GlassTopHighlight className=\"inset-x-0 top-0 rounded-t-2xl\" opacity={0.2} />\n\n        {items.map((item) => (\n          <motion.button\n            key={item.id}\n            whileHover={{ scale: 1.15, y: isVertical ? 0 : -4 }}\n            whileTap={{ scale: 0.9 }}\n            onClick={item.onClick}\n            className={cn(\n              \"relative flex items-center justify-center rounded-xl transition-colors\",\n              isVertical ? \"w-11 h-11\" : \"w-12 h-12\",\n              item.active\n                ? \"bg-[var(--lg-border)]\"\n                : \"hover:bg-[var(--lg-border-subtle)]\"\n            )}\n          >\n            <span\n              className={cn(\n                \"transition-colors\",\n                item.active ? \"text-[var(--lg-text)]\" : \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n              )}\n            >\n              {item.icon}\n            </span>\n            {/* Tooltip on hover */}\n            <div\n              className={cn(\n                \"absolute opacity-0 group-hover:opacity-100 pointer-events-none\",\n                \"px-2 py-1 rounded-lg glass-blur-sm glass-surface glass-border\",\n                \"text-[10px] font-medium text-[var(--lg-text-secondary)] whitespace-nowrap\",\n                \"transition-opacity\",\n                position === \"bottom\" && \"bottom-full mb-2\",\n                position === \"top\" && \"top-full mt-2\",\n                position === \"left\" && \"left-full ml-2\",\n                position === \"right\" && \"right-full mr-2\"\n              )}\n            >\n              {item.label}\n            </div>\n          </motion.button>\n        ))}\n      </div>\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "items",
        "type": "DockItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "position",
        "type": "\"bottom\" | \"top\" | \"left\" | \"right\"",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "drawer",
    "name": "LiquidGlassDrawer",
    "file": "src/components/liquid-glass/LiquidGlassDrawer.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Side drawer that slides in from left or right.",
    "usage": "<LiquidGlassDrawer />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidSlideVariants, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface LiquidGlassDrawerProps {\n  isOpen: boolean;\n  onClose: () => void;\n  children: ReactNode;\n  className?: string;\n  position?: \"left\" | \"right\";\n  width?: string;\n  title?: string;\n}\n\nexport function LiquidGlassDrawer({\n  isOpen,\n  onClose,\n  children,\n  className,\n  position = \"right\",\n  width = \"400px\",\n  title,\n}: LiquidGlassDrawerProps) {\n  const isLeft = position === \"left\";\n  const slideVariants = useLiquidSlideVariants(position);\n  const transition = useLiquidTransition();\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className=\"fixed inset-0 z-50\">\n          {/* Backdrop */}\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.2 }}\n            onClick={onClose}\n            className=\"glass-backdrop-subtle\"\n          />\n          {/* Drawer */}\n          <motion.div\n            {...slideVariants}\n            transition={transition}\n            className={cn(\n              \"absolute top-0 bottom-0\",\n              isLeft ? \"left-0\" : \"right-0\",\n              \"glass-blur-xl glass-surface glass-border\",\n              \"flex flex-col overflow-hidden\",\n              className\n            )}\n            style={{ width, maxWidth: \"90vw\" }}\n          >\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-0 top-0 z-10\" opacity={0.25} />\n            {/* Reflection */}\n            <div className=\"pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--lg-border-subtle)] blur-2xl\" />\n\n            {title && (\n              <div className=\"flex items-center justify-between px-6 py-5 border-b border-[var(--lg-border-subtle)]\">\n                <h3 className=\"text-lg font-semibold text-[var(--lg-text)]\">{title}</h3>\n              </div>\n            )}\n            <div className=\"flex-1 overflow-y-auto p-6\">{children}</div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "position",
        "type": "\"left\" | \"right\"",
        "required": false,
        "description": ""
      },
      {
        "name": "width",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      }
    ]
  },
  {
    "id": "empty-state",
    "name": "LiquidGlassEmptyState",
    "file": "src/components/liquid-glass/LiquidGlassEmptyState.tsx",
    "category": "Feedback & Status",
    "description": "Empty state illustration with icon variants.",
    "usage": "<LiquidGlassEmptyState />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { Search, FolderOpen, Inbox, FileX } from \"lucide-react\";\r\n\r\ninterface LiquidGlassEmptyStateProps {\r\n  className?: string;\r\n  icon?: React.ReactNode;\r\n  title?: string;\r\n  description?: string;\r\n  action?: React.ReactNode;\r\n  variant?: \"search\" | \"folder\" | \"inbox\" | \"error\" | \"custom\";\r\n}\r\n\r\nconst variantIcons = {\r\n  search: <Search size={40} className=\"text-[var(--lg-text-muted)]\" />,\r\n  folder: <FolderOpen size={40} className=\"text-[var(--lg-text-muted)]\" />,\r\n  inbox: <Inbox size={40} className=\"text-[var(--lg-text-muted)]\" />,\r\n  error: <FileX size={40} className=\"text-[var(--lg-text-muted)]\" />,\r\n  custom: null,\r\n};\r\n\r\nexport function LiquidGlassEmptyState({\r\n  className,\r\n  icon,\r\n  title = \"No results found\",\r\n  description = \"Try adjusting your search or filters to find what you're looking for.\",\r\n  action,\r\n  variant = \"search\",\r\n}: LiquidGlassEmptyStateProps) {\r\n  return (\r\n    <motion.div\r\n      initial={{ opacity: 0, y: 10 }}\r\n      animate={{ opacity: 1, y: 0 }}\r\n      className={cn(\r\n        \"flex flex-col items-center justify-center py-12 px-6 text-center\",\r\n        className\r\n      )}\r\n    >\r\n      <div className=\"flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--lg-border-subtle)] mb-4\">\r\n        {icon || variantIcons[variant]}\r\n      </div>\r\n      <h3 className=\"text-base font-semibold text-[var(--lg-text-secondary)] mb-1\">{title}</h3>\r\n      <p className=\"text-sm text-[var(--lg-text-muted)] max-w-xs leading-relaxed mb-5\">{description}</p>\r\n      {action}\r\n    </motion.div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon element to display."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Description text."
      },
      {
        "name": "action",
        "type": "React.ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "variant",
        "type": "\"search\" | \"folder\" | \"inbox\" | \"error\" | \"custom\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "file-upload",
    "name": "LiquidGlassFileUpload",
    "file": "src/components/liquid-glass/LiquidGlassFileUpload.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Drag-and-drop file upload with file list.",
    "usage": "<LiquidGlassFileUpload />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion, AnimatePresence } from \"framer-motion\";\r\nimport { Upload, X, Image, FileText, Music, Video } from \"lucide-react\";\r\nimport { useState, useCallback } from \"react\";\r\n\r\ninterface LiquidGlassFileUploadProps {\r\n  onFilesSelected?: (files: File[]) => void;\r\n  className?: string;\r\n  accept?: string;\r\n  multiple?: boolean;\r\n  maxSize?: number; // in MB\r\n}\r\n\r\nfunction getFileIcon(type: string) {\r\n  if (type.startsWith(\"image/\")) return <Image size={16} className=\"text-liquid-purple\" />;\r\n  if (type.startsWith(\"video/\")) return <Video size={16} className=\"text-liquid-rose\" />;\r\n  if (type.startsWith(\"audio/\")) return <Music size={16} className=\"text-liquid-cyan\" />;\r\n  return <FileText size={16} className=\"text-liquid-blue\" />;\r\n}\r\n\r\nfunction formatSize(bytes: number) {\r\n  if (bytes < 1024) return `${bytes} B`;\r\n  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;\r\n  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;\r\n}\r\n\r\nexport function LiquidGlassFileUpload({\r\n  onFilesSelected,\r\n  className,\r\n  accept,\r\n  multiple = false,\r\n  maxSize = 10,\r\n}: LiquidGlassFileUploadProps) {\r\n  const [files, setFiles] = useState<File[]>([]);\r\n  const [isDragOver, setIsDragOver] = useState(false);\r\n  const [error, setError] = useState<string | null>(null);\r\n\r\n  const handleFiles = useCallback(\r\n    (newFiles: FileList | null) => {\r\n      if (!newFiles) return;\r\n      setError(null);\r\n      const fileArray = Array.from(newFiles);\r\n      const oversized = fileArray.filter((f) => f.size > maxSize * 1024 * 1024);\r\n      if (oversized.length > 0) {\r\n        setError(`Some files exceed ${maxSize}MB limit`);\r\n        return;\r\n      }\r\n      const updated = multiple ? [...files, ...fileArray] : fileArray;\r\n      setFiles(updated);\r\n      onFilesSelected?.(updated);\r\n    },\r\n    [files, multiple, maxSize, onFilesSelected]\r\n  );\r\n\r\n  const removeFile = (index: number) => {\r\n    const updated = files.filter((_, i) => i !== index);\r\n    setFiles(updated);\r\n    onFilesSelected?.(updated);\r\n  };\r\n\r\n  return (\r\n    <div className={cn(\"w-full\", className)}>\r\n      <motion.div\r\n        onDragOver={(e) => {\r\n          e.preventDefault();\r\n          setIsDragOver(true);\r\n        }}\r\n        onDragLeave={() => setIsDragOver(false)}\r\n        onDrop={(e) => {\r\n          e.preventDefault();\r\n          setIsDragOver(false);\r\n          handleFiles(e.dataTransfer.files);\r\n        }}\r\n        animate={{\r\n          scale: isDragOver ? 1.02 : 1,\r\n          borderColor: isDragOver ? \"rgba(59, 130, 246, 0.4)\" : undefined,\r\n        }}\r\n        className={cn(\r\n          \"relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl\",\r\n          \"glass-blur-sm glass-surface glass-border border-dashed\",\r\n          \"transition-colors cursor-pointer\",\r\n          isDragOver && \"bg-liquid-blue/5\"\r\n        )}\r\n      >\r\n        <input\r\n          type=\"file\"\r\n          accept={accept}\r\n          multiple={multiple}\r\n          onChange={(e) => handleFiles(e.target.files)}\r\n          className=\"absolute inset-0 opacity-0 cursor-pointer\"\r\n        />\r\n        <div className=\"flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lg-border-subtle)]\">\r\n          <Upload size={20} className=\"text-[var(--lg-text-muted)]\" />\r\n        </div>\r\n        <div className=\"text-center\">\r\n          <p className=\"text-sm text-[var(--lg-text-secondary)]\">\r\n            <span className=\"text-liquid-blue\">Click to upload</span> or drag and drop\r\n          </p>\r\n          <p className=\"text-xs text-[var(--lg-text-muted)] mt-1\">\r\n            Max file size: {maxSize}MB\r\n          </p>\r\n        </div>\r\n      </motion.div>\r\n\r\n      {error && (\r\n        <p className=\"mt-2 text-xs text-liquid-rose\">{error}</p>\r\n      )}\r\n\r\n      <AnimatePresence>\r\n        {files.length > 0 && (\r\n          <motion.div\r\n            initial={{ opacity: 0, height: 0 }}\r\n            animate={{ opacity: 1, height: \"auto\" }}\r\n            exit={{ opacity: 0, height: 0 }}\r\n            className=\"mt-3 space-y-2\"\r\n          >\r\n            {files.map((file, i) => (\r\n              <motion.div\r\n                key={`${file.name}-${i}`}\r\n                initial={{ opacity: 0, x: -10 }}\r\n                animate={{ opacity: 1, x: 0 }}\r\n                exit={{ opacity: 0, x: 10 }}\r\n                className={cn(\r\n                  \"flex items-center gap-3 px-3 py-2 rounded-xl\",\r\n                  \"glass-blur-sm glass-surface glass-border\"\r\n                )}\r\n              >\r\n                <div className=\"flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lg-border-subtle)]\">\r\n                  {getFileIcon(file.type)}\r\n                </div>\r\n                <div className=\"flex-1 min-w-0\">\r\n                  <p className=\"text-xs font-medium text-[var(--lg-text-secondary)] truncate\">{file.name}</p>\r\n                  <p className=\"text-[10px] text-[var(--lg-text-muted)]\">{formatSize(file.size)}</p>\r\n                </div>\r\n                <motion.button\r\n                  whileHover={{ scale: 1.1 }}\r\n                  whileTap={{ scale: 0.9 }}\r\n                  onClick={() => removeFile(i)}\r\n                  className=\"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\r\n                >\r\n                  <X size={14} />\r\n                </motion.button>\r\n              </motion.div>\r\n            ))}\r\n          </motion.div>\r\n        )}\r\n      </AnimatePresence>\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "onFilesSelected",
        "type": "(files: File[]) => void",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "accept",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "multiple",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "fluid-card",
    "name": "LiquidGlassFluidCard",
    "file": "src/components/liquid-glass/LiquidGlassFluidCard.tsx",
    "category": "Layout & Surfaces",
    "description": "Card with a cursor-following liquid refraction glow.",
    "usage": "<LiquidGlassFluidCard />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { useState, type ReactNode, type MouseEvent } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport {\n  useLiquidHoverLift,\n  useLiquidTapScale,\n  useLiquidTransition,\n} from \"./useLiquidMotion\";\n\ninterface LiquidGlassFluidCardProps {\n  children: ReactNode;\n  className?: string;\n  padding?: \"none\" | \"sm\" | \"md\" | \"lg\";\n  variant?: \"default\" | \"strong\" | \"ios26\";\n  onClick?: () => void;\n}\n\nexport function LiquidGlassFluidCard({\n  children,\n  className,\n  padding = \"md\",\n  variant = \"default\",\n  onClick,\n}: LiquidGlassFluidCardProps) {\n  const hoverLift = useLiquidHoverLift();\n  const tapScale = useLiquidTapScale();\n  const glowTransition = useLiquidTransition();\n  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });\n\n  const handleMove = (e: MouseEvent<HTMLDivElement>) => {\n    const rect = e.currentTarget.getBoundingClientRect();\n    setGlow({\n      x: ((e.clientX - rect.left) / rect.width) * 100,\n      y: ((e.clientY - rect.top) / rect.height) * 100,\n      active: true,\n    });\n  };\n\n  const paddingClasses = {\n    none: \"\",\n    sm: \"p-3\",\n    md: \"p-5\",\n    lg: \"p-7\",\n  };\n\n  const isIos26 = variant === \"ios26\";\n\n  return (\n    <motion.div\n      onMouseMove={handleMove}\n      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}\n      onClick={onClick}\n      whileHover={{ y: hoverLift }}\n      whileTap={onClick ? { scale: tapScale } : undefined}\n      className={cn(\n        \"relative overflow-hidden rounded-3xl isolate\",\n        isIos26 ? \"glass-blur-xl glass-surface-strong glass-border\" : \"glass-blur-lg glass-surface glass-border\",\n        \"shadow-xl shadow-black/10\",\n        paddingClasses[padding],\n        onClick && \"cursor-pointer\",\n        className\n      )}\n    >\n      {/* Liquid refraction follows cursor */}\n      <motion.div\n        animate={{\n          opacity: glow.active ? 0.6 : 0,\n          scale: glow.active ? 1 : 0.8,\n        }}\n        transition={glowTransition}\n        className=\"pointer-events-none absolute -inset-8 z-0\"\n        style={{\n          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12) 0%, transparent 45%)`,\n        }}\n      />\n\n      {/* Top highlight */}\n      <GlassTopHighlight className=\"inset-x-4 top-0 z-10\" opacity={0.3} />\n\n      {/* Subtle border glow */}\n      {isIos26 && (\n        <div className=\"pointer-events-none absolute inset-0 rounded-3xl border border-[var(--lg-border-subtle)] z-10\" />\n      )}\n\n      <div className=\"relative z-10\">{children}</div>\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "padding",
        "type": "\"none\" | \"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": ""
      },
      {
        "name": "variant",
        "type": "\"default\" | \"strong\" | \"ios26\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": false,
        "description": "Callback when the element is clicked."
      }
    ]
  },
  {
    "id": "hover-card",
    "name": "LiquidGlassHoverCard",
    "file": "src/components/liquid-glass/LiquidGlassHoverCard.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Hover-triggered popover portaled to document.body.",
    "usage": "<LiquidGlassHoverCard />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useRef, useEffect, type ReactNode } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface LiquidGlassHoverCardProps {\n  children: ReactNode;\n  content: ReactNode;\n  className?: string;\n  delay?: number;\n  width?: string;\n}\n\nexport function LiquidGlassHoverCard({\n  children,\n  content,\n  className,\n  delay = 0.3,\n  width = \"280px\",\n}: LiquidGlassHoverCardProps) {\n  const triggerRef = useRef<HTMLDivElement>(null);\n  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);\n  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);\n  const [isVisible, setIsVisible] = useState(false);\n  const [position, setPosition] = useState({ left: 0, top: 0, width: 0 });\n\n  const popover = useGlassSurface({ variant: \"popover\" });\n  const topHighlight = useGlassSurface({ variant: \"highlight\", opacity: 0.20 });\n  const arrowFill = useGlassSurface({ variant: \"fill\", opacity: 0.12 });\n\n  const measurePosition = () => {\n    if (!triggerRef.current) return;\n    const rect = triggerRef.current.getBoundingClientRect();\n    setPosition({ left: rect.left, top: rect.bottom + 8, width: rect.width });\n  };\n\n  const scheduleShow = () => {\n    if (showTimerRef.current) clearTimeout(showTimerRef.current);\n    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);\n    measurePosition();\n    showTimerRef.current = setTimeout(() => setIsVisible(true), delay * 1000);\n  };\n\n  const scheduleHide = () => {\n    if (showTimerRef.current) clearTimeout(showTimerRef.current);\n    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);\n    hideTimerRef.current = setTimeout(() => setIsVisible(false), 100);\n  };\n\n  useEffect(() => {\n    return () => {\n      if (showTimerRef.current) clearTimeout(showTimerRef.current);\n      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);\n    };\n  }, []);\n\n  const popoverNode = (\n    <AnimatePresence>\n      {isVisible && (\n        <motion.div\n          initial={{ opacity: 0, y: 8, scale: 0.96 }}\n          animate={{ opacity: 1, y: 0, scale: 1 }}\n          exit={{ opacity: 0, y: 8, scale: 0.96 }}\n          transition={{ duration: 0.15 }}\n          className=\"fixed z-[100] flex justify-center pointer-events-none\"\n          style={{\n            left: position.left,\n            top: position.top,\n            width: position.width,\n          }}\n        >\n          <div\n            className={cn(\n              \"pointer-events-auto flex-shrink-0\",\n              popover.className,\n              \"rounded-2xl overflow-hidden\"\n            )}\n            style={{ width, ...popover.style }}\n            onMouseEnter={scheduleShow}\n            onMouseLeave={scheduleHide}\n          >\n            {/* Reflection blob */}\n            <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full glass-reflection blur-2xl\" />\n            {/* Top highlight */}\n            <div className={topHighlight.className} style={topHighlight.style} />\n            {/* Arrow */}\n            <div\n              className=\"absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-l border-t border-[var(--lg-border-subtle)]\"\n              style={{ background: arrowFill.style.background }}\n            />\n            <div className=\"relative p-4\">{content}</div>\n          </div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n\n  return (\n    <div\n      ref={triggerRef}\n      className={cn(\"relative inline-flex\", className)}\n      onMouseEnter={scheduleShow}\n      onMouseLeave={scheduleHide}\n    >\n      {children}\n      {createPortal(popoverNode, document.body)}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "content",
        "type": "ReactNode",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "delay",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "width",
        "type": "string",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "input",
    "name": "LiquidGlassInput",
    "file": "src/components/liquid-glass/LiquidGlassInput.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Glass text input with icons, label, and error states.",
    "usage": "<LiquidGlassInput />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport type { ReactNode } from \"react\";\r\n\r\ninterface LiquidGlassInputProps {\r\n  placeholder?: string;\r\n  value?: string;\r\n  onChange?: (value: string) => void;\r\n  className?: string;\r\n  icon?: ReactNode;\r\n  iconRight?: ReactNode;\r\n  type?: string;\r\n  disabled?: boolean;\r\n  error?: string;\r\n  label?: string;\r\n  size?: \"sm\" | \"md\" | \"lg\";\r\n}\r\n\r\nconst sizeStyles = {\r\n  sm: \"px-3 py-2 text-sm rounded-xl\",\r\n  md: \"px-4 py-3 text-sm rounded-2xl\",\r\n  lg: \"px-5 py-4 text-base rounded-2xl\",\r\n};\r\n\r\nexport function LiquidGlassInput({\r\n  placeholder,\r\n  value,\r\n  onChange,\r\n  className,\r\n  icon,\r\n  iconRight,\r\n  type = \"text\",\r\n  disabled,\r\n  error,\r\n  label,\r\n  size = \"md\",\r\n}: LiquidGlassInputProps) {\r\n  return (\r\n    <div className={cn(\"w-full\", className)}>\r\n      {label && (\r\n        <label className=\"mb-1.5 block text-sm font-medium text-[var(--lg-text-secondary)]\">\r\n          {label}\r\n        </label>\r\n      )}\r\n      <motion.div\r\n        whileFocus={{ scale: 1.01 }}\r\n        className={cn(\r\n          \"relative flex items-center gap-3\",\r\n          \"glass-blur-sm glass-surface glass-border glass-inner-glow\",\r\n          \"transition-all duration-200\",\r\n          \"focus-within:ring-2 focus-within:ring-white/20 focus-within:border-[var(--lg-border)]\",\r\n          error && \"border-liquid-rose/50 ring-1 ring-liquid-rose/30\",\r\n          sizeStyles[size],\r\n          disabled && \"opacity-50 cursor-not-allowed\"\r\n        )}\r\n      >\r\n        {icon && (\r\n          <span className=\"flex-shrink-0 text-[var(--lg-text-muted)]\">{icon}</span>\r\n        )}\r\n        <input\r\n          type={type}\r\n          value={value}\r\n          onChange={(e) => onChange?.(e.target.value)}\r\n          placeholder={placeholder}\r\n          disabled={disabled}\r\n          className={cn(\r\n            \"w-full bg-transparent text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none\",\r\n            disabled && \"cursor-not-allowed\"\r\n          )}\r\n        />\r\n        {iconRight && (\r\n          <span className=\"flex-shrink-0 text-[var(--lg-text-muted)]\">{iconRight}</span>\r\n        )}\r\n        {/* Top highlight */}\r\n        <div className=\"pointer-events-none absolute inset-x-3 top-0 h-px bg-[var(--lg-border)] rounded-full\" />\r\n      </motion.div>\r\n      {error && (\r\n        <p className=\"mt-1.5 text-xs text-liquid-rose\">{error}</p>\r\n      )}\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder text."
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element to display."
      },
      {
        "name": "iconRight",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "type",
        "type": "string",
        "required": false,
        "description": "Input type or visual variant."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the component is disabled."
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label text."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      }
    ]
  },
  {
    "id": "ios26-button",
    "name": "LiquidGlassIos26Button",
    "file": "src/components/liquid-glass/LiquidGlassIos26Button.tsx",
    "category": "Buttons & FABs",
    "description": "iOS 26 inspired chrome button with rich glass effects.",
    "usage": "<LiquidGlassIos26Button />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useCallback, type ReactNode, type MouseEvent } from \"react\";\nimport { useLiquidPress } from \"./useLiquidPress\";\nimport { LiquidGlassPressSplash } from \"./LiquidGlassPressSplash\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface LiquidGlassIos26ButtonProps {\n  children: ReactNode;\n  className?: string;\n  size?: \"sm\" | \"md\" | \"lg\";\n  icon?: ReactNode;\n  disabled?: boolean;\n  onClick?: () => void;\n  fullWidth?: boolean;\n}\n\nexport function LiquidGlassIos26Button({\n  children,\n  className,\n  size = \"md\",\n  icon,\n  disabled,\n  onClick,\n  fullWidth,\n}: LiquidGlassIos26ButtonProps) {\n  const tapScale = useLiquidTapScale();\n  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);\n  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =\n    useLiquidPress<HTMLButtonElement>(disabled);\n\n  const createRipple = useCallback(\n    (e: MouseEvent<HTMLButtonElement>) => {\n      if (disabled) return;\n      const rect = e.currentTarget.getBoundingClientRect();\n      const id = Date.now();\n      setRipples((prev) => [\n        ...prev,\n        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },\n      ]);\n      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900);\n    },\n    [disabled]\n  );\n\n  const sizeClasses = {\n    sm: \"px-4 py-2 text-sm rounded-2xl gap-1.5\",\n    md: \"px-6 py-3 text-sm rounded-3xl gap-2\",\n    lg: \"px-8 py-4 text-base rounded-3xl gap-2.5\",\n  };\n\n  return (\n    <motion.button\n      whileHover={{ scale: disabled ? 1 : 1.03 }}\n      whileTap={{ scale: disabled ? 1 : tapScale }}\n      disabled={disabled}\n      onPointerDown={onPointerDown}\n      onPointerUp={onPointerUp}\n      onPointerLeave={onPointerLeave}\n      onPointerCancel={onPointerCancel}\n      onClick={(e) => {\n        createRipple(e);\n        onClick?.();\n      }}\n      className={cn(\n        \"relative inline-flex items-center justify-center font-semibold overflow-hidden isolate\",\n        \"glass-blur-lg glass-surface-strong glass-border\",\n        \"text-[var(--lg-text)] shadow-2xl shadow-black/20\",\n        sizeClasses[size],\n        fullWidth && \"w-full\",\n        disabled && \"opacity-50 cursor-not-allowed\",\n        className\n      )}\n    >\n      {/* Chrome gradient */}\n      <div className=\"absolute inset-0 bg-gradient-to-br from-liquid-blue/25 via-liquid-purple/15 to-liquid-pink/10 opacity-80\" />\n\n      {/* Top reflection line */}\n      <GlassTopHighlight className=\"inset-x-3 top-0.5 z-20\" opacity={0.4} />\n\n      {/* Side refraction highlights */}\n      <div className=\"pointer-events-none absolute -top-6 -left-4 h-16 w-16 rounded-full bg-[var(--lg-border)] blur-2xl\" />\n      <div className=\"pointer-events-none absolute -bottom-6 -right-4 h-16 w-16 rounded-full bg-liquid-blue/15 blur-2xl\" />\n\n      {/* Liquid-glass press splash */}\n      <LiquidGlassPressSplash press={press} size={160} />\n\n      {/* Press fluid compression */}\n      <motion.div\n        animate={{ opacity: press.isPressed ? 0.55 : 0 }}\n        transition={{ duration: 0.15 }}\n        className=\"absolute inset-0 z-0\"\n        style={{\n          boxShadow:\n            \"inset 0 8px 24px rgba(0,0,0,0.28), inset 0 -2px 8px rgba(255,255,255,0.14)\",\n        }}\n      />\n\n      <AnimatePresence>\n        {ripples.map((ripple) => (\n          <motion.span\n            key={ripple.id}\n            initial={{\n              scale: 0,\n              opacity: 0.5,\n              borderRadius: \"45% 55% 50% 50% / 55% 45% 50% 50%\",\n            }}\n            animate={{ scale: 3, opacity: 0, borderRadius: \"50%\" }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}\n            className=\"absolute pointer-events-none z-10\"\n            style={{\n              left: ripple.x,\n              top: ripple.y,\n              width: 60,\n              height: 60,\n              marginLeft: -30,\n              marginTop: -30,\n              background:\n                \"radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 65%)\",\n            }}\n          />\n        ))}\n      </AnimatePresence>\n\n      {icon && <span className=\"relative z-20\">{icon}</span>}\n      <span className=\"relative z-20\">{children}</span>\n    </motion.button>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element to display."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the component is disabled."
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": false,
        "description": "Callback when the element is clicked."
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "kanban",
    "name": "LiquidGlassKanban",
    "file": "src/components/liquid-glass/LiquidGlassKanban.tsx",
    "category": "Data Display",
    "description": "Drag-and-drop kanban board.",
    "usage": "<LiquidGlassKanban />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { Plus, MoreHorizontal } from \"lucide-react\";\nimport { useState } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface KanbanTask {\n  id: string;\n  title: string;\n  description?: string;\n  tag?: string;\n  tagColor?: string;\n  assignees?: string[];\n}\n\ninterface KanbanColumn {\n  id: string;\n  title: string;\n  tasks: KanbanTask[];\n  color?: string;\n}\n\ninterface LiquidGlassKanbanProps {\n  columns: KanbanColumn[];\n  className?: string;\n  onTaskMove?: (taskId: string, fromColumn: string, toColumn: string) => void;\n}\n\nexport function LiquidGlassKanban({\n  columns: initialColumns,\n  className,\n  onTaskMove,\n}: LiquidGlassKanbanProps) {\n  const tagFill = useGlassSurface({ variant: \"fill\", opacity: 0.08 });\n  const [columns, setColumns] = useState(initialColumns);\n  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);\n  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);\n\n  const handleTaskDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {\n    setDraggedTaskId(taskId);\n    e.dataTransfer.setData(\"text/plain\", taskId);\n    e.dataTransfer.effectAllowed = \"move\";\n  };\n\n  const handleColumnDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {\n    e.preventDefault();\n    setDragOverColumnId(columnId);\n  };\n\n  const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {\n    e.preventDefault();\n    const taskId = e.dataTransfer.getData(\"text/plain\");\n    if (!taskId) return;\n\n    setDragOverColumnId(null);\n    setDraggedTaskId(null);\n\n    setColumns((prev) => {\n      const sourceColumn = prev.find((c) => c.tasks.some((t) => t.id === taskId));\n      if (!sourceColumn || sourceColumn.id === targetColumnId) return prev;\n\n      const task = sourceColumn.tasks.find((t) => t.id === taskId)!;\n      const next = prev.map((c) => {\n        if (c.id === sourceColumn.id) {\n          return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) };\n        }\n        if (c.id === targetColumnId) {\n          return { ...c, tasks: [...c.tasks, task] };\n        }\n        return c;\n      });\n      onTaskMove?.(taskId, sourceColumn.id, targetColumnId);\n      return next;\n    });\n  };\n\n  return (\n    <div className={cn(\"flex gap-4 overflow-x-auto pb-2\", className)}>\n      {columns.map((column) => (\n        <div\n          key={column.id}\n          onDragOver={(e) => handleColumnDragOver(e, column.id)}\n          onDrop={(e) => handleColumnDrop(e, column.id)}\n          onDragLeave={() => setDragOverColumnId(null)}\n          className={cn(\n            \"flex-shrink-0 w-72 rounded-2xl glass-blur-sm glass-surface-dark glass-border p-3 transition-all duration-200\",\n            dragOverColumnId === column.id && \"ring-2 ring-liquid-blue/30\"\n          )}\n        >\n          {/* Column header */}\n          <div className=\"flex items-center justify-between mb-3 px-1\">\n            <div className=\"flex items-center gap-2\">\n              <div\n                className=\"h-2 w-2 rounded-full\"\n                style={{ backgroundColor: column.color || \"rgba(255,255,255,0.3)\" }}\n              />\n              <h4 className=\"text-sm font-semibold text-[var(--lg-text-secondary)]\">{column.title}</h4>\n              <span className=\"text-xs text-[var(--lg-text-muted)] bg-[var(--lg-border-subtle)] px-1.5 py-0.5 rounded-md\">\n                {column.tasks.length}\n              </span>\n            </div>\n            <button className=\"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\">\n              <MoreHorizontal size={14} />\n            </button>\n          </div>\n\n          {/* Tasks */}\n          <div className=\"space-y-2\">\n            {column.tasks.map((task, i) => (\n              <motion.div\n                key={task.id}\n                draggable\n                onDragStart={(e) => handleTaskDragStart(e as unknown as React.DragEvent<HTMLDivElement>, task.id)}\n                onDragEnd={() => {\n                  setDraggedTaskId(null);\n                  setDragOverColumnId(null);\n                }}\n                initial={{ opacity: 0, y: 8 }}\n                animate={{ opacity: draggedTaskId === task.id ? 0.4 : 1, y: 0 }}\n                transition={{ delay: i * 0.05 }}\n                whileHover={{ y: -2 }}\n                className={cn(\n                  \"relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing\",\n                  \"glass-blur glass-surface-strong glass-border glass-highlight\",\n                  draggedTaskId === task.id && \"opacity-40\"\n                )}\n              >\n                {/* Top highlight */}\n                <GlassTopHighlight className=\"inset-x-3 top-0\" opacity={0.25} />\n                {/* Reflection blob */}\n                <div className=\"pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full glass-reflection blur-2xl\" />\n                {/* Sheen */}\n                <GlassSheen opacity={0.15} />\n\n                <div className=\"relative p-3\">\n                  {task.tag && (\n                    <span\n                      className=\"inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mb-2\"\n                      style={{\n                        backgroundColor: task.tagColor ? `${task.tagColor}20` : tagFill.style.background,\n                        color: task.tagColor || \"rgba(255,255,255,0.6)\",\n                      }}\n                    >\n                      {task.tag}\n                    </span>\n                  )}\n                  <p className=\"text-sm font-medium text-[var(--lg-text-secondary)] mb-1\">{task.title}</p>\n                  {task.description && (\n                    <p className=\"text-xs text-[var(--lg-text-muted)] leading-relaxed\">{task.description}</p>\n                  )}\n                  {task.assignees && task.assignees.length > 0 && (\n                    <div className=\"flex -space-x-1.5 mt-2\">\n                      {task.assignees.map((a, j) => (\n                        <div\n                          key={j}\n                          className=\"h-5 w-5 rounded-full bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-[var(--lg-border)] flex items-center justify-center text-[8px] font-bold text-[var(--lg-text-secondary)]\"\n                        >\n                          {a.slice(0, 2).toUpperCase()}\n                        </div>\n                      ))}\n                    </div>\n                  )}\n                </div>\n              </motion.div>\n            ))}\n          </div>\n\n          {/* Add button */}\n          <motion.button\n            whileHover={{ scale: 1.01 }}\n            whileTap={{ scale: 0.99 }}\n            className=\"flex w-full items-center justify-center gap-1.5 mt-2 py-2 rounded-xl text-xs text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border-subtle)] transition-colors\"\n          >\n            <Plus size={12} />\n            Add task\n          </motion.button>\n        </div>\n      ))}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "columns",
        "type": "KanbanColumn[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "onTaskMove",
        "type": "(taskId: string, fromColumn: string, toColumn: string) => void",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "menubar",
    "name": "LiquidGlassMenubar",
    "file": "src/components/liquid-glass/LiquidGlassMenubar.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Dropdown menubar for desktop-style menus.",
    "usage": "<LiquidGlassMenubar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useRef, useEffect } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface MenuItem {\n  label: string;\n  items: {\n    label: string;\n    shortcut?: string;\n    disabled?: boolean;\n    separator?: boolean;\n    onClick?: () => void;\n  }[];\n}\n\ninterface LiquidGlassMenubarProps {\n  menus: MenuItem[];\n  className?: string;\n}\n\nexport function LiquidGlassMenubar({ menus, className }: LiquidGlassMenubarProps) {\n  const [activeIndex, setActiveIndex] = useState<number | null>(null);\n  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);\n  const barRef = useRef<HTMLDivElement>(null);\n  const dropdownRef = useRef<HTMLDivElement>(null);\n  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);\n\n  useEffect(() => {\n    const handle = (e: MouseEvent) => {\n      if (\n        barRef.current &&\n        !barRef.current.contains(e.target as Node) &&\n        dropdownRef.current &&\n        !dropdownRef.current.contains(e.target as Node)\n      ) {\n        setActiveIndex(null);\n      }\n    };\n    document.addEventListener(\"mousedown\", handle);\n    return () => document.removeEventListener(\"mousedown\", handle);\n  }, []);\n\n  useEffect(() => {\n    if (activeIndex === null) {\n      setMenuPos(null);\n      return;\n    }\n    const btn = triggerRefs.current[activeIndex];\n    if (!btn) return;\n    const update = () => {\n      const rect = btn.getBoundingClientRect();\n      setMenuPos({ left: rect.left, top: rect.bottom + 6 });\n    };\n    update();\n    window.addEventListener(\"resize\", update);\n    return () => window.removeEventListener(\"resize\", update);\n  }, [activeIndex]);\n\n  const dropdown = (\n    <AnimatePresence>\n      {activeIndex !== null && menuPos && (\n        <motion.div\n          ref={dropdownRef}\n          initial={{ opacity: 0, y: 4 }}\n          animate={{ opacity: 1, y: 0 }}\n          exit={{ opacity: 0, y: 4 }}\n          transition={{ duration: 0.1 }}\n          style={{ left: menuPos.left, top: menuPos.top }}\n          className=\"fixed z-[100] min-w-[180px] rounded-xl overflow-hidden glass-blur-xl glass-surface glass-border glass-highlight\"\n        >\n          {/* Top highlight */}\n          <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />\n          <div className=\"py-1\">\n            {menus[activeIndex]?.items.map((item, j) =>\n              item.separator ? (\n                <div key={`sep-${j}`} className=\"my-1 h-px bg-[var(--lg-border-subtle)] mx-2\" />\n              ) : (\n                <button\n                  key={j}\n                  onClick={() => {\n                    if (!item.disabled) {\n                      item.onClick?.();\n                      setActiveIndex(null);\n                    }\n                  }}\n                  className={cn(\n                    \"flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors\",\n                    item.disabled\n                      ? \"text-[var(--lg-text-muted)] cursor-not-allowed\"\n                      : \"text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text)]\"\n                  )}\n                >\n                  <span>{item.label}</span>\n                  {item.shortcut && (\n                    <span className=\"text-[10px] text-[var(--lg-text-muted)] ml-4\">\n                      {item.shortcut}\n                    </span>\n                  )}\n                </button>\n              )\n            )}\n          </div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n\n  return (\n    <div\n      ref={barRef}\n      className={cn(\n        \"inline-flex items-center gap-0.5 px-2 py-1.5 rounded-xl\",\n        \"glass-blur-sm glass-surface glass-border\",\n        className\n      )}\n    >\n      {menus.map((menu, i) => (\n        <div key={i} className=\"relative\">\n          <motion.button\n            ref={(el) => { triggerRefs.current[i] = el; }}\n            whileHover={{ scale: 1.02 }}\n            onClick={() => setActiveIndex(activeIndex === i ? null : i)}\n            className={cn(\n              \"px-3 py-1.5 rounded-lg text-sm font-medium transition-colors\",\n              activeIndex === i\n                ? \"bg-[var(--lg-border)] text-[var(--lg-text)]\"\n                : \"text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--lg-border-subtle)]\"\n            )}\n          >\n            {menu.label}\n          </motion.button>\n        </div>\n      ))}\n      {createPortal(dropdown, document.body)}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "menus",
        "type": "MenuItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "modal",
    "name": "LiquidGlassModal",
    "file": "src/components/liquid-glass/LiquidGlassModal.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Centered modal dialog with glass blur.",
    "usage": "<LiquidGlassModal />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { X } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport {\n  useLiquidOverlayVariants,\n  useLiquidTransition,\n  useLiquidTapScale,\n} from \"./useLiquidMotion\";\n\ninterface LiquidGlassModalProps {\n  isOpen: boolean;\n  onClose: () => void;\n  children: ReactNode;\n  className?: string;\n  title?: string;\n  size?: \"sm\" | \"md\" | \"lg\" | \"xl\";\n}\n\nconst sizeStyles = {\n  sm: \"max-w-sm\",\n  md: \"max-w-md\",\n  lg: \"max-w-lg\",\n  xl: \"max-w-xl\",\n};\n\nexport function LiquidGlassModal({\n  isOpen,\n  onClose,\n  children,\n  className,\n  title,\n  size = \"md\",\n}: LiquidGlassModalProps) {\n  const overlayVariants = useLiquidOverlayVariants();\n  const tapScale = useLiquidTapScale();\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <motion.div\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          exit={{ opacity: 0 }}\n          transition={{ duration: 0.2 }}\n          className=\"fixed inset-0 z-50 flex items-center justify-center p-4\"\n          onClick={onClose}\n        >\n          {/* Backdrop */}\n          <div className=\"glass-backdrop\" />\n\n          {/* Modal */}\n          <motion.div\n            {...overlayVariants}\n            transition={useLiquidTransition()}\n            onClick={(e) => e.stopPropagation()}\n            className={cn(\n              \"relative w-full\",\n              \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n              \"rounded-3xl overflow-hidden\",\n              sizeStyles[size],\n              className\n            )}\n          >\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.3} />\n            {/* Reflection */}\n            <div className=\"pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--lg-border-subtle)] blur-2xl\" />\n\n            {title && (\n              <div className=\"flex items-center justify-between px-6 pt-6 pb-2\">\n                <h3 className=\"text-lg font-semibold text-[var(--lg-text)]\">{title}</h3>\n                <motion.button\n                  whileHover={{ scale: 1.1 }}\n                  whileTap={{ scale: tapScale }}\n                  onClick={onClose}\n                  className=\"flex h-8 w-8 items-center justify-center rounded-full bg-[var(--lg-border-subtle)] text-[var(--lg-text-muted)] hover:bg-[var(--lg-border)] hover:text-[var(--lg-text-secondary)] transition-colors\"\n                >\n                  <X size={16} />\n                </motion.button>\n              </div>\n            )}\n            <div className=\"p-6\">{children}</div>\n          </motion.div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "required": false,
        "description": "Size preset."
      }
    ]
  },
  {
    "id": "music-player",
    "name": "LiquidGlassMusicPlayer",
    "file": "src/components/liquid-glass/LiquidGlassMusicPlayer.tsx",
    "category": "Media & Content",
    "description": "Glass music player card.",
    "usage": "<LiquidGlassMusicPlayer />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from \"lucide-react\";\nimport { useState } from \"react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface LiquidGlassMusicPlayerProps {\n  className?: string;\n  title?: string;\n  artist?: string;\n  coverUrl?: string;\n  duration?: number; // seconds\n  currentTime?: number;\n}\n\nexport function LiquidGlassMusicPlayer({\n  className,\n  title = \"Midnight City\",\n  artist = \"M83\",\n  coverUrl,\n  duration = 243,\n  currentTime: initialTime = 87,\n}: LiquidGlassMusicPlayerProps) {\n  const coverDotFill = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n  const [isPlaying, setIsPlaying] = useState(false);\n  const [currentTime, setCurrentTime] = useState(initialTime);\n  const [liked, setLiked] = useState(false);\n  const [volume, setVolume] = useState(70);\n\n  const formatTime = (s: number) => {\n    const m = Math.floor(s / 60);\n    const sec = Math.floor(s % 60);\n    return `${m}:${sec.toString().padStart(2, \"0\")}`;\n  };\n\n  const progress = (currentTime / duration) * 100;\n\n  return (\n    <div\n      className={cn(\n        \"w-full max-w-sm p-5 rounded-3xl\",\n        \"glass-blur-lg glass-surface glass-border glass-highlight-strong\",\n        className\n      )}\n    >\n      {/* Top highlight */}\n      <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.25} />\n\n      {/* Cover */}\n      <div className=\"relative mx-auto mb-5 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl shadow-black/30\">\n        {coverUrl ? (\n          <img src={coverUrl} alt={title} className=\"w-full h-full object-cover\" />\n        ) : (\n          <div className=\"w-full h-full bg-gradient-to-br from-liquid-purple/40 via-liquid-blue/30 to-liquid-pink/40 flex items-center justify-center\">\n            <div className=\"w-20 h-20 rounded-full bg-[var(--lg-border)] flex items-center justify-center\">\n              <div className=\"w-8 h-8 rounded-full\" style={{ background: coverDotFill.style.background }} />\n            </div>\n          </div>\n        )}\n        {/* Glass overlay on cover */}\n        <div className=\"absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl\" />\n      </div>\n\n      {/* Track info */}\n      <div className=\"flex items-start justify-between mb-4\">\n        <div className=\"min-w-0\">\n          <h3 className=\"text-base font-semibold text-[var(--lg-text)] truncate\">{title}</h3>\n          <p className=\"text-sm text-[var(--lg-text-muted)] truncate\">{artist}</p>\n        </div>\n        <motion.button\n          whileHover={{ scale: 1.15 }}\n          whileTap={{ scale: 0.9 }}\n          onClick={() => setLiked(!liked)}\n          className={cn(\n            \"flex-shrink-0 mt-1 transition-colors\",\n            liked ? \"text-liquid-rose\" : \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n          )}\n        >\n          <Heart size={20} className={liked ? \"fill-liquid-rose\" : \"\"} />\n        </motion.button>\n      </div>\n\n      {/* Progress */}\n      <div className=\"mb-4\">\n        <div\n          className=\"relative h-1 rounded-full bg-[var(--lg-border)] cursor-pointer\"\n          onClick={(e) => {\n            const rect = e.currentTarget.getBoundingClientRect();\n            const pct = (e.clientX - rect.left) / rect.width;\n            setCurrentTime(Math.floor(pct * duration));\n          }}\n        >\n          <motion.div\n            className=\"absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-liquid-blue to-liquid-purple\"\n            style={{ width: `${progress}%` }}\n          />\n          <div\n            className=\"absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg\"\n            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}\n          />\n        </div>\n        <div className=\"flex justify-between mt-1.5\">\n          <span className=\"text-[10px] text-[var(--lg-text-muted)] tabular-nums\">{formatTime(currentTime)}</span>\n          <span className=\"text-[10px] text-[var(--lg-text-muted)] tabular-nums\">{formatTime(duration)}</span>\n        </div>\n      </div>\n\n      {/* Controls */}\n      <div className=\"flex items-center justify-center gap-4 mb-4\">\n        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className=\"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\">\n          <Shuffle size={16} />\n        </motion.button>\n        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className=\"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\">\n          <SkipBack size={22} />\n        </motion.button>\n        <motion.button\n          whileHover={{ scale: 1.1 }}\n          whileTap={{ scale: 0.9 }}\n          onClick={() => setIsPlaying(!isPlaying)}\n          className=\"flex h-12 w-12 items-center justify-center rounded-full bg-[var(--lg-border)] glass-border\"\n        >\n          {isPlaying ? (\n            <Pause size={20} className=\"text-[var(--lg-text)]\" />\n          ) : (\n            <Play size={20} className=\"text-[var(--lg-text)] ml-0.5\" />\n          )}\n        </motion.button>\n        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className=\"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\">\n          <SkipForward size={22} />\n        </motion.button>\n        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className=\"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\">\n          <Repeat size={16} />\n        </motion.button>\n      </div>\n\n      {/* Volume */}\n      <div className=\"flex items-center gap-2\">\n        <Volume2 size={14} className=\"text-[var(--lg-text-muted)] flex-shrink-0\" />\n        <div\n          className=\"relative flex-1 h-1 rounded-full bg-[var(--lg-border)] cursor-pointer\"\n          onClick={(e) => {\n            const rect = e.currentTarget.getBoundingClientRect();\n            const pct = (e.clientX - rect.left) / rect.width;\n            setVolume(Math.round(pct * 100));\n          }}\n        >\n          <div\n            className=\"absolute inset-y-0 left-0 rounded-full bg-[var(--lg-border)]\"\n            style={{ width: `${volume}%` }}\n          />\n        </div>\n      </div>\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "artist",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "coverUrl",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "currentTime",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "navigation",
    "name": "LiquidGlassNavigation",
    "file": "src/components/liquid-glass/LiquidGlassNavigation.tsx",
    "category": "Navigation",
    "description": "Horizontal glass navigation bar with animated active indicator.",
    "usage": "<LiquidGlassNavigation />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useGlassFluidity } from \"./useGlassFluidity\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface NavItem {\n  label: string;\n  icon?: ReactNode;\n  active?: boolean;\n  onClick?: () => void;\n}\n\ninterface LiquidGlassNavigationProps {\n  items: NavItem[];\n  className?: string;\n  logo?: ReactNode;\n  actions?: ReactNode;\n}\n\nexport function LiquidGlassNavigation({\n  items,\n  className,\n  logo,\n  actions,\n}: LiquidGlassNavigationProps) {\n  const tapScale = useLiquidTapScale();\n  const fluidity = useGlassFluidity();\n  const thumbSurface = useGlassSurface({ variant: \"thumb\" });\n\n  return (\n    <nav\n      className={cn(\n        \"relative flex items-center justify-between px-4 py-3\",\n        \"glass-blur-lg glass-surface glass-border glass-highlight\",\n        \"rounded-2xl\",\n        className\n      )}\n    >\n      <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />\n\n      {logo && <div className=\"flex-shrink-0 mr-4\">{logo}</div>}\n\n      <div className=\"flex items-center gap-1\">\n        {items.map((item, i) => (\n          <motion.button\n            key={i}\n            whileHover={{ scale: 1.05 }}\n            whileTap={{ scale: tapScale }}\n            onClick={item.onClick}\n            className={cn(\n              \"relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors\",\n              item.active\n                ? \"text-[var(--lg-text)]\"\n                : \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n            )}\n          >\n            {item.active && (\n              <motion.div\n                layoutId=\"nav-active\"\n                className=\"absolute inset-0 rounded-xl glass-blur-lg pointer-events-none overflow-hidden\"\n                transition={{ type: \"spring\", stiffness: 300 + fluidity * 3, damping: 30 }}\n                style={thumbSurface.style}\n              >\n                <div className=\"absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none\" />\n                <GlassSheen className=\"rounded-xl\" opacity={0.18} />\n                <div className=\"pointer-events-none absolute inset-x-2 top-0.5 h-px bg-[var(--lg-border)] rounded-full\" />\n              </motion.div>\n            )}\n            <span className=\"relative flex items-center gap-2\">\n              {item.icon}\n              {item.label}\n            </span>\n          </motion.button>\n        ))}\n      </div>\n\n      {actions && <div className=\"flex-shrink-0 ml-4 flex items-center gap-2\">{actions}</div>}\n    </nav>\n  );\n}\n",
    "props": [
      {
        "name": "items",
        "type": "NavItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "logo",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "notification-dropdown",
    "name": "LiquidGlassNotificationDropdown",
    "file": "src/components/liquid-glass/LiquidGlassNotificationDropdown.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Bell dropdown panel portaled to document.body.",
    "usage": "<LiquidGlassNotificationDropdown />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { Bell, Check, Trash2, MessageSquare, Heart, UserPlus, AlertCircle } from \"lucide-react\";\nimport { useState, useRef, useEffect, type CSSProperties } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface Notification {\n  id: string;\n  type: \"message\" | \"like\" | \"follow\" | \"alert\";\n  title: string;\n  description: string;\n  time: string;\n  read: boolean;\n}\n\ninterface LiquidGlassNotificationDropdownProps {\n  notifications?: Notification[];\n  className?: string;\n  onMarkAllRead?: () => void;\n  onClearAll?: () => void;\n  onNotificationClick?: (id: string) => void;\n}\n\nconst typeConfig = {\n  message: { icon: MessageSquare, color: \"text-liquid-blue\", bg: \"bg-liquid-blue/10\" },\n  like: { icon: Heart, color: \"text-liquid-rose\", bg: \"bg-liquid-rose/10\" },\n  follow: { icon: UserPlus, color: \"text-liquid-emerald\", bg: \"bg-liquid-emerald/10\" },\n  alert: { icon: AlertCircle, color: \"text-liquid-amber\", bg: \"bg-liquid-amber/10\" },\n};\n\nconst defaultNotifications: Notification[] = [\n  { id: \"1\", type: \"message\", title: \"New message\", description: \"Sarah sent you a message\", time: \"2m ago\", read: false },\n  { id: \"2\", type: \"like\", title: \"New like\", description: \"Alex liked your photo\", time: \"15m ago\", read: false },\n  { id: \"3\", type: \"follow\", title: \"New follower\", description: \"Jordan started following you\", time: \"1h ago\", read: true },\n  { id: \"4\", type: \"alert\", title: \"System alert\", description: \"Your storage is 90% full\", time: \"3h ago\", read: true },\n];\n\nconst POPOVER_WIDTH = 320;\n\nexport function LiquidGlassNotificationDropdown({\n  notifications = defaultNotifications,\n  className,\n  onMarkAllRead,\n  onClearAll,\n  onNotificationClick,\n}: LiquidGlassNotificationDropdownProps) {\n  const tapScale = useLiquidTapScale();\n  const [isOpen, setIsOpen] = useState(false);\n  const [position, setPosition] = useState({ left: 0, top: 0 });\n  const triggerRef = useRef<HTMLDivElement>(null);\n  const popoverRef = useRef<HTMLDivElement>(null);\n  const popover = useGlassSurface({ variant: \"popover\" });\n  const topHighlight = useGlassSurface({ variant: \"highlight\", opacity: 0.25 });\n  const unreadFill = useGlassSurface({ variant: \"fill\", opacity: 0.06 });\n  const hoverFill = useGlassSurface({ variant: \"fill\", opacity: 0.05 });\n\n  const updatePosition = () => {\n    if (!triggerRef.current) return;\n    const rect = triggerRef.current.getBoundingClientRect();\n    setPosition({\n      left: Math.max(8, rect.right - POPOVER_WIDTH),\n      top: rect.bottom + 8,\n    });\n  };\n\n  useEffect(() => {\n    const handle = (e: MouseEvent) => {\n      if (\n        triggerRef.current?.contains(e.target as Node) ||\n        popoverRef.current?.contains(e.target as Node)\n      ) {\n        return;\n      }\n      setIsOpen(false);\n    };\n    document.addEventListener(\"mousedown\", handle);\n    return () => document.removeEventListener(\"mousedown\", handle);\n  }, []);\n\n  const handleToggle = () => {\n    if (!isOpen) {\n      updatePosition();\n    }\n    setIsOpen((prev) => !prev);\n  };\n\n  const popoverNode = (\n    <AnimatePresence>\n      {isOpen && (\n        <motion.div\n          ref={popoverRef}\n          initial={{ opacity: 0, y: 8, scale: 0.96 }}\n          animate={{ opacity: 1, y: 0, scale: 1 }}\n          exit={{ opacity: 0, y: 8, scale: 0.96 }}\n          transition={{ duration: 0.15 }}\n          className={cn(\n            \"fixed rounded-2xl overflow-hidden z-[100]\",\n            popover.className\n          )}\n          style={{\n            left: position.left,\n            top: position.top,\n            width: POPOVER_WIDTH,\n            ...popover.style,\n          }}\n        >\n          {/* Reflection blob */}\n          <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full glass-reflection blur-2xl\" />\n          {/* Top highlight */}\n          <div className={topHighlight.className} style={topHighlight.style} />\n\n          {/* Header */}\n          <div className=\"flex items-center justify-between px-4 py-3 border-b border-[var(--lg-border-subtle)]\">\n            <h3 className=\"text-sm font-semibold text-[var(--lg-text)]\">Notifications</h3>\n            <div className=\"flex items-center gap-1\">\n              <motion.button\n                whileHover={{ scale: 1.1 }}\n                whileTap={{ scale: tapScale }}\n                onClick={onMarkAllRead}\n                className=\"p-1.5 rounded-lg text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] hover:bg-[var(--lg-border-subtle)] transition-colors\"\n                title=\"Mark all read\"\n              >\n                <Check size={14} />\n              </motion.button>\n              <motion.button\n                whileHover={{ scale: 1.1 }}\n                whileTap={{ scale: tapScale }}\n                onClick={onClearAll}\n                className=\"p-1.5 rounded-lg text-[var(--lg-text-muted)] hover:text-liquid-rose hover:bg-[var(--lg-border-subtle)] transition-colors\"\n                title=\"Clear all\"\n              >\n                <Trash2 size={14} />\n              </motion.button>\n            </div>\n          </div>\n\n          {/* List */}\n          <div className=\"max-h-80 overflow-y-auto py-1\">\n            {notifications.length === 0 ? (\n              <div className=\"px-4 py-8 text-center text-sm text-[var(--lg-text-muted)]\">\n                No notifications\n              </div>\n            ) : (\n              notifications.map((n) => {\n                const config = typeConfig[n.type];\n                const Icon = config.icon;\n                return (\n                  <motion.button\n                    key={n.id}\n                    whileHover={{ x: 2 }}\n                    onClick={() => {\n                      onNotificationClick?.(n.id);\n                      setIsOpen(false);\n                    }}\n                    className={cn(\n                      \"flex w-full items-start gap-3 px-4 py-3 text-left transition-colors\",\n                      !n.read ? \"bg-[var(--item-fill)]\" : \"hover:bg-[var(--item-hover-fill)]\"\n                    )}\n                    style={{\n                      \"--item-fill\": unreadFill.style.background,\n                      \"--item-hover-fill\": hoverFill.style.background,\n                    } as CSSProperties}\n                  >\n                    <div className={cn(\"flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0\", config.bg)}>\n                      <Icon size={14} className={config.color} />\n                    </div>\n                    <div className=\"flex-1 min-w-0\">\n                      <p className=\"text-sm font-medium text-[var(--lg-text-secondary)]\">{n.title}</p>\n                      <p className=\"text-xs text-[var(--lg-text-muted)] truncate\">{n.description}</p>\n                      <p className=\"text-[10px] text-[var(--lg-text-muted)] mt-0.5\">{n.time}</p>\n                    </div>\n                    {!n.read && (\n                      <span className=\"flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-liquid-blue\" />\n                    )}\n                  </motion.button>\n                );\n              })\n            )}\n          </div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n\n  return (\n    <div ref={triggerRef} className={cn(\"relative\", className)}>\n      <motion.button\n        whileHover={{ scale: 1.05 }}\n        whileTap={{ scale: tapScale }}\n        onClick={handleToggle}\n        className=\"relative flex h-10 w-10 items-center justify-center rounded-xl glass-blur-sm glass-surface glass-border text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\n      >\n        <Bell size={18} />\n      </motion.button>\n      {createPortal(popoverNode, document.body)}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "notifications",
        "type": "Notification[]",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "onMarkAllRead",
        "type": "() => void",
        "required": false,
        "description": ""
      },
      {
        "name": "onClearAll",
        "type": "() => void",
        "required": false,
        "description": ""
      },
      {
        "name": "onNotificationClick",
        "type": "(id: string) => void",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "pagination",
    "name": "LiquidGlassPagination",
    "file": "src/components/liquid-glass/LiquidGlassPagination.tsx",
    "category": "Data Display",
    "description": "Pagination controls with ellipsis handling.",
    "usage": "<LiquidGlassPagination />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { ChevronLeft, ChevronRight, MoreHorizontal } from \"lucide-react\";\r\n\r\ninterface LiquidGlassPaginationProps {\r\n  currentPage: number;\r\n  totalPages: number;\r\n  onChange: (page: number) => void;\r\n  className?: string;\r\n  showEdges?: boolean;\r\n  siblingCount?: number;\r\n}\r\n\r\nexport function LiquidGlassPagination({\r\n  currentPage,\r\n  totalPages,\r\n  onChange,\r\n  className,\r\n  showEdges = true,\r\n  siblingCount = 1,\r\n}: LiquidGlassPaginationProps) {\r\n  const getPages = () => {\r\n    const pages: (number | \"ellipsis\")[] = [];\r\n    const left = Math.max(1, currentPage - siblingCount);\r\n    const right = Math.min(totalPages, currentPage + siblingCount);\r\n\r\n    if (showEdges && left > 1) pages.push(1);\r\n    if (showEdges && left > 2) pages.push(\"ellipsis\");\r\n    for (let i = left; i <= right; i++) pages.push(i);\r\n    if (showEdges && right < totalPages - 1) pages.push(\"ellipsis\");\r\n    if (showEdges && right < totalPages) pages.push(totalPages);\r\n    return pages;\r\n  };\r\n\r\n  const pages = getPages();\r\n\r\n  return (\r\n    <div className={cn(\"inline-flex items-center gap-1.5\", className)}>\r\n      <motion.button\r\n        whileHover={{ scale: 1.05 }}\r\n        whileTap={{ scale: 0.95 }}\r\n        onClick={() => onChange(Math.max(1, currentPage - 1))}\r\n        disabled={currentPage === 1}\r\n        className={cn(\r\n          \"flex h-9 w-9 items-center justify-center rounded-xl\",\r\n          \"glass-blur-sm glass-surface glass-border\",\r\n          \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\",\r\n          currentPage === 1 && \"opacity-30 cursor-not-allowed\"\r\n        )}\r\n      >\r\n        <ChevronLeft size={16} />\r\n      </motion.button>\r\n\r\n      {pages.map((page, i) =>\r\n        page === \"ellipsis\" ? (\r\n          <span key={`ellipsis-${i}`} className=\"flex h-9 w-9 items-center justify-center text-[var(--lg-text-muted)]\">\r\n            <MoreHorizontal size={16} />\r\n          </span>\r\n        ) : (\r\n          <motion.button\r\n            key={page}\r\n            whileHover={{ scale: 1.05 }}\r\n            whileTap={{ scale: 0.95 }}\r\n            onClick={() => onChange(page)}\r\n            className={cn(\r\n              \"flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-all\",\r\n              page === currentPage\r\n                ? \"bg-[var(--lg-border)] text-[var(--lg-text)] glass-border\"\r\n                : \"glass-blur-sm glass-surface glass-border text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\r\n            )}\r\n          >\r\n            {page}\r\n          </motion.button>\r\n        )\r\n      )}\r\n\r\n      <motion.button\r\n        whileHover={{ scale: 1.05 }}\r\n        whileTap={{ scale: 0.95 }}\r\n        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}\r\n        disabled={currentPage === totalPages}\r\n        className={cn(\r\n          \"flex h-9 w-9 items-center justify-center rounded-xl\",\r\n          \"glass-blur-sm glass-surface glass-border\",\r\n          \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\",\r\n          currentPage === totalPages && \"opacity-30 cursor-not-allowed\"\r\n        )}\r\n      >\r\n        <ChevronRight size={16} />\r\n      </motion.button>\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "currentPage",
        "type": "number",
        "required": true,
        "description": ""
      },
      {
        "name": "totalPages",
        "type": "number",
        "required": true,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(page: number) => void",
        "required": true,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "showEdges",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "siblingCount",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "press-splash",
    "name": "LiquidGlassPressSplash",
    "file": "src/components/liquid-glass/LiquidGlassPressSplash.tsx",
    "category": "Theme & Glass Primitives",
    "description": "Animated press splash used by buttons and chips.",
    "usage": "<LiquidGlassPressSplash />",
    "sourceCode": "import { motion } from \"framer-motion\";\n\ninterface LiquidGlassPressSplashProps {\n  press: { isPressed: boolean; x: number; y: number };\n  size?: number;\n  tint?: \"light\" | \"dark\";\n  className?: string;\n  duration?: number;\n}\n\nexport function LiquidGlassPressSplash({\n  press,\n  size = 140,\n  tint = \"light\",\n  className,\n  duration = 0.55,\n}: LiquidGlassPressSplashProps) {\n  const splashBackground =\n    tint === \"light\"\n      ? \"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 26%, rgba(255,255,255,0.06) 50%, transparent 72%)\"\n      : \"radial-gradient(circle at 35% 35%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.16) 26%, rgba(0,0,0,0.04) 50%, transparent 72%)\";\n\n  return (\n    <motion.div\n      className={`pointer-events-none absolute mix-blend-soft-light ${className || \"\"}`}\n      initial={false}\n      animate={{\n        opacity: press.isPressed ? [0.52, 0] : 0,\n        scale: press.isPressed ? [0, 1.6] : 0,\n        borderRadius: press.isPressed\n          ? [\n              \"45% 55% 50% 50% / 55% 45% 50% 50%\",\n              \"55% 45% 52% 48% / 48% 52% 45% 55%\",\n              \"50% 50% 50% 50% / 50% 50% 50% 50%\",\n            ]\n          : \"50%\",\n      }}\n      transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}\n      style={{\n        left: `${press.x}%`,\n        top: `${press.y}%`,\n        width: size,\n        height: size,\n        marginLeft: -size / 2,\n        marginTop: -size / 2,\n        background: splashBackground,\n        filter: \"blur(1.5px)\",\n      }}\n    />\n  );\n}\n",
    "props": [
      {
        "name": "size",
        "type": "number",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "tint",
        "type": "\"light\" | \"dark\"",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "progress",
    "name": "LiquidGlassProgress",
    "file": "src/components/liquid-glass/LiquidGlassProgress.tsx",
    "category": "Feedback & Status",
    "description": "Progress bar with default, gradient, and segmented variants.",
    "usage": "<LiquidGlassProgress />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\n\r\ninterface LiquidGlassProgressProps {\r\n  value?: number;\r\n  max?: number;\r\n  className?: string;\r\n  size?: \"sm\" | \"md\" | \"lg\";\r\n  variant?: \"default\" | \"gradient\" | \"segmented\";\r\n  showValue?: boolean;\r\n  animated?: boolean;\r\n}\r\n\r\nconst sizeStyles = {\r\n  sm: \"h-1.5 rounded-full\",\r\n  md: \"h-2.5 rounded-full\",\r\n  lg: \"h-4 rounded-xl\",\r\n};\r\n\r\nexport function LiquidGlassProgress({\r\n  value = 0,\r\n  max = 100,\r\n  className,\r\n  size = \"md\",\r\n  variant = \"default\",\r\n  showValue = false,\r\n  animated = true,\r\n}: LiquidGlassProgressProps) {\r\n  const percentage = Math.min(100, Math.max(0, (value / max) * 100));\r\n\r\n  if (variant === \"segmented\") {\r\n    const segments = 10;\r\n    const filledSegments = Math.round((percentage / 100) * segments);\r\n\r\n    return (\r\n      <div className={cn(\"w-full\", className)}>\r\n        <div className=\"flex gap-1\">\r\n          {Array.from({ length: segments }).map((_, i) => (\r\n            <motion.div\r\n              key={i}\r\n              initial={false}\r\n              animate={{\r\n                opacity: i < filledSegments ? 1 : 0.2,\r\n                scale: i < filledSegments ? 1 : 0.95,\r\n              }}\r\n              transition={{ duration: 0.3, delay: i * 0.03 }}\r\n              className={cn(\r\n                \"flex-1 rounded-full transition-colors\",\r\n                sizeStyles[size],\r\n                i < filledSegments\r\n                  ? \"bg-gradient-to-r from-liquid-blue to-liquid-purple\"\r\n                  : \"bg-[var(--lg-border)]\"\r\n              )}\r\n            />\r\n          ))}\r\n        </div>\r\n        {showValue && (\r\n          <div className=\"mt-1.5 text-right text-xs text-[var(--lg-text-muted)]\">\r\n            {Math.round(percentage)}%\r\n          </div>\r\n        )}\r\n      </div>\r\n    );\r\n  }\r\n\r\n  return (\r\n    <div className={cn(\"w-full\", className)}>\r\n      <div className=\"flex items-center gap-3\">\r\n        <div\r\n          className={cn(\r\n            \"relative flex-1 overflow-hidden\",\r\n            \"glass-blur-sm glass-surface-dark border border-[var(--lg-border-subtle)]\",\r\n            sizeStyles[size]\r\n          )}\r\n        >\r\n          <motion.div\r\n            initial={animated ? { width: 0 } : false}\r\n            animate={{ width: `${percentage}%` }}\r\n            transition={{ duration: 0.8, ease: \"easeOut\" }}\r\n            className={cn(\r\n              \"absolute inset-y-0 left-0 rounded-full\",\r\n              variant === \"gradient\"\r\n                ? \"bg-gradient-to-r from-liquid-blue via-liquid-purple to-liquid-pink\"\r\n                : \"bg-gradient-to-r from-liquid-blue/70 to-liquid-purple/70\"\r\n            )}\r\n          >\r\n            {/* Shimmer effect */}\r\n            {animated && (\r\n              <div\r\n                className=\"absolute inset-0 rounded-full\"\r\n                style={{\r\n                  background:\r\n                    \"linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)\",\r\n                  backgroundSize: \"200% 100%\",\r\n                  animation: \"shimmer 2s linear infinite\",\r\n                }}\r\n              />\r\n            )}\r\n          </motion.div>\r\n        </div>\r\n        {showValue && (\r\n          <span className=\"text-xs font-medium text-[var(--lg-text-secondary)] tabular-nums w-10 text-right\">\r\n            {Math.round(percentage)}%\r\n          </span>\r\n        )}\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"gradient\" | \"segmented\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "animated",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "radio-group",
    "name": "LiquidGlassRadioGroup",
    "file": "src/components/liquid-glass/LiquidGlassRadioGroup.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Radio group with glass selection indicators.",
    "usage": "<LiquidGlassRadioGroup />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidTapScale, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface RadioOption {\n  value: string;\n  label: string;\n  description?: string;\n  disabled?: boolean;\n}\n\ninterface LiquidGlassRadioGroupProps {\n  options: RadioOption[];\n  value?: string;\n  onChange?: (value: string) => void;\n  className?: string;\n  direction?: \"vertical\" | \"horizontal\";\n  size?: \"sm\" | \"md\" | \"lg\";\n}\n\nconst sizeStyles = {\n  sm: { outer: \"w-4 h-4\", inner: \"w-2 h-2\" },\n  md: { outer: \"w-5 h-5\", inner: \"w-2.5 h-2.5\" },\n  lg: { outer: \"w-6 h-6\", inner: \"w-3 h-3\" },\n};\n\nexport function LiquidGlassRadioGroup({\n  options,\n  value,\n  onChange,\n  className,\n  direction = \"vertical\",\n  size = \"md\",\n}: LiquidGlassRadioGroupProps) {\n  const tapScale = useLiquidTapScale();\n  const dotTransition = useLiquidTransition();\n  const s = sizeStyles[size];\n\n  return (\n    <div\n      className={cn(\n        \"flex\",\n        direction === \"vertical\" ? \"flex-col gap-3\" : \"flex-row flex-wrap gap-4\",\n        className\n      )}\n    >\n      {options.map((option) => {\n        const isSelected = value === option.value;\n        return (\n          <label\n            key={option.value}\n            className={cn(\n              \"flex items-start gap-3 cursor-pointer select-none\",\n              option.disabled && \"opacity-40 cursor-not-allowed\"\n            )}\n          >\n            <motion.div\n              whileTap={option.disabled ? {} : { scale: tapScale }}\n              onClick={() => !option.disabled && onChange?.(option.value)}\n              className={cn(\n                \"relative flex items-center justify-center flex-shrink-0 mt-0.5 rounded-full\",\n                \"glass-blur-sm border transition-all duration-200\",\n                s.outer,\n                isSelected\n                  ? \"bg-liquid-blue/20 border-liquid-blue/50\"\n                  : \"bg-[var(--lg-border-subtle)] border-[var(--lg-border-subtle)] hover:border-[var(--lg-border)]\"\n              )}\n            >\n              {/* Top highlight */}\n              <GlassTopHighlight className=\"inset-x-1 top-0.5\" opacity={0.2} />\n              {isSelected && (\n                <motion.div\n                  initial={{ scale: 0 }}\n                  animate={{ scale: 1 }}\n                  transition={dotTransition}\n                  className={cn(\n                    \"rounded-full bg-liquid-blue\",\n                    s.inner\n                  )}\n                />\n              )}\n            </motion.div>\n            <div className=\"flex-1 min-w-0\">\n              <span\n                className={cn(\n                  \"text-sm font-medium\",\n                  option.disabled ? \"text-[var(--lg-text-muted)]\" : \"text-[var(--lg-text-secondary)]\"\n                )}\n              >\n                {option.label}\n              </span>\n              {option.description && (\n                <p className=\"text-xs text-[var(--lg-text-muted)] mt-0.5\">{option.description}</p>\n              )}\n            </div>\n          </label>\n        );\n      })}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "options",
        "type": "RadioOption[]",
        "required": true,
        "description": ""
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "direction",
        "type": "\"vertical\" | \"horizontal\"",
        "required": false,
        "description": ""
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      }
    ]
  },
  {
    "id": "rating",
    "name": "LiquidGlassRating",
    "file": "src/components/liquid-glass/LiquidGlassRating.tsx",
    "category": "Feedback & Status",
    "description": "Star rating with half-star support.",
    "usage": "<LiquidGlassRating />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { Star } from \"lucide-react\";\r\nimport { useState } from \"react\";\r\n\r\ninterface LiquidGlassRatingProps {\r\n  value?: number;\r\n  max?: number;\r\n  onChange?: (value: number) => void;\r\n  className?: string;\r\n  size?: \"sm\" | \"md\" | \"lg\";\r\n  readonly?: boolean;\r\n  showValue?: boolean;\r\n}\r\n\r\nconst sizeMap = {\r\n  sm: 14,\r\n  md: 20,\r\n  lg: 28,\r\n};\r\n\r\nexport function LiquidGlassRating({\r\n  value = 0,\r\n  max = 5,\r\n  onChange,\r\n  className,\r\n  size = \"md\",\r\n  readonly = false,\r\n  showValue = false,\r\n}: LiquidGlassRatingProps) {\r\n  const [hoverValue, setHoverValue] = useState(0);\r\n  const displayValue = hoverValue || value;\r\n  const s = sizeMap[size];\r\n\r\n  return (\r\n    <div className={cn(\"inline-flex items-center gap-1\", className)}>\r\n      <div className=\"flex items-center gap-0.5\">\r\n        {Array.from({ length: max }).map((_, i) => {\r\n          const starValue = i + 1;\r\n          const filled = starValue <= displayValue;\r\n          const halfFilled = !filled && starValue - 0.5 <= displayValue;\r\n\r\n          return (\r\n            <motion.button\r\n              key={i}\r\n              whileHover={readonly ? {} : { scale: 1.2 }}\r\n              whileTap={readonly ? {} : { scale: 0.9 }}\r\n              onMouseEnter={() => !readonly && setHoverValue(starValue)}\r\n              onMouseLeave={() => !readonly && setHoverValue(0)}\r\n              onClick={() => !readonly && onChange?.(starValue)}\r\n              className={cn(\r\n                \"relative transition-colors\",\r\n                readonly ? \"cursor-default\" : \"cursor-pointer\"\r\n              )}\r\n            >\r\n              <Star\r\n                size={s}\r\n                className={cn(\r\n                  \"transition-colors\",\r\n                  filled\r\n                    ? \"text-liquid-amber fill-liquid-amber\"\r\n                    : halfFilled\r\n                    ? \"text-liquid-amber\"\r\n                    : \"text-[var(--lg-text-muted)]\"\r\n                )}\r\n              />\r\n              {halfFilled && (\r\n                <div className=\"absolute inset-0 overflow-hidden\" style={{ width: \"50%\" }}>\r\n                  <Star size={s} className=\"text-liquid-amber fill-liquid-amber\" />\r\n                </div>\r\n              )}\r\n            </motion.button>\r\n          );\r\n        })}\r\n      </div>\r\n      {showValue && (\r\n        <span className=\"ml-1.5 text-sm font-medium text-[var(--lg-text-muted)] tabular-nums\">\r\n          {value.toFixed(1)}\r\n        </span>\r\n      )}\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(value: number) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "resizable",
    "name": "LiquidGlassResizable",
    "file": "src/components/liquid-glass/LiquidGlassResizable.tsx",
    "category": "Layout & Surfaces",
    "description": "Resizable panel with drag handle.",
    "usage": "<LiquidGlassResizable />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { useState, useRef, useCallback, type ReactNode } from \"react\";\r\n\r\ninterface LiquidGlassResizableProps {\r\n  children: ReactNode;\r\n  className?: string;\r\n  defaultWidth?: number;\r\n  defaultHeight?: number;\r\n  minWidth?: number;\r\n  minHeight?: number;\r\n  direction?: \"horizontal\" | \"vertical\" | \"both\";\r\n}\r\n\r\nexport function LiquidGlassResizable({\r\n  children,\r\n  className,\r\n  defaultWidth = 300,\r\n  defaultHeight = 200,\r\n  minWidth = 150,\r\n  minHeight = 100,\r\n  direction = \"both\",\r\n}: LiquidGlassResizableProps) {\r\n  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });\r\n  const [isResizing, setIsResizing] = useState(false);\r\n  const startPos = useRef({ x: 0, y: 0 });\r\n  const startSize = useRef({ width: 0, height: 0 });\r\n\r\n  const startResize = useCallback(\r\n    (e: React.MouseEvent) => {\r\n      e.preventDefault();\r\n      setIsResizing(true);\r\n      startPos.current = { x: e.clientX, y: e.clientY };\r\n      startSize.current = { ...size };\r\n\r\n      const handleMove = (ev: MouseEvent) => {\r\n        const dx = ev.clientX - startPos.current.x;\r\n        const dy = ev.clientY - startPos.current.y;\r\n        setSize({\r\n          width: Math.max(minWidth, startSize.current.width + dx),\r\n          height: Math.max(minHeight, startSize.current.height + dy),\r\n        });\r\n      };\r\n\r\n      const handleUp = () => {\r\n        setIsResizing(false);\r\n        window.removeEventListener(\"mousemove\", handleMove);\r\n        window.removeEventListener(\"mouseup\", handleUp);\r\n      };\r\n\r\n      window.addEventListener(\"mousemove\", handleMove);\r\n      window.addEventListener(\"mouseup\", handleUp);\r\n    },\r\n    [size, minWidth, minHeight]\r\n  );\r\n\r\n  return (\r\n    <motion.div\r\n      className={cn(\r\n        \"relative rounded-2xl overflow-hidden\",\r\n        \"glass-blur-sm glass-surface glass-border\",\r\n        className\r\n      )}\r\n      style={{\r\n        width: direction !== \"vertical\" ? size.width : undefined,\r\n        height: direction !== \"horizontal\" ? size.height : undefined,\r\n      }}\r\n      animate={{ cursor: isResizing ? \"nwse-resize\" : \"default\" }}\r\n    >\r\n      <div className=\"p-4 overflow-auto h-full\">{children}</div>\r\n\r\n      {/* Resize handle */}\r\n      {(direction === \"both\" || direction === \"horizontal\") && (\r\n        <div\r\n          onMouseDown={startResize}\r\n          className={cn(\r\n            \"absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize\",\r\n            \"flex items-end justify-end p-0.5\"\r\n          )}\r\n        >\r\n          <svg width=\"8\" height=\"8\" viewBox=\"0 0 8 8\" className=\"text-[var(--lg-text-muted)]\">\r\n            <path d=\"M0 8L8 0M2 8L8 2M4 8L8 4\" stroke=\"currentColor\" strokeWidth=\"1\" fill=\"none\" />\r\n          </svg>\r\n        </div>\r\n      )}\r\n    </motion.div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "defaultWidth",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "defaultHeight",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "minWidth",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "minHeight",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "direction",
        "type": "\"horizontal\" | \"vertical\" | \"both\"",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "scroll-area",
    "name": "LiquidGlassScrollArea",
    "file": "src/components/liquid-glass/LiquidGlassScrollArea.tsx",
    "category": "Layout & Surfaces",
    "description": "Custom scrollbar scroll area.",
    "usage": "<LiquidGlassScrollArea />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { useState, useRef, useEffect, type ReactNode } from \"react\";\r\n\r\ninterface LiquidGlassScrollAreaProps {\r\n  children: ReactNode;\r\n  className?: string;\r\n  maxHeight?: string;\r\n  showScrollbar?: boolean;\r\n}\r\n\r\nexport function LiquidGlassScrollArea({\r\n  children,\r\n  className,\r\n  maxHeight = \"300px\",\r\n  showScrollbar = true,\r\n}: LiquidGlassScrollAreaProps) {\r\n  const [scrollProgress, setScrollProgress] = useState(0);\r\n  const [thumbHeight, setThumbHeight] = useState(30);\r\n  const contentRef = useRef<HTMLDivElement>(null);\r\n\r\n  useEffect(() => {\r\n    const el = contentRef.current;\r\n    if (!el) return;\r\n    const update = () => {\r\n      const { scrollTop, scrollHeight, clientHeight } = el;\r\n      const progress = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;\r\n      const thumb = Math.max(30, (clientHeight / scrollHeight) * clientHeight);\r\n      setScrollProgress(progress);\r\n      setThumbHeight(thumb);\r\n    };\r\n    el.addEventListener(\"scroll\", update);\r\n    update();\r\n    return () => el.removeEventListener(\"scroll\", update);\r\n  }, []);\r\n\r\n  return (\r\n    <div className={cn(\"relative overflow-hidden\", className)}>\r\n      <div\r\n        ref={contentRef}\r\n        className={cn(\r\n          \"overflow-y-auto overflow-x-hidden pr-2\",\r\n          showScrollbar && \"scrollbar-thin\"\r\n        )}\r\n        style={{ maxHeight }}\r\n      >\r\n        {children}\r\n      </div>\r\n      {showScrollbar && (\r\n        <div className=\"absolute right-1 top-2 bottom-2 w-1 rounded-full bg-[var(--lg-border-subtle)]\">\r\n          <motion.div\r\n            className=\"w-full rounded-full bg-[var(--lg-border)] hover:bg-[var(--lg-text-muted)] transition-colors\"\r\n            style={{\r\n              height: thumbHeight,\r\n              y: scrollProgress * (parseInt(maxHeight) - thumbHeight - 16),\r\n            }}\r\n          />\r\n        </div>\r\n      )}\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "maxHeight",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "showScrollbar",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "select",
    "name": "LiquidGlassSelect",
    "file": "src/components/liquid-glass/LiquidGlassSelect.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Dropdown select portaled to document.body for working blur.",
    "usage": "<LiquidGlassSelect />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useRef, useEffect, type CSSProperties } from \"react\";\nimport { ChevronDown, Check } from \"lucide-react\";\nimport { createPortal } from \"react-dom\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface SelectOption {\n  value: string;\n  label: string;\n  icon?: React.ReactNode;\n}\n\ninterface LiquidGlassSelectProps {\n  options: SelectOption[];\n  value?: string;\n  onChange?: (value: string) => void;\n  placeholder?: string;\n  className?: string;\n  label?: string;\n  disabled?: boolean;\n}\n\nexport function LiquidGlassSelect({\n  options,\n  value,\n  onChange,\n  placeholder = \"Select an option\",\n  className,\n  label,\n  disabled,\n}: LiquidGlassSelectProps) {\n  const tapScale = useLiquidTapScale();\n  const [isOpen, setIsOpen] = useState(false);\n  const [position, setPosition] = useState({ left: 0, top: 0, width: 0 });\n  const triggerRef = useRef<HTMLDivElement>(null);\n  const popoverRef = useRef<HTMLDivElement>(null);\n  const selected = options.find((o) => o.value === value);\n\n  const sheen = useGlassSurface({ variant: \"sheen\", opacity: 0.12 });\n  const topHighlight = useGlassSurface({ variant: \"highlight\", opacity: 0.30 });\n  const dropdownHighlight = useGlassSurface({ variant: \"highlight\", opacity: 0.20 });\n  const selectedFill = useGlassSurface({ variant: \"fill\", opacity: 0.10 });\n  const hoverFill = useGlassSurface({ variant: \"fill\", opacity: 0.06 });\n\n  const updatePosition = () => {\n    if (!triggerRef.current) return;\n    const rect = triggerRef.current.getBoundingClientRect();\n    setPosition({\n      left: rect.left,\n      top: rect.bottom + 8,\n      width: rect.width,\n    });\n  };\n\n  useEffect(() => {\n    const handleClick = (e: MouseEvent) => {\n      if (\n        triggerRef.current?.contains(e.target as Node) ||\n        popoverRef.current?.contains(e.target as Node)\n      ) {\n        return;\n      }\n      setIsOpen(false);\n    };\n    document.addEventListener(\"mousedown\", handleClick);\n    return () => document.removeEventListener(\"mousedown\", handleClick);\n  }, []);\n\n  const handleToggle = () => {\n    if (!isOpen) {\n      updatePosition();\n    }\n    setIsOpen((prev) => !prev);\n  };\n\n  const popoverNode = (\n    <AnimatePresence>\n      {isOpen && (\n        <motion.div\n          ref={popoverRef}\n          initial={{ opacity: 0, y: -8, scale: 0.96 }}\n          animate={{ opacity: 1, y: 0, scale: 1 }}\n          exit={{ opacity: 0, y: -8, scale: 0.96 }}\n          transition={{ duration: 0.15 }}\n          className={cn(\n            \"fixed z-[100] overflow-hidden\",\n            \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n            \"rounded-2xl py-1\"\n          )}\n          style={{\n            left: position.left,\n            top: position.top,\n            width: position.width,\n          }}\n        >\n          {/* Top highlight */}\n          <div className={dropdownHighlight.className} style={dropdownHighlight.style} />\n          {options.map((option) => (\n            <motion.button\n              key={option.value}\n              whileHover={{ x: 2 }}\n              onClick={() => {\n                onChange?.(option.value);\n                setIsOpen(false);\n              }}\n              className={cn(\n                \"flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors\",\n                value === option.value\n                  ? \"text-[var(--lg-text)] bg-[var(--selected-fill)]\"\n                  : \"text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] hover:bg-[var(--hover-fill)]\"\n              )}\n              style={{\n                \"--selected-fill\": selectedFill.style.background,\n                \"--hover-fill\": hoverFill.style.background,\n              } as CSSProperties}\n            >\n              {option.icon}\n              <span className=\"flex-1 text-left\">{option.label}</span>\n              {value === option.value && (\n                <Check size={14} className=\"text-liquid-blue\" />\n              )}\n            </motion.button>\n          ))}\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n\n  return (\n    <div ref={triggerRef} className={cn(\"relative w-full\", className)}>\n      {label && (\n        <label className=\"mb-1.5 block text-sm font-medium text-[var(--lg-text-secondary)]\">\n          {label}\n        </label>\n      )}\n      <motion.button\n        whileTap={{ scale: disabled ? 1 : tapScale }}\n        onClick={handleToggle}\n        className={cn(\n          \"relative flex w-full items-center justify-between gap-3 overflow-hidden\",\n          \"glass-blur glass-surface-strong glass-border glass-highlight\",\n          \"px-4 py-3 rounded-2xl text-left transition-all duration-200\",\n          \"focus:ring-2 focus:ring-white/20 focus:border-[var(--lg-border)]\",\n          disabled && \"opacity-50 cursor-not-allowed\"\n        )}\n      >\n        {/* Top highlight */}\n        <div className={cn(topHighlight.className, \"inset-x-4\")} style={topHighlight.style} />\n        {/* Reflection blob */}\n        <div className=\"pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full glass-reflection blur-2xl\" />\n        {/* Sheen */}\n        <div className={sheen.className} style={sheen.style} />\n\n        <div className=\"relative z-10 flex items-center gap-2 min-w-0\">\n          {selected?.icon}\n          <span className={cn(\"truncate\", !selected && \"text-[var(--lg-text-muted)]\")}>\n            {selected?.label || placeholder}\n          </span>\n        </div>\n        <motion.div\n          animate={{ rotate: isOpen ? 180 : 0 }}\n          transition={{ duration: 0.2 }}\n          className=\"relative z-10 flex-shrink-0 text-[var(--lg-text-muted)]\"\n        >\n          <ChevronDown size={16} />\n        </motion.div>\n      </motion.button>\n      {createPortal(popoverNode, document.body)}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "options",
        "type": "SelectOption[]",
        "required": true,
        "description": ""
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder text."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label text."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the component is disabled."
      }
    ]
  },
  {
    "id": "sheet",
    "name": "LiquidGlassSheet",
    "file": "src/components/liquid-glass/LiquidGlassSheet.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Bottom sheet with default, compact, full, inset, and detached variants.",
    "usage": "<LiquidGlassSheet />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { useLiquidSlideVariants, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface LiquidGlassSheetProps {\n  isOpen: boolean;\n  onClose: () => void;\n  children: ReactNode;\n  className?: string;\n  title?: string;\n  maxHeight?: string;\n  variant?: \"default\" | \"compact\" | \"full\" | \"inset\" | \"detached\";\n}\n\nexport function LiquidGlassSheet({\n  isOpen,\n  onClose,\n  children,\n  className,\n  title,\n  maxHeight = \"70vh\",\n  variant = \"default\",\n}: LiquidGlassSheetProps) {\n  const isFullScreen = variant === \"full\";\n  const isDetached = variant === \"detached\";\n  const isInset = variant === \"inset\";\n  const isCompact = variant === \"compact\";\n  const slideVariants = useLiquidSlideVariants(\"bottom\");\n  const transition = useLiquidTransition();\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className={cn(\n          \"fixed inset-0 z-50 flex items-end justify-center\",\n          isDetached && \"p-4\",\n          isInset && \"p-3\"\n        )}>\n          {/* Backdrop */}\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.2 }}\n            onClick={onClose}\n            className=\"glass-backdrop-overlay\"\n          />\n          {/* Sheet */}\n          <motion.div\n            {...slideVariants}\n            transition={transition}\n            className={cn(\n              \"relative w-full overflow-hidden\",\n              \"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong\",\n              isFullScreen ? \"h-full rounded-none\" :\n              isDetached ? \"max-w-lg mx-auto rounded-3xl\" :\n              isInset ? \"max-w-lg mx-auto rounded-3xl\" :\n              isCompact ? \"max-w-lg mx-auto rounded-t-3xl\" :\n              \"max-w-lg mx-auto rounded-t-3xl\",\n              className\n            )}\n            style={isFullScreen ? undefined : { maxHeight }}\n          >\n            {/* Handle bar */}\n            {!isFullScreen && (\n              <div className=\"flex justify-center pt-3 pb-1\">\n                <div className=\"w-10 h-1 rounded-full bg-[var(--lg-border)]\" />\n              </div>\n            )}\n            {/* Top highlight */}\n            <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n            <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl\" />\n\n            {title && (\n              <div className=\"px-6 pt-2 pb-3\">\n                <h3 className=\"text-lg font-semibold text-[var(--lg-text)] text-center\">{title}</h3>\n              </div>\n            )}\n            <div className={cn(\n              \"overflow-y-auto\",\n              isCompact ? \"px-6 pb-6\" : \"px-6 pb-8\"\n            )}>{children}</div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "maxHeight",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "variant",
        "type": "\"default\" | \"compact\" | \"full\" | \"inset\" | \"detached\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "skeleton",
    "name": "LiquidGlassSkeleton",
    "file": "src/components/liquid-glass/LiquidGlassSkeleton.tsx",
    "category": "Feedback & Status",
    "description": "Loading placeholder with shimmer animation.",
    "usage": "<LiquidGlassSkeleton />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface LiquidGlassSkeletonProps {\n  className?: string;\n  variant?: \"text\" | \"circular\" | \"rectangular\" | \"rounded\";\n  width?: string | number;\n  height?: string | number;\n  lines?: number;\n  animate?: boolean;\n}\n\nexport function LiquidGlassSkeleton({\n  className,\n  variant = \"text\",\n  width,\n  height,\n  lines = 1,\n  animate = true,\n}: LiquidGlassSkeletonProps) {\n  const fill = useGlassSurface({ variant: \"fill\", opacity: 0.05 });\n  const shimmerFill = useGlassSurface({ variant: \"fill\", opacity: 0.05 });\n  const baseClasses = cn(\n    \"\",\n    animate && \"animate-pulse\",\n    variant === \"circular\" && \"rounded-full\",\n    variant === \"rectangular\" && \"rounded-none\",\n    variant === \"rounded\" && \"rounded-xl\",\n    variant === \"text\" && \"rounded-md\",\n    className\n  );\n\n  const style: React.CSSProperties = {\n    width: width,\n    height: height,\n    background: fill.style.background,\n  };\n\n  if (lines > 1 && variant === \"text\") {\n    return (\n      <div className=\"space-y-2\">\n        {Array.from({ length: lines }).map((_, i) => (\n          <div\n            key={i}\n            className={cn(baseClasses, i === lines - 1 && \"w-3/4\")}\n            style={{\n              ...style,\n              width: i === lines - 1 ? \"75%\" : width,\n              height: height || 12,\n            }}\n          />\n        ))}\n      </div>\n    );\n  }\n\n  return (\n    <div\n      className={cn(baseClasses, \"relative overflow-hidden\")}\n      style={{\n        ...style,\n        height: height || (variant === \"text\" ? 12 : undefined),\n        width: width || (variant === \"text\" ? \"100%\" : undefined),\n      }}\n    >\n      {animate && (\n        <div\n          className=\"absolute inset-0\"\n          style={{\n            background: `linear-gradient(90deg, transparent, ${shimmerFill.style.background}, transparent)`,\n            backgroundSize: \"200% 100%\",\n            animation: \"shimmer 1.5s linear infinite\",\n          }}\n        />\n      )}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"text\" | \"circular\" | \"rectangular\" | \"rounded\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "width",
        "type": "string | number",
        "required": false,
        "description": ""
      },
      {
        "name": "height",
        "type": "string | number",
        "required": false,
        "description": ""
      },
      {
        "name": "lines",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "animate",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "slider",
    "name": "LiquidGlassSlider",
    "file": "src/components/liquid-glass/LiquidGlassSlider.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Range slider with a stretching liquid-glass thumb.",
    "usage": "<LiquidGlassSlider />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport {\n  useState,\n  useRef,\n  useCallback,\n  useMemo,\n} from \"react\";\nimport { useTheme } from \"./ThemeProvider\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useGlassFluidity } from \"./useGlassFluidity\";\nimport { GlassSheen } from \"./GlassSheen\";\n\ninterface LiquidGlassSliderProps {\n  value?: number;\n  min?: number;\n  max?: number;\n  step?: number;\n  onChange?: (value: number) => void;\n  className?: string;\n  showValue?: boolean;\n  disabled?: boolean;\n  label?: string;\n  valueFormatter?: (value: number) => string;\n}\n\nexport function LiquidGlassSlider({\n  value = 50,\n  min = 0,\n  max = 100,\n  step = 1,\n  onChange,\n  className,\n  showValue = true,\n  disabled,\n  label,\n  valueFormatter,\n}: LiquidGlassSliderProps) {\n  const [isDragging, setIsDragging] = useState(false);\n  const trackRef = useRef<HTMLDivElement>(null);\n  const { isDark } = useTheme();\n  const fluidity = useGlassFluidity();\n  const thumbSurface = useGlassSurface({ variant: \"thumb\" });\n  const trackFillSurface = useGlassSurface({ variant: \"track-active\", tint: \"#3b82f6\", activeTint: \"#8b5cf6\" });\n\n  const percentage = ((value - min) / (max - min)) * 100;\n\n  // Snappy spring tuned by the global fluidity control.\n  const spring = useMemo(() => {\n    const stiffness = 720 - fluidity * 3.6;\n    const damping = 46 - fluidity * 0.2;\n    return { stiffness, damping };\n  }, [fluidity]);\n\n  // iOS 26 liquid-glass thumb: a stadium/lozenge that stretches while dragging.\n  const thumb = 20;\n  const widthRatio = 1.4;\n  const idleWidth = thumb * widthRatio;\n\n  const thumbWidth = isDragging ? idleWidth * 1.65 : idleWidth;\n  const scaleY = isDragging ? 1.18 : 1;\n\n  const handleMove = useCallback(\n    (clientX: number) => {\n      if (!trackRef.current || disabled) return;\n      const rect = trackRef.current.getBoundingClientRect();\n      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));\n      const pct = x / rect.width;\n      const raw = min + pct * (max - min);\n      const stepped = Math.round(raw / step) * step;\n      onChange?.(Math.max(min, Math.min(max, stepped)));\n    },\n    [min, max, step, onChange, disabled]\n  );\n\n  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {\n    if (disabled) return;\n    setIsDragging(true);\n    handleMove(e.clientX);\n\n    const handleMouseMove = (ev: MouseEvent) => handleMove(ev.clientX);\n    const handleMouseUp = () => {\n      setIsDragging(false);\n      window.removeEventListener(\"mousemove\", handleMouseMove);\n      window.removeEventListener(\"mouseup\", handleMouseUp);\n    };\n    window.addEventListener(\"mousemove\", handleMouseMove);\n    window.addEventListener(\"mouseup\", handleMouseUp);\n  };\n\n  return (\n    <div className={cn(\"w-full\", className)}>\n      <div className=\"flex items-center justify-between mb-2\">\n        {label ? (\n          <>\n            <span className=\"text-xs font-medium text-[var(--lg-text-secondary)]\">\n              {label}\n            </span>\n            <span className=\"text-xs tabular-nums text-[var(--lg-text-muted)]\">\n              {valueFormatter ? valueFormatter(value) : value}\n            </span>\n          </>\n        ) : (\n          <>\n            {showValue && (\n              <span\n                className={cn(\n                  \"text-xs font-medium\",\n                  isDark ? \"text-[var(--lg-text-muted)]\" : \"text-black/40\"\n                )}\n              >\n                {min}\n              </span>\n            )}\n            {showValue && (\n              <motion.span\n                key={value}\n                initial={{ scale: 1.2 }}\n                animate={{ scale: 1 }}\n                className={cn(\n                  \"text-xs font-semibold tabular-nums\",\n                  isDark ? \"text-[var(--lg-text-secondary)]\" : \"text-black/70\"\n                )}\n              >\n                {value}\n              </motion.span>\n            )}\n          </>\n        )}\n      </div>\n      <div\n        ref={trackRef}\n        onMouseDown={handleMouseDown}\n        className={cn(\n          \"relative h-2 rounded-full cursor-pointer overflow-visible\",\n          \"glass-blur-sm glass-surface-dark border\",\n          isDark ? \"border-[var(--lg-border-subtle)]\" : \"border-black/5\",\n          disabled && \"cursor-not-allowed opacity-50\"\n        )}\n      >\n        {/* Filled track */}\n        <motion.div\n          className=\"absolute inset-y-0 left-0 rounded-full\"\n          style={{ width: `${percentage}%`, background: trackFillSurface.style.background }}\n          animate={{ width: `${percentage}%` }}\n          transition={{ type: \"spring\", stiffness: 300, damping: 30 }}\n        />\n\n        {/* Thumb — liquid-glass stadium/lozenge that stretches on drag. */}\n        <motion.div\n          initial={{ width: idleWidth, scaleY: 1 }}\n          animate={{\n            left: `${percentage}%`,\n            width: thumbWidth,\n            scaleY,\n          }}\n          transition={{\n            left: {\n              type: \"spring\",\n              stiffness: spring.stiffness,\n              damping: spring.damping,\n              mass: 0.45,\n            },\n            width: {\n              type: \"spring\",\n              stiffness: spring.stiffness,\n              damping: spring.damping,\n              mass: 0.45,\n            },\n            scaleY: {\n              type: \"spring\",\n              stiffness: spring.stiffness,\n              damping: spring.damping,\n              mass: 0.45,\n            },\n          }}\n          className={cn(\n            \"absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full z-10 pointer-events-none\",\n            thumbSurface.className\n          )}\n          style={{\n            left: `${percentage}%`,\n            height: thumb,\n            ...thumbSurface.style,\n          }}\n        >\n          {/* Reflection response */}\n          <div className=\"absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none\" />\n\n          {/* Subtle specular sheen */}\n          <GlassSheen className=\"rounded-full\" opacity={0.18} />\n        </motion.div>\n      </div>\n      {!label && showValue && (\n        <span\n          className={cn(\n            \"block text-right text-xs font-medium mt-1\",\n            isDark ? \"text-[var(--lg-text-muted)]\" : \"text-black/40\"\n          )}\n        >\n          {max}\n        </span>\n      )}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(value: number) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the component is disabled."
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label text."
      },
      {
        "name": "valueFormatter",
        "type": "(value: number) => string",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "stat-card",
    "name": "LiquidGlassStatCard",
    "file": "src/components/liquid-glass/LiquidGlassStatCard.tsx",
    "category": "Data Display",
    "description": "Grid of stat cards with change indicators.",
    "usage": "<LiquidGlassStatCard />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { TrendingUp, TrendingDown, Minus } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface StatData {\n  label: string;\n  value: string | number;\n  change?: number;\n  changeLabel?: string;\n  icon?: React.ReactNode;\n  iconColor?: string;\n  iconBg?: string;\n}\n\ninterface LiquidGlassStatCardProps {\n  stats: StatData[];\n  className?: string;\n  columns?: number;\n}\n\nexport function LiquidGlassStatCard({\n  stats,\n  className,\n  columns = 4,\n}: LiquidGlassStatCardProps) {\n  const colClass =\n    columns === 2\n      ? \"grid-cols-2\"\n      : columns === 3\n      ? \"grid-cols-3\"\n      : \"grid-cols-2 md:grid-cols-4\";\n\n  return (\n    <div className={cn(\"grid gap-4\", colClass, className)}>\n      {stats.map((stat, i) => {\n        const isPositive = stat.change && stat.change > 0;\n        const isNegative = stat.change && stat.change < 0;\n        const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;\n        const trendColor = isPositive\n          ? \"text-liquid-emerald\"\n          : isNegative\n          ? \"text-liquid-rose\"\n          : \"text-[var(--lg-text-muted)]\";\n\n        return (\n          <motion.div\n            key={i}\n            initial={{ opacity: 0, y: 20 }}\n            animate={{ opacity: 1, y: 0 }}\n            transition={{ delay: i * 0.08 }}\n            className={cn(\n              \"relative p-4 rounded-2xl overflow-hidden\",\n              \"glass-blur-sm glass-surface glass-border glass-highlight\"\n            )}\n          >\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.15} />\n\n            <div className=\"flex items-start justify-between mb-3\">\n              {stat.icon && (\n                <div\n                  className={cn(\n                    \"flex h-9 w-9 items-center justify-center rounded-xl\",\n                    stat.iconBg || \"bg-[var(--lg-border-subtle)]\"\n                  )}\n                >\n                  <span className={stat.iconColor || \"text-[var(--lg-text-muted)]\"}>{stat.icon}</span>\n                </div>\n              )}\n              {stat.change !== undefined && (\n                <div className={cn(\"flex items-center gap-0.5 text-xs font-medium\", trendColor)}>\n                  <TrendIcon size={12} />\n                  <span>{Math.abs(stat.change)}%</span>\n                </div>\n              )}\n            </div>\n\n            <p className=\"text-2xl font-bold text-[var(--lg-text)]\">{stat.value}</p>\n            <p className=\"text-xs text-[var(--lg-text-muted)] mt-1\">{stat.label}</p>\n            {stat.changeLabel && (\n              <p className=\"text-[10px] text-[var(--lg-text-muted)] mt-0.5\">{stat.changeLabel}</p>\n            )}\n          </motion.div>\n        );\n      })}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "stats",
        "type": "StatData[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "columns",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "stepper",
    "name": "LiquidGlassStepper",
    "file": "src/components/liquid-glass/LiquidGlassStepper.tsx",
    "category": "Data Display",
    "description": "Horizontal or vertical stepper.",
    "usage": "<LiquidGlassStepper />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { Check } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface Step {\n  label: string;\n  description?: string;\n  icon?: React.ReactNode;\n}\n\ninterface LiquidGlassStepperProps {\n  steps: Step[];\n  currentStep: number;\n  className?: string;\n  orientation?: \"horizontal\" | \"vertical\";\n}\n\nexport function LiquidGlassStepper({\n  steps,\n  currentStep,\n  className,\n  orientation = \"horizontal\",\n}: LiquidGlassStepperProps) {\n  const isHorizontal = orientation === \"horizontal\";\n\n  return (\n    <div\n      className={cn(\n        isHorizontal ? \"flex items-start\" : \"flex flex-col\",\n        className\n      )}\n    >\n      {steps.map((step, i) => {\n        const isCompleted = i < currentStep;\n        const isCurrent = i === currentStep;\n\n        return (\n          <div\n            key={i}\n            className={cn(\n              \"relative flex\",\n              isHorizontal ? \"flex-1 flex-col items-center\" : \"flex-row items-start gap-4 flex-1\"\n            )}\n          >\n            {/* Connector line */}\n            {i < steps.length - 1 && (\n              <div\n                className={cn(\n                  \"absolute bg-[var(--lg-border)]\",\n                  isHorizontal\n                    ? \"top-4 left-1/2 right-0 h-px\"\n                    : \"top-10 left-5 w-px bottom-0\"\n                )}\n              >\n                <motion.div\n                  initial={false}\n                  animate={{\n                    scaleX: isHorizontal ? (isCompleted ? 1 : 0) : undefined,\n                    scaleY: !isHorizontal ? (isCompleted ? 1 : 0) : undefined,\n                  }}\n                  transition={{ duration: 0.4, ease: \"easeOut\" }}\n                  className={cn(\n                    \"absolute bg-liquid-blue/50 origin-left\",\n                    isHorizontal ? \"inset-y-0 left-0\" : \"inset-x-0 top-0\"\n                  )}\n                />\n              </div>\n            )}\n\n            {/* Step circle */}\n            <motion.div\n              animate={{\n                scale: isCurrent ? 1.1 : 1,\n              }}\n              className={cn(\n                \"relative z-10 flex items-center justify-center rounded-full\",\n                \"glass-blur-sm border transition-all duration-300\",\n                isCompleted\n                  ? \"bg-liquid-blue/20 border-liquid-blue/40 text-liquid-blue\"\n                  : isCurrent\n                  ? \"bg-[var(--lg-border)] border-[var(--lg-border)] text-[var(--lg-text)]\"\n                  : \"bg-[var(--lg-border-subtle)] border-[var(--lg-border-subtle)] text-[var(--lg-text-muted)]\",\n                isHorizontal ? \"w-8 h-8\" : \"w-10 h-10 flex-shrink-0\"\n              )}\n            >\n              {/* Top highlight */}\n              <GlassTopHighlight className=\"inset-x-2 top-0.5\" opacity={0.2} />\n              {isCompleted ? (\n                <Check size={isHorizontal ? 14 : 16} strokeWidth={3} />\n              ) : (\n                step.icon || <span className=\"text-xs font-semibold\">{i + 1}</span>\n              )}\n            </motion.div>\n\n            {/* Labels */}\n            <div\n              className={cn(\n                \"mt-2 text-center\",\n                !isHorizontal && \"mt-1 text-left flex-1\"\n              )}\n            >\n              <p\n                className={cn(\n                  \"text-sm font-medium\",\n                  isCompleted || isCurrent ? \"text-[var(--lg-text-secondary)]\" : \"text-[var(--lg-text-muted)]\"\n                )}\n              >\n                {step.label}\n              </p>\n              {step.description && (\n                <p className=\"text-xs text-[var(--lg-text-muted)] mt-0.5\">{step.description}</p>\n              )}\n            </div>\n          </div>\n        );\n      })}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "steps",
        "type": "Step[]",
        "required": true,
        "description": ""
      },
      {
        "name": "currentStep",
        "type": "number",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "surface",
    "name": "LiquidGlassSurface",
    "file": "src/components/liquid-glass/LiquidGlassSurface.tsx",
    "category": "Layout & Surfaces",
    "description": "Liquid Glass Surface component.",
    "usage": "<LiquidGlassSurface />",
    "sourceCode": "import { useRef, type ReactNode } from \"react\";\nimport { motion } from \"framer-motion\";\nimport { cn } from \"../../utils/cn\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface LiquidGlassSurfaceProps {\n  children: ReactNode;\n  className?: string;\n  borderRadius?: number;\n}\n\nexport function LiquidGlassSurface({\n  children,\n  className,\n  borderRadius = 24,\n}: LiquidGlassSurfaceProps) {\n  const ref = useRef<HTMLDivElement>(null);\n\n  // surface-lg uses the full kube filter in liquid-glass mode, so the Blur\n  // slider and the shared transparency system apply consistently.\n  const surface = useGlassSurface({ variant: \"surface-lg\" });\n\n  return (\n    <motion.div\n      ref={ref}\n      initial={{ opacity: 0, scale: 0.96 }}\n      animate={{ opacity: 1, scale: 1 }}\n      transition={{ duration: 0.6, delay: 0.1 }}\n      className={cn(surface.className, className)}\n      style={{ ...surface.style, borderRadius }}\n    >\n      {/* Top sheen */}\n      <div\n        className=\"pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full z-20\"\n        style={{ borderRadius }}\n      />\n\n      {/* Rim specular highlight overlay */}\n      <div\n        className=\"pointer-events-none absolute inset-0 z-0\"\n        style={{\n          borderRadius,\n          boxShadow:\n            \"inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)\",\n        }}\n      />\n\n      <div className=\"relative z-10 h-full\">{children}</div>\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "borderRadius",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "tab-bar",
    "name": "LiquidGlassTabBar",
    "file": "src/components/liquid-glass/LiquidGlassTabBar.tsx",
    "category": "Navigation",
    "description": "Tab bar with default, pills, and underline variants.",
    "usage": "<LiquidGlassTabBar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface TabItem {\n  label: string;\n  icon?: ReactNode;\n  badge?: number;\n}\n\ninterface LiquidGlassTabBarProps {\n  tabs: TabItem[];\n  activeIndex: number;\n  onChange: (index: number) => void;\n  className?: string;\n  variant?: \"default\" | \"pills\" | \"underline\";\n}\n\nexport function LiquidGlassTabBar({\n  tabs,\n  activeIndex,\n  onChange,\n  className,\n  variant = \"default\",\n}: LiquidGlassTabBarProps) {\n  const transition = useLiquidTransition();\n  const thumbSurface = useGlassSurface({ variant: \"thumb\" });\n  if (variant === \"pills\") {\n    return (\n      <div\n        className={cn(\n          \"relative inline-flex p-1 rounded-2xl\",\n          \"glass-blur-sm glass-surface-dark glass-border\",\n          className\n        )}\n      >\n        {tabs.map((tab, i) => (\n          <motion.button\n            key={i}\n            onClick={() => onChange(i)}\n            className={cn(\n              \"relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors z-10\",\n              activeIndex === i ? \"text-[var(--lg-text)]\" : \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n            )}\n          >\n            {activeIndex === i && (\n              <motion.div\n                layoutId=\"tab-pill\"\n                className=\"absolute inset-0 rounded-xl glass-blur-lg pointer-events-none overflow-hidden\"\n                transition={transition}\n                style={thumbSurface.style}\n              >\n                <div className=\"absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none\" />\n                <GlassSheen className=\"rounded-xl\" opacity={0.18} />\n              </motion.div>\n            )}\n            <span className=\"relative flex items-center gap-2\">\n              {tab.icon}\n              {tab.label}\n            </span>\n          </motion.button>\n        ))}\n      </div>\n    );\n  }\n\n  if (variant === \"underline\") {\n    return (\n      <div className={cn(\"relative flex border-b border-[var(--lg-border-subtle)]\", className)}>\n        {tabs.map((tab, i) => (\n          <motion.button\n            key={i}\n            onClick={() => onChange(i)}\n            className={cn(\n              \"relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors\",\n              activeIndex === i ? \"text-[var(--lg-text)]\" : \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n            )}\n          >\n            {tab.icon}\n            {tab.label}\n            {activeIndex === i && (\n              <motion.div\n                layoutId=\"tab-underline\"\n                className=\"absolute bottom-0 left-2 right-2 h-1.5 rounded-full glass-blur-lg pointer-events-none overflow-hidden\"\n                transition={transition}\n                style={thumbSurface.style}\n              >\n                <div className=\"absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none\" />\n                <GlassSheen className=\"rounded-full\" opacity={0.18} />\n              </motion.div>\n            )}\n          </motion.button>\n        ))}\n      </div>\n    );\n  }\n\n  return (\n    <div\n      className={cn(\n        \"relative flex\",\n        \"glass-blur-sm glass-surface glass-border rounded-2xl overflow-hidden\",\n        className\n      )}\n    >\n      {tabs.map((tab, i) => (\n        <motion.button\n          key={i}\n          onClick={() => onChange(i)}\n          className={cn(\n            \"relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors\",\n            activeIndex === i ? \"text-[var(--lg-text)]\" : \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n          )}\n        >\n          {activeIndex === i && (\n            <motion.div\n              layoutId=\"tab-default\"\n              className=\"absolute inset-0.5 rounded-xl glass-blur-lg pointer-events-none overflow-hidden\"\n              transition={transition}\n              style={thumbSurface.style}\n            >\n              <div className=\"absolute inset-0 rounded-xl glass-reflection mix-blend-soft-light pointer-events-none\" />\n              <GlassSheen className=\"rounded-xl\" opacity={0.18} />\n            </motion.div>\n          )}\n          <span className=\"relative flex items-center gap-2\">\n            {tab.icon}\n            {tab.label}\n          </span>\n        </motion.button>\n      ))}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "tabs",
        "type": "TabItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "activeIndex",
        "type": "number",
        "required": true,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(index: number) => void",
        "required": true,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"pills\" | \"underline\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "table",
    "name": "LiquidGlassTable",
    "file": "src/components/liquid-glass/LiquidGlassTable.tsx",
    "category": "Data Display",
    "description": "Sortable data table with glass styling.",
    "usage": "<LiquidGlassTable />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { ArrowUpDown, ArrowUp, ArrowDown } from \"lucide-react\";\r\nimport { useState } from \"react\";\r\n\r\ninterface TableColumn<T> {\r\n  key: string;\r\n  header: React.ReactNode;\r\n  width?: string;\r\n  sortable?: boolean;\r\n  render?: (row: T) => React.ReactNode;\r\n}\r\n\r\ninterface LiquidGlassTableProps<T> {\r\n  columns: TableColumn<T>[];\r\n  data: T[];\r\n  className?: string;\r\n  rowKey: (row: T) => string;\r\n  onRowClick?: (row: T) => void;\r\n  sortable?: boolean;\r\n}\r\n\r\ntype SortState = { key: string; direction: \"asc\" | \"desc\" } | null;\r\n\r\nexport function LiquidGlassTable<T extends Record<string, unknown>>({\r\n  columns,\r\n  data,\r\n  className,\r\n  rowKey,\r\n  onRowClick,\r\n  sortable = true,\r\n}: LiquidGlassTableProps<T>) {\r\n  const [sort, setSort] = useState<SortState>(null);\r\n\r\n  const sorted = sort\r\n    ? [...data].sort((a, b) => {\r\n        const aVal = String(a[sort.key] ?? \"\");\r\n        const bVal = String(b[sort.key] ?? \"\");\r\n        return sort.direction === \"asc\"\r\n          ? aVal.localeCompare(bVal)\r\n          : bVal.localeCompare(aVal);\r\n      })\r\n    : data;\r\n\r\n  const toggleSort = (key: string) => {\r\n    if (!sortable) return;\r\n    setSort((prev) => {\r\n      if (prev?.key === key) {\r\n        return prev.direction === \"asc\" ? { key, direction: \"desc\" } : null;\r\n      }\r\n      return { key, direction: \"asc\" };\r\n    });\r\n  };\r\n\r\n  const SortIcon = ({ colKey }: { colKey: string }) => {\r\n    if (!sortable || sort?.key !== colKey) return <ArrowUpDown size={12} className=\"text-[var(--lg-text-muted)]\" />;\r\n    return sort.direction === \"asc\" ? (\r\n      <ArrowUp size={12} className=\"text-liquid-blue\" />\r\n    ) : (\r\n      <ArrowDown size={12} className=\"text-liquid-blue\" />\r\n    );\r\n  };\r\n\r\n  return (\r\n    <div className={cn(\"overflow-hidden rounded-2xl glass-blur-sm glass-surface glass-border\", className)}>\r\n      <div className=\"overflow-x-auto\">\r\n        <table className=\"w-full\">\r\n          <thead>\r\n            <tr className=\"border-b border-[var(--lg-border-subtle)]\">\r\n              {columns.map((col) => (\r\n                <th\r\n                  key={col.key}\r\n                  style={{ width: col.width }}\r\n                  onClick={() => col.sortable && toggleSort(col.key)}\r\n                  className={cn(\r\n                    \"px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]\",\r\n                    col.sortable && sortable && \"cursor-pointer hover:text-[var(--lg-text-secondary)] select-none\"\r\n                  )}\r\n                >\r\n                  <div className=\"flex items-center gap-1.5\">\r\n                    {col.header}\r\n                    {col.sortable && sortable && <SortIcon colKey={col.key} />}\r\n                  </div>\r\n                </th>\r\n              ))}\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            {sorted.map((row, i) => (\r\n              <motion.tr\r\n                key={rowKey(row)}\r\n                initial={{ opacity: 0, y: 8 }}\r\n                animate={{ opacity: 1, y: 0 }}\r\n                transition={{ delay: i * 0.03 }}\r\n                onClick={() => onRowClick?.(row)}\r\n                className={cn(\r\n                  \"border-b border-[var(--lg-border-subtle)] transition-colors\",\r\n                  onRowClick && \"cursor-pointer hover:bg-[var(--lg-border-subtle)]\",\r\n                  i === sorted.length - 1 && \"border-b-0\"\r\n                )}\r\n              >\r\n                {columns.map((col) => (\r\n                  <td key={col.key} className=\"px-4 py-3 text-sm text-[var(--lg-text-secondary)]\">\r\n                    {col.render ? col.render(row) : String(row[col.key] ?? \"-\")}\r\n                  </td>\r\n                ))}\r\n              </motion.tr>\r\n            ))}\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n",
    "props": []
  },
  {
    "id": "timeline",
    "name": "LiquidGlassTimeline",
    "file": "src/components/liquid-glass/LiquidGlassTimeline.tsx",
    "category": "Data Display",
    "description": "Vertical timeline component.",
    "usage": "<LiquidGlassTimeline />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { useGlassSurface } from \"./useGlassSurface\";\n\ninterface TimelineItem {\n  id: string;\n  title: string;\n  description?: string;\n  timestamp?: string;\n  icon?: React.ReactNode;\n  color?: \"blue\" | \"purple\" | \"emerald\" | \"amber\" | \"rose\" | \"cyan\";\n}\n\ninterface LiquidGlassTimelineProps {\n  items: TimelineItem[];\n  className?: string;\n}\n\nconst colorMap = {\n  blue: \"bg-liquid-blue\",\n  purple: \"bg-liquid-purple\",\n  emerald: \"bg-liquid-emerald\",\n  amber: \"bg-liquid-amber\",\n  rose: \"bg-liquid-rose\",\n  cyan: \"bg-liquid-cyan\",\n};\n\nexport function LiquidGlassTimeline({\n  items,\n  className,\n}: LiquidGlassTimelineProps) {\n  const dotFill = useGlassSurface({ variant: \"fill\", opacity: 0.4 });\n  return (\n    <div className={cn(\"relative\", className)}>\n      {/* Vertical line */}\n      <div className=\"absolute left-4 top-2 bottom-2 w-px bg-[var(--lg-border)]\" />\n\n      <div className=\"space-y-6\">\n        {items.map((item, i) => (\n          <motion.div\n            key={item.id}\n            initial={{ opacity: 0, x: -10 }}\n            animate={{ opacity: 1, x: 0 }}\n            transition={{ delay: i * 0.1 }}\n            className=\"relative flex items-start gap-4\"\n          >\n            {/* Dot */}\n            <div\n              className={cn(\n                \"relative z-10 flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0\",\n                \"glass-blur-sm glass-border\",\n                item.color ? colorMap[item.color] + \"/20\" : \"bg-[var(--lg-border-subtle)]\"\n              )}\n            >\n              <div\n                className={cn(\n                  \"h-2.5 w-2.5 rounded-full\",\n                  item.color ? colorMap[item.color] : \"\"\n                )}\n                style={item.color ? undefined : { background: dotFill.style.background }}\n              />\n              {item.icon && (\n                <span className=\"absolute text-[var(--lg-text-secondary)]\">{item.icon}</span>\n              )}\n            </div>\n\n            {/* Content */}\n            <div className=\"flex-1 min-w-0 pt-1\">\n              <div className=\"flex items-center justify-between gap-2\">\n                <h4 className=\"text-sm font-medium text-[var(--lg-text-secondary)]\">{item.title}</h4>\n                {item.timestamp && (\n                  <span className=\"text-xs text-[var(--lg-text-muted)] flex-shrink-0\">{item.timestamp}</span>\n                )}\n              </div>\n              {item.description && (\n                <p className=\"text-xs text-[var(--lg-text-muted)] mt-1 leading-relaxed\">{item.description}</p>\n              )}\n            </div>\n          </motion.div>\n        ))}\n      </div>\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "items",
        "type": "TimelineItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "toast",
    "name": "LiquidGlassToast",
    "file": "src/components/liquid-glass/LiquidGlassToast.tsx",
    "category": "Feedback & Status",
    "description": "Stacked toast notifications with progress bars.",
    "usage": "<LiquidGlassToast />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { X, CheckCircle, AlertTriangle, Info, AlertCircle } from \"lucide-react\";\nimport { useEffect, useState } from \"react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidTapScale, useLiquidTransition } from \"./useLiquidMotion\";\n\nexport interface ToastItem {\n  id: string;\n  message: string;\n  variant?: \"info\" | \"success\" | \"warning\" | \"error\";\n  duration?: number;\n}\n\ninterface LiquidGlassToastProps {\n  toasts: ToastItem[];\n  onRemove: (id: string) => void;\n  position?: \"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\" | \"top-center\" | \"bottom-center\";\n}\n\nconst positionStyles = {\n  \"top-right\": \"top-4 right-4\",\n  \"top-left\": \"top-4 left-4\",\n  \"bottom-right\": \"bottom-4 right-4\",\n  \"bottom-left\": \"bottom-4 left-4\",\n  \"top-center\": \"top-4 left-1/2 -translate-x-1/2\",\n  \"bottom-center\": \"bottom-4 left-1/2 -translate-x-1/2\",\n};\n\nconst variantIcons = {\n  info: <Info size={18} className=\"text-liquid-blue\" />,\n  success: <CheckCircle size={18} className=\"text-liquid-emerald\" />,\n  warning: <AlertTriangle size={18} className=\"text-liquid-amber\" />,\n  error: <AlertCircle size={18} className=\"text-liquid-rose\" />,\n};\n\nconst variantBorders = {\n  info: \"border-liquid-blue/20\",\n  success: \"border-liquid-emerald/20\",\n  warning: \"border-liquid-amber/20\",\n  error: \"border-liquid-rose/20\",\n};\n\nexport function LiquidGlassToast({\n  toasts,\n  onRemove,\n  position = \"bottom-right\",\n}: LiquidGlassToastProps) {\n  return (\n    <div className={cn(\"fixed z-[100] flex flex-col gap-2\", positionStyles[position])}>\n      <AnimatePresence mode=\"popLayout\">\n        {toasts.map((toast) => (\n          <ToastItemComponent\n            key={toast.id}\n            toast={toast}\n            onRemove={onRemove}\n          />\n        ))}\n      </AnimatePresence>\n    </div>\n  );\n}\n\nfunction ToastItemComponent({\n  toast,\n  onRemove,\n}: {\n  toast: ToastItem;\n  onRemove: (id: string) => void;\n}) {\n  const tapScale = useLiquidTapScale();\n  const transition = useLiquidTransition();\n  const progressFill = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n  const [progress, setProgress] = useState(100);\n  const duration = toast.duration || 4000;\n\n  useEffect(() => {\n    const start = Date.now();\n    const interval = setInterval(() => {\n      const elapsed = Date.now() - start;\n      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);\n      setProgress(remaining);\n      if (remaining <= 0) {\n        clearInterval(interval);\n        onRemove(toast.id);\n      }\n    }, 50);\n    return () => clearInterval(interval);\n  }, [duration, toast.id, onRemove]);\n\n  return (\n    <motion.div\n      layout\n      initial={{ opacity: 0, x: 50, scale: 0.9 }}\n      animate={{ opacity: 1, x: 0, scale: 1 }}\n      exit={{ opacity: 0, x: 50, scale: 0.9 }}\n      transition={transition}\n      className={cn(\n        \"relative flex items-center gap-3 min-w-[280px] max-w-[400px] px-4 py-3 rounded-2xl\",\n        \"glass-blur-xl glass-surface border\",\n        variantBorders[toast.variant || \"info\"],\n        \"glass-highlight\"\n      )}\n    >\n      {/* Top highlight */}\n      <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />\n      \n      <div className=\"flex-shrink-0\">{variantIcons[toast.variant || \"info\"]}</div>\n      <p className=\"flex-1 text-sm text-[var(--lg-text-secondary)] leading-relaxed\">{toast.message}</p>\n      <motion.button\n        whileHover={{ scale: 1.1 }}\n        whileTap={{ scale: tapScale }}\n        onClick={() => onRemove(toast.id)}\n        className=\"flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)] transition-colors\"\n      >\n        <X size={14} />\n      </motion.button>\n      \n      {/* Progress bar */}\n      <div className=\"absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden\">\n        <motion.div\n          className=\"h-full\"\n          style={{ width: `${progress}%`, background: progressFill.style.background }}\n        />\n      </div>\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "toasts",
        "type": "ToastItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "onRemove",
        "type": "(id: string) => void",
        "required": true,
        "description": ""
      },
      {
        "name": "position",
        "type": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\" | \"top-center\" | \"bottom-center\"",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "toggle",
    "name": "LiquidGlassToggle",
    "file": "src/components/liquid-glass/LiquidGlassToggle.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Fluid or iOS 26 style toggle switch.",
    "usage": "<LiquidGlassToggle />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useCallback, useMemo, type MouseEvent } from \"react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useGlassFluidity } from \"./useGlassFluidity\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\n\ninterface LiquidGlassToggleProps {\n  checked?: boolean;\n  onChange?: (checked: boolean) => void;\n  className?: string;\n  size?: \"sm\" | \"md\" | \"lg\";\n  disabled?: boolean;\n  label?: string;\n  description?: string;\n  variant?: \"ios26\" | \"fluid\";\n  /**\n   * Tint color for the active track. iOS 26 uses system green by default,\n   * but can be overridden per context.\n   */\n  activeTint?: string;\n}\n\nconst sizeStyles = {\n  // Wide recessed track with a lozenge thumb that bulges out when pressed.\n  sm: { track: \"w-12 h-6\", thumb: 18, widthRatio: 1.4, padding: 3.5 },\n  md: { track: \"w-[4rem] h-7\", thumb: 22, widthRatio: 1.4, padding: 3.5 },\n  lg: { track: \"w-[5rem] h-9\", thumb: 28, widthRatio: 1.4, padding: 3.5 },\n};\n\nexport function LiquidGlassToggle({\n  checked = false,\n  onChange,\n  className,\n  size = \"md\",\n  disabled,\n  label,\n  description,\n  variant = \"fluid\",\n  activeTint,\n}: LiquidGlassToggleProps) {\n  const tint = activeTint ?? (variant === \"ios26\" ? \"#34c759\" : \"#3b82f6\");\n  const s = sizeStyles[size];\n  const idleWidth = s.thumb * s.widthRatio;\n  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);\n  const [pressPoint, setPressPoint] = useState({ x: 50, y: 50 });\n  const [isPressed, setIsPressed] = useState(false);\n  const [isMoving, setIsMoving] = useState(false);\n  const fluidity = useGlassFluidity();\n\n  const thumbSurface = useGlassSurface({ variant: \"thumb\" });\n  const trackSurface = useGlassSurface({ variant: \"track\" });\n  const trackActiveSurface = useGlassSurface({ variant: \"track-active\", tint, activeTint: tint });\n  const trackLensingChecked = useGlassSurface({ variant: \"fill\", opacity: 0.24 });\n  const trackLensingUnchecked = useGlassSurface({ variant: \"fill\", opacity: 0.14 });\n\n  // Snappy spring so the shape snaps back immediately when the state change finishes.\n  const spring = useMemo(() => {\n    const stiffness = 720 - fluidity * 3.6;\n    const damping = 46 - fluidity * 0.2;\n    return { stiffness, damping };\n  }, [fluidity]);\n\n  const createRipple = useCallback(\n    (e: MouseEvent<HTMLButtonElement>) => {\n      if (disabled) return;\n      const rect = e.currentTarget.getBoundingClientRect();\n      const x = e.clientX - rect.left;\n      const y = e.clientY - rect.top;\n      setPressPoint({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });\n      const id = Date.now();\n      setRipples((prev) => [...prev, { id, x, y }]);\n      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);\n    },\n    [disabled]\n  );\n\n  // Compute travel from the idle width so the lozenge stays within the track at rest.\n  const trackWidth = useMemo(() => {\n    // Parse Tailwind class widths into pixels (rem = 16px).\n    if (s.track.includes(\"w-[\")) {\n      const match = s.track.match(/w-\\[(.+?)\\]/);\n      const val = match?.[1] ?? \"3rem\";\n      if (val.endsWith(\"rem\")) return parseFloat(val) * 16;\n      return parseFloat(val);\n    }\n    // Tailwind w-12 = 48.\n    if (s.track.includes(\"w-12\")) return 48;\n    return 48;\n  }, [s.track]);\n\n  const travel = trackWidth - idleWidth - s.padding * 2;\n\n  // Width-based stretch keeps semicircular ends (stadium/lozenge) instead of an ellipse.\n  const thumbWidth = isPressed\n    ? idleWidth * 1.65\n    : isMoving\n      ? idleWidth * 1.45\n      : idleWidth;\n\n  // Slight vertical expansion so the thumb bulges out of the track when active.\n  const scaleY = isPressed\n    ? 1.18\n    : isMoving\n      ? 1.12\n      : 1;\n\n  return (\n    <div className={cn(\"inline-flex items-center gap-4\", className)}>\n      <motion.button\n        disabled={disabled}\n        onPointerDown={() => setIsPressed(true)}\n        onPointerUp={() => setIsPressed(false)}\n        onPointerLeave={() => setIsPressed(false)}\n        onClick={(e) => {\n          createRipple(e);\n          if (!disabled) {\n            setIsMoving(true);\n            onChange?.(!checked);\n          }\n        }}\n        className={cn(\n          \"relative inline-flex items-center rounded-full isolate\",\n          \"overflow-visible\",\n          s.track,\n          disabled && \"opacity-40 cursor-not-allowed\"\n        )}\n      >\n        {/* Track — recessed glass pill underneath the thumb */}\n        <div\n          className={cn(\n            \"absolute inset-0 rounded-full -z-10\",\n            \"glass-blur-xl\",\n            \"border border-[var(--lg-border)]\"\n          )}\n          style={{\n            background: checked ? trackActiveSurface.style.background : trackSurface.style.background,\n            boxShadow: trackSurface.style.boxShadow,\n          }}\n        >\n          {/* Lensing backdrop layer */}\n          <div\n            className=\"absolute inset-[-1px] rounded-full opacity-70 pointer-events-none\"\n            style={{\n              background: checked\n                ? `${trackLensingChecked.style.background}, radial-gradient(circle at 75% 85%, ${tint}18 0%, transparent 45%)`\n                : trackLensingUnchecked.style.background,\n            }}\n          />\n\n          {/* Top highlight line */}\n          <GlassTopHighlight className=\"inset-x-3 top-[1px]\" opacity={0.35} />\n        </div>\n\n        {/* Thumb — lozenge at rest; expands into a wider, taller stadium shape when active. */}\n        <motion.div\n          initial={{ width: idleWidth, marginLeft: -idleWidth / 2 }}\n          animate={{\n            x: checked ? travel : 0,\n            width: thumbWidth,\n            marginLeft: -thumbWidth / 2,\n            scaleY,\n          }}\n          transition={{\n            x: { type: \"spring\", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },\n            width: { type: \"spring\", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },\n            marginLeft: { type: \"spring\", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },\n            scaleY: { type: \"spring\", stiffness: spring.stiffness, damping: spring.damping, mass: 0.45 },\n          }}\n          onAnimationComplete={() => {\n            // Return to idle exactly when the motion finishes.\n            if (!isPressed) setIsMoving(false);\n          }}\n          className={cn(\n            \"absolute top-1/2 -translate-y-1/2 rounded-full z-10 pointer-events-none\",\n            thumbSurface.className\n          )}\n          style={{\n            left: s.padding + idleWidth / 2,\n            height: s.thumb,\n            ...thumbSurface.style,\n          }}\n        >\n          {/* Reflection response */}\n          <div className=\"absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none\" />\n\n          {/* Subtle specular sheen */}\n          <GlassSheen className=\"rounded-full\" opacity={0.18} />\n\n          {/* Touch-point shimmer */}\n          <AnimatePresence>\n            {isPressed && (\n              <motion.div\n                initial={{ opacity: 0, scale: 0.7 }}\n                animate={{ opacity: 0.55, scale: 1 }}\n                exit={{ opacity: 0, scale: 1.15 }}\n                transition={{ duration: 0.2 }}\n                className=\"absolute inset-[-2px] rounded-full\"\n                style={{\n                  background: `radial-gradient(circle at ${pressPoint.x}% ${pressPoint.y}%, rgba(255,255,255,0.45) 0%, transparent 55%)`,\n                }}\n              />\n            )}\n          </AnimatePresence>\n        </motion.div>\n\n        {/* Ripple */}\n        <AnimatePresence>\n          {ripples.map((ripple) => (\n            <motion.span\n              key={ripple.id}\n              initial={{ scale: 0, opacity: 0.5, borderRadius: \"45% 55% 50% 50% / 55% 45% 50% 50%\" }}\n              animate={{ scale: 2.8, opacity: 0, borderRadius: \"50%\" }}\n              exit={{ opacity: 0 }}\n              transition={{ duration: 0.7, ease: \"easeOut\" }}\n              className=\"absolute pointer-events-none z-20\"\n              style={{\n                left: ripple.x,\n                top: ripple.y,\n                width: 40,\n                height: 40,\n                marginLeft: -20,\n                marginTop: -20,\n                background: \"radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)\",\n              }}\n            />\n          ))}\n        </AnimatePresence>\n      </motion.button>\n\n      {(label || description) && (\n        <div className=\"flex flex-col\">\n          {label && (\n            <span className={cn(\"text-sm font-medium\", disabled ? \"text-[var(--lg-text-muted)]\" : \"text-[var(--lg-text)]\")}>\n              {label}\n            </span>\n          )}\n          {description && <span className=\"text-xs text-[var(--lg-text-muted)]\">{description}</span>}\n        </div>\n      )}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "activeTint",
        "type": "string",
        "required": false,
        "description": "Tint color for the active track. iOS 26 uses system green by default, but can be overridden per context."
      }
    ]
  },
  {
    "id": "tooltip",
    "name": "LiquidGlassTooltip",
    "file": "src/components/liquid-glass/LiquidGlassTooltip.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Hover tooltip with directional positioning.",
    "usage": "<LiquidGlassTooltip />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, type ReactNode } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface LiquidGlassTooltipProps {\n  children: ReactNode;\n  content: ReactNode;\n  className?: string;\n  position?: \"top\" | \"bottom\" | \"left\" | \"right\";\n  delay?: number;\n}\n\nconst positionStyles = {\n  top: \"bottom-full left-1/2 -translate-x-1/2 mb-2\",\n  bottom: \"top-full left-1/2 -translate-x-1/2 mt-2\",\n  left: \"right-full top-1/2 -translate-y-1/2 mr-2\",\n  right: \"left-full top-1/2 -translate-y-1/2 ml-2\",\n};\n\nconst arrowStyles = {\n  top: \"top-full left-1/2 -translate-x-1/2 -mt-px border-l-transparent border-r-transparent border-b-transparent\",\n  bottom: \"bottom-full left-1/2 -translate-x-1/2 -mb-px border-l-transparent border-r-transparent border-t-transparent\",\n  left: \"left-full top-1/2 -translate-y-1/2 -ml-px border-t-transparent border-b-transparent border-r-transparent\",\n  right: \"right-full top-1/2 -translate-y-1/2 -mr-px border-t-transparent border-b-transparent border-l-transparent\",\n};\n\nexport function LiquidGlassTooltip({\n  children,\n  content,\n  className,\n  position = \"top\",\n  delay = 0.3,\n}: LiquidGlassTooltipProps) {\n  const [isVisible, setIsVisible] = useState(false);\n  let timeoutId: ReturnType<typeof setTimeout>;\n\n  const show = () => {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => setIsVisible(true), delay * 1000);\n  };\n\n  const hide = () => {\n    clearTimeout(timeoutId);\n    setIsVisible(false);\n  };\n\n  return (\n    <div\n      className={cn(\"relative inline-flex\", className)}\n      onMouseEnter={show}\n      onMouseLeave={hide}\n      onFocus={show}\n      onBlur={hide}\n    >\n      {children}\n      <AnimatePresence>\n        {isVisible && (\n          <motion.div\n            initial={{ opacity: 0, scale: 0.9 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.9 }}\n            transition={{ duration: 0.15 }}\n            className={cn(\n              \"absolute z-50 px-3 py-2 rounded-xl whitespace-nowrap\",\n              \"glass-blur-lg glass-surface glass-border glass-highlight\",\n              \"text-xs font-medium text-[var(--lg-text)]\",\n              positionStyles[position]\n            )}\n          >\n            {/* Arrow */}\n            <div\n              className={cn(\n                \"absolute w-2 h-2 rotate-45\",\n                \"bg-[var(--lg-border)] border border-[var(--lg-border-subtle)]\",\n                arrowStyles[position]\n              )}\n            />\n            {content}\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-2 top-0\" opacity={0.2} />\n          </motion.div>\n        )}\n      </AnimatePresence>\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "content",
        "type": "ReactNode",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "position",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "required": false,
        "description": ""
      },
      {
        "name": "delay",
        "type": "number",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "weather-widget",
    "name": "LiquidGlassWeatherWidget",
    "file": "src/components/liquid-glass/LiquidGlassWeatherWidget.tsx",
    "category": "Media & Content",
    "description": "Weather widget with hourly forecast.",
    "usage": "<LiquidGlassWeatherWidget />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Gauge } from \"lucide-react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface WeatherData {\n  temp: number;\n  condition: \"sunny\" | \"cloudy\" | \"rainy\" | \"snowy\";\n  location: string;\n  high: number;\n  low: number;\n  humidity: number;\n  wind: number;\n  visibility: number;\n  pressure: number;\n  hourly: { time: string; temp: number; icon: \"sun\" | \"cloud\" | \"rain\" }[];\n}\n\ninterface LiquidGlassWeatherWidgetProps {\n  data?: WeatherData;\n  className?: string;\n}\n\nconst conditionConfig = {\n  sunny: { icon: Sun, color: \"text-liquid-amber\", bg: \"from-liquid-amber/10 to-transparent\" },\n  cloudy: { icon: Cloud, color: \"text-[var(--lg-text-secondary)]\", bg: \"from-white/5 to-transparent\" },\n  rainy: { icon: CloudRain, color: \"text-liquid-blue\", bg: \"from-liquid-blue/10 to-transparent\" },\n  snowy: { icon: CloudSnow, color: \"text-[var(--lg-text-secondary)]\", bg: \"from-white/10 to-transparent\" },\n};\n\nconst hourlyIconMap = {\n  sun: Sun,\n  cloud: Cloud,\n  rain: CloudRain,\n};\n\nconst defaultData: WeatherData = {\n  temp: 72,\n  condition: \"sunny\",\n  location: \"San Francisco, CA\",\n  high: 78,\n  low: 62,\n  humidity: 45,\n  wind: 8,\n  visibility: 10,\n  pressure: 30.12,\n  hourly: [\n    { time: \"Now\", temp: 72, icon: \"sun\" },\n    { time: \"1PM\", temp: 74, icon: \"sun\" },\n    { time: \"2PM\", temp: 76, icon: \"cloud\" },\n    { time: \"3PM\", temp: 75, icon: \"cloud\" },\n    { time: \"4PM\", temp: 73, icon: \"rain\" },\n    { time: \"5PM\", temp: 70, icon: \"rain\" },\n  ],\n};\n\nexport function LiquidGlassWeatherWidget({\n  data = defaultData,\n  className,\n}: LiquidGlassWeatherWidgetProps) {\n  const config = conditionConfig[data.condition];\n  const ConditionIcon = config.icon;\n\n  return (\n    <div\n      className={cn(\n        \"w-full max-w-sm p-5 rounded-3xl overflow-hidden relative\",\n        \"glass-blur-lg glass-surface glass-border glass-highlight-strong\",\n        className\n      )}\n    >\n      {/* Top highlight */}\n      <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.25} />\n      {/* Background glow */}\n      <div className={cn(\"absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br\", config.bg)} />\n\n      {/* Main weather */}\n      <div className=\"relative flex items-start justify-between mb-5\">\n        <div>\n          <p className=\"text-xs text-[var(--lg-text-muted)] mb-1\">{data.location}</p>\n          <div className=\"flex items-baseline gap-1\">\n            <span className=\"text-5xl font-light text-[var(--lg-text)]\">{data.temp}°</span>\n          </div>\n          <p className={cn(\"text-sm font-medium mt-1\", config.color)}>\n            {data.condition.charAt(0).toUpperCase() + data.condition.slice(1)}\n          </p>\n          <p className=\"text-xs text-[var(--lg-text-muted)] mt-0.5\">\n            H:{data.high}°  L:{data.low}°\n          </p>\n        </div>\n        <motion.div\n          animate={{ rotate: [0, 5, -5, 0] }}\n          transition={{ duration: 6, repeat: Infinity, ease: \"easeInOut\" }}\n        >\n          <ConditionIcon size={56} className={config.color} strokeWidth={1.2} />\n        </motion.div>\n      </div>\n\n      {/* Hourly forecast */}\n      <div className=\"flex justify-between mb-5 px-1\">\n        {data.hourly.map((h, i) => {\n          const Icon = hourlyIconMap[h.icon];\n          return (\n            <div key={i} className=\"flex flex-col items-center gap-1.5\">\n              <span className=\"text-[10px] text-[var(--lg-text-muted)]\">{h.time}</span>\n              <Icon size={14} className=\"text-[var(--lg-text-muted)]\" />\n              <span className=\"text-xs font-medium text-[var(--lg-text-secondary)]\">{h.temp}°</span>\n            </div>\n          );\n        })}\n      </div>\n\n      {/* Details grid */}\n      <div className=\"grid grid-cols-2 gap-2\">\n        <DetailItem icon={<Droplets size={14} />} label=\"Humidity\" value={`${data.humidity}%`} />\n        <DetailItem icon={<Wind size={14} />} label=\"Wind\" value={`${data.wind} mph`} />\n        <DetailItem icon={<Eye size={14} />} label=\"Visibility\" value={`${data.visibility} mi`} />\n        <DetailItem icon={<Gauge size={14} />} label=\"Pressure\" value={`${data.pressure}\"`} />\n      </div>\n    </div>\n  );\n}\n\nfunction DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {\n  return (\n    <div className=\"flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--lg-border-subtle)]\">\n      <span className=\"text-[var(--lg-text-muted)]\">{icon}</span>\n      <div>\n        <p className=\"text-[10px] text-[var(--lg-text-muted)]\">{label}</p>\n        <p className=\"text-xs font-medium text-[var(--lg-text-secondary)]\">{value}</p>\n      </div>\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "data",
        "type": "WeatherData",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "action-sheet",
    "name": "MobileActionSheet",
    "file": "src/components/liquid-glass/MobileActionSheet.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Bottom action sheet with default, grouped, minimal, and grid variants.",
    "usage": "<MobileActionSheet />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport {\n  useLiquidSlideVariants,\n  useLiquidTransition,\n  useLiquidTapScale,\n} from \"./useLiquidMotion\";\n\ninterface ActionSheetItem {\n  id: string;\n  title: string;\n  subtitle?: string;\n  icon?: ReactNode;\n  destructive?: boolean;\n  onClick?: () => void;\n}\n\ninterface MobileActionSheetProps {\n  isOpen: boolean;\n  onClose: () => void;\n  title?: string;\n  subtitle?: string;\n  items: ActionSheetItem[];\n  cancelText?: string;\n  className?: string;\n  variant?: \"default\" | \"grouped\" | \"minimal\" | \"grid\";\n}\n\nexport function MobileActionSheet({\n  isOpen,\n  onClose,\n  title,\n  subtitle,\n  items,\n  cancelText = \"Cancel\",\n  className,\n  variant = \"default\",\n}: MobileActionSheetProps) {\n  const slideVariants = useLiquidSlideVariants(\"bottom\");\n  const transition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className=\"fixed inset-0 z-[60] flex items-end justify-center\">\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}\n            transition={{ duration: 0.2 }} onClick={onClose}\n            className=\"glass-backdrop-overlay\" />\n\n          <motion.div\n            {...slideVariants}\n            transition={transition}\n            className={cn(\n              \"relative w-full max-w-lg mx-auto\",\n              variant === \"grouped\" ? \"px-3 pb-3\" : \"pb-2\",\n              className\n            )}\n          >\n            {/* ─── GROUPED ─── */}\n            {variant === \"grouped\" && (\n              <>\n                <div className=\"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-2xl overflow-hidden mb-2\">\n                  <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n                  {(title || subtitle) && (\n                    <div className=\"px-5 pt-4 pb-3 text-center border-b border-[var(--lg-border)]\">\n                      {title && <h3 className=\"text-sm font-semibold text-[var(--lg-text)]\">{title}</h3>}\n                      {subtitle && <p className=\"text-xs text-[var(--lg-text-muted)] mt-1\">{subtitle}</p>}\n                    </div>\n                  )}\n                  {items.map((item, i) => (\n                    <ActionButton key={item.id} item={item} onClose={onClose} isLast={i === items.length - 1} />\n                  ))}\n                </div>\n                <motion.button whileTap={{ scale: tapScale }} onClick={onClose}\n                  className=\"w-full py-3.5 rounded-2xl text-sm font-semibold text-liquid-blue glass-blur-xl glass-surface-strong glass-border glass-highlight-strong\">\n                  {cancelText}\n                </motion.button>\n              </>\n            )}\n\n            {/* ─── GRID ─── */}\n            {variant === \"grid\" && (\n              <div className=\"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-t-3xl overflow-hidden\">\n                <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n                <div className=\"flex justify-center pt-3 pb-1\"><div className=\"w-10 h-1 rounded-full bg-[var(--lg-border)]\" /></div>\n                {(title || subtitle) && (\n                  <div className=\"px-5 pt-1 pb-3 text-center\">\n                    {title && <h3 className=\"text-sm font-semibold text-[var(--lg-text)]\">{title}</h3>}\n                    {subtitle && <p className=\"text-xs text-[var(--lg-text-muted)] mt-1\">{subtitle}</p>}\n                  </div>\n                )}\n                <div className=\"grid grid-cols-4 gap-2 px-4 pb-6\">\n                  {items.map((item) => (\n                    <motion.button key={item.id} whileTap={{ scale: tapScale }} onClick={() => { item.onClick?.(); onClose(); }}\n                      className=\"flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-[var(--lg-border)] transition-colors\">\n                      <div className=\"flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lg-border)]\">\n                        <span className={item.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text-secondary)]\"}>{item.icon}</span>\n                      </div>\n                      <span className={cn(\"text-[10px] font-medium\", item.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text-muted)]\")}>\n                        {item.title}\n                      </span>\n                    </motion.button>\n                  ))}\n                </div>\n              </div>\n            )}\n\n            {/* ─── MINIMAL ─── */}\n            {variant === \"minimal\" && (\n              <div className=\"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-t-3xl overflow-hidden\">\n                <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n                <div className=\"flex justify-center pt-3 pb-1\"><div className=\"w-10 h-1 rounded-full bg-[var(--lg-border)]\" /></div>\n                <div className=\"px-4 pb-6 pt-2 space-y-0.5\">\n                  {items.map((item, i) => (\n                    <ActionButton key={item.id} item={item} onClose={onClose} isLast={i === items.length - 1} />\n                  ))}\n                </div>\n              </div>\n            )}\n\n            {/* ─── DEFAULT ─── */}\n            {variant === \"default\" && (\n              <div className=\"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong rounded-t-3xl overflow-hidden\">\n                <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n                <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl\" />\n                <div className=\"flex justify-center pt-3 pb-1\"><div className=\"w-10 h-1 rounded-full bg-[var(--lg-border)]\" /></div>\n                {(title || subtitle) && (\n                  <div className=\"px-6 pt-2 pb-4 text-center\">\n                    {title && <h3 className=\"text-base font-semibold text-[var(--lg-text)]\">{title}</h3>}\n                    {subtitle && <p className=\"text-xs text-[var(--lg-text-muted)] mt-1\">{subtitle}</p>}\n                  </div>\n                )}\n                <div className=\"px-2 pb-6 space-y-0.5\">\n                  {items.map((item, i) => (\n                    <ActionButton key={item.id} item={item} onClose={onClose} isLast={i === items.length - 1} />\n                  ))}\n                  <motion.button whileTap={{ scale: tapScale }} onClick={onClose}\n                    className=\"flex w-full items-center justify-center py-3.5 rounded-xl text-sm font-semibold text-[var(--lg-text-muted)] hover:bg-[var(--lg-border)] transition-colors mt-2\">\n                    {cancelText}\n                  </motion.button>\n                </div>\n              </div>\n            )}\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n}\n\nfunction ActionButton({ item, onClose, isLast }: { item: ActionSheetItem; onClose: () => void; isLast: boolean }) {\n  const actionTapScale = useLiquidTapScale();\n  return (\n    <motion.button\n      whileTap={{ scale: actionTapScale }}\n      onClick={() => { item.onClick?.(); onClose(); }}\n      className={cn(\n        \"flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors hover:bg-[var(--lg-border)]\",\n        !isLast && \"border-b border-[var(--lg-border-subtle)]\",\n        item.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text)]\"\n      )}\n    >\n      {item.icon && <span className={item.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text-muted)]\"}>{item.icon}</span>}\n      <div className=\"flex-1 min-w-0\">\n        <p className=\"text-sm font-medium\">{item.title}</p>\n        {item.subtitle && <p className=\"text-xs text-[var(--lg-text-muted)] mt-0.5\">{item.subtitle}</p>}\n      </div>\n    </motion.button>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "subtitle",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "items",
        "type": "ActionSheetItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "cancelText",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"grouped\" | \"minimal\" | \"grid\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "alert-dialog",
    "name": "MobileAlertDialog",
    "file": "src/components/liquid-glass/MobileAlertDialog.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Mobile alert dialog with options.",
    "usage": "<MobileAlertDialog />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { X, Check, AlertTriangle } from \"lucide-react\";\nimport type { ReactNode } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport {\n  useLiquidOverlayVariants,\n  useLiquidTransition,\n  useLiquidTapScale,\n} from \"./useLiquidMotion\";\n\ninterface AlertOption {\n  text: string;\n  style?: \"default\" | \"destructive\" | \"cancel\";\n  onClick?: () => void;\n}\n\ninterface MobileAlertDialogProps {\n  isOpen: boolean;\n  onClose: () => void;\n  title?: string;\n  message?: string;\n  options?: AlertOption[];\n  icon?: \"info\" | \"warning\" | \"success\" | \"error\" | ReactNode;\n  className?: string;\n}\n\nexport function MobileAlertDialog({\n  isOpen,\n  onClose,\n  title = \"Alert\",\n  message,\n  options,\n  icon = \"info\",\n  className,\n}: MobileAlertDialogProps) {\n  const overlayVariants = useLiquidOverlayVariants();\n  const transition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  const defaultOptions: AlertOption[] = options || [\n    { text: \"OK\", style: \"cancel\", onClick: onClose },\n  ];\n\n  const iconMap = {\n    info: <InfoIcon />,\n    warning: <AlertTriangle size={22} className=\"text-liquid-amber\" />,\n    success: <Check size={22} className=\"text-liquid-emerald\" />,\n    error: <X size={22} className=\"text-liquid-rose\" />,\n  };\n\n  const alertIcon = typeof icon === \"string\" ? iconMap[icon as keyof typeof iconMap] : icon;\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className=\"fixed inset-0 z-[60] flex items-center justify-center p-6\">\n          {/* Backdrop */}\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}\n            className=\"glass-backdrop\"\n          />\n\n          {/* Dialog */}\n          <motion.div\n            {...overlayVariants}\n            transition={transition}\n            className={cn(\n              \"relative w-full max-w-sm\",\n              \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n              \"rounded-2xl overflow-hidden\",\n              className\n            )}\n          >\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.25} />\n\n            {/* Content */}\n            <div className=\"px-6 py-5 text-center\">\n              <div className=\"flex justify-center mb-3\">{alertIcon}</div>\n              <h3 className=\"text-base font-semibold text-[var(--lg-text)] mb-1.5\">\n                {title}\n              </h3>\n              {message && (\n                <p className=\"text-sm text-[var(--lg-text-muted)] leading-relaxed\">{message}</p>\n              )}\n            </div>\n\n            {/* Options */}\n            <div className=\"px-3 pb-3 space-y-1\">\n              {defaultOptions.map((option, i) => (\n                <motion.button\n                  key={i}\n                  initial={{ opacity: 0, y: 10 }}\n                  animate={{ opacity: 1, y: 0 }}\n                  transition={{ ...transition, delay: i * 0.08 }}\n                  whileTap={{ scale: tapScale }}\n                  onClick={() => {\n                    option.onClick?.();\n                    onClose();\n                  }}\n                  className={cn(\n                    \"w-full py-3 rounded-xl text-sm font-semibold transition-colors\",\n                    i < defaultOptions.length - 1 && \"border-b border-[var(--lg-border-subtle)]\",\n                    option.style === \"destructive\"\n                      ? \"text-liquid-rose hover:bg-liquid-rose/5\"\n                      : option.style === \"cancel\"\n                      ? \"text-[var(--lg-text-muted)] hover:bg-[var(--lg-border-subtle)]\"\n                      : \"text-liquid-blue hover:bg-[var(--lg-border-subtle)]\"\n                  )}\n                >\n                  {option.text}\n                </motion.button>\n              ))}\n            </div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n}\n\nfunction InfoIcon() {\n  return (\n    <svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\" className=\"text-liquid-blue\">\n      <circle cx=\"12\" cy=\"12\" r=\"10\" />\n      <path d=\"M12 16v-4\" />\n      <path d=\"M12 8h.01\" />\n    </svg>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "message",
        "type": "string",
        "required": false,
        "description": "Message content."
      },
      {
        "name": "options",
        "type": "AlertOption[]",
        "required": false,
        "description": ""
      },
      {
        "name": "icon",
        "type": "\"info\" | \"warning\" | \"success\" | \"error\" | ReactNode",
        "required": false,
        "description": "Icon element to display."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "app-rating",
    "name": "MobileAppRating",
    "file": "src/components/liquid-glass/MobileAppRating.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "App rating modal with star selection.",
    "usage": "<MobileAppRating />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { Star } from \"lucide-react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\n\ninterface MobileAppRatingProps {\n  isOpen: boolean;\n  onClose: () => void;\n  onRate: (rating: number) => void;\n  title?: string;\n  message?: string;\n  appName?: string;\n  className?: string;\n}\n\nexport function MobileAppRating({\n  isOpen,\n  onClose,\n  onRate,\n  title = \"Rate this app\",\n  message = \"If you enjoy using this app, please take a moment to rate it. Your feedback helps us improve!\",\n  appName = \"Liquid Glass\",\n  className,\n}: MobileAppRatingProps) {\n  const disabledFill = useGlassSurface({ variant: \"fill\", opacity: 0.05 });\n  const [rating, setRating] = useState(0);\n  const [hoverRating, setHoverRating] = useState(0);\n  const displayRating = hoverRating || rating;\n\n  if (!isOpen) return null;\n\n  return (\n    <div className=\"fixed inset-0 z-[60] flex items-center justify-center p-6\">\n      <motion.div\n        initial={{ opacity: 0 }}\n        animate={{ opacity: 1 }}\n        exit={{ opacity: 0 }}\n        onClick={onClose}\n        className=\"glass-backdrop\"\n      />\n\n      <motion.div\n        initial={{ opacity: 0, scale: 0.9, y: 20 }}\n        animate={{ opacity: 1, scale: 1, y: 0 }}\n        className={cn(\n          \"relative w-full max-w-sm\",\n          \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n          \"rounded-2xl overflow-hidden\",\n          className\n        )}\n      >\n        <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.25} />\n\n        <div className=\"px-6 py-8 text-center\">\n          {/* App icon */}\n          <div className=\"mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-liquid-blue to-liquid-purple\">\n            <Star size={28} className=\"text-white\" />\n          </div>\n\n          <h3 className=\"text-lg font-semibold text-[var(--lg-text)] mb-2\">{title} — {appName}</h3>\n          <p className=\"text-sm text-[var(--lg-text-muted)] leading-relaxed mb-6\">{message}</p>\n\n          {/* Stars */}\n          <div className=\"flex items-center justify-center gap-1 mb-6\">\n            {[1, 2, 3, 4, 5].map((star) => (\n              <motion.button\n                key={star}\n                whileTap={{ scale: 0.85 }}\n                onMouseEnter={() => setHoverRating(star)}\n                onMouseLeave={() => setHoverRating(0)}\n                onClick={() => setRating(star)}\n                className=\"flex items-center justify-center\"\n              >\n                <Star\n                  size={32}\n                  className={cn(\n                    \"transition-colors\",\n                    star <= displayRating\n                      ? \"text-liquid-amber fill-liquid-amber\"\n                      : \"text-[var(--lg-text-muted)]\"\n                  )}\n                />\n              </motion.button>\n            ))}\n          </div>\n\n          {/* Buttons */}\n          <div className=\"flex gap-3\">\n            <motion.button\n              whileTap={{ scale: 0.98 }}\n              onClick={onClose}\n              className=\"flex-1 py-3 rounded-xl text-sm font-semibold text-[var(--lg-text-muted)] hover:bg-[var(--lg-border-subtle)] transition-colors\"\n            >\n              Remind Later\n            </motion.button>\n            <motion.button\n              whileTap={{ scale: 0.98 }}\n              onClick={() => {\n                if (rating > 0) onRate(rating);\n                onClose();\n              }}\n              disabled={rating === 0}\n              className={cn(\n                \"flex-1 py-3 rounded-xl text-sm font-semibold transition-all\",\n                rating > 0\n                  ? \"text-white glass-blur-sm bg-liquid-blue/20 border border-liquid-blue/30\"\n                  : \"text-white/20\"\n              )}\n              style={rating > 0 ? undefined : { background: disabledFill.style.background }}\n            >\n              Submit Rating\n            </motion.button>\n          </div>\n        </div>\n      </motion.div>\n    </div>\n  );\n}\n\nimport { useState } from \"react\";\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "onRate",
        "type": "(rating: number) => void",
        "required": true,
        "description": ""
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "message",
        "type": "string",
        "required": false,
        "description": "Message content."
      },
      {
        "name": "appName",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "bottom-tab-bar",
    "name": "MobileBottomTabBar",
    "file": "src/components/liquid-glass/MobileBottomTabBar.tsx",
    "category": "Navigation",
    "description": "iOS/Android bottom tab bar with 8 visual variants.",
    "usage": "<MobileBottomTabBar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport {\n  useState,\n  useCallback,\n  useRef,\n  useLayoutEffect,\n  useEffect,\n  type ReactNode,\n  type MouseEvent,\n} from \"react\";\nimport { useTheme } from \"./ThemeProvider\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useGlassFluidity } from \"./useGlassFluidity\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useLiquidTapScale } from \"./useLiquidMotion\";\n\ninterface TabItem {\n  id: string;\n  icon: ReactNode;\n  activeIcon?: ReactNode;\n  label: string;\n  badge?: number;\n  onClick?: () => void;\n}\n\nexport type MobileBottomTabVariant =\n  | \"default\"\n  | \"pill\"\n  | \"floating\"\n  | \"ios26-fluid\"\n  | \"ios26-chrome\"\n  | \"ios26-glow\"\n  | \"ios26-dock\"\n  | \"ios26-super-pill\";\n\ninterface MobileBottomTabBarProps {\n  tabs: TabItem[];\n  activeTab: string;\n  onChange?: (id: string) => void;\n  className?: string;\n  showLabels?: boolean;\n  hideActiveLabel?: boolean;\n  variant?: MobileBottomTabVariant;\n  centerTabButton?: {\n    icon: ReactNode;\n    label: string;\n    onClick: () => void;\n  };\n  trailingButton?: {\n    icon: ReactNode;\n    label?: string;\n    onClick: () => void;\n  };\n}\n\nexport function MobileBottomTabBar({\n  tabs,\n  activeTab,\n  onChange,\n  className,\n  showLabels = true,\n  hideActiveLabel = false,\n  variant = \"default\",\n  centerTabButton,\n  trailingButton,\n}: MobileBottomTabBarProps) {\n  const tapScale = useLiquidTapScale();\n  const [ripples, setRipples] = useState<Record<string, { id: number; x: number; y: number }[]>>({});\n  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0 });\n  const tabsContainerRef = useRef<HTMLDivElement>(null);\n  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});\n  const fluidity = useGlassFluidity();\n\n  const createRipple = useCallback((tabId: string, e: MouseEvent<HTMLButtonElement>) => {\n    const rect = e.currentTarget.getBoundingClientRect();\n    const x = e.clientX - rect.left;\n    const y = e.clientY - rect.top;\n    const id = Date.now() + Math.random();\n    setRipples((prev) => ({\n      ...prev,\n      [tabId]: [...(prev[tabId] || []), { id, x, y }],\n    }));\n    setTimeout(() => {\n      setRipples((prev) => ({\n        ...prev,\n        [tabId]: (prev[tabId] || []).filter((r) => r.id !== id),\n      }));\n    }, 900);\n  }, []);\n\n  const measureIndicator = useCallback(() => {\n    const container = tabsContainerRef.current;\n    const activeButton = tabRefs.current[activeTab] || Object.values(tabRefs.current)[0];\n    if (!container || !activeButton) return;\n    const containerRect = container.getBoundingClientRect();\n    const buttonRect = activeButton.getBoundingClientRect();\n    setIndicator({\n      left: buttonRect.left - containerRect.left,\n      top: buttonRect.top - containerRect.top,\n      width: buttonRect.width,\n      height: buttonRect.height,\n    });\n  }, [activeTab, variant]);\n\n  useLayoutEffect(() => {\n    measureIndicator();\n  }, [measureIndicator]);\n\n  useEffect(() => {\n    window.addEventListener(\"resize\", measureIndicator);\n    return () => window.removeEventListener(\"resize\", measureIndicator);\n  }, [measureIndicator]);\n\n  const containerClasses: Record<MobileBottomTabVariant, string> = {\n    default:\n      \"fixed bottom-0 left-0 right-0 z-40 px-2 pb-2 pt-1 glass-blur-xl glass-surface-dark glass-border-t border-t-white/10\",\n    pill:\n      \"fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2rem] shadow-2xl\",\n    floating:\n      \"fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 glass-blur-xl glass-surface glass-border rounded-[2rem] shadow-2xl shadow-black/20\",\n    \"ios26-fluid\":\n      \"fixed bottom-2 left-2 right-2 z-40 px-3 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem] shadow-2xl\",\n    \"ios26-chrome\":\n      \"fixed bottom-0 left-0 right-0 z-40 px-2 pb-3 pt-2 glass-blur-xl glass-surface-chrome glass-border-t border-t-white/10 rounded-t-[2rem]\",\n    \"ios26-glow\":\n      \"fixed bottom-3 left-3 right-3 z-40 px-3 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem] shadow-[0_0_40px_rgba(59,130,246,0.15)]\",\n    \"ios26-dock\":\n      \"fixed bottom-3 left-1/2 -translate-x-1/2 z-40 px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2rem] shadow-2xl shadow-black/20\",\n    \"ios26-super-pill\":\n      \"fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem] shadow-2xl shadow-black/20\",\n  };\n\n  const isPillLike =\n    variant === \"pill\" ||\n    variant === \"floating\" ||\n    variant === \"ios26-fluid\" ||\n    variant === \"ios26-glow\" ||\n    variant === \"ios26-dock\" ||\n    variant === \"ios26-super-pill\";\n\n  const isSuperPill = variant === \"ios26-super-pill\";\n\n  const widthClass =\n    variant === \"ios26-dock\"\n      ? \"max-w-xs\"\n      : isSuperPill\n        ? \"max-w-md\"\n        : isPillLike\n          ? \"max-w-sm\"\n          : \"max-w-lg\";\n\n  const renderTabs = (tabList: TabItem[]) =>\n    tabList.map((tab) => (\n      <TabButton\n        key={tab.id}\n        tab={tab}\n        isActive={activeTab === tab.id}\n        showLabel={showLabels}\n        hideActiveLabel={hideActiveLabel}\n        variant={variant}\n        ripples={ripples[tab.id] || []}\n        onRipple={(e) => createRipple(tab.id, e)}\n        onClick={() => onChange?.(tab.id)}\n        fluidity={fluidity}\n        buttonRef={(el) => {\n          tabRefs.current[tab.id] = el;\n        }}\n      />\n    ));\n\n  const trailingFill = useGlassSurface({ variant: \"fill\", opacity: 0.1 });\n  const trailingGlow = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n\n  const TrailingButton = trailingButton ? (\n    <motion.button\n      whileTap={{ scale: tapScale }}\n      onClick={trailingButton.onClick}\n      className=\"relative flex flex-col items-center justify-center\"\n    >\n      <div\n        className=\"relative flex h-14 w-14 items-center justify-center rounded-full overflow-hidden glass-blur-xl glass-surface-strong glass-border\"\n        style={{\n          boxShadow:\n            \"inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.18)\",\n        }}\n      >\n        <div className=\"absolute inset-0\" style={{ background: trailingFill.style.background }} />\n        <GlassTopHighlight className=\"inset-x-2 top-0.5\" opacity={0.45} />\n        <div className=\"pointer-events-none absolute -top-3 -right-3 h-8 w-8 rounded-full blur-lg\" style={{ background: trailingGlow.style.background }} />\n        <span className=\"relative z-10 text-[var(--lg-text)]\">{trailingButton.icon}</span>\n      </div>\n      {showLabels && trailingButton.label && (\n        <span className=\"text-[10px] font-medium text-[var(--lg-text-muted)] mt-1\">{trailingButton.label}</span>\n      )}\n    </motion.button>\n  ) : null;\n\n  if (centerTabButton) {\n    const midIndex = Math.floor(tabs.length / 2);\n    const leftTabs = tabs.slice(0, midIndex);\n    const rightTabs = tabs.slice(midIndex);\n\n    return (\n      <div className={cn(containerClasses[variant], className)}>\n        <TopHighlight variant={variant} />\n        <div ref={tabsContainerRef} className={cn(\"relative flex items-center justify-around\", widthClass, \"mx-auto\")}>\n          <ActiveIndicator layout={indicator} variant={variant} fluidity={fluidity} />\n          {renderTabs(leftTabs)}\n\n          <motion.button\n            whileTap={{ scale: tapScale }}\n            onClick={centerTabButton.onClick}\n            className=\"flex flex-col items-center -mt-5 relative\"\n          >\n            <CenterTabButton icon={centerTabButton.icon} />\n            {showLabels && (\n              <span className=\"text-[10px] font-medium text-liquid-blue mt-1\">{centerTabButton.label}</span>\n            )}\n          </motion.button>\n\n          {renderTabs(rightTabs)}\n        </div>\n      </div>\n    );\n  }\n\n  // Super-pill: main bar and trailing button are two separate glass pieces\n  if (isSuperPill && TrailingButton) {\n    return (\n      <div className={cn(\"fixed bottom-4 left-1/2 -translate-x-1/2 z-40\", className)}>\n        <div className=\"flex items-center gap-3\">\n          <div\n            className=\"relative px-2 py-2 glass-blur-xl glass-surface-strong glass-border rounded-[2.5rem]\"\n            style={{\n              boxShadow:\n                \"inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.18)\",\n            }}\n          >\n            <TopHighlight variant={variant} />\n            <div ref={tabsContainerRef} className={cn(\"relative flex items-center justify-around\", widthClass)}>\n              <ActiveIndicator layout={indicator} variant={variant} fluidity={fluidity} />\n              {renderTabs(tabs)}\n            </div>\n          </div>\n          {TrailingButton}\n        </div>\n      </div>\n    );\n  }\n\n  return (\n    <div className={cn(containerClasses[variant], className)}>\n      <TopHighlight variant={variant} />\n      <div ref={tabsContainerRef} className={cn(\"relative flex items-center justify-around\", widthClass, \"mx-auto\")}>\n        <ActiveIndicator layout={indicator} variant={variant} fluidity={fluidity} />\n        {renderTabs(tabs)}\n      </div>\n    </div>\n  );\n}\n\nfunction TopHighlight({ variant }: { variant: MobileBottomTabVariant }) {\n  if (\n    variant === \"pill\" ||\n    variant === \"floating\" ||\n    variant === \"ios26-fluid\" ||\n    variant === \"ios26-glow\" ||\n    variant === \"ios26-dock\" ||\n    variant === \"ios26-super-pill\"\n  ) {\n    return <GlassTopHighlight className=\"inset-x-4 top-0\" opacity={0.4} />;\n  }\n  return <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />;\n}\n\nfunction ActiveIndicator({\n  layout,\n  variant,\n  fluidity,\n}: {\n  layout: { left: number; top: number; width: number; height: number };\n  variant: MobileBottomTabVariant;\n  fluidity: number;\n}) {\n  const thumbSurface = useGlassSurface({ variant: \"thumb\" });\n  const hasBackground =\n    variant === \"pill\" ||\n    variant === \"ios26-fluid\" ||\n    variant === \"ios26-glow\" ||\n    variant === \"ios26-dock\" ||\n    variant === \"ios26-super-pill\";\n\n  const isSuperPill = variant === \"ios26-super-pill\";\n  const radius = isSuperPill ? \"1.6rem\" : \"1rem\";\n\n  if (hasBackground) {\n    return (\n      <motion.div\n        layoutId=\"mobile-tab-bg\"\n        initial={false}\n        animate={{\n          left: layout.left,\n          top: layout.top,\n          width: layout.width,\n          height: layout.height,\n        }}\n        transition={{ type: \"spring\", stiffness: 300 + fluidity * 3, damping: 30 }}\n        className=\"absolute z-0 pointer-events-none glass-blur-lg overflow-hidden\"\n        style={{\n          borderRadius: radius,\n          ...thumbSurface.style,\n        }}\n      >\n        <div\n          className=\"absolute inset-0 glass-reflection mix-blend-soft-light pointer-events-none\"\n          style={{ borderRadius: radius }}\n        />\n        <GlassSheen opacity={0.18} />\n        <div className=\"pointer-events-none absolute inset-x-2 top-0.5 h-px bg-[var(--lg-border)] rounded-full\" />\n      </motion.div>\n    );\n  }\n\n  // default / floating / ios26-chrome: a glowing top-line indicator\n  return (\n    <motion.div\n      layoutId=\"mobile-tab-line\"\n      initial={false}\n      animate={{\n        left: layout.left + 8,\n        top: layout.top + 4,\n        width: Math.max(20, layout.width - 16),\n        height: 6,\n      }}\n      transition={{ type: \"spring\", stiffness: 300 + fluidity * 3, damping: 30 }}\n      className=\"absolute z-0 pointer-events-none glass-blur-lg overflow-hidden rounded-full\"\n      style={thumbSurface.style}\n    >\n      <div className=\"absolute inset-0 rounded-full glass-reflection mix-blend-soft-light pointer-events-none\" />\n      <GlassSheen opacity={0.18} />\n    </motion.div>\n  );\n}\n\nfunction CenterTabButton({ icon }: { icon: ReactNode }) {\n  const centerFill = useGlassSurface({ variant: \"fill\", opacity: 0.1 });\n  const centerGlow = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n\n  return (\n    <div className=\"relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden glass-blur-lg glass-surface-strong glass-border glass-highlight-strong\">\n      {/* Fluid chrome gradient */}\n      <div className=\"absolute inset-0 bg-gradient-to-br from-liquid-blue/40 via-liquid-purple/30 to-liquid-pink/20\" />\n      <div className=\"absolute inset-0\" style={{ background: centerFill.style.background }} />\n      {/* Inner reflection */}\n      <GlassTopHighlight className=\"inset-x-2 top-0.5\" opacity={0.4} />\n      <div className=\"pointer-events-none absolute -top-4 -right-4 h-10 w-10 rounded-full blur-lg\" style={{ background: centerGlow.style.background }} />\n      <span className=\"relative z-10 text-white\">{icon}</span>\n    </div>\n  );\n}\n\nfunction TabButton({\n  tab,\n  isActive,\n  showLabel,\n  hideActiveLabel,\n  variant,\n  ripples,\n  onRipple,\n  onClick,\n  fluidity,\n  buttonRef,\n}: {\n  tab: TabItem;\n  isActive: boolean;\n  showLabel: boolean;\n  hideActiveLabel: boolean;\n  variant: MobileBottomTabVariant;\n  ripples: { id: number; x: number; y: number }[];\n  onRipple: (e: MouseEvent<HTMLButtonElement>) => void;\n  onClick?: () => void;\n  fluidity: number;\n  buttonRef?: React.Ref<HTMLButtonElement>;\n}) {\n  const isFluid = variant === \"ios26-fluid\" || variant === \"ios26-glow\" || variant === \"ios26-dock\";\n  const isPill = variant === \"pill\" || variant === \"ios26-dock\";\n  const isSuperPill = variant === \"ios26-super-pill\";\n  const { isDark } = useTheme();\n\n  return (\n    <motion.button\n      ref={buttonRef}\n      whileTap={{ scale: isFluid || isSuperPill ? 0.92 : 0.85 }}\n      onClick={(e) => {\n        onRipple(e);\n        tab.onClick?.();\n        onClick?.();\n      }}\n      className={cn(\n        \"relative flex flex-col items-center gap-0.5 overflow-hidden\",\n        isPill && \"rounded-xl py-1.5 px-3\",\n        isFluid && \"rounded-2xl py-1.5 px-4\",\n        isSuperPill && \"rounded-[1.6rem] py-2 px-5\",\n        !isPill && !isFluid && !isSuperPill && \"rounded-xl px-5 py-2\"\n      )}\n    >\n      <div className=\"relative z-10\">\n        <motion.div\n          animate={{\n            scale: isActive ? 1.12 : 1,\n            y: isActive ? -1 : 0,\n          }}\n          transition={{ type: \"spring\", stiffness: 300 + fluidity * 3, damping: 25 }}\n          className={cn(\n            \"transition-colors duration-200\",\n            isActive\n              ? isFluid || isSuperPill\n                ? \"text-[var(--lg-text)] drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]\"\n                : \"text-liquid-blue\"\n              : isDark\n                ? \"text-[var(--lg-text-muted)]\"\n                : \"text-black/40\"\n          )}\n        >\n          {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}\n        </motion.div>\n      </div>\n\n      {showLabel && !hideActiveLabel && (\n        <motion.span\n          animate={{\n            opacity: isActive ? 1 : 0.6,\n            y: isActive ? 0 : 1,\n          }}\n          className={cn(\n            \"text-[10px] font-medium transition-colors duration-200 relative z-10\",\n            isActive\n              ? isFluid || isSuperPill\n                ? \"text-[var(--lg-text)]\"\n                : \"text-liquid-blue\"\n              : isDark\n                ? \"text-[var(--lg-text-muted)]\"\n                : \"text-black/40\"\n          )}\n        >\n          {tab.label}\n        </motion.span>\n      )}\n\n      {/* Fluid press ripple */}\n      <AnimatePresence>\n        {ripples.map((ripple) => (\n          <motion.span\n            key={ripple.id}\n            initial={{\n              scale: 0,\n              opacity: 0.5,\n              borderRadius: \"45% 55% 50% 50% / 55% 45% 50% 50%\",\n            }}\n            animate={{\n              scale: 2.2,\n              opacity: 0,\n              borderRadius: \"50%\",\n            }}\n            exit={{ opacity: 0 }}\n            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}\n            className=\"absolute pointer-events-none z-0\"\n            style={{\n              left: ripple.x,\n              top: ripple.y,\n              width: 40,\n              height: 40,\n              marginLeft: -20,\n              marginTop: -20,\n              background: \"radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)\",\n            }}\n          />\n        ))}\n      </AnimatePresence>\n    </motion.button>\n  );\n}\n",
    "props": [
      {
        "name": "tabs",
        "type": "TabItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "activeTab",
        "type": "string",
        "required": true,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(id: string) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "hideActiveLabel",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "variant",
        "type": "MobileBottomTabVariant",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "centerTabButton",
        "type": "{",
        "required": false,
        "description": ""
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": true,
        "description": "Icon element to display."
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Label text."
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": true,
        "description": "Callback when the element is clicked."
      },
      {
        "name": "trailingButton",
        "type": "{",
        "required": false,
        "description": ""
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": true,
        "description": "Icon element to display."
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label text."
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": true,
        "description": "Callback when the element is clicked."
      }
    ]
  },
  {
    "id": "context-preview",
    "name": "MobileContextPreview",
    "file": "src/components/liquid-glass/MobileContextPreview.tsx",
    "category": "Overlays, Menus & Tooltips",
    "description": "Context menu preview modal.",
    "usage": "<MobileContextPreview />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useRef, useEffect, type ReactNode } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport {\n  useLiquidOverlayVariants,\n  useLiquidTransition,\n  useLiquidTapScale,\n} from \"./useLiquidMotion\";\n\ninterface ContextAction {\n  id: string;\n  title: string;\n  icon: ReactNode;\n  destructive?: boolean;\n  onClick?: () => void;\n}\n\ninterface MobileContextPreviewProps {\n  children: ReactNode;\n  actions: ContextAction[];\n  previewContent?: ReactNode;\n  className?: string;\n}\n\nexport function MobileContextPreview({\n  children,\n  actions,\n  previewContent,\n  className,\n}: MobileContextPreviewProps) {\n  const overlayVariants = useLiquidOverlayVariants();\n  const transition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  const [isOpen, setIsOpen] = useState(false);\n  const [childRect, setChildRect] = useState<DOMRect | null>(null);\n  const ref = useRef<HTMLDivElement>(null);\n  const childRef = useRef<HTMLDivElement>(null);\n\n  const handleContextMenu = (e: React.MouseEvent) => {\n    e.preventDefault();\n    const rect = childRef.current?.getBoundingClientRect();\n    if (rect) {\n      setChildRect(rect);\n      setIsOpen(true);\n    }\n  };\n\n  useEffect(() => {\n    if (!isOpen) return;\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\") setIsOpen(false);\n    };\n    window.addEventListener(\"keydown\", handleKeyDown);\n    return () => window.removeEventListener(\"keydown\", handleKeyDown);\n  }, [isOpen]);\n\n  const overlay = (\n    <AnimatePresence>\n      {isOpen && childRect && (\n        <motion.div\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          exit={{ opacity: 0 }}\n          transition={{ duration: 0.15 }}\n          className=\"fixed inset-0 z-[80] flex items-center justify-center\"\n        >\n          <motion.div\n            initial={{ opacity: 0, scale: 0.9 }}\n            animate={{ opacity: 1, scale: 1 }}\n            exit={{ opacity: 0, scale: 0.9 }}\n            className=\"glass-backdrop-subtle\"\n            onClick={() => setIsOpen(false)}\n          />\n\n          {/* Preview */}\n          <motion.div\n            {...overlayVariants}\n            transition={transition}\n            className=\"relative w-full max-w-xs mx-auto\"\n          >\n            <motion.div\n              className={cn(\n                \"relative rounded-2xl overflow-hidden mb-4\",\n                \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n                previewContent ? \"p-4\" : \"h-32 bg-gradient-to-br from-liquid-blue/20 to-liquid-purple/20\"\n              )}\n            >\n              <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.25} />\n              {previewContent || (\n                <div className=\"flex h-full items-center justify-center text-[var(--lg-text-muted)] text-sm\">\n                  Preview\n                </div>\n              )}\n            </motion.div>\n\n            {/* Actions */}\n            <motion.div\n              initial={{ y: 20, opacity: 0 }}\n              animate={{ y: 0, opacity: 1 }}\n              transition={useLiquidTransition({ delay: 0.1 })}\n              className={cn(\n                \"rounded-2xl overflow-hidden\",\n                \"glass-blur-xl glass-surface glass-border glass-highlight\"\n              )}\n            >\n              <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />\n              {actions.map((action, i) => (\n                <motion.button\n                  key={action.id}\n                  whileTap={{ scale: tapScale }}\n                  onClick={() => {\n                    action.onClick?.();\n                    setIsOpen(false);\n                  }}\n                  className={cn(\n                    \"flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-[var(--lg-border-subtle)]\",\n                    i < actions.length - 1 && \"border-b border-[var(--lg-border-subtle)]\",\n                    action.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text-secondary)]\"\n                  )}\n                >\n                  <span className={cn(\n                    action.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text-muted)]\"\n                  )}>\n                    {action.icon}\n                  </span>\n                  <span className=\"text-sm\">{action.title}</span>\n                </motion.button>\n              ))}\n            </motion.div>\n          </motion.div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n\n  return (\n    <div ref={ref} className={cn(\"relative\", className)}>\n      <div ref={childRef} onContextMenu={handleContextMenu}>\n        {children}\n      </div>\n      {createPortal(overlay, document.body)}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Child React nodes rendered inside the component."
      },
      {
        "name": "actions",
        "type": "ContextAction[]",
        "required": true,
        "description": ""
      },
      {
        "name": "previewContent",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "floating-action",
    "name": "MobileFloatingAction",
    "file": "src/components/liquid-glass/MobileFloatingAction.tsx",
    "category": "Layout & Surfaces",
    "description": "Liquid Glass FloatingAction component.",
    "usage": "<MobileFloatingAction />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, type ReactNode } from \"react\";\nimport { Plus, X } from \"lucide-react\";\nimport { useLiquidPress } from \"./useLiquidPress\";\nimport { LiquidGlassPressSplash } from \"./LiquidGlassPressSplash\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useLiquidTapScale, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface FabAction {\n  id: string;\n  icon: ReactNode;\n  label: string;\n  onClick: () => void;\n}\n\ninterface MobileFloatingActionButtonProps {\n  className?: string;\n  icon?: ReactNode;\n  expandedIcon?: ReactNode;\n  actions?: FabAction[];\n  onClick?: () => void;\n  position?: \"bottom-right\" | \"bottom-left\";\n  color?: string;\n  variant?: \"chrome\" | \"colored\" | \"ghost\" | \"glow\";\n}\n\nexport function MobileFloatingActionButton({\n  className,\n  icon = <Plus size={24} />,\n  expandedIcon = <X size={24} />,\n  actions,\n  onClick,\n  position = \"bottom-right\",\n  color = \"from-liquid-blue to-liquid-purple\",\n  variant = \"chrome\",\n}: MobileFloatingActionButtonProps) {\n  const tapScale = useLiquidTapScale();\n  const scaleTransition = useLiquidTransition();\n  const chromeFill = useGlassSurface({ variant: \"fill\", opacity: 0.1 });\n  const chromeGlow = useGlassSurface({ variant: \"fill\", opacity: 0.15 });\n  const coloredGlow = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n  const [isOpen, setIsOpen] = useState(false);\n  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =\n    useLiquidPress<HTMLButtonElement>();\n\n  const toggle = () => {\n    setIsOpen(!isOpen);\n    if (!isOpen) onClick?.();\n  };\n\n  const positionClass =\n    position === \"bottom-right\" ? \"bottom-20 right-4\" : \"bottom-20 left-4\";\n\n  const isColored = variant === \"colored\" || variant === \"glow\";\n  const isGlow = variant === \"glow\";\n  const isGhost = variant === \"ghost\";\n\n  const mainClasses = cn(\n    \"relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden isolate\",\n    isGhost\n      ? \"glass-blur-sm glass-surface glass-border text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]\"\n      : isColored\n        ? cn(\"bg-gradient-to-br\", color, \"text-white\")\n        : \"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong text-[var(--lg-text)]\",\n    isGlow && \"shadow-[0_0_30px_rgba(59,130,246,0.35)]\",\n    !isGhost && !isColored && \"shadow-lg shadow-black/20\"\n  );\n\n  return (\n    <div\n      className={cn(\n        \"fixed z-40 flex flex-col items-end gap-3\",\n        positionClass,\n        className\n      )}\n    >\n      <AnimatePresence>\n        {isOpen && actions && (\n          <div\n            className={cn(\n              \"absolute bottom-full mb-3 flex flex-col gap-3 z-50 pointer-events-auto\",\n              position === \"bottom-right\" ? \"right-0 items-end\" : \"left-0 items-start\"\n            )}\n          >\n            {actions.map((action, i) => (\n              <ActionButton\n                key={action.id}\n                action={action}\n                index={i}\n                onClose={() => setIsOpen(false)}\n              />\n            ))}\n          </div>\n        )}\n      </AnimatePresence>\n\n      <motion.button\n        whileTap={{ scale: tapScale }}\n        transition={{\n          scale: scaleTransition,\n          rotate: { duration: 0.2, ease: \"easeOut\" },\n        }}\n        onClick={toggle}\n        onPointerDown={onPointerDown}\n        onPointerUp={onPointerUp}\n        onPointerLeave={onPointerLeave}\n        onPointerCancel={onPointerCancel}\n        animate={{ rotate: isOpen ? 45 : 0 }}\n        className={mainClasses}\n      >\n        {/* Chrome liquid-glass overlays */}\n        {!isGhost && !isColored && (\n          <>\n            <div className=\"absolute inset-0\" style={{ background: chromeFill.style.background }} />\n            <GlassTopHighlight className=\"inset-x-3 top-0.5 z-10\" opacity={0.45} />\n            <div className=\"pointer-events-none absolute -top-4 -right-4 h-12 w-12 rounded-full blur-xl\" style={{ background: chromeGlow.style.background }} />\n            <GlassSheen opacity={0.15} />\n          </>\n        )}\n        {isColored && (\n          <>\n            <GlassTopHighlight className=\"inset-x-3 top-0.5 z-10\" opacity={0.4} />\n            <div className=\"pointer-events-none absolute -top-3 -right-3 h-10 w-10 rounded-full blur-lg\" style={{ background: coloredGlow.style.background }} />\n          </>\n        )}\n\n        <LiquidGlassPressSplash press={press} size={160} duration={0.25} />\n        <span className=\"relative z-10\">{isOpen ? expandedIcon : icon}</span>\n      </motion.button>\n    </div>\n  );\n}\n\nfunction ActionButton({\n  action,\n  index,\n  onClose,\n}: {\n  action: FabAction;\n  index: number;\n  onClose: () => void;\n}) {\n  const actionGlow = useGlassSurface({ variant: \"fill\", opacity: 0.1 });\n  const actionTapScale = useLiquidTapScale();\n  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =\n    useLiquidPress<HTMLButtonElement>();\n\n  return (\n    <motion.div\n      initial={{ opacity: 0, scale: 0.5, y: 10 }}\n      animate={{ opacity: 1, scale: 1, y: 0 }}\n      exit={{ opacity: 0, scale: 0.5, y: 10 }}\n      transition={useLiquidTransition({ delay: index * 0.03 })}\n      className=\"flex items-center gap-2\"\n    >\n      <span className=\"px-2 py-1 rounded-lg glass-blur-sm glass-surface glass-border text-xs text-[var(--lg-text-secondary)] whitespace-nowrap\">\n        {action.label}\n      </span>\n      <motion.button\n        whileTap={{ scale: actionTapScale }}\n        onPointerDown={onPointerDown}\n        onPointerUp={onPointerUp}\n        onPointerLeave={onPointerLeave}\n        onPointerCancel={onPointerCancel}\n        onClick={() => {\n          action.onClick();\n          onClose();\n        }}\n        className=\"relative flex h-10 w-10 items-center justify-center rounded-full overflow-hidden glass-blur glass-surface-strong glass-border glass-highlight text-[var(--lg-text-secondary)]\"\n      >\n        <GlassTopHighlight className=\"inset-x-2 top-0.5\" opacity={0.25} />\n        <div className=\"pointer-events-none absolute -top-2 -right-2 h-6 w-6 rounded-full blur-md\" style={{ background: actionGlow.style.background }} />\n        <LiquidGlassPressSplash press={press} size={90} duration={0.3} />\n        {action.icon}\n      </motion.button>\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element to display."
      },
      {
        "name": "expandedIcon",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "actions",
        "type": "FabAction[]",
        "required": false,
        "description": ""
      },
      {
        "name": "onClick",
        "type": "() => void",
        "required": false,
        "description": "Callback when the element is clicked."
      },
      {
        "name": "position",
        "type": "\"bottom-right\" | \"bottom-left\"",
        "required": false,
        "description": ""
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "variant",
        "type": "\"chrome\" | \"colored\" | \"ghost\" | \"glow\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "page-indicator",
    "name": "MobilePageIndicator",
    "file": "src/components/liquid-glass/MobilePageIndicator.tsx",
    "category": "Media & Content",
    "description": "Dots, line, or fraction page indicator.",
    "usage": "<MobilePageIndicator />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface MobilePageIndicatorProps {\n  currentPage: number;\n  totalPages: number;\n  className?: string;\n  variant?: \"dots\" | \"line\" | \"fraction\";\n  activeColor?: string;\n  inactiveColor?: string;\n}\n\nexport function MobilePageIndicator({\n  currentPage,\n  totalPages,\n  className,\n  variant = \"dots\",\n  activeColor = \"bg-white\",\n  inactiveColor = \"bg-white/20\",\n}: MobilePageIndicatorProps) {\n  const transition = useLiquidTransition();\n  if (variant === \"line\") {\n    return (\n      <div className={cn(\"flex gap-1\", className)}>\n        {Array.from({ length: totalPages }).map((_, i) => (\n          <motion.div\n            key={i}\n            animate={{\n              width: i === currentPage ? 24 : 6,\n              opacity: i === currentPage ? 1 : 0.4,\n            }}\n            transition={transition}\n            className={cn(\"h-1.5 rounded-full\", i === currentPage ? activeColor : inactiveColor)}\n          />\n        ))}\n      </div>\n    );\n  }\n\n  if (variant === \"fraction\") {\n    return (\n      <span className={cn(\n        \"text-sm font-medium tabular-nums\",\n        className\n      )}>\n        <span className=\"text-[var(--lg-text-secondary)]\">{currentPage + 1}</span>\n        <span className=\"text-[var(--lg-text-muted)] mx-1\">/</span>\n        <span className=\"text-[var(--lg-text-muted)]\">{totalPages}</span>\n      </span>\n    );\n  }\n\n  return (\n    <div className={cn(\"flex items-center gap-1.5\", className)}>\n      {Array.from({ length: totalPages }).map((_, i) => (\n        <motion.button\n          key={i}\n          animate={{\n            scale: i === currentPage ? 1.2 : 1,\n            width: i === currentPage ? 20 : 8,\n          }}\n          transition={transition}\n          className={cn(\n            \"h-2 rounded-full transition-colors\",\n            i === currentPage ? activeColor : inactiveColor\n          )}\n        />\n      ))}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "currentPage",
        "type": "number",
        "required": true,
        "description": ""
      },
      {
        "name": "totalPages",
        "type": "number",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"dots\" | \"line\" | \"fraction\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "activeColor",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "inactiveColor",
        "type": "string",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "permission-dialog",
    "name": "MobilePermissionDialog",
    "file": "src/components/liquid-glass/MobilePermissionDialog.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Permission request sheet with toggles.",
    "usage": "<MobilePermissionDialog />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState } from \"react\";\nimport { LiquidGlassToggle } from \"./LiquidGlassToggle\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport {\n  useLiquidSlideVariants,\n  useLiquidTransition,\n  useLiquidTapScale,\n} from \"./useLiquidMotion\";\n\ninterface Permission {\n  id: string;\n  title: string;\n  description: string;\n  icon: React.ReactNode;\n  granted?: boolean;\n}\n\ninterface MobilePermissionDialogProps {\n  isOpen: boolean;\n  onClose: () => void;\n  title: string;\n  message: string;\n  permissions: Permission[];\n  onGrantAll?: () => void;\n  className?: string;\n}\n\nexport function MobilePermissionDialog({\n  isOpen,\n  onClose,\n  title,\n  message,\n  permissions,\n  onGrantAll,\n  className,\n}: MobilePermissionDialogProps) {\n  const slideVariants = useLiquidSlideVariants(\"bottom\");\n  const transition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  const handleFill = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n  const [permMap, setPermMap] = useState<Record<string, boolean>>(\n    Object.fromEntries(permissions.map((p) => [p.id, p.granted ?? false]))\n  );\n\n  const togglePerm = (id: string) => {\n    setPermMap((prev) => ({ ...prev, [id]: !prev[id] }));\n  };\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className=\"fixed inset-0 z-[60] flex items-end justify-center\">\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}\n            className=\"glass-backdrop\"\n          />\n\n          <motion.div\n            {...slideVariants}\n            transition={transition}\n            className={cn(\n              \"relative w-full max-w-lg mx-auto mb-2\",\n              \"glass-blur-xl glass-surface glass-border\",\n              \"rounded-t-3xl overflow-hidden\",\n              className\n            )}\n          >\n            <div className=\"flex justify-center pt-3 pb-1\">\n              <div className=\"w-10 h-1 rounded-full\" style={{ background: handleFill.style.background }} />\n            </div>\n\n            <div className=\"px-6 py-4\">\n              <h3 className=\"text-lg font-semibold text-[var(--lg-text)] mb-2\">{title}</h3>\n              <p className=\"text-sm text-[var(--lg-text-muted)] leading-relaxed mb-6\">{message}</p>\n\n              <div className=\"space-y-2 mb-6\">\n                {permissions.map((perm) => (\n                  <motion.button\n                    key={perm.id}\n                    whileTap={{ scale: tapScale }}\n                    onClick={() => togglePerm(perm.id)}\n                    className={cn(\n                      \"flex w-full items-center gap-3 p-3 rounded-xl transition-colors\",\n                      permMap[perm.id] ? \"bg-[var(--lg-border-subtle)]\" : \"bg-[var(--lg-border-subtle)] hover:bg-[var(--lg-border-subtle)]\"\n                    )}\n                  >\n                    <div className={cn(\n                      \"flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0\",\n                      permMap[perm.id] ? \"bg-liquid-blue/15\" : \"bg-[var(--lg-border-subtle)]\"\n                    )}>\n                      <span className={cn(\n                        permMap[perm.id] ? \"text-liquid-blue\" : \"text-[var(--lg-text-muted)]\"\n                      )}>\n                        {perm.icon}\n                      </span>\n                    </div>\n                    <div className=\"flex-1 text-left\">\n                      <p className={cn(\n                        \"text-sm font-medium\",\n                        permMap[perm.id] ? \"text-[var(--lg-text-secondary)]\" : \"text-[var(--lg-text-muted)]\"\n                      )}>\n                        {perm.title}\n                      </p>\n                      <p className=\"text-xs text-[var(--lg-text-muted)]\">{perm.description}</p>\n                    </div>\n                    <LiquidGlassToggle\n                      checked={permMap[perm.id] ?? false}\n                      onChange={() => togglePerm(perm.id)}\n                      variant=\"ios26\"\n                      size=\"sm\"\n                    />\n                  </motion.button>\n                ))}\n              </div>\n\n              <div className=\"flex gap-3\">\n                <motion.button\n                  whileTap={{ scale: tapScale }}\n                  onClick={onClose}\n                  className=\"flex-1 py-3 rounded-xl text-sm font-semibold text-[var(--lg-text-muted)] hover:bg-[var(--lg-border-subtle)] transition-colors\"\n                >\n                  Not Now\n                </motion.button>\n                <motion.button\n                  whileTap={{ scale: tapScale }}\n                  onClick={onGrantAll}\n                  className=\"flex-1 py-3 rounded-xl text-sm font-semibold text-white glass-blur-sm bg-liquid-blue/20 border border-liquid-blue/30\"\n                >\n                  Allow All\n                </motion.button>\n              </div>\n            </div>\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n}\n\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Title text."
      },
      {
        "name": "message",
        "type": "string",
        "required": true,
        "description": "Message content."
      },
      {
        "name": "permissions",
        "type": "Permission[]",
        "required": true,
        "description": ""
      },
      {
        "name": "onGrantAll",
        "type": "() => void",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "search-bar",
    "name": "MobileSearchBar",
    "file": "src/components/liquid-glass/MobileSearchBar.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "iOS-style search bar with cancel button.",
    "usage": "<MobileSearchBar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { Search, X } from \"lucide-react\";\nimport { useState, useRef, useEffect } from \"react\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface MobileSearchBarProps {\n  placeholder?: string;\n  value?: string;\n  onChange?: (value: string) => void;\n  onCancel?: () => void;\n  showCancelButton?: boolean;\n  className?: string;\n  autoFocus?: boolean;\n}\n\nexport function MobileSearchBar({\n  placeholder = \"Search\",\n  value: controlledValue,\n  onChange,\n  onCancel,\n  showCancelButton,\n  className,\n  autoFocus = false,\n}: MobileSearchBarProps) {\n  const transition = useLiquidTransition();\n  const [value, setValue] = useState(controlledValue || \"\");\n  const [isFocused, setIsFocused] = useState(false);\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    setValue(controlledValue || \"\");\n  }, [controlledValue]);\n\n  useEffect(() => {\n    if (autoFocus) inputRef.current?.focus();\n  }, [autoFocus]);\n\n  const isActive = isFocused || value.length > 0;\n  const isControlled = controlledValue !== undefined;\n  const displayValue = isControlled ? controlledValue : value;\n\n  const handleClear = () => {\n    if (isControlled) {\n      onChange?.(\"\");\n    } else {\n      setValue(\"\");\n    }\n    inputRef.current?.focus();\n  };\n\n  return (\n    <motion.div\n      animate={{\n        scale: isFocused ? 1.01 : 1,\n        ...(isFocused && {\n          boxShadow:\n            \"inset 0 1px 0 var(--lg-highlight-top), inset 0 -1px 0 var(--lg-highlight-bottom), 0 0 24px rgba(255,255,255,0.12)\",\n        }),\n      }}\n      transition={transition}\n      className={cn(\n        \"relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 overflow-hidden\",\n        \"glass-blur glass-surface-strong glass-border glass-highlight\",\n        isActive && \"ring-2 ring-white/20\",\n        className\n      )}\n    >\n      {/* Top highlight */}\n      <GlassTopHighlight className=\"inset-x-3 top-0\" opacity={0.3} />\n      {/* Reflection blob */}\n      <div className=\"pointer-events-none absolute -top-5 -right-5 h-14 w-14 rounded-full glass-reflection blur-2xl\" />\n      {/* Sheen */}\n      <GlassSheen opacity={0.12} />\n\n      <Search size={16} className=\"relative z-10 text-[var(--lg-text-muted)] flex-shrink-0\" />\n\n      <input\n        ref={inputRef}\n        value={displayValue}\n        onChange={(e) => {\n          if (isControlled) onChange?.(e.target.value);\n          else setValue(e.target.value);\n        }}\n        onFocus={() => setIsFocused(true)}\n        onBlur={() => setIsFocused(false)}\n        placeholder={placeholder}\n        className=\"relative z-10 flex-1 bg-transparent text-sm text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none\"\n      />\n\n      <AnimatePresence>\n        {displayValue.length > 0 && (\n          <motion.button\n            initial={{ scale: 0 }}\n            animate={{ scale: 1 }}\n            exit={{ scale: 0 }}\n            onClick={handleClear}\n            className=\"relative z-10 flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n          >\n            <X size={16} />\n          </motion.button>\n        )}\n      </AnimatePresence>\n\n      {(showCancelButton || isActive) && (\n        <button\n          className=\"relative z-10 flex-shrink-0 text-sm font-medium text-liquid-blue\"\n          onClick={() => {\n            handleClear();\n            onCancel?.();\n          }}\n        >\n          Cancel\n        </button>\n      )}\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder text."
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Callback when the value changes."
      },
      {
        "name": "onCancel",
        "type": "() => void",
        "required": false,
        "description": ""
      },
      {
        "name": "showCancelButton",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "autoFocus",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "segmented-control",
    "name": "MobileSegmentedControl",
    "file": "src/components/liquid-glass/MobileSegmentedControl.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "iOS segmented control.",
    "usage": "<MobileSegmentedControl />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { useTheme } from \"./ThemeProvider\";\nimport type { ReactNode } from \"react\";\nimport { useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface Segment {\n  id: string;\n  label: ReactNode;\n  icon?: ReactNode;\n}\n\ninterface MobileSegmentedControlProps {\n  segments: Segment[];\n  selected: string;\n  onChange: (id: string) => void;\n  className?: string;\n  size?: \"sm\" | \"md\";\n  variant?: \"default\" | \"ios26\";\n}\n\nexport function MobileSegmentedControl({\n  segments,\n  selected,\n  onChange,\n  className,\n  size = \"md\",\n  variant = \"default\",\n}: MobileSegmentedControlProps) {\n  const transition = useLiquidTransition();\n  const { isDark } = useTheme();\n  const selectedIndex = segments.findIndex((s) => s.id === selected);\n  const isIos26 = variant === \"ios26\";\n\n  return (\n    <div\n      className={cn(\n        \"relative inline-flex rounded-xl overflow-hidden\",\n        isIos26 ? \"glass-blur-lg glass-surface-strong glass-border p-1\" : \"bg-[var(--lg-border-subtle)] border border-[var(--lg-border-subtle)] p-0.5\",\n        size === \"sm\" ? \"h-8\" : \"h-10\",\n        className\n      )}\n    >\n      {/* Animated background pill */}\n      <motion.div\n        layout\n        className={cn(\n          \"absolute top-1 bottom-1 rounded-lg\",\n          isIos26\n            ? \"glass-surface-strong border border-[var(--lg-border-subtle)] shadow-inner\"\n            : \"bg-[var(--lg-border)] border border-[var(--lg-border-subtle)]\"\n        )}\n        style={{\n          left: `calc(${100 / segments.length * selectedIndex}% + 4px)`,\n          width: `calc(${100 / segments.length}% - 8px)`,\n        }}\n        transition={transition}\n      >\n        {isIos26 && <div className=\"pointer-events-none absolute inset-x-2 top-0.5 h-px bg-[var(--lg-border)] rounded-full\" />}\n      </motion.div>\n\n      {segments.map((segment) => (\n        <button\n          key={segment.id}\n          onClick={() => onChange(segment.id)}\n          className={cn(\n            \"relative z-10 flex-1 flex items-center justify-center gap-1.5\",\n            \"transition-colors select-none\",\n            selected === segment.id\n              ? isDark ? \"text-white font-medium\" : \"text-black font-medium\"\n              : isDark ? \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\" : \"text-black/40 hover:text-black/60\",\n            size === \"sm\" ? \"text-xs\" : \"text-sm\"\n          )}\n        >\n          {segment.icon}\n          {segment.label}\n        </button>\n      ))}\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "segments",
        "type": "Segment[]",
        "required": true,
        "description": ""
      },
      {
        "name": "selected",
        "type": "string",
        "required": true,
        "description": ""
      },
      {
        "name": "onChange",
        "type": "(id: string) => void",
        "required": true,
        "description": "Callback when the value changes."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\"",
        "required": false,
        "description": "Size preset."
      },
      {
        "name": "variant",
        "type": "\"default\" | \"ios26\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "slide-menu",
    "name": "MobileSlideMenu",
    "file": "src/components/liquid-glass/MobileSlideMenu.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Slide-in side menu for mobile.",
    "usage": "<MobileSlideMenu />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport type { ReactNode } from \"react\";\nimport { X, ChevronRight } from \"lucide-react\";\nimport {\n  useLiquidSlideVariants,\n  useLiquidTransition,\n  useLiquidTapScale,\n} from \"./useLiquidMotion\";\n\ninterface MenuSection { title: string; items: MenuItem[]; }\ninterface MenuItem { id: string; label: string; icon: ReactNode; badge?: number; destructive?: boolean; onClick?: () => void; }\n\ninterface MobileSlideMenuProps {\n  isOpen: boolean;\n  onClose: () => void;\n  sections: MenuSection[];\n  header?: ReactNode;\n  footer?: ReactNode;\n  className?: string;\n  position?: \"left\" | \"right\";\n  width?: string;\n  variant?: \"default\" | \"compact\" | \"floating\";\n}\n\nexport function MobileSlideMenu({\n  isOpen, onClose, sections, header, footer, className,\n  position = \"left\", width = \"280px\", variant = \"default\",\n}: MobileSlideMenuProps) {\n  const isLeft = position === \"left\";\n  const slideVariants = useLiquidSlideVariants(position);\n  const transition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  const isFloating = variant === \"floating\";\n\n  return (\n    <AnimatePresence>\n      {isOpen && (\n        <div className=\"fixed inset-0 z-[55]\">\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}\n            onClick={onClose} className=\"glass-backdrop-overlay\" />\n          <motion.div\n            {...slideVariants}\n            transition={transition}\n            className={cn(\n              \"absolute top-0 bottom-0\",\n              isLeft ? \"left-0\" : \"right-0\",\n              isFloating ? \"m-3 rounded-3xl\" : \"\",\n              \"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong\",\n              \"flex flex-col overflow-hidden\",\n              className\n            )}\n            style={{ width, maxWidth: isFloating ? \"calc(85vw - 24px)\" : \"85vw\" }}\n          >\n            <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n            <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl\" />\n\n            {header || (\n              <div className=\"flex items-center justify-between px-5 py-4 border-b border-[var(--lg-border)]\">\n                <h3 className=\"text-base font-semibold text-[var(--lg-text)]\">Menu</h3>\n                <motion.button whileTap={{ scale: tapScale }} onClick={onClose}\n                  className=\"flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lg-border)] text-[var(--lg-text-muted)]\">\n                  <X size={16} />\n                </motion.button>\n              </div>\n            )}\n\n            <div className=\"flex-1 overflow-y-auto py-2\">\n              {sections.map((section, si) => (\n                <div key={si}>\n                  {section.title && (\n                    <div className=\"px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--lg-text-muted)]\">\n                      {section.title}\n                    </div>\n                  )}\n                  {section.items.map((item) => (\n                    <motion.button key={item.id} whileTap={{ scale: tapScale }}\n                      onClick={() => { item.onClick?.(); onClose(); }}\n                      className={cn(\n                        \"flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-[var(--lg-border)]\",\n                        item.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text)]\"\n                      )}>\n                      <span className={item.destructive ? \"text-liquid-rose\" : \"text-[var(--lg-text-muted)]\"}>{item.icon}</span>\n                      <span className=\"flex-1 text-sm\">{item.label}</span>\n                      {!item.destructive && <ChevronRight size={14} className=\"text-[var(--lg-text-muted)]\" />}\n                    </motion.button>\n                  ))}\n                  {si < sections.length - 1 && <div className=\"mx-5 my-1 h-px bg-[var(--lg-border)]\" />}\n                </div>\n              ))}\n            </div>\n\n            {footer && <div className=\"border-t border-[var(--lg-border)] p-4\">{footer}</div>}\n          </motion.div>\n        </div>\n      )}\n    </AnimatePresence>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "sections",
        "type": "MenuSection[]",
        "required": true,
        "description": ""
      },
      {
        "name": "header",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "position",
        "type": "\"left\" | \"right\"",
        "required": false,
        "description": ""
      },
      {
        "name": "width",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "variant",
        "type": "\"default\" | \"compact\" | \"floating\"",
        "required": false,
        "description": "Visual variant to use."
      }
    ]
  },
  {
    "id": "snackbar",
    "name": "MobileSnackbar",
    "file": "src/components/liquid-glass/MobileSnackbar.tsx",
    "category": "Feedback & Status",
    "description": "Bottom snackbar with progress and action.",
    "usage": "<MobileSnackbar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState, useEffect } from \"react\";\nimport { X } from \"lucide-react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { useLiquidSlideVariants, useLiquidTransition } from \"./useLiquidMotion\";\n\n\ninterface MobileSnackbarProps {\n  message: string;\n  action?: { label: string; onClick: () => void };\n  variant?: \"info\" | \"success\" | \"error\" | \"warning\";\n  duration?: number;\n  className?: string;\n}\n\nexport function MobileSnackbar({\n  message,\n  action,\n  variant = \"info\",\n  duration = 4000,\n  className,\n}: MobileSnackbarProps) {\n  const slideVariants = useLiquidSlideVariants(\"bottom\");\n  const transition = useLiquidTransition();\n  const progressFill = useGlassSurface({ variant: \"fill\", opacity: 0.2 });\n  const [visible, setVisible] = useState(true);\n  const [progress, setProgress] = useState(100);\n\n  useEffect(() => {\n    setVisible(true);\n    setProgress(100);\n\n    const start = Date.now();\n    const interval = setInterval(() => {\n      const elapsed = Date.now() - start;\n      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);\n      setProgress(remaining);\n      if (remaining <= 0) {\n        clearInterval(interval);\n        setVisible(false);\n      }\n    }, 50);\n\n    return () => clearInterval(interval);\n  }, [duration, message]);\n\n  const variantConfig = {\n    info: { bg: \"bg-[var(--lg-border)]\", icon: \"info\" },\n    success: { bg: \"bg-liquid-emerald/15\", icon: \"success\" },\n    error: { bg: \"bg-liquid-rose/15\", icon: \"error\" },\n    warning: { bg: \"bg-liquid-amber/15\", icon: \"warning\" },\n  };\n\n  const config = variantConfig[variant];\n\n  return (\n    <AnimatePresence>\n      {visible && (\n        <motion.div\n          {...slideVariants}\n          transition={transition}\n          className={cn(\n            \"fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto\",\n            \"rounded-2xl overflow-hidden\",\n            \"glass-blur-xl glass-surface glass-border glass-highlight-strong\",\n            className\n          )}\n        >\n          {/* Top highlight */}\n          <GlassTopHighlight className=\"inset-x-0 top-0\" opacity={0.2} />\n\n          <div className=\"flex items-center gap-3 px-4 py-3\">\n            <div className={cn(\"flex-1 flex items-center gap-2.5 min-w-0\")}>\n              <span className={cn(\n                \"flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0\",\n                config.bg\n              )}>\n                <span className=\"text-xs font-bold text-[var(--lg-text-secondary)]\">\n                  {variant[0].toUpperCase()}\n                </span>\n              </span>\n              <p className=\"text-sm text-[var(--lg-text-secondary)]\">{message}</p>\n            </div>\n\n            {action && (\n              <button\n                className=\"flex-shrink-0 text-sm font-semibold text-liquid-blue\"\n                onClick={action.onClick}\n              >\n                {action.label}\n              </button>\n            )}\n\n            <button\n              className=\"flex-shrink-0 text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\"\n              onClick={() => setVisible(false)}\n            >\n              <X size={16} />\n            </button>\n          </div>\n\n          {/* Progress bar */}\n          <div className=\"h-0.5 bg-[var(--lg-border-subtle)]\">\n            <motion.div\n              className=\"h-full\"\n              style={{ width: `${progress}%`, background: progressFill.style.background }}\n              transition={{ ease: \"linear\", duration: 0.05 }}\n            />\n          </div>\n        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n}\n",
    "props": [
      {
        "name": "message",
        "type": "string",
        "required": true,
        "description": "Message content."
      },
      {
        "name": "variant",
        "type": "\"info\" | \"success\" | \"error\" | \"warning\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "splash-screen",
    "name": "MobileSplashScreen",
    "file": "src/components/liquid-glass/MobileSplashScreen.tsx",
    "category": "Modals, Drawers & Sheets",
    "description": "Onboarding splash screen with slides.",
    "usage": "<MobileSplashScreen />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion, AnimatePresence } from \"framer-motion\";\nimport { useState } from \"react\";\nimport type { ReactNode } from \"react\";\nimport { useGlassSurface } from \"./useGlassSurface\";\nimport { useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface SplashSlide {\n  id: string;\n  title: string;\n  subtitle: string;\n  icon: ReactNode;\n  gradient: string;\n}\n\ninterface MobileSplashScreenProps {\n  isOpen: boolean;\n  onClose: () => void;\n  slides: SplashSlide[];\n  className?: string;\n  getStartedText?: string;\n  skipText?: string;\n}\n\nexport function MobileSplashScreen({\n  isOpen,\n  onClose,\n  slides,\n  className,\n  getStartedText = \"Get Started\",\n  skipText = \"Skip\",\n}: MobileSplashScreenProps) {\n  const transition = useLiquidTransition();\n  const buttonFill = useGlassSurface({ variant: \"fill\", opacity: 0.15 });\n  const [currentSlide, setCurrentSlide] = useState(0);\n  const isLastSlide = currentSlide === slides.length - 1;\n\n  if (!isOpen) return null;\n\n  const slide = slides[currentSlide];\n\n  return (\n    <motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      exit={{ opacity: 0 }}\n      className={cn(\n        \"fixed inset-0 z-[70] flex flex-col items-center justify-between\",\n        \"bg-[#0a0a0f]\",\n        className\n      )}\n    >\n      {/* Background gradient */}\n      <div className={cn(\n        \"absolute inset-0 transition-all duration-700\",\n        slide.gradient\n      )}>\n        <div className=\"absolute inset-0 bg-black/40\" />\n      </div>\n\n      {/* Skip button */}\n      <div className=\"relative z-10 w-full max-w-lg flex justify-end p-6\">\n        <button\n          onClick={onClose}\n          className=\"text-sm font-medium text-white/50 hover:text-white/80 transition-colors\"\n        >\n          {skipText}\n        </button>\n      </div>\n\n      {/* Content */}\n      <div className=\"relative z-10 flex flex-col items-center text-center px-10 max-w-lg\">\n        <AnimatePresence mode=\"wait\">\n          <motion.div\n            key={slide.id}\n            initial={{ opacity: 0, y: 20, scale: 0.9 }}\n            animate={{ opacity: 1, y: 0, scale: 1 }}\n            exit={{ opacity: 0, y: -20, scale: 0.9 }}\n            transition={transition}\n            className=\"flex flex-col items-center\"\n          >\n            {/* Icon */}\n            <div className=\"mb-8 flex h-32 w-32 items-center justify-center rounded-3xl glass-blur-lg glass-surface glass-border glass-highlight-strong\">\n              <div className=\"text-white/80 scale-150\">{slide.icon}</div>\n            </div>\n\n            <h2 className=\"text-2xl font-bold text-white mb-2\">{slide.title}</h2>\n            <p className=\"text-sm text-white/50 leading-relaxed\">{slide.subtitle}</p>\n          </motion.div>\n        </AnimatePresence>\n      </div>\n\n      {/* Bottom controls */}\n      <div className=\"relative z-10 w-full max-w-lg flex flex-col items-center gap-6 pb-12 px-8\">\n        {/* Page indicators */}\n        <div className=\"flex items-center gap-2\">\n          {slides.map((_, i) => (\n            <button\n              key={i}\n              onClick={() => setCurrentSlide(i)}\n              className={cn(\n                \"h-1.5 rounded-full transition-all duration-300\",\n                i === currentSlide\n                  ? \"w-8 bg-white\"\n                  : \"w-1.5 bg-white/30 hover:bg-white/50\"\n              )}\n            />\n          ))}\n        </div>\n\n        {/* Navigation buttons */}\n        <div className=\"flex w-full gap-3\">\n          {!isLastSlide && (\n            <button\n              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}\n              className=\"flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white/50 glass-blur-sm glass-surface glass-border hover:bg-white/10 transition-colors\"\n            >\n              Back\n            </button>\n          )}\n          {isLastSlide ? (\n            <button\n              onClick={onClose}\n              className=\"flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white glass-blur-sm glass-border glass-highlight\"\n              style={{ background: buttonFill.style.background }}\n            >\n              {getStartedText}\n            </button>\n          ) : (\n            <button\n              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}\n              className=\"flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white glass-blur-sm glass-border glass-highlight\"\n              style={{ background: buttonFill.style.background }}\n            >\n              Next\n            </button>\n          )}\n        </div>\n      </div>\n    </motion.div>\n  );\n}\n",
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": true,
        "description": "Controlled open state."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": true,
        "description": "Callback when the component requests to close."
      },
      {
        "name": "slides",
        "type": "SplashSlide[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "getStartedText",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "skipText",
        "type": "string",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "mobile-stepper",
    "name": "MobileStepper",
    "file": "src/components/liquid-glass/MobileStepper.tsx",
    "category": "Inputs, Toggles & Pickers",
    "description": "Plus/minus stepper control.",
    "usage": "<MobileStepper />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport { Minus, Plus } from \"lucide-react\";\r\n\r\ninterface MobileStepperProps {\r\n  value: number;\r\n  onChange: (value: number) => void;\r\n  min?: number;\r\n  max?: number;\r\n  step?: number;\r\n  className?: string;\r\n  label?: string;\r\n  size?: \"sm\" | \"md\" | \"lg\";\r\n}\r\n\r\nexport function MobileStepper({\r\n  value,\r\n  onChange,\r\n  min = 0,\r\n  max = 99,\r\n  step = 1,\r\n  className,\r\n  label,\r\n  size = \"md\",\r\n}: MobileStepperProps) {\r\n  const sizeClasses = {\r\n    sm: \"gap-1.5 px-1.5 py-1\",\r\n    md: \"gap-2 px-2 py-1.5\",\r\n    lg: \"gap-3 px-3 py-2\",\r\n  };\r\n\r\n  const buttonSizes = {\r\n    sm: 24,\r\n    md: 30,\r\n    lg: 36,\r\n  };\r\n\r\n  const textSizes = {\r\n    sm: \"text-sm\",\r\n    md: \"text-base\",\r\n    lg: \"text-lg\",\r\n  };\r\n\r\n  const decrement = () => onChange(Math.max(min, value - step));\r\n  const increment = () => onChange(Math.min(max, value + step));\r\n\r\n  return (\r\n    <div className={cn(\"inline-flex items-center\", className)}>\r\n      {label && <span className=\"text-sm text-[var(--lg-text-muted)] mr-3\">{label}</span>}\r\n      <div\r\n        className={cn(\r\n          \"inline-flex items-center rounded-xl\",\r\n          \"glass-blur-sm glass-surface glass-border\",\r\n          sizeClasses[size]\r\n        )}\r\n      >\r\n        {/* Top highlight */}\r\n        <div className=\"absolute inset-x-1 top-0 h-px bg-[var(--lg-border)] rounded-full\" />\r\n\r\n        <motion.button\r\n          whileTap={{ scale: 0.85 }}\r\n          onClick={decrement}\r\n          disabled={value <= min}\r\n          className={cn(\r\n            \"flex items-center justify-center rounded-lg transition-all\",\r\n            \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\",\r\n            value <= min && \"opacity-30 cursor-not-allowed\"\r\n          )}\r\n          style={{ width: buttonSizes[size], height: buttonSizes[size] }}\r\n        >\r\n          <Minus size={buttonSizes[size] * 0.35} strokeWidth={2.5} />\r\n        </motion.button>\r\n\r\n        <motion.span\r\n          key={value}\r\n          initial={{ scale: 1.15 }}\r\n          animate={{ scale: 1 }}\r\n          className={cn(\r\n            \"min-w-[2ch] text-center tabular-nums font-semibold text-[var(--lg-text)]\",\r\n            textSizes[size]\r\n          )}\r\n        >\r\n          {value}\r\n        </motion.span>\r\n\r\n        <motion.button\r\n          whileTap={{ scale: 0.85 }}\r\n          onClick={increment}\r\n          disabled={value >= max}\r\n          className={cn(\r\n            \"flex items-center justify-center rounded-lg transition-all\",\r\n            \"text-[var(--lg-text-muted)] hover:text-[var(--lg-text-secondary)]\",\r\n            value >= max && \"opacity-30 cursor-not-allowed\"\r\n          )}\r\n          style={{ width: buttonSizes[size], height: buttonSizes[size] }}\r\n        >\r\n          <Plus size={buttonSizes[size] * 0.35} strokeWidth={2.5} />\r\n        </motion.button>\r\n      </div>\r\n    </div>\r\n  );\r\n}\r\n",
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Current value of the control."
      },
      {
        "name": "onChange",
        "type": "(value: number) => void",
        "required": true,
        "description": "Callback when the value changes."
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label text."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "required": false,
        "description": "Size preset."
      }
    ]
  },
  {
    "id": "swipeable-list",
    "name": "MobileSwipeableList",
    "file": "src/components/liquid-glass/MobileSwipeableList.tsx",
    "category": "Data Display",
    "description": "Swipeable list items with action buttons.",
    "usage": "<MobileSwipeableList />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\r\nimport { motion } from \"framer-motion\";\r\nimport type { ReactNode } from \"react\";\r\n\r\ninterface SwipeableItem {\r\n  id: string;\r\n  content: ReactNode;\r\n  leftActions?: { icon: ReactNode; color: string; onClick: () => void }[];\r\n  rightActions?: { icon: ReactNode; color: string; onClick: () => void }[];\r\n}\r\n\r\ninterface MobileSwipeableListProps {\r\n  items: SwipeableItem[];\r\n  className?: string;\r\n}\r\n\r\nexport function MobileSwipeableList({\r\n  items,\r\n  className,\r\n}: MobileSwipeableListProps) {\r\n  const [swipingId, setSwipingId] = useState<string | null>(null);\r\n  const [swipeOffset, setSwipeOffset] = useState(0);\r\n  const startX = useRef(0);\r\n  const actionWidth = 100;\r\n\r\n  const handleTouchStart = (id: string, e: React.TouchEvent) => {\r\n    setSwipingId(id);\r\n    startX.current = e.touches[0].clientX;\r\n  };\r\n\r\n  const handleTouchMove = (e: React.TouchEvent) => {\r\n    if (!swipingId) return;\r\n    const diff = e.touches[0].clientX - startX.current;\r\n    setSwipeOffset(diff);\r\n  };\r\n\r\n  const handleTouchEnd = () => {\r\n    if (!swipingId) return;\r\n    if (Math.abs(swipeOffset) > actionWidth / 2) {\r\n      // Stay open\r\n    } else {\r\n      setSwipeOffset(0);\r\n    }\r\n    setSwipingId(null);\r\n  };\r\n\r\n  const closeSwipe = () => setSwipeOffset(0);\r\n\r\n  return (\r\n    <div className={cn(\"space-y-1\", className)}>\r\n      {items.map((item) => (\r\n        <div key={item.id} className=\"relative overflow-hidden rounded-xl\">\r\n          {/* Background actions */}\r\n          <div className=\"absolute inset-0 flex\">\r\n            {/* Left actions */}\r\n            <div className=\"flex items-center\">\r\n              {item.leftActions?.map((action, i) => (\r\n                <button\r\n                  key={i}\r\n                  onClick={() => { action.onClick(); closeSwipe(); }}\r\n                  className=\"flex h-full items-center justify-center px-5\"\r\n                  style={{ backgroundColor: action.color }}\r\n                >\r\n                  {action.icon}\r\n                </button>\r\n              ))}\r\n            </div>\r\n            <div className=\"flex-1\" />\r\n            {/* Right actions */}\r\n            <div className=\"flex items-center flex-row-reverse\">\r\n              {item.rightActions?.map((action, i) => (\r\n                <button\r\n                  key={i}\r\n                  onClick={() => { action.onClick(); closeSwipe(); }}\r\n                  className=\"flex h-full items-center justify-center px-5\"\r\n                  style={{ backgroundColor: action.color }}\r\n                >\r\n                  {action.icon}\r\n                </button>\r\n              ))}\r\n            </div>\r\n          </div>\r\n\r\n          {/* Foreground card */}\r\n          <motion.div\r\n            onTouchStart={(e) => handleTouchStart(item.id, e)}\r\n            onTouchMove={handleTouchMove}\r\n            onTouchEnd={handleTouchEnd}\r\n            drag=\"x\"\r\n            dragConstraints={{ left: -120, right: 120 }}\r\n            dragElastic={0.8}\r\n            onDragEnd={(_, info) => {\r\n              if (Math.abs(info.offset.x) > 60) {\r\n                setSwipeOffset(info.offset.x > 0 ? 100 : -100);\r\n              } else {\r\n                setSwipeOffset(0);\r\n              }\r\n              setSwipingId(null);\r\n            }}\r\n            className=\"relative z-10\"\r\n          >\r\n            <div className={cn(\r\n              \"px-4 py-3 glass-blur-sm glass-surface glass-border\"\r\n            )}>\r\n              {item.content}\r\n            </div>\r\n          </motion.div>\r\n        </div>\r\n      ))}\r\n    </div>\r\n  );\r\n}\r\n\r\nimport { useState, useRef } from \"react\";\r\n",
    "props": [
      {
        "name": "items",
        "type": "SwipeableItem[]",
        "required": true,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      }
    ]
  },
  {
    "id": "top-nav-bar",
    "name": "MobileTopNavBar",
    "file": "src/components/liquid-glass/MobileTopNavBar.tsx",
    "category": "Navigation",
    "description": "Mobile top navigation bar with 5 layout variants.",
    "usage": "<MobileTopNavBar />",
    "sourceCode": "import { cn } from \"../../utils/cn\";\nimport { motion } from \"framer-motion\";\nimport { ChevronLeft, MoreVertical, Search } from \"lucide-react\";\nimport { useState, type ReactNode } from \"react\";\nimport { useLiquidPress } from \"./useLiquidPress\";\nimport { LiquidGlassPressSplash } from \"./LiquidGlassPressSplash\";\nimport { GlassTopHighlight } from \"./GlassTopHighlight\";\nimport { GlassSheen } from \"./GlassSheen\";\nimport { useLiquidTapScale, useLiquidTransition } from \"./useLiquidMotion\";\n\ninterface MobileTopNavBarProps {\n  title?: string;\n  subtitle?: string;\n  showBack?: boolean;\n  onBack?: () => void;\n  leftAction?: ReactNode;\n  rightActions?: ReactNode[];\n  className?: string;\n  variant?: \"standard\" | \"large\" | \"inline\" | \"search\" | \"prominent\";\n  translucent?: boolean;\n}\n\nfunction BackButton({ onBack }: { onBack?: () => void }) {\n  const tapScale = useLiquidTapScale();\n  const { state: press, onPointerDown, onPointerUp, onPointerLeave, onPointerCancel } =\n    useLiquidPress<HTMLButtonElement>();\n\n  return (\n    <motion.button\n      whileTap={{ scale: tapScale }}\n      onClick={onBack}\n      onPointerDown={onPointerDown}\n      onPointerUp={onPointerUp}\n      onPointerLeave={onPointerLeave}\n      onPointerCancel={onPointerCancel}\n      className=\"relative flex h-8 w-8 items-center justify-center rounded-xl glass-blur-sm glass-surface glass-border glass-highlight text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)] overflow-hidden\"\n    >\n      <LiquidGlassPressSplash press={press} size={80} />\n      <ChevronLeft size={20} strokeWidth={2.5} className=\"relative z-10\" />\n    </motion.button>\n  );\n}\n\nexport function MobileTopNavBar({\n  title,\n  subtitle,\n  showBack = true,\n  onBack,\n  leftAction,\n  rightActions,\n  className,\n  variant = \"standard\",\n  translucent = true,\n}: MobileTopNavBarProps) {\n  const searchTransition = useLiquidTransition();\n  const tapScale = useLiquidTapScale();\n  const [searchValue, setSearchValue] = useState(\"\");\n  const [searchFocused, setSearchFocused] = useState(false);\n\n  if (variant === \"large\") {\n    return (\n      <div className={cn(\n        \"relative z-40\",\n        translucent ? \"glass-blur-lg glass-surface glass-border\" : \"bg-[var(--lg-bg)] border-b border-[var(--lg-border)]\",\n        \"rounded-2xl overflow-hidden\",\n        className\n      )}>\n        <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n        <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl\" />\n        <div className=\"flex items-center justify-between px-4 h-11\">\n          <div className=\"flex items-center min-w-12\">\n            {leftAction || (showBack && <BackButton onBack={onBack} />)}\n          </div>\n          <div className=\"flex items-center gap-1 min-w-12 justify-end\">\n            {rightActions?.map((action, i) => <span key={i}>{action}</span>)}\n          </div>\n        </div>\n        <div className=\"px-5 pb-3\">\n          <h1 className=\"text-2xl font-bold text-[var(--lg-text)]\">{title}</h1>\n          {subtitle && <p className=\"text-xs text-[var(--lg-text-muted)] mt-0.5\">{subtitle}</p>}\n        </div>\n      </div>\n    );\n  }\n\n  if (variant === \"prominent\") {\n    return (\n      <div className={cn(\n        \"relative z-40\",\n        translucent ? \"glass-blur-xl glass-surface-strong glass-border glass-highlight-strong\" : \"bg-[var(--lg-bg)]\",\n        \"rounded-2xl overflow-hidden\",\n        className\n      )}>\n        <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n        <div className=\"pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--lg-reflection)] blur-2xl\" />\n        <div className=\"flex items-center justify-between px-4 h-11\">\n          <div className=\"flex items-center min-w-12\">\n            {leftAction || (showBack && <BackButton onBack={onBack} />)}\n          </div>\n          <div className=\"flex items-center gap-1 min-w-12 justify-end\">\n            {rightActions?.map((action, i) => <span key={i}>{action}</span>)}\n          </div>\n        </div>\n        <div className=\"px-5 pb-4 pt-1 text-center\">\n          <h1 className=\"text-xl font-bold text-[var(--lg-text)]\">{title}</h1>\n          {subtitle && <p className=\"text-xs text-[var(--lg-text-muted)] mt-1\">{subtitle}</p>}\n        </div>\n      </div>\n    );\n  }\n\n  if (variant === \"inline\") {\n    return (\n      <div className={cn(\n        \"relative z-40 flex items-center gap-3 px-4 h-11\",\n        translucent ? \"glass-blur glass-surface glass-border\" : \"bg-[var(--lg-bg)] border-b border-[var(--lg-border)]\",\n        \"rounded-2xl overflow-hidden\",\n        className\n      )}>\n        <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n        {leftAction || (showBack && <BackButton onBack={onBack} />)}\n        <div className=\"flex-1 min-w-0\">\n          <h1 className=\"text-sm font-semibold text-[var(--lg-text)] truncate\">{title}</h1>\n        </div>\n        <div className=\"flex items-center gap-1\">\n          {rightActions?.map((action, i) => <span key={i}>{action}</span>)}\n        </div>\n      </div>\n    );\n  }\n\n  if (variant === \"search\") {\n    return (\n      <div className={cn(\n        \"relative z-40\",\n        translucent ? \"glass-blur-lg glass-surface glass-border\" : \"bg-[var(--lg-bg)]\",\n        \"rounded-2xl overflow-hidden\",\n        className\n      )}>\n        <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n        <div className=\"flex items-center gap-3 px-4 h-12\">\n          {leftAction || (showBack && <BackButton onBack={onBack} />)}\n          <motion.div\n            animate={{\n              scale: searchFocused ? 1.01 : 1,\n              ...(searchFocused && {\n                boxShadow:\n                  \"inset 0 1px 0 var(--lg-highlight-top), inset 0 -1px 0 var(--lg-highlight-bottom), 0 0 24px rgba(255,255,255,0.12)\",\n              }),\n            }}\n            transition={searchTransition}\n            className={cn(\n              \"relative flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl overflow-hidden\",\n              \"glass-blur glass-surface-strong glass-border glass-highlight\",\n              searchFocused && \"ring-2 ring-white/20\"\n            )}\n          >\n            {/* Top highlight */}\n            <GlassTopHighlight className=\"inset-x-3 top-0\" opacity={0.25} />\n            {/* Reflection blob */}\n            <div className=\"pointer-events-none absolute -top-4 -right-4 h-12 w-12 rounded-full glass-reflection blur-xl\" />\n            {/* Sheen */}\n            <GlassSheen opacity={0.12} />\n            <Search size={14} className=\"relative z-10 text-[var(--lg-text-muted)] flex-shrink-0\" />\n            <input\n              type=\"text\"\n              value={searchValue}\n              onChange={(e) => setSearchValue(e.target.value)}\n              onFocus={() => setSearchFocused(true)}\n              onBlur={() => setSearchFocused(false)}\n              placeholder=\"Search...\"\n              className=\"relative z-10 flex-1 bg-transparent text-sm text-[var(--lg-text)] placeholder-[var(--lg-text-muted)] outline-none\"\n            />\n          </motion.div>\n          <div className=\"flex items-center gap-1\">\n            {rightActions?.map((action, i) => <span key={i}>{action}</span>)}\n          </div>\n        </div>\n      </div>\n    );\n  }\n\n  // Standard\n  return (\n    <div className={cn(\n      \"relative z-40 flex items-center justify-between px-4 h-12\",\n      translucent ? \"glass-blur-lg glass-surface glass-border\" : \"bg-[var(--lg-bg)] border-b border-[var(--lg-border)]\",\n      \"rounded-2xl overflow-hidden\",\n      className\n    )}>\n      <div className=\"pointer-events-none absolute inset-x-0 top-0 h-px glass-top-highlight\" />\n      <div className=\"pointer-events-none absolute -top-10 -right-10 h-20 w-20 rounded-full bg-[var(--lg-reflection)] blur-2xl\" />\n      <div className=\"flex items-center min-w-12\">\n        {leftAction || (showBack && <BackButton onBack={onBack} />)}\n      </div>\n      <div className=\"flex flex-col items-center absolute left-1/2 -translate-x-1/2\">\n        {title && <h1 className=\"text-sm font-medium text-[var(--lg-text)]\">{title}</h1>}\n        {subtitle && <p className=\"text-[10px] text-[var(--lg-text-muted)]\">{subtitle}</p>}\n      </div>\n      <div className=\"flex items-center gap-1 min-w-12 justify-end\">\n        {rightActions?.map((action, i) => <span key={i}>{action}</span>)}\n        {!rightActions?.length && (\n          <motion.button whileTap={{ scale: tapScale }} className=\"p-1 text-[var(--lg-text-muted)]\"><MoreVertical size={18} /></motion.button>\n        )}\n      </div>\n    </div>\n  );\n}\n",
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title text."
      },
      {
        "name": "subtitle",
        "type": "string",
        "required": false,
        "description": ""
      },
      {
        "name": "showBack",
        "type": "boolean",
        "required": false,
        "description": ""
      },
      {
        "name": "onBack",
        "type": "() => void",
        "required": false,
        "description": ""
      },
      {
        "name": "leftAction",
        "type": "ReactNode",
        "required": false,
        "description": ""
      },
      {
        "name": "rightActions",
        "type": "ReactNode[]",
        "required": false,
        "description": ""
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "variant",
        "type": "\"standard\" | \"large\" | \"inline\" | \"search\" | \"prominent\"",
        "required": false,
        "description": "Visual variant to use."
      },
      {
        "name": "translucent",
        "type": "boolean",
        "required": false,
        "description": ""
      }
    ]
  },
  {
    "id": "theme-provider",
    "name": "ThemeProvider",
    "file": "src/components/liquid-glass/ThemeProvider.tsx",
    "category": "Theme & Glass Primitives",
    "description": "Wraps your app to provide theme state, glass settings, and persistence.",
    "usage": "<ThemeProvider />",
    "sourceCode": "import { createContext, useContext, useState, useEffect, type ReactNode } from \"react\";\nimport type { KubeProfile } from \"./kube/profiles\";\nimport {\n  KubeFilter,\n  supportsKubeBackdropFilter,\n  kubePropsFromLiquidGlass,\n  LIQUID_GLASS_FILTER_ID,\n  LIQUID_GLASS_FILTER_LITE_ID,\n} from \"./kube\";\n\ntype Theme = \"dark\" | \"light\";\nexport type GlassMode = \"glass\" | \"liquid-glass\";\n\nexport interface GlassSettings {\n  blur: number;\n  transparency: number;\n  saturation: number;\n}\n\nexport interface LiquidGlassSettings {\n  profile: KubeProfile;\n  bezel: number;\n  refraction: number;\n  thickness: number;\n  lightAngle: number;\n  specularOpacity: number;\n  transparency: number;\n  blur: number;\n  saturation: number;\n}\n\ninterface ThemeContextType {\n  theme: Theme;\n  setTheme: (theme: Theme) => void;\n  toggleTheme: () => void;\n  isDark: boolean;\n  mode: GlassMode;\n  setMode: (mode: GlassMode) => void;\n  toggleMode: () => void;\n  glass: GlassSettings;\n  setGlass: (settings: Partial<GlassSettings>) => void;\n  resetGlass: () => void;\n  liquidGlass: LiquidGlassSettings;\n  setLiquidGlass: (settings: Partial<LiquidGlassSettings>) => void;\n  resetLiquidGlass: () => void;\n}\n\nconst defaultGlass: GlassSettings = {\n  blur: 17,\n  transparency: 10,\n  saturation: 100,\n};\n\nconst defaultLiquidGlass: LiquidGlassSettings = {\n  profile: \"convex-circle\",\n  bezel: 9,\n  refraction: 90,\n  thickness: 120,\n  lightAngle: -150,\n  specularOpacity: 10,\n  transparency: 20,\n  blur: 10,\n  saturation: 120,\n};\n\nconst ThemeContext = createContext<ThemeContextType>({\n  theme: \"dark\",\n  setTheme: () => {},\n  toggleTheme: () => {},\n  isDark: true,\n  mode: \"glass\",\n  setMode: () => {},\n  toggleMode: () => {},\n  glass: defaultGlass,\n  setGlass: () => {},\n  resetGlass: () => {},\n  liquidGlass: defaultLiquidGlass,\n  setLiquidGlass: () => {},\n  resetLiquidGlass: () => {},\n});\n\nexport function useTheme() {\n  return useContext(ThemeContext);\n}\n\nexport function ThemeProvider({ children, defaultTheme = \"dark\" }: { children: ReactNode; defaultTheme?: Theme }) {\n  const [theme, setTheme] = useState<Theme>(() => {\n    if (typeof window !== \"undefined\") {\n      const stored = localStorage.getItem(\"lg-theme\");\n      if (stored === \"light\" || stored === \"dark\") return stored;\n    }\n    return defaultTheme;\n  });\n\n  const [mode, setModeState] = useState<GlassMode>(() => {\n    if (typeof window !== \"undefined\") {\n      const stored = localStorage.getItem(\"lg-mode\");\n      if (stored === \"glass\" || stored === \"liquid-glass\") return stored;\n    }\n    return \"glass\";\n  });\n\n  const [glass, setGlassState] = useState<GlassSettings>(() => {\n    if (typeof window !== \"undefined\") {\n      const stored = localStorage.getItem(\"lg-glass\");\n      if (stored) {\n        try {\n          const parsed = JSON.parse(stored);\n          return { ...defaultGlass, ...parsed };\n        } catch {}\n      }\n    }\n    return defaultGlass;\n  });\n\n  const [liquidGlass, setLiquidGlassState] = useState<LiquidGlassSettings>(() => {\n    if (typeof window !== \"undefined\") {\n      const stored = localStorage.getItem(\"lg-liquid-glass\");\n      if (stored) {\n        try {\n          const parsed = JSON.parse(stored);\n          return { ...defaultLiquidGlass, ...parsed };\n        } catch {}\n      }\n    }\n    return defaultLiquidGlass;\n  });\n\n  useEffect(() => {\n    const root = document.documentElement;\n    root.setAttribute(\"data-theme\", theme);\n    localStorage.setItem(\"lg-theme\", theme);\n    if (theme === \"dark\") {\n      root.classList.add(\"dark\");\n      root.classList.remove(\"light\");\n    } else {\n      root.classList.add(\"light\");\n      root.classList.remove(\"dark\");\n    }\n  }, [theme]);\n\n  useEffect(() => {\n    const root = document.documentElement;\n    root.setAttribute(\"data-glass-mode\", mode);\n    localStorage.setItem(\"lg-mode\", mode);\n  }, [mode]);\n\n  useEffect(() => {\n    const supported = supportsKubeBackdropFilter();\n    document.documentElement.setAttribute(\n      \"data-liquid-glass-supported\",\n      supported ? \"true\" : \"false\"\n    );\n  }, []);\n\n  useEffect(() => {\n    const root = document.documentElement;\n    root.style.setProperty(\"--lg-blur\", `${glass.blur}`);\n    // In liquid-glass mode the single Transparency slider controls the\n    // liquid-glass config. Route that value into --lg-transparency so every\n    // glass-surface* utility responds to the same control.\n    root.style.setProperty(\n      \"--lg-transparency\",\n      mode === \"liquid-glass\" ? `${liquidGlass.transparency}` : `${glass.transparency}`\n    );\n    // Saturation is mode-aware so the active slider always drives the\n    // backdrop-filter saturate() applied by the glass utilities.\n    root.style.setProperty(\n      \"--lg-saturation\",\n      mode === \"liquid-glass\" ? `${liquidGlass.saturation}` : `${glass.saturation}`\n    );\n    localStorage.setItem(\"lg-glass\", JSON.stringify(glass));\n  }, [glass, liquidGlass, mode]);\n\n  useEffect(() => {\n    localStorage.setItem(\"lg-liquid-glass\", JSON.stringify(liquidGlass));\n  }, [liquidGlass]);\n\n  const toggleTheme = () => setTheme((t) => (t === \"dark\" ? \"light\" : \"dark\"));\n  const toggleMode = () => setModeState((m) => (m === \"glass\" ? \"liquid-glass\" : \"glass\"));\n\n  const setGlass = (settings: Partial<GlassSettings>) => {\n    setGlassState((prev) => ({ ...prev, ...settings }));\n  };\n\n  const resetGlass = () => setGlassState(defaultGlass);\n\n  const setLiquidGlass = (settings: Partial<LiquidGlassSettings>) => {\n    setLiquidGlassState((prev) => ({ ...prev, ...settings }));\n  };\n\n  const resetLiquidGlass = () => setLiquidGlassState(defaultLiquidGlass);\n\n  const kubeSupported = supportsKubeBackdropFilter();\n\n  return (\n    <ThemeContext.Provider\n      value={{\n        theme,\n        setTheme,\n        toggleTheme,\n        isDark: theme === \"dark\",\n        mode,\n        setMode: setModeState,\n        toggleMode,\n        glass,\n        setGlass,\n        resetGlass,\n        liquidGlass,\n        setLiquidGlass,\n        resetLiquidGlass,\n      }}\n    >\n      {children}\n      {mode === \"liquid-glass\" && kubeSupported && (\n        <KubeFilter\n          id={LIQUID_GLASS_FILTER_ID}\n          liteId={LIQUID_GLASS_FILTER_LITE_ID}\n          width={1}\n          height={1}\n          normalized\n          {...kubePropsFromLiquidGlass(liquidGlass)}\n        />\n      )}\n    </ThemeContext.Provider>\n  );\n}\n",
    "props": []
  },
  {
    "id": "use-custom-kube-filter",
    "name": "useCustomKubeFilter",
    "file": "src/components/liquid-glass/useCustomKubeFilter.tsx",
    "category": "Layout & Surfaces",
    "description": "Liquid Glass useCustomKubeFilter component.",
    "usage": "<useCustomKubeFilter />",
    "sourceCode": "import { useMemo, type ReactNode } from \"react\";\nimport { useTheme } from \"./ThemeProvider\";\nimport type { LiquidGlassSettings } from \"./ThemeProvider\";\nimport {\n  KubeFilter,\n  useKubeFilterId,\n  kubePropsFromLiquidGlass,\n} from \"./kube\";\n\nexport interface UseCustomKubeFilterResult {\n  /** Full-quality filter URL for large surfaces. */\n  filterUrl: string;\n  /** Lite filter URL for small/medium surfaces. */\n  liteFilterUrl: string;\n  /** Render this somewhere in the React tree (sibling or portal). */\n  Filter: ReactNode;\n}\n\n/**\n * Render a dedicated kube filter for a single component/subtree so it can use\n * liquid-glass settings that differ from the global ThemeProvider config.\n *\n * ⚠️ Performance note: every custom filter is a separate SVG filter graph and\n * its own set of backdrop-filter instances. Use sparingly for hero components\n * or small subtrees. Do not use this for every button/input — that would undo\n * the tiered/shared-filter optimizations.\n */\nexport function useCustomKubeFilter(\n  overrides?: Partial<LiquidGlassSettings>\n): UseCustomKubeFilterResult {\n  const id = useKubeFilterId();\n  const liteId = `${id}-lite`;\n  const { liquidGlass } = useTheme();\n\n  const settings = { ...liquidGlass, ...overrides };\n  const baseProps = kubePropsFromLiquidGlass(settings);\n\n  const filterUrl = `url(#${id})`;\n  const liteFilterUrl = `url(#${liteId})`;\n\n  const Filter = useMemo(\n    () => (\n      <KubeFilter\n        id={id}\n        liteId={liteId}\n        width={1}\n        height={1}\n        normalized\n        {...baseProps}\n      />\n    ),\n    [id, liteId, baseProps]\n  );\n\n  return { filterUrl, liteFilterUrl, Filter };\n}\n",
    "props": [
      {
        "name": "filterUrl",
        "type": "string",
        "required": true,
        "description": "Full-quality filter URL for large surfaces."
      },
      {
        "name": "liteFilterUrl",
        "type": "string",
        "required": true,
        "description": "Lite filter URL for small/medium surfaces."
      },
      {
        "name": "Filter",
        "type": "ReactNode",
        "required": true,
        "description": "Render this somewhere in the React tree (sibling or portal)."
      }
    ]
  }
];
