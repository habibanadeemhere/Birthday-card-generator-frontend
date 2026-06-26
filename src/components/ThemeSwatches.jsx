import React from "react";
import { THEMES } from "../themes";

export default function ThemeSwatches({ value, onChange }) {
  return (
    <div className="swatches">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`swatch ${value === t.id ? "active" : ""}`}
          style={{ background: t.swatch }}
          onClick={() => onChange(t.id)}
          aria-label={t.name}
          title={t.name}
        >
          <span>{t.name}</span>
        </button>
      ))}
    </div>
  );
}
