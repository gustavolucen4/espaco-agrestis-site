/* eslint-disable @next/next/no-img-element */

type CoverProps = {
  alt: string;
  image: string | null;
  label: string;
  title: string;
};

export function Cover({ alt, image, label, title }: CoverProps) {
  if (image) {
    return (
      <div className="cover-frame">
        <img src={image} alt={alt} />
      </div>
    );
  }

  return (
    <div className="cover-frame cover-placeholder" aria-label={alt}>
      <span>{label}</span>
      <strong>{title}</strong>
    </div>
  );
}
