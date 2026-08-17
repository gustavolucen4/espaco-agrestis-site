import type { Book, Movie, Activity } from "./content";
import {
  books as fallbackBooks,
  upcomingActivities as fallbackActivities,
  watchedMovies as fallbackMovies,
} from "./content";
import { createPublicClient } from "./lib/supabase";

type ActivityRow = {
  type_label: string;
  title: string;
  starts_at: string | null;
  date_text: string | null;
  location_name: string;
  city: string;
  state: string;
  theme: string | null;
  description: string;
  detail_url: string;
  featured: boolean;
  sort_order: number;
};

type MovieRow = {
  session_order: number;
  title: string;
  release_year: number | null;
  theme: string;
  status_label: string;
  favorite: boolean;
  cover_url: string | null;
  cover_format: "cover" | "post";
  cover_alt: string;
  instagram_url: string | null;
  description: string;
  discussion: string;
};

type BookRow = {
  title: string;
  author: string;
  status_label: string;
  reading_stage: "read" | "current" | "upcoming";
  meeting_label: string;
  cover_url: string | null;
  cover_format: "cover" | "post";
  cover_alt: string;
  instagram_url: string | null;
  description: string;
  discussion: string;
};

const longDate = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Recife",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const day = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Recife",
  day: "2-digit",
});

const month = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Recife",
  month: "short",
});

function formatActivityDate(value: string | null, fallback: string | null) {
  if (!value) return fallback || "Data a confirmar";
  return longDate.format(new Date(value)).replace(", ", ", às ");
}

function mapActivity(row: ActivityRow): Activity {
  const startsAt = row.starts_at ? new Date(row.starts_at) : null;
  return {
    type: row.type_label,
    title: row.title,
    date: formatActivityDate(row.starts_at, row.date_text),
    dateTime: row.starts_at || undefined,
    dateDay: startsAt ? day.format(startsAt) : undefined,
    dateMonth: startsAt
      ? month.format(startsAt).replace(".", "").toUpperCase()
      : undefined,
    place: [row.location_name, `${row.city}, ${row.state}`]
      .filter(Boolean)
      .join(" · "),
    theme: row.theme || undefined,
    detail: row.description,
    href: row.detail_url,
    featured: row.featured,
  };
}

function mapMovie(row: MovieRow): Movie {
  return {
    order: row.session_order,
    title: row.title,
    theme: row.theme,
    year: row.release_year ? String(row.release_year) : "",
    status: row.status_label,
    favorite: row.favorite,
    coverImage: row.cover_url,
    coverFormat: row.cover_format,
    coverAlt: row.cover_alt,
    postUrl: row.instagram_url || undefined,
    description: row.description,
    discussion: row.discussion,
  };
}

function mapBook(row: BookRow): Book {
  return {
    title: row.title,
    author: row.author,
    status: row.status_label,
    stage: row.reading_stage,
    meeting: row.meeting_label,
    coverImage: row.cover_url,
    coverFormat: row.cover_format,
    coverAlt: row.cover_alt,
    postUrl: row.instagram_url || undefined,
    description: row.description,
    discussion: row.discussion,
  };
}

function prepareActivities(activities: Activity[], now = Date.now()) {
  const upcoming = activities
    .filter((activity) => !activity.dateTime || new Date(activity.dateTime).getTime() >= now)
    .sort((first, second) => {
      if (first.dateTime && second.dateTime) {
        return new Date(first.dateTime).getTime() - new Date(second.dateTime).getTime();
      }
      if (first.dateTime) return -1;
      if (second.dateTime) return 1;
      return 0;
    });

  const nextDatedIndex = upcoming.findIndex((activity) => activity.dateTime);
  return upcoming.map((activity, index) => ({
    ...activity,
    featured: index === nextDatedIndex,
  }));
}

export async function getActivities(): Promise<Activity[]> {
  const client = createPublicClient();
  const now = Date.now();
  if (!client) return prepareActivities(fallbackActivities, now);
  const { data, error } = await client
    .from("activities")
    .select("type_label,title,starts_at,date_text,location_name,city,state,theme,description,detail_url,featured,sort_order")
    .eq("published", true)
    .eq("status", "scheduled")
    .or(`starts_at.gte.${new Date(now).toISOString()},starts_at.is.null`)
    .order("sort_order");
  return prepareActivities(
    error ? fallbackActivities : (data as ActivityRow[] | null)?.map(mapActivity) || [],
    now,
  );
}

export async function getMovies(): Promise<Movie[]> {
  const client = createPublicClient();
  if (!client) return fallbackMovies;
  const { data, error } = await client
    .from("movies")
    .select("session_order,title,release_year,theme,status_label,favorite,cover_url,cover_format,cover_alt,instagram_url,description,discussion")
    .eq("published", true)
    .order("session_order");
  return error || !data?.length ? fallbackMovies : (data as MovieRow[]).map(mapMovie);
}

export async function getBooks(): Promise<Book[]> {
  const client = createPublicClient();
  if (!client) return fallbackBooks;
  const { data, error } = await client
    .from("books")
    .select("title,author,status_label,reading_stage,meeting_label,cover_url,cover_format,cover_alt,instagram_url,description,discussion")
    .eq("published", true)
    .order("sort_order");
  return error || !data?.length ? fallbackBooks : (data as BookRow[]).map(mapBook);
}

export async function getPublicContent() {
  const client = createPublicClient();
  if (client) {
    const { data, error } = await client.rpc("get_public_content");
    if (!error && data && typeof data === "object" && !Array.isArray(data)) {
      const feed = data as {
        activities?: ActivityRow[];
        movies?: MovieRow[];
        books?: BookRow[];
      };
      return {
        activities: prepareActivities((feed.activities || []).map(mapActivity)),
        movies: (feed.movies || []).map(mapMovie),
        books: (feed.books || []).map(mapBook),
      };
    }
  }

  const [activities, movies, books] = await Promise.all([getActivities(), getMovies(), getBooks()]);
  return { activities, movies, books };
}
