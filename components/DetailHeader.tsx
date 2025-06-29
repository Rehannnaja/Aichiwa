import BookmarkButton from "./BookmarkButton";
import ContinueReadingButton from "./ContinueReadingButton";

interface Props {
  mangaId: string;
  title: string;
  status: string;
  genres: string[];
  description: string;
  coverImage: string;
}

export default function DetailHeader({
  mangaId,
  title,
  status,
  genres,
  description,
  coverImage,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={coverImage}
        alt={title}
        className="w-64 h-auto rounded shadow-lg"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-2 capitalize">
          Status: {status || "Unknown"}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre, i) => (
            <span
              key={i}
              className="text-xs bg-muted px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap">
          {description}
        </p>

        <BookmarkButton
          mangaId={mangaId}
          title={title}
          coverImage={coverImage}
        />
        <ContinueReadingButton mangaId={mangaId} />
      </div>
    </div>
  );
}

