/* eslint-disable @next/next/no-html-link-for-pages */

import type { Metadata } from "next";
import { Cover } from "../components/Cover";
import { SiteFooter } from "../components/SiteFooter";
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
      <SiteHeader active="cinedebate" />

      <section className="page-hero">
        <a className="back-link" href="/">← Início</a>
        <div className="page-hero-copy">
          <p className="eyebrow">Cinema e conversa</p>
          <h1>Cinedebate</h1>
          <p>Filmes que assistimos juntos e ideias que continuam depois da sessão.</p>
        </div>
        <div className="page-summary" aria-label="Resumo do acervo">
          <strong>{watchedMovies.length}</strong>
          <span>sessões registradas</span>
        </div>
      </section>

      <section className="section catalog-section">
        <div className="catalog-heading">
          <div><p className="eyebrow">Nosso acervo</p><h2>Filmes assistidos</h2></div>
          <p>Na ordem em que assistimos, com os temas que orientaram cada conversa.</p>
        </div>
        <div className="catalog-list movie-catalog">
          {watchedMovies.map((movie, index) => (
            <article
              className={`catalog-item${index === watchedMovies.length - 1 ? " latest-session" : ""}`}
              key={movie.title}
            >
              <Cover
                alt={movie.coverAlt}
                format={movie.coverFormat}
                image={movie.coverImage}
                label="Filme"
                priority={index === 0}
                title={movie.title}
                variant="movie"
              />
              <div className="catalog-item-heading">
                <div className="catalog-meta">
                  <p className="tag">Sessão {String(movie.order).padStart(2, "0")}</p>
                  {movie.favorite ? <span className="favorite-badge">Nosso favorito</span> : null}
                  {index === watchedMovies.length - 1 ? <span className="latest-badge">Sessão mais recente</span> : null}
                </div>
                <h3>{movie.title}</h3>
                <p className="author">{movie.year} · {movie.theme}</p>
              </div>
              <p className="catalog-description">{movie.description}</p>
              {movie.postUrl ? (
                <a className="post-link" href={movie.postUrl} target="_blank" rel="noreferrer">
                  <span>Ver post</span><span aria-hidden="true">↗</span>
                </a>
              ) : null}
              <div className="discussion-note">
                <p className="discussion-title">O que conversamos</p>
                <p>{movie.discussion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta">
        <div><p className="eyebrow">Próxima sessão</p><h2>Um novo filme em breve</h2><p>A próxima escolha e a data serão divulgadas na agenda.</p></div>
        <a className="button primary" href="/#atividades">Ver agenda</a>
      </section>
      <SiteFooter />
    </main>
  );
}
