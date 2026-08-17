"use client";

/* eslint-disable @next/next/no-img-element */

import {
  BookOpen,
  CalendarDays,
  Eye,
  EyeOff,
  Film,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "../lib/supabase";

type Tab = "activities" | "movies" | "books";
type Row = Record<string, string | number | boolean | null> & { id: string };
type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "datetime-local" | "url" | "textarea" | "select" | "checkbox" | "image";
  options?: { value: string; label: string }[];
  required?: boolean;
  wide?: boolean;
};

const tabs: { id: Tab; label: string; icon: typeof CalendarDays }[] = [
  { id: "activities", label: "Atividades", icon: CalendarDays },
  { id: "movies", label: "Filmes", icon: Film },
  { id: "books", label: "Livros", icon: BookOpen },
];

const fields: Record<Tab, Field[]> = {
  activities: [
    { name: "title", label: "Título", required: true, wide: true },
    { name: "type_label", label: "Nome da atividade", required: true },
    { name: "category", label: "Categoria", type: "select", required: true, options: [
      { value: "book_club", label: "Clube do Livro" },
      { value: "recollection", label: "Recolhimento" },
      { value: "cinedebate", label: "Cinedebate" },
      { value: "other", label: "Outra" },
    ] },
    { name: "starts_at", label: "Data e horário", type: "datetime-local" },
    { name: "date_text", label: "Texto quando não houver data" },
    { name: "location_name", label: "Local", required: true },
    { name: "location_address", label: "Endereço" },
    { name: "city", label: "Cidade", required: true },
    { name: "state", label: "Estado", required: true },
    { name: "theme", label: "Tema", wide: true },
    { name: "description", label: "Descrição", type: "textarea", wide: true },
    { name: "detail_url", label: "Página de detalhes", required: true },
    { name: "sort_order", label: "Ordem", type: "number" },
    { name: "status", label: "Situação", type: "select", options: [
      { value: "draft", label: "Rascunho" },
      { value: "scheduled", label: "Agendada" },
      { value: "completed", label: "Concluída" },
      { value: "cancelled", label: "Cancelada" },
    ] },
    { name: "featured", label: "Destacar como próxima atividade", type: "checkbox", wide: true },
    { name: "published", label: "Publicar no site", type: "checkbox", wide: true },
  ],
  movies: [
    { name: "title", label: "Título", required: true, wide: true },
    { name: "session_order", label: "Número da sessão", type: "number", required: true },
    { name: "release_year", label: "Ano", type: "number" },
    { name: "theme", label: "Tema", required: true },
    { name: "status_label", label: "Situação", required: true },
    { name: "cover_url", label: "Capa", type: "image", wide: true },
    { name: "cover_format", label: "Formato da imagem", type: "select", options: [
      { value: "cover", label: "Capa vertical" },
      { value: "post", label: "Post quadrado" },
    ] },
    { name: "cover_alt", label: "Descrição acessível da capa" },
    { name: "instagram_url", label: "Link do Instagram", type: "url", wide: true },
    { name: "description", label: "Descrição", type: "textarea", wide: true },
    { name: "discussion", label: "O que conversamos", type: "textarea", wide: true },
    { name: "favorite", label: "Marcar como favorito", type: "checkbox", wide: true },
    { name: "published", label: "Publicar no site", type: "checkbox", wide: true },
  ],
  books: [
    { name: "title", label: "Título", required: true, wide: true },
    { name: "author", label: "Autor", required: true },
    { name: "reading_stage", label: "Etapa", type: "select", required: true, options: [
      { value: "current", label: "Em leitura" },
      { value: "read", label: "Já lido" },
      { value: "upcoming", label: "Próxima leitura" },
    ] },
    { name: "status_label", label: "Situação", required: true },
    { name: "meeting_at", label: "Data do encontro", type: "datetime-local" },
    { name: "meeting_label", label: "Texto do encontro", required: true, wide: true },
    { name: "cover_url", label: "Capa", type: "image", wide: true },
    { name: "cover_format", label: "Formato da imagem", type: "select", options: [
      { value: "cover", label: "Capa vertical" },
      { value: "post", label: "Post quadrado" },
    ] },
    { name: "cover_alt", label: "Descrição acessível da capa" },
    { name: "instagram_url", label: "Link do Instagram", type: "url", wide: true },
    { name: "description", label: "Descrição", type: "textarea", wide: true },
    { name: "discussion", label: "Pontos para conversar", type: "textarea", wide: true },
    { name: "sort_order", label: "Ordem", type: "number" },
    { name: "published", label: "Publicar no site", type: "checkbox", wide: true },
  ],
};

