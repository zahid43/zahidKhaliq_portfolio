"use client";

import { useState, useEffect } from "react";
import { relativeFromString } from "@/lib/date-utils";

interface RelativeDateProps {
  dateStr: string;
}

export default function RelativeDate({ dateStr }: RelativeDateProps) {
  const [relative, setRelative] = useState<string | null>(null);

  useEffect(() => {
    setRelative(relativeFromString(dateStr));
  }, [dateStr]);

  if (!relative) return null;

  return (
    <span className="text-[11px] text-accent/70">{relative}</span>
  );
}
