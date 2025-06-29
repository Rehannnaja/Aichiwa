interface RenderImageListProps {
  images: string[];
}

export default function RenderImageList({ images }: RenderImageListProps) {
  if (!images || images.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No images available.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Page ${index + 1}`}
          className="w-full rounded shadow-md object-contain"
          loading="lazy"
        />
      ))}
    </div>
  );
}
