import Image from "next/image";

const upcomingActivities = [
  {
    type: "Recolhimento mensal",
    title: "Manhã de recolhimento com sacerdote",
    date: "Próxima data a confirmar",
    place: "Caruaru, PE",
    detail:
      "Tempo de oração, formação e silêncio para renovar a vida interior no cotidiano.",
  },
  {
    type: "Cinedebate",
    title: "Sessão e conversa sobre cinema",
    date: "Próxima sessão em definição",
    place: "Espaco Agrestis",
    detail:
      "Um filme escolhido em comunidade, seguido de conversa sobre personagens, virtudes e escolhas concretas.",
  },
  {
    type: "Clube do livro",
    title: "Encontro bimestral de leitura",
    date: "Próximo livro a divulgar",
    place: "Caruaru, PE",
    detail:
      "Leituras compartilhadas para formar critério, amizade e desejo de santificar a vida ordinária.",
  },
];

const watchedMovies = [
  {
    title: "A Vida é Bela",
    theme: "Esperança e sacrifício",
    description:
      "Uma história sobre amor, imaginação e coragem diante do sofrimento, que abre conversa sobre paternidade, dignidade e sentido.",
  },
  {
    title: "O Homem que Não Vendeu sua Alma",
    theme: "Consciência e fidelidade",
    description:
      "Um convite a discutir verdade, liberdade interior e a firmeza de quem procura agir com retidão.",
  },
  {
    title: "A Festa de Babette",
    theme: "Generosidade e beleza",
    description:
      "Um filme para conversar sobre gratuidade, comunidade, reconciliação e a beleza que nasce do serviço bem feito.",
  },
];

const books = [
  {
    title: "Caminho",
    author: "São Josemaria Escrivá",
    status: "Leitura sugerida",
    description:
      "Pontos breves para meditação pessoal sobre trabalho, oração, amizade, caridade e vida de fé.",
  },
  {
    title: "O Pequeno Principe",
    author: "Antoine de Saint-Exupery",
    status: "Para debate",
    description:
      "Uma leitura simples e profunda para conversar sobre amizade, responsabilidade e aquilo que educa o olhar.",
  },
  {
    title: "A Abolição do Homem",
    author: "C. S. Lewis",
    status: "Próxima possibilidade",
    description:
      "Ensaio para discutir educação, virtude, formação moral e a importância de bons critérios.",
  },
];

const pillars = [
  "Formação cristã para a vida diária",
  "Amizade, cultura e conversa boa",
  "Oração, estudo e serviço em Caruaru",
];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Cabecalho do site">
        <a className="brand" href="#inicio" aria-label="Espaço Agrestis">
          <span className="brand-mark">
            <Image src="/logo-agrestis.jpg" alt="" width={72} height={72} />
          </span>
          <span>Espaço Agrestis</span>
        </a>
        <nav aria-label="Navegacao principal">
          <a href="#atividades">Atividades</a>
          <a href="#cinedebate">Cinedebate</a>
          <a href="#livros">Livros</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-copy">
          <Image
            className="hero-logo"
            src="/logo-agrestis.jpg"
            alt="Brasão do Espaço Cultural Agrestis"
            width={192}
            height={192}
            priority
          />
          <p className="eyebrow">Comunidade católica em Caruaru</p>
          <h1>Espaço Agrestis</h1>
          <p className="hero-text">
            Um lugar para reunir recolhimentos, cinedebates, leituras e
            encontros de formação inspirados nos ensinamentos de São Josemaria
            Escrivá e no espírito do Opus Dei: santificar a vida cotidiana.
          </p>
          <div className="hero-actions" aria-label="Acoes principais">
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
          <h2 id="next-title">Proxima atividade</h2>
          <p className="next-title">Recolhimento mensal</p>
          <p>
            Uma manhã de oração, meditação e formação com sacerdote em Caruaru.
          </p>
          <a href="#recolhimento" className="text-link">
            Ver detalhes
          </a>
        </aside>
      </section>

      <section className="intro-band" aria-label="Pilares do Espaco Agrestis">
        {pillars.map((pillar) => (
          <p key={pillar}>{pillar}</p>
        ))}
      </section>

      <section id="atividades" className="section">
        <div className="section-heading">
          <p className="eyebrow">Agenda centralizada</p>
          <h2>Proximas atividades</h2>
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

      <section id="cinedebate" className="section muted">
        <div className="section-heading">
          <p className="eyebrow">Cinema e conversa</p>
          <h2>Cinedebate</h2>
          <p>
            Um registro organizado dos filmes já assistidos e das ideias que
            podem ajudar na vida, no trabalho, na família e nas amizades.
          </p>
        </div>
        <div className="list-grid">
          {watchedMovies.map((movie) => (
            <article className="content-card" key={movie.title}>
              <p className="tag">{movie.theme}</p>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="livros" className="section">
        <div className="section-heading">
          <p className="eyebrow">Leitura compartilhada</p>
          <h2>Clube do livro</h2>
          <p>
            Encontros bimestrais para conversar sobre livros que formam a
            inteligência, a sensibilidade e a vida cristã.
          </p>
        </div>
        <div className="timeline">
          {books.map((book) => (
            <article className="book-row" key={book.title}>
              <div>
                <p className="tag">{book.status}</p>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
              </div>
              <p>{book.description}</p>
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
