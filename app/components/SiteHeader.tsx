/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Cabeçalho do site">
      <a className="brand" href="/" aria-label="Espaço Agrestis">
        <span className="brand-mark">
          <img src="/logo-agrestis.jpg" alt="" />
        </span>
        <span>Espaço Agrestis</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="/#atividades">Atividades</a>
        <a href="/cinedebate">Cinedebate</a>
        <a href="/clube-do-livro">Livros</a>
        <a href="/#contato">Contato</a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Abrir menu">
          <span />
          <span />
          <span />
        </summary>
        <div className="mobile-menu-panel" aria-label="Menu mobile">
          <a href="/#atividades">Atividades</a>
          <a href="/cinedebate">Cinedebate</a>
          <a href="/clube-do-livro">Livros</a>
          <a href="/#contato">Contato</a>
        </div>
      </details>
    </header>
  );
}
