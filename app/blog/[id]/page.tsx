import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlockRenderer from "./BlockRenderer";
import qs from "qs";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const STRAPI_URL = "https://13.49.66.119.sslip.io";

async function getArticle(id: string) {
  const query = qs.stringify(
    {
      populate: {
        cover: true,
        author: true,
        category: true,
        blocks: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${STRAPI_URL}/api/articles/${id}?${query}`;

  console.log(url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(await res.text());
    return null;
  }

  const json = await res.json();

  console.log(JSON.stringify(json.data, null, 2));

  return json.data;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F3EE] px-5 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#0E1116]/60 transition hover:text-[#0E1116]"
          >
            <span className="transition group-hover:-translate-x-0.5">←</span>
            Back to articles
          </Link>

          {/* Article Card */}
          <article className="overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.14)]">
            {/* Cover Image */}
            {article.cover && (
              <div className="relative h-[280px] w-full overflow-hidden md:h-[440px]">
                <Image
                  src={`${STRAPI_URL}${article.cover.url}`}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/40 via-transparent to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-10 md:px-14 md:py-14">
              {article.category?.name && (
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E1116]/40">
                  {article.category.name}
                </span>
              )}

              {/* Title */}
              <h1 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-[#0E1116] md:text-5xl">
                {article.title}
              </h1>

              {/* Author Section */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E1116] font-bold text-[#C8FF4D]">
                  {article.author?.name?.charAt(0) ?? "A"}
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#0E1116]/40">
                    Written by
                  </p>
                  <p className="font-semibold text-[#0E1116]">
                    {article.author?.name ?? "Anonymous"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-[#0E1116]/[0.08]" />

              {/* Description */}
              <p className="max-w-3xl text-lg leading-8 text-[#0E1116]/70">
                {article.description}
              </p>

              {/* Article Blocks */}
              <div
                className="
                  prose prose-lg mt-10 max-w-none
                  prose-headings:text-[#0E1116]
                  prose-headings:font-bold
                  prose-headings:tracking-tight
                  prose-p:text-[#0E1116]/70
                  prose-p:leading-8
                  prose-a:text-[#0E1116]
                  prose-a:underline
                  prose-a:decoration-[#C8FF4D]
                  prose-a:decoration-2
                  prose-a:underline-offset-2
                  prose-strong:text-[#0E1116]
                "
              >
                <BlockRenderer blocks={article.blocks ?? []} />
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}