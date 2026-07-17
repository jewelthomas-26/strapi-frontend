import Image from "next/image";
import Link from "next/link";
import { getArticles } from "./lib/strapi";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const STRAPI_URL = "https://13.49.66.119.sslip.io";

type Article = {
  documentId: string | number;
  title: string;
  description: string;
  author?: { name?: string | null } | null;
  cover?: { url: string } | null;
};

export default async function Home() {
  const articles = await getArticles();

  return (
    <>
      <main className="min-h-screen bg-[#F5F3EE]">
        <Navbar />

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-10 pb-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#0E1116]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,255,77,0.08),transparent_45%)]" />

            <div className="relative px-8 py-16 text-center sm:py-20">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8FF4D]">
                The Journal
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
                Ideas worth
                <br className="hidden sm:block" /> reading, weekly.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
                Insights, stories, and updates — written by the people
                building the product.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/blog"
                  className="rounded-full bg-[#C8FF4D] px-7 py-3 text-sm font-semibold text-[#0E1116] transition hover:bg-white"
                >
                  Explore the blog
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-8 flex items-end justify-between border-b border-[#0E1116]/10 pb-5">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E1116]/40">
              Latest articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[#0E1116] transition hover:text-[#0E1116]/60"
            >
              View all →
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article: Article) => (
                <Link
                  href={`/blog/${article.documentId}`}
                  key={article.documentId}
                  className="group"
                >
                  <article
                    className="
                      flex h-full flex-col
                      overflow-hidden rounded-3xl
                      bg-white ring-1 ring-black/[0.06]
                      transition duration-300
                      hover:-translate-y-1.5 hover:shadow-xl hover:ring-black/[0.08]
                    "
                  >
                    {/* Image */}
                    <div className="relative h-56 flex-shrink-0 overflow-hidden bg-[#0E1116]/5">
                      {article.cover ? (
                        <Image
                          src={`${STRAPI_URL}${article.cover.url}`}
                          alt={article.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : null}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/50 to-transparent" />

                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#0E1116] backdrop-blur">
                        Article
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-bold leading-snug text-[#0E1116] line-clamp-2 transition group-hover:text-[#0E1116]/70">
                        {article.title}
                      </h3>

                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#0E1116]/55 line-clamp-3">
                        {article.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#0E1116]/[0.06] pt-4">
                        {article.author?.name ? (
                          <p className="text-sm text-[#0E1116]/45">
                            By {article.author.name}
                          </p>
                        ) : (
                          <span className="text-sm text-[#0E1116]/30">
                            Editorial
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-sm font-semibold text-[#0E1116] transition group-hover:translate-x-0.5">
                          Read
                          <span aria-hidden>→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-[#0E1116]/15 bg-white/50 p-14 text-center">
              <h3 className="text-2xl font-bold text-[#0E1116]">
                No articles yet
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[#0E1116]/50">
                Once new posts are published in Strapi, they&#39;ll show up here.
              </p>
              <div className="mt-7">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full bg-[#0E1116] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Browse blog
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}