const defaults: Record<Tab, Record<string, string | number | boolean | null>> = {
  activities: { category: "other", type_label: "", title: "", starts_at: null, date_text: "", location_name: "", location_address: "", city: "Caruaru", state: "PE", theme: "", description: "", detail_url: "/", featured: false, status: "scheduled", published: false, sort_order: 0 },
  movies: { session_order: 1, title: "", release_year: null, theme: "", status_label: "Já assistido", favorite: false, cover_url: "", cover_format: "cover", cover_alt: "", instagram_url: "", description: "", discussion: "", published: false },
  books: { title: "", author: "", status_label: "Próxima leitura", reading_stage: "upcoming", meeting_at: null, meeting_label: "Data a confirmar", cover_url: "", cover_format: "cover", cover_alt: "", instagram_url: "", description: "", discussion: "", sort_order: 0, published: false },
};

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toInputDate(value: unknown) {
  if (!value || typeof value !== "string") return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function recordTitle(tab: Tab, row: Row) {
  if (tab === "activities") return String(row.title);
  if (tab === "movies") return `${String(row.session_order).padStart(2, "0")} · ${row.title}`;
  return String(row.title);
}

export function AdminDashboard() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [authState, setAuthState] = useState<"loading" | "signed-out" | "checking" | "ready">("loading");
  const [tab, setTab] = useState<Tab>("activities");
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [form, setForm] = useState<Record<string, string | number | boolean | null>>({});
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("gustavolucena12@gmail.com");
  const [password, setPassword] = useState("");

  const verifyAdmin = useCallback(async () => {
    setAuthState("checking");
    const { data, error } = await supabase.from("admin_users").select("email").maybeSingle();
    if (error || !data) {
      await supabase.auth.signOut();
      setMessage("Este usuário não está autorizado a administrar o site.");
      setAuthState("signed-out");
      return;
    }
    setAuthState("ready");
  }, [supabase]);

  const loadRows = useCallback(async () => {
    setBusy(true);
    setMessage("");
    const orderColumn = tab === "activities" ? "sort_order" : tab === "movies" ? "session_order" : "sort_order";
    const { data, error } = await supabase.from(tab).select("*").order(orderColumn);
    setBusy(false);
    if (error) setMessage(error.message);
    else setRows((data || []) as Row[]);
  }, [supabase, tab]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) verifyAdmin();
      else setAuthState("signed-out");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) window.setTimeout(verifyAdmin, 0);
      if (event === "SIGNED_OUT") setAuthState("signed-out");
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase, verifyAdmin]);

  useEffect(() => {
    if (authState !== "ready") return;
    const timer = window.setTimeout(loadRows, 0);
    return () => window.clearTimeout(timer);
  }, [authState, loadRows]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage("Não foi possível entrar. Confira o e-mail e a senha.");
  }

  async function createAccess() {
    if (password.length < 8) {
      setMessage("Crie uma senha com pelo menos 8 caracteres.");
      return;
    }
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setBusy(false);
    if (error) setMessage(error.message);
    else if (!data.session) setMessage("Enviamos uma confirmação para seu e-mail. Confirme e depois volte para entrar.");
  }

  function openEditor(row?: Row) {
    const values = row ? { ...row } : { ...defaults[tab] };
    if ("starts_at" in values) values.starts_at = toInputDate(values.starts_at);
    if ("meeting_at" in values) values.meeting_at = toInputDate(values.meeting_at);
    setForm(values);
    setCoverFile(null);
    setEditing(row || "new");
    setMessage("");
  }

  async function uploadCover(title: string) {
    if (!coverFile) return String(form.cover_url || "") || null;
    const extension = coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${tab}/${Date.now()}-${slugify(title)}.${extension}`;
    const { error } = await supabase.storage.from("covers").upload(path, coverFile, { upsert: false });
    if (error) throw error;
    return supabase.storage.from("covers").getPublicUrl(path).data.publicUrl;
  }

  async function saveRecord(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const payload = { ...form };
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;
      payload.slug = String(payload.slug || slugify(String(payload.title)));
      for (const key of ["starts_at", "meeting_at"]) {
        if (key in payload) payload[key] = payload[key] ? new Date(String(payload[key])).toISOString() : null;
      }
      for (const key of ["date_text", "location_address", "theme", "instagram_url", "cover_url", "release_year"]) {
        if (key in payload && payload[key] === "") payload[key] = null;
      }
      if (tab !== "activities") payload.cover_url = await uploadCover(String(payload.title));
      const query = editing === "new"
        ? supabase.from(tab).insert(payload)
        : supabase.from(tab).update(payload).eq("id", (editing as Row).id);
      const { error } = await query;
      if (error) throw error;
      setEditing(null);
      setMessage("Alterações salvas e disponíveis no site.");
      await loadRows();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível salvar.");
    } finally {
      setBusy(false);
    }
  }

  async function togglePublished(row: Row) {
    setBusy(true);
    const { error } = await supabase.from(tab).update({ published: !row.published }).eq("id", row.id);
    if (error) setMessage(error.message);
    await loadRows();
  }

  async function deleteRecord(row: Row) {
    if (!window.confirm(`Excluir “${row.title}”? Essa ação não pode ser desfeita.`)) return;
    setBusy(true);
    const { error } = await supabase.from(tab).delete().eq("id", row.id);
    if (error) setMessage(error.message);
    else setMessage("Item excluído.");
    await loadRows();
  }

  if (authState !== "ready") {
    return (
      <main className="admin-login-shell">
        <section className="admin-login-panel">
          <Link className="admin-brand" href="/"><img src="/logo-agrestis.jpg" alt="" /><span>Espaço Agrestis</span></Link>
          {authState === "loading" || authState === "checking" ? (
            <div className="admin-loading"><RefreshCw className="spin" size={22} /><p>Verificando acesso...</p></div>
          ) : (
            <form onSubmit={login}>
              <p className="eyebrow">Área reservada</p>
              <h1>Administração</h1>
              <p>Entre para atualizar a agenda, os filmes e os livros.</p>
              <label>E-mail<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
              <label>Senha<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} /></label>
              {message ? <p className="admin-message" role="status">{message}</p> : null}
              <button className="button primary" disabled={busy} type="submit">Entrar</button>
              <button className="admin-text-button" disabled={busy} type="button" onClick={createAccess}>Criar primeiro acesso</button>
            </form>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link className="admin-brand" href="/"><img src="/logo-agrestis.jpg" alt="" /><span>Espaço Agrestis</span></Link>
        <div><Link className="admin-site-link" href="/" target="_blank">Ver site</Link><button className="icon-button" type="button" title="Sair" aria-label="Sair" onClick={() => supabase.auth.signOut()}><LogOut size={19} /></button></div>
      </header>

      <div className="admin-workspace">
        <div className="admin-title-row">
          <div><p className="eyebrow">Conteúdo</p><h1>Administração</h1></div>
          <button className="button primary admin-add" type="button" onClick={() => openEditor()}><Plus size={18} />Adicionar</button>
        </div>

        <nav className="admin-tabs" aria-label="Tipos de conteúdo">
          {tabs.map((item) => {
            const Icon = item.icon;
            return <button className={tab === item.id ? "active" : ""} key={item.id} type="button" onClick={() => { setTab(item.id); setEditing(null); }}><Icon size={18} /><span>{item.label}</span></button>;
          })}
        </nav>

        {message ? <p className="admin-message" role="status">{message}</p> : null}
        <section className="admin-list" aria-busy={busy}>
          <div className="admin-list-heading"><h2>{tabs.find((item) => item.id === tab)?.label}</h2><span>{rows.length} {rows.length === 1 ? "item" : "itens"}</span></div>
          {rows.length ? rows.map((row) => (
            <article className="admin-row" key={row.id}>
              {tab !== "activities" && row.cover_url ? <img src={String(row.cover_url)} alt="" /> : <div className="admin-row-icon">{tab === "activities" ? <CalendarDays size={20} /> : tab === "movies" ? <Film size={20} /> : <BookOpen size={20} />}</div>}
              <div className="admin-row-copy"><h3>{recordTitle(tab, row)}</h3><p>{tab === "activities" ? String(row.type_label) : tab === "movies" ? String(row.theme) : String(row.author)}</p></div>
              <span className={`publish-status ${row.published ? "published" : "draft"}`}>{row.published ? "Publicado" : "Rascunho"}</span>
              <div className="admin-row-actions">
                <button className="icon-button" type="button" title={row.published ? "Ocultar" : "Publicar"} aria-label={row.published ? "Ocultar" : "Publicar"} onClick={() => togglePublished(row)}>{row.published ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                <button className="icon-button" type="button" title="Editar" aria-label="Editar" onClick={() => openEditor(row)}><Pencil size={18} /></button>
                <button className="icon-button danger" type="button" title="Excluir" aria-label="Excluir" onClick={() => deleteRecord(row)}><Trash2 size={18} /></button>
              </div>
            </article>
          )) : <div className="admin-empty"><p>Nenhum item cadastrado.</p><button className="button secondary" type="button" onClick={() => openEditor()}><Plus size={18} />Adicionar primeiro item</button></div>}
        </section>
      </div>

      {editing ? <div className="admin-editor-backdrop" role="presentation">
        <section className="admin-editor" role="dialog" aria-modal="true" aria-labelledby="editor-title">
          <header><div><p className="eyebrow">{editing === "new" ? "Novo conteúdo" : "Editar conteúdo"}</p><h2 id="editor-title">{tabs.find((item) => item.id === tab)?.label}</h2></div><button className="icon-button" type="button" title="Fechar" aria-label="Fechar" onClick={() => setEditing(null)}><X size={20} /></button></header>
          <form onSubmit={saveRecord}>
            <div className="admin-form-grid">
              {fields[tab].map((field) => {
                const value = form[field.name];
                if (field.type === "checkbox") return <label className={`admin-check ${field.wide ? "wide" : ""}`} key={field.name}><input type="checkbox" checked={Boolean(value)} onChange={(event) => setForm({ ...form, [field.name]: event.target.checked })} /><span>{field.label}</span></label>;
                if (field.type === "textarea") return <label className={field.wide ? "wide" : ""} key={field.name}>{field.label}<textarea rows={4} value={String(value ?? "")} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} required={field.required} /></label>;
                if (field.type === "select") return <label className={field.wide ? "wide" : ""} key={field.name}>{field.label}<select value={String(value ?? "")} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} required={field.required}>{field.options?.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>;
                if (field.type === "image") return <div className="admin-image-field wide" key={field.name}><label>{field.label}<input type="url" placeholder="Link da imagem ou envie um arquivo abaixo" value={String(value ?? "")} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} /></label><label className="upload-button"><Upload size={18} /><span>{coverFile ? coverFile.name : "Escolher imagem"}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setCoverFile(event.target.files?.[0] || null)} /></label>{(coverFile || value) ? <img src={coverFile ? URL.createObjectURL(coverFile) : String(value)} alt="Prévia da capa" /> : null}</div>;
                return <label className={field.wide ? "wide" : ""} key={field.name}>{field.label}<input type={field.type || "text"} value={String(value ?? "")} onChange={(event) => setForm({ ...form, [field.name]: field.type === "number" ? (event.target.value === "" ? "" : Number(event.target.value)) : event.target.value })} required={field.required} /></label>;
              })}
            </div>
            <footer><button className="button secondary" type="button" onClick={() => setEditing(null)}>Cancelar</button><button className="button primary" disabled={busy} type="submit"><Save size={18} />Salvar</button></footer>
          </form>
        </section>
      </div> : null}
    </main>
  );
}
