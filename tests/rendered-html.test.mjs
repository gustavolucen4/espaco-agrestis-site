import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function renderHtml(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the Espaço Agrestis home with the current agenda", async () => {
  const html = await renderHtml("/");

  assert.match(html, /<title>Espaço Agrestis/);
  assert.match(html, /22 de agosto de 2026/);
  assert.match(html, /A Sociedade do Anel/);
  assert.match(html, /Próximas atividades/);
  assert.match(html, /Felicidade Não Se Compra/);
  assert.match(html, /Rocky Balboa/);
  assert.match(html, /instagram\.com\/espacoagrestis/);
  assert.match(html, /Pan Nossa/);
  assert.doesNotMatch(html, /Building your site|No MVP/);
});

test("renders all Cinedebate sessions in viewing order", async () => {
  const html = await renderHtml("/cinedebate");

  assert.match(html, /<strong>9<\/strong>/);
  assert.match(html, /sessões registradas/);
  assert.ok(html.indexOf("Gênio Indomável") < html.indexOf("Whiplash"));
  assert.ok(html.indexOf("Whiplash") < html.indexOf("Felicidade Não Se Compra"));
  assert.ok(html.indexOf("Felicidade Não Se Compra") < html.indexOf("Rocky Balboa"));
  assert.match(html, /Nosso favorito/);
  assert.match(html, /\/covers\/rocky-balboa\.jpg/);
  assert.match(html, /Ver publicação no Instagram/);
});

test("renders books grouped by reading stage", async () => {
  const html = await renderHtml("/clube-do-livro");

  assert.match(html, /<strong>4<\/strong>/);
  assert.match(html, /livros registrados/);
  assert.match(html, /Em leitura/);
  assert.match(html, /Já lemos/);
  assert.match(html, /Próximas leituras/);
  assert.match(html, /O Hobbit/);
  assert.match(html, /As Duas Torres/);
  assert.match(html, /O Retorno do Rei/);
  assert.match(html, /\/covers\/sociedade-do-anel\.webp/);
  assert.match(html, /22 de agosto de 2026, às 9h/);
});
