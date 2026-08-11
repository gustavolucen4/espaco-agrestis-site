/* eslint-disable @next/next/no-img-element */

type CoverProps = {
  alt: string;
  image: string | null;
  label: string;
  title: string;
  variant: "book" | "movie";
};

export function Cover({ alt, image, label, title, variant }: CoverProps) {
  if (image) {
    return (
      <div className={`cover-frame cover-${variant}`}>
        <img src={image} alt={alt} />
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
