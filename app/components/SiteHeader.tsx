/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

type SiteHeaderProps = {
  active?: "home" | "cinedebate" | "livros";
};

export function SiteHeader({ active = "home" }: SiteHeaderProps) {
  return (
    <header className="site-header" aria-label="Cabeçalho do site">
      <a className="brand" href="/" aria-label="Espaço Agrestis">
        <span className="brand-mark">
          <img src="/logo-agrestis.jpg" alt="" />
        </span>
        <span>Espaço Agrestis</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="/" aria-current={active === "home" ? "page" : undefined}>Início</a>
        <a href="/#atividades">Agenda</a>
        <a href="/cinedebate" aria-current={active === "cinedebate" ? "page" : undefined}>Cinedebate</a>
        <a href="/clube-do-livro" aria-current={active === "livros" ? "page" : undefined}>Livros</a>
        <a href="/#contato">Contato</a>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Abrir ou fechar menu">
          <span />
          <span />
          <span />
        </summary>
        <div className="mobile-menu-panel" aria-label="Menu mobile">
          <p>Menu</p>
          <a href="/" aria-current={active === "home" ? "page" : undefined}>Início</a>
          <a href="/#atividades">Agenda</a>
          <a href="/cinedebate" aria-current={active === "cinedebate" ? "page" : undefined}>Cinedebate</a>
          <a href="/clube-do-livro" aria-current={active === "livros" ? "page" : undefined}>Livros</a>
          <a href="/#contato">Contato</a>
        </div>
      </details>
    </header>
  );
}
