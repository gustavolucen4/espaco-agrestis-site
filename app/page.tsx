/* eslint-disable @next/next/no-img-element */

import { Cover } from "./components/Cover";
import { SiteHeader } from "./components/SiteHeader";
import { books, pillars, upcomingActivities, watchedMovies } from "./content";

export default function Home() {
  const featuredMovies = watchedMovies.slice(0, 2);
  const featuredBooks = books.slice(0, 2);

  return (
    <main>
      <SiteHeader />

      <section id="inicio" className="hero-section">
        <div className="hero-copy">
          <img
            className="hero-logo"
            src="/logo-agrestis.jpg"
            alt="Brasão do Espaço Cultural Agrestis"
          />
          <p className="eyebrow">Comunidade católica em Caruaru</p>
          <h1>Espaço Agrestis</h1>
          <p className="hero-text">
            Um lugar para reunir recolhimentos, cinedebates, leituras e
            encontros de formação inspirados nos ensinamentos de São Josemaria
            Escrivá e no espírito do Opus Dei: santificar a vida cotidiana.
          </p>
          <div className="hero-actions" aria-label="Ações principais">
            <a className="button primary" href="#atividades">
              Ver próximas atividades
            </a>
            <a className="button secondary" href="#contato">
              Falar com a comunidade
            </a>
          </div>
        </div>

        <aside className="next-card" aria-labelledby="next-title">
          <div className="next-visual" aria-hidden="true" />
          <span className="card-label">Em destaque</span>
          <h2 id="next-title">Próxima atividade</h2>
          <p className="next-title">Recolhimento mensal</p>
          <p>
            Uma manhã de oração, meditação e formação com sacerdote em Caruaru.
          </p>
          <a href="#recolhimento" className="text-link">
            Ver detalhes
          </a>
        </aside>
      </section>

      <section className="intro-band" aria-label="Pilares do Espaço Agrestis">
        {pillars.map((pillar) => (
          <p key={pillar}>{pillar}</p>
        ))}
      </section>

      <section id="atividades" className="section">
        <div className="section-heading">
          <p className="eyebrow">Agenda centralizada</p>
          <h2>Próximas atividades</h2>
          <p>
            Esta área pode virar o ponto principal para consultar datas,
            horários, locais e orientações de cada encontro.
          </p>
        </div>
        <div className="activity-grid">
          {upcomingActivities.map((activity) => (
            <article className="activity-card" key={activity.type}>
              <span>{activity.type}</span>
              <h3>{activity.title}</h3>
              <dl>
                <div>
                  <dt>Data</dt>
                  <dd>{activity.date}</dd>
                </div>
                <div>
                  <dt>Local</dt>
                  <dd>{activity.place}</dd>
                </div>
              </dl>
              <p>{activity.detail}</p>
              <a className="text-link" href={activity.href}>
                Ver atividade
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="recolhimento" className="feature-section">
        <div>
          <p className="eyebrow">Vida interior</p>
          <h2>Recolhimento mensal</h2>
        </div>
        <div className="feature-copy">
          <p>
            O recolhimento mensal é um tempo reservado para rezar, escutar uma
            meditação, examinar a própria vida e recomeçar com serenidade.
          </p>
          <p>
            No MVP, esta seção fica preparada para receber tema, data, horário,
            local e avisos práticos assim que a próxima edição for confirmada.
          </p>
        </div>
      </section>

      <section id="cinedebate" className="section muted preview-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Cinema e conversa</p>
            <h2>Cinedebate</h2>
            <p>
              Um registro organizado dos filmes já assistidos e das ideias que
              podem ajudar na vida, no trabalho, na família e nas amizades.
            </p>
          </div>
          <a className="button secondary" href="/cinedebate">
            Ver página do Cinedebate
          </a>
        </div>
        <div className="cover-grid preview-grid">
          {featuredMovies.map((movie) => (
            <article className="media-card" key={movie.title}>
              <Cover
                alt={movie.coverAlt}
                image={movie.coverImage}
                label="Filme"
                title={movie.title}
              />
              <div>
                <p className="tag">{movie.theme}</p>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="livros" className="section preview-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Leitura compartilhada</p>
            <h2>Clube do livro</h2>
            <p>
              Encontros bimestrais para conversar sobre livros que formam a
              inteligência, a sensibilidade e a vida cristã.
            </p>
          </div>
          <a className="button secondary" href="/clube-do-livro">
            Ver página do Clube
          </a>
        </div>
        <div className="cover-grid preview-grid">
          {featuredBooks.map((book) => (
            <article className="media-card" key={book.title}>
              <Cover
                alt={book.coverAlt}
                image={book.coverImage}
                label="Livro"
                title={book.title}
              />
              <div>
                <p className="tag">{book.status}</p>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p>{book.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre" className="about-section">
        <div className="about-image" aria-hidden="true">
          <span>Caruaru</span>
        </div>
        <div>
          <p className="eyebrow">Sobre a comunidade</p>
          <h2>Um espaço para formar, conviver e recomeçar</h2>
          <p>
            O Espaço Agrestis reúne pessoas que desejam crescer na fé católica,
            cultivar boas amizades e levar a sério a vocação cristã no meio do
            mundo, com especial carinho pela vida cotidiana.
          </p>
          <p>
            A primeira versão do site nasce para organizar o que já acontece e
            facilitar a comunicação das próximas atividades em Caruaru.
          </p>
        </div>
      </section>

      <section id="contato" className="contact-section">
        <div>
          <p className="eyebrow">Contato</p>
          <h2>Quer acompanhar as próximas atividades?</h2>
          <p>
            Siga o Espaço Agrestis no Instagram e entre em contato para receber
            datas, locais e orientações de participação.
          </p>
        </div>
        <div className="contact-actions">
          <a
            className="button primary"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a className="button secondary" href="mailto:contato@espacoagrestis.org">
            Enviar mensagem
          </a>
        </div>
      </section>
    </main>
  );
}
