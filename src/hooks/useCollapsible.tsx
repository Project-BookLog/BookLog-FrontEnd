import { useState, useRef, useEffect } from "react";

export function useCollapsible(dependency: unknown) {
  const ref = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [collapsible, setCollapsible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (expanded) return;

    requestAnimationFrame(() => {
      setCollapsible(el.scrollHeight > el.clientHeight);
    });
  }, [dependency, expanded]);

  const toggle = () => setExpanded((prev) => !prev);

  return { ref, expanded, toggle, collapsible };
}
