/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand" href="/">
          <span className="brand-mark">
            <img src="/logo-agrestis.jpg" alt="" />
          </span>
          <span>Espaço Agrestis</span>
        </a>
        <p>Formação, cultura e amizade em Caruaru, Pernambuco.</p>
      </div>
      <nav className="footer-nav" aria-label="Navegação do rodapé">
        <a href="/#atividades">Agenda</a>
        <a href="/cinedebate">Cinedebate</a>
        <a href="/clube-do-livro">Clube do Livro</a>
      </nav>
    </footer>
  );
}
