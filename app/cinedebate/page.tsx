/* eslint-disable @next/next/no-html-link-for-pages */

import type { Metadata } from "next";
import { Cover } from "../components/Cover";
import { SiteHeader } from "../components/SiteHeader";
import { watchedMovies } from "../content";

export const metadata: Metadata = {
  title: "Cinedebate | Espaço Agrestis",
  description:
    "Filmes assistidos no Cinedebate do Espaço Agrestis em Caruaru, com capas, temas e pontos de conversa.",
};

export default function CinedebatePage() {
  return (
    <main>
      <SiteHeader />

      <section className="page-hero">
        <a className="text-link" href="/">
          Voltar para o início
        </a>
        <p className="eyebrow">Cinema e conversa</p>
        <h1>Cinedebate</h1>
        <p>
          A página do Cinedebate reúne os filmes assistidos, suas capas, uma
          breve descrição e alguns pontos que ajudam a guiar a conversa depois
          da sessão.
        </p>
      </section>

      <section className="section">
        <div className="catalog-list">
          {watchedMovies.map((movie) => (
            <article className="catalog-item" key={movie.title}>
              <Cover
                alt={movie.coverAlt}
                image={movie.coverImage}
                label="Filme"
                title={movie.title}
              />
              <div className="catalog-copy">
                <div>
                  <p className="tag">{movie.status}</p>
                  <h2>{movie.title}</h2>
                  <p className="author">
                    {movie.year} · {movie.theme}
                  </p>
                </div>
                <p>{movie.description}</p>
                <p>{movie.discussion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
