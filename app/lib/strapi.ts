const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://13.49.66.119.sslip.io";

type StrapiResponse<T> = {
  data: T;
};

export async function getArticles() {
  const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    console.log(error);
    throw new Error("Failed to fetch articles");
  }

  const json = (await res.json()) as StrapiResponse<
    Array<Partial<StrapiArticle>> & { documentId?: string | number }
  >;

  const data = json.data ?? [];

  // Normalize ONLY what blog list UI needs (keeps types compatible).
  return data.map((a) => {
    const coverUrl =
      a.cover && typeof a.cover.url === "string" ? a.cover.url : null;

    return {
      documentId: (a.documentId ?? "") as string | number,
      title: a.title ?? "",
      description: a.description ?? "",
      author: a.author ?? null,
      cover: coverUrl ? { url: coverUrl } : null,
    };
  });
}

type StrapiArticle = {
  documentId: string | number;
  title: string;
  description: string;
  cover?: {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  } | null;
  author?: {
    name?: string | null;
  } | null;
  blocks?: Array<{
    __component?: string;
    body?: string;
    title?: string;
    file?: {
      url?: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    } | null;
    images?: Array<{
      id?: number | string;
      url?: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    }> | null;
  }> | null;
};

export async function getArticleById(id: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/articles/${id}?populate[0]=author&populate[1]=cover&populate[2]=blocks.populate[*]`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = (await res.json()) as StrapiResponse<StrapiArticle>;
  return json.data;
}
