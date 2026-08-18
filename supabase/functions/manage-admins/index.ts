import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.112.3";

const productionOrigin = "https://site.espacoagrestis.workers.dev";
const allowedOrigins = new Set([
  productionOrigin,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function responseHeaders(request: Request) {
  const origin = request.headers.get("Origin");
  return {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": origin && allowedOrigins.has(origin) ? origin : productionOrigin,
    "Content-Type": "application/json",
    "Vary": "Origin",
  };
}

function json(request: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders(request) });
}

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: responseHeaders(request) });
  if (request.method !== "POST") return json(request, { error: "Método não permitido." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const secretKey = Deno.env.get("SUPABASE_SECRET_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = request.headers.get("Authorization");
  if (!supabaseUrl || !secretKey) return json(request, { error: "Serviço de administração indisponível." }, 500);
  if (!authHeader?.startsWith("Bearer ")) return json(request, { error: "Sessão não encontrada." }, 401);

  const admin = createClient(supabaseUrl, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  const token = authHeader.slice("Bearer ".length);
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  const callerEmail = normalizeEmail(userData.user?.email);
  if (userError || !callerEmail) return json(request, { error: "Sua sessão expirou. Entre novamente." }, 401);

  const { data: access } = await admin
    .from("admin_users")
    .select("email")
    .eq("email", callerEmail)
    .eq("active", true)
    .maybeSingle();
  if (!access) return json(request, { error: "Você não tem permissão para administrar usuários." }, 403);

  let payload: { action?: string; email?: string; active?: boolean };
  try {
    payload = await request.json();
  } catch {
    return json(request, { error: "Dados inválidos." }, 400);
  }

  if (payload.action === "list") {
    const { data, error } = await admin
      .from("admin_users")
      .select("email,active,created_at")
      .order("created_at");
    if (error) return json(request, { error: "Não foi possível carregar os administradores." }, 500);
    return json(request, { admins: data });
  }

  const email = normalizeEmail(payload.email);
  if (!isValidEmail(email)) return json(request, { error: "Informe um e-mail válido." }, 400);

  if (payload.action === "invite") {
    const { data: existing } = await admin
      .from("admin_users")
      .select("active")
      .eq("email", email)
      .maybeSingle();
    if (existing) return json(request, { error: "Este e-mail já está cadastrado como administrador." }, 409);

    const { data: invitation, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${productionOrigin}/admin`,
    });
    if (inviteError) return json(request, { error: "Não foi possível enviar o convite. Verifique se o e-mail já possui uma conta." }, 400);

    const { error: insertError } = await admin.from("admin_users").insert({ email, active: true });
    if (insertError) {
      if (invitation.user?.id) await admin.auth.admin.deleteUser(invitation.user.id);
      return json(request, { error: "O convite não pôde ser concluído. Tente novamente." }, 500);
    }
    return json(request, { message: `Convite enviado para ${email}.` }, 201);
  }

  if (payload.action === "set-active" && typeof payload.active === "boolean") {
    if (email === callerEmail && !payload.active) {
      return json(request, { error: "Você não pode desativar sua própria conta." }, 400);
    }
    const { data, error } = await admin
      .from("admin_users")
      .update({ active: payload.active })
      .eq("email", email)
      .select("email")
      .maybeSingle();
    if (error || !data) return json(request, { error: "Administrador não encontrado." }, 404);
    return json(request, { message: payload.active ? "Acesso reativado." : "Acesso desativado." });
  }

  return json(request, { error: "Operação inválida." }, 400);
});
