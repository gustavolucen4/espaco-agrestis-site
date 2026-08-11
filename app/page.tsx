import { Cover } from "./components/Cover";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { books, pillars, upcomingActivities, watchedMovies } from "./content";

export default function Home() {
  const favoriteMovie = watchedMovies.find((movie) => movie.favorite);
  const latestMovie = watchedMovies.at(-1);
  const featuredMovies = [favoriteMovie, latestMovie].filter(
    (movie): movie is (typeof watchedMovies)[number] => Boolean(movie),
  );
  const featuredBooks = books.filter((book) => book.stage !== "upcoming");

  return (
    <main>
      <SiteHeader active="home" />

      <section id="inicio" className="hero-section">
        <div className="hero-copy">
          <div className="hero-identity">
            <div>
              <p className="eyebrow">Espaço Cultural</p>
              <p>Opus Dei em Caruaru, Pernambuco</p>
            </div>
          </div>
          <h1>Espaço Agrestis</h1>
          <p className="hero-text">
            Formação integral de homens por meio da amizade, da cultura e da
            vida cristã. Uma iniciativa inspirada no espírito do Opus Dei.
          </p>
          <div className="hero-actions" aria-label="Ações principais">
            <a className="button primary" href="#atividades">
              Ver próximas atividades
            </a>
            <a className="button secondary" href="#contato">
              Entrar em contato
            </a>
          </div>
        </div>

        <aside className="next-card" aria-labelledby="next-title">
          <div className="next-card-top">
            <span className="card-label">Próxima atividade</span>
            <span className="status-dot">22 de agosto</span>
          </div>
          <div className="next-event-main">
            <time className="date-badge" dateTime="2026-08-22">
              <strong>22</strong>
              <span>AGO</span>
            </time>
            <div>
              <p className="next-event-type">Clube do Livro</p>
              <h2 id="next-title">A Sociedade do Anel</h2>
              <p>Próximo encontro do clube, no Espaço Agrestis.</p>
            </div>
          </div>
          <a href="/clube-do-livro" className="text-link">Ver detalhes da leitura</a>
        </aside>
      </section>

      <section className="intro-band" aria-label="Pilares do Espaço Agrestis">
        {pillars.map((pillar) => (
          <div key={pillar.number}>
            <span>{pillar.number}</span>
            <p><strong>{pillar.title}</strong>{pillar.detail}</p>
          </div>
        ))}
      </section>

      <section id="atividades" className="section">
        <div className="section-heading">
          <p className="eyebrow">Agenda centralizada</p>
          <h2>Próximas atividades</h2>
          <p>
            Datas, locais e informações dos próximos encontros do Espaço
            Agrestis, reunidos em um só lugar.
          </p>
        </div>
        <div className="activity-grid">
          {upcomingActivities.map((activity) => (
            <article
              className={`activity-card${activity.featured ? " featured" : ""}`}
              key={activity.type}
            >
              {activity.featured && activity.dateDay ? (
                <time className="activity-date" dateTime="2026-08-22">
                  <strong>{activity.dateDay}</strong><span>{activity.dateMonth}</span>
                </time>
              ) : null}
              <div className="activity-content">
                <span>{activity.type}</span>
                <h3>{activity.title}</h3>
                <dl>
                  <div><dt>Data</dt><dd>{activity.date}</dd></div>
                  <div><dt>Local</dt><dd>{activity.place}</dd></div>
                </dl>
                <p>{activity.detail}</p>
                <a className="text-link" href={activity.href}>Ver atividade</a>
              </div>
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
            A próxima data será divulgada em breve. Os encontros acontecem em
            Caruaru e contam com a presença de um sacerdote.
          </p>
        </div>
      </section>

      <div className="section-band">
      <section id="cinedebate" className="section preview-section">
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
            Ver filmes
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
                variant="movie"
              />
              <div>
                <div className="media-meta">
                  <p className="tag">Sessão {String(movie.order).padStart(2, "0")}</p>
                  {movie.favorite ? <span className="favorite-badge">Favorito</span> : null}
                </div>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>

      <section id="livros" className="section preview-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Leitura compartilhada</p>
            <h2>Clube do livro</h2>
            <p>
              Leituras compartilhadas para formar o olhar, cultivar a amizade
              e alimentar conversas que continuam depois do encontro.
            </p>
          </div>
          <a className="button secondary" href="/clube-do-livro">
            Ver livros
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
                variant="book"
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
        <div className="about-visual" aria-hidden="true">
          <span className="about-number">03</span>
          <div><strong>Formar</strong><strong>Conviver</strong><strong>Servir</strong></div>
          <p>Caruaru · PE</p>
        </div>
        <div>
          <p className="eyebrow">Sobre o espaço</p>
          <h2>Um espaço para formar, conviver e recomeçar</h2>
          <p>
            O Espaço Agrestis reúne homens que desejam crescer na formação
            integral, cultivar boas amizades e levar a sério a vida cristã no
            meio do mundo, com especial carinho pela vida cotidiana.
          </p>
          <p>
            Recolhimentos, cinema e literatura criam ocasiões para aprofundar
            a fé, ampliar o repertório e viver melhor as responsabilidades de
            cada dia.
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
          <a className="button secondary" href="#atividades">
            Consultar agenda
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
