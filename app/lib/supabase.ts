import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

type CloudflareRequestInit = RequestInit & {
  cf?: {
    cacheEverything: boolean;
    cacheTtl: number;
    cacheTtlByStatus: Record<string, number>;
  };
};

const cachedPublicFetch: typeof fetch = (input, init) => {
  const method = init?.method || (input instanceof Request ? input.method : "GET");
  if (method.toUpperCase() !== "GET") return fetch(input, init);

  return fetch(input, {
    ...init,
    cf: {
      cacheEverything: true,
      cacheTtl: 120,
      cacheTtlByStatus: { "200-299": 120, "400-599": 0 },
    },
  } as CloudflareRequestInit);
};

export function createPublicClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseKey) return null;

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: cachedPublicFetch },
  });
}

let browserClient: SupabaseClient | null = null;

export function createBrowserSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("A conexão com o Supabase ainda não foi configurada.");
  }

  browserClient ??= createClient(supabaseUrl, supabaseKey);
  return browserClient;
}
