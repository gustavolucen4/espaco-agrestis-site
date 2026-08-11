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
                  {stageBooks.map((book) => (
                    <article className="catalog-item" key={book.title}>
                      <Cover alt={book.coverAlt} image={book.coverImage} label="Livro" title={book.title} variant="book" />
                      <div className="catalog-item-heading">
                        <p className="tag">{book.status}</p>
                        <h3>{book.title}</h3>
                        <p className="author">{book.author}</p>
                        <p className="meeting-label">{book.meeting}</p>
                      </div>
                      <p className="catalog-description">{book.description}</p>
                      <details className="discussion-note"><summary>Para conversar</summary><p>{book.discussion}</p></details>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="page-cta">
        <div><p className="eyebrow">Próximo encontro</p><h2>22 de agosto de 2026</h2><p>Conversa sobre A Sociedade do Anel, de J. R. R. Tolkien.</p></div>
        <a className="button primary" href="/#atividades">Ver agenda</a>
      </section>
      <SiteFooter />
    </main>
  );
}
