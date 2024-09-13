"use client";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ButtonRefresh() {
  const router = useRouter();
  const [spin, setSpin] = useState(false);

  function onPress() {
    setSpin(true);

    setTimeout(() => {
      setSpin(false);
    }, 1000);

    router.refresh();
  }

  return (
    <button
      className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center"
      onClick={onPress}
    >
      <RotateCw className={cn(spin && "animate-spin")} />
    </button>
  );
}
