/* eslint-disable @next/next/no-html-link-for-pages */

import type { Metadata } from "next";
import { Cover } from "../components/Cover";
import { SiteHeader } from "../components/SiteHeader";
import { books } from "../content";

export const metadata: Metadata = {
  title: "Clube do Livro | Espaço Agrestis",
  description:
    "Livros do Clube do Livro do Espaço Agrestis em Caruaru, com capas, autores e pontos de conversa.",
};

export default function ClubeDoLivroPage() {
  return (
    <main>
      <SiteHeader />

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
          <p>Livros já escolhidos e possibilidades para os próximos encontros.</p>
        </div>
        <div className="catalog-list">
          {books.map((book) => (
            <article className="catalog-item" key={book.title}>
              <Cover
                alt={book.coverAlt}
                image={book.coverImage}
                label="Livro"
                title={book.title}
                variant="book"
              />
              <div className="catalog-item-heading">
                <p className="tag">{book.status}</p>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
              </div>
              <p className="catalog-description">{book.description}</p>
              <div className="discussion-note"><span>Para conversar</span><p>{book.discussion}</p></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
