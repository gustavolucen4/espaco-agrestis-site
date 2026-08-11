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
        <a className="back-link" href="/">← Início</a>
        <div className="page-hero-copy">
          <p className="eyebrow">Cinema e conversa</p>
          <h1>Cinedebate</h1>
          <p>Filmes que assistimos juntos e ideias que continuam depois da sessão.</p>
        </div>
        <div className="page-summary" aria-label="Resumo do acervo">
          <strong>{watchedMovies.length}</strong>
          <span>filmes registrados</span>
        </div>
      </section>

      <section className="section catalog-section">
        <div className="catalog-heading">
          <div><p className="eyebrow">Nosso acervo</p><h2>Filmes assistidos</h2></div>
          <p>Memória das sessões, temas e pontos que orientaram cada conversa.</p>
        </div>
        <div className="catalog-list">
          {watchedMovies.map((movie) => (
            <article className="catalog-item" key={movie.title}>
              <Cover
                alt={movie.coverAlt}
                image={movie.coverImage}
                label="Filme"
                title={movie.title}
                variant="movie"
              />
              <div className="catalog-item-heading">
                <p className="tag">{movie.status}</p>
                <h3>{movie.title}</h3>
                <p className="author">{movie.year} · {movie.theme}</p>
              </div>
              <p className="catalog-description">{movie.description}</p>
              <div className="discussion-note"><span>Para conversar</span><p>{movie.discussion.replace("Pontos para conversar: ", "")}</p></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
