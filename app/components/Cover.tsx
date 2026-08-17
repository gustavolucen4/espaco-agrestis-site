"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";

type CoverProps = {
  alt: string;
  image: string | null;
  format?: "cover" | "post";
  label: string;
  priority?: boolean;
  title: string;
  variant: "book" | "movie";
};

export function Cover({ alt, format = "cover", image, label, priority = false, title, variant }: CoverProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `cover-title-${variant}-${title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

  if (image) {
    return (
      <div className="cover-shell">
        <button
          className="cover-trigger"
          type="button"
          aria-label={`Ampliar ${alt.toLowerCase()}`}
          title="Ampliar imagem"
          onClick={() => dialogRef.current?.showModal()}
        >
          <span className={`cover-frame cover-${variant} cover-format-${format}`}>
            <img
              src={image}
              alt={alt}
              decoding="async"
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
            />
          </span>
          <span className="cover-zoom-hint" aria-hidden="true">
            <span className="cover-zoom-icon" />
          </span>
        </button>
        {/* The click handler closes only the dialog backdrop. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <dialog
          className="cover-dialog"
          ref={dialogRef}
          aria-labelledby={titleId}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              dialogRef.current?.close();
            }
          }}
        >
          <div className="cover-dialog-content">
            <button
              className="cover-dialog-close"
              type="button"
              aria-label="Fechar imagem ampliada"
              title="Fechar"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
            <img src={image} alt={alt} decoding="async" loading="lazy" />
            <p id={titleId}>{title}</p>
          </div>
        </dialog>
      </div>
    );
  }

  return (
    <div
      className={`cover-frame cover-placeholder cover-${variant}`}
      aria-label={alt}
    >
      <span>{label}</span>
      <strong>{title}</strong>
    </div>
  );
}
