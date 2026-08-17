/* eslint-disable @next/next/no-html-link-for-pages */

import type { Metadata } from "next";
import { Cover } from "../components/Cover";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { books } from "../content";

export const metadata: Metadata = {
  title: "Clube do Livro | Espaço Agrestis",
  description:
    "Livros do Clube do Livro do Espaço Agrestis em Caruaru, com capas, autores e pontos de conversa.",
};

export default function ClubeDoLivroPage() {
  const stages = [
    { key: "current", eyebrow: "Agora", title: "Em leitura" },
    { key: "read", eyebrow: "Nossa história", title: "Já lemos" },
    { key: "upcoming", eyebrow: "Na sequência", title: "Próximas leituras" },
  ] as const;

  return (
    <main>
      <SiteHeader active="livros" />

      <section className="page-hero">
        <a className="back-link" href="/">← Início</a>
        <div className="page-hero-copy">
          <p className="eyebrow">Leitura compartilhada</p>
          <h1>Clube do Livro</h1>
          <p>Leituras que formam o olhar e abrem espaço para boas conversas.</p>
        </div>
        <div className="page-summary" aria-label="Resumo do acervo">
          <strong>{books.length}</strong>
          <span>livros registrados</span>
        </div>
      </section>

      <section className="section catalog-section">
        <div className="catalog-heading">
          <div><p className="eyebrow">Nossa estante</p><h2>Leituras do clube</h2></div>
          <p>O que já lemos, o livro atual e a sequência planejada para os próximos encontros.</p>
        </div>
        <div className="book-stages">
          {stages.map((stage) => {
            const stageBooks = books.filter((book) => book.stage === stage.key);
            return (
              <section className={`book-stage stage-${stage.key}`} key={stage.key}>
                <div className="stage-heading">
                  <div><p className="eyebrow">{stage.eyebrow}</p><h3>{stage.title}</h3></div>
                  <span>{stageBooks.length} {stageBooks.length === 1 ? "livro" : "livros"}</span>
                </div>
                <div className="catalog-list">
                  {stageBooks.map((book, index) => (
                    <article className="catalog-item" key={book.title}>
                      <Cover alt={book.coverAlt} format={book.coverFormat} image={book.coverImage} label="Livro" priority={stage.key === "current" && index === 0} title={book.title} variant="book" />
                      <div className="catalog-item-heading">
                        <p className="tag">{book.status}</p>
                        <h3>{book.title}</h3>
                        <p className="author">{book.author}</p>
                        <p className="meeting-label">{book.meeting}</p>
                      </div>
                      <p className="catalog-description">{book.description}</p>
                      {book.postUrl ? <a className="post-link" href={book.postUrl} target="_blank" rel="noreferrer"><span>Ver post</span><span aria-hidden="true">↗</span></a> : null}
                      <div className="discussion-note">
                        <p className="discussion-title">{stage.key === "read" ? "O que conversamos" : "Pontos para conversar"}</p>
                        <p>{book.discussion}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="page-cta">
        <div><p className="eyebrow">Próximo encontro</p><h2>22 de agosto, às 9h</h2><p>A Sociedade do Anel · Pan Nossa, Av. Maj. Manoel de Freitas, 31.</p></div>
        <a className="button primary" href="/#atividades">Ver agenda</a>
      </section>
      <SiteFooter />
    </main>
  );
}
