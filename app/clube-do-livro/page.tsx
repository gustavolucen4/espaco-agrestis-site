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
        <a className="text-link" href="/">
          Voltar para o início
        </a>
        <p className="eyebrow">Leitura compartilhada</p>
        <h1>Clube do Livro</h1>
        <p>
          A página do Clube do Livro guarda as leituras feitas e planejadas,
          com espaço para capa, autor, resumo e perguntas que ajudam o encontro
          a render boas conversas.
        </p>
      </section>

      <section className="section">
        <div className="catalog-list">
          {books.map((book) => (
            <article className="catalog-item" key={book.title}>
              <Cover
                alt={book.coverAlt}
                image={book.coverImage}
                label="Livro"
                title={book.title}
              />
              <div className="catalog-copy">
                <div>
                  <p className="tag">{book.status}</p>
                  <h2>{book.title}</h2>
                  <p className="author">{book.author}</p>
                </div>
                <p>{book.description}</p>
                <p>{book.discussion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
