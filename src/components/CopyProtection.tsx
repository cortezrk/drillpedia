"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CopyProtection() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  useEffect(() => {
    const body = document.body;

    if (isAdmin) {
      body.classList.remove("no-copy");
      body.classList.add("allow-copy");
      return;
    }

    body.classList.add("no-copy");
    body.classList.remove("allow-copy");

    function onContextmenu(e: MouseEvent) {
      e.preventDefault();
    }
    function onCopy(e: ClipboardEvent) {
      e.preventDefault();
    }
    function onSelectstart(e: Event) {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", onContextmenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("selectstart", onSelectstart);

    return () => {
      document.removeEventListener("contextmenu", onContextmenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("selectstart", onSelectstart);
    };
  }, [isAdmin]);

  return null;
}
