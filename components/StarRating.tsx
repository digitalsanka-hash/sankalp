"use client";
// components/StarRating.tsx — bintang 1..5. Mode tampil (readonly) atau input.
import { useState } from "react";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}

export default function StarRating({ value, onChange, size = 20 }: Props) {
  const [hover, setHover] = useState(0);
  const readonly = !onChange;
  const shown = hover || value;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role={readonly ? "img" : "radiogroup"}
      aria-label={`Rating ${value} dari 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => !readonly && setHover(n)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={readonly ? "cursor-default" : "cursor-pointer"}
          style={{ lineHeight: 0, background: "none", border: 0, padding: 0 }}
          aria-label={`${n} bintang`}
        >
          <span
            style={{ fontSize: size }}
            className={n <= shown ? "text-amber-400" : "text-gray-300"}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
