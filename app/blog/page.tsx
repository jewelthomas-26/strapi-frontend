import Image from "next/image";
import Link from "next/link";
import { getArticles } from "../lib/strapi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STRAPI_URL = "https://13.49.66.119.sslip.io";

type Article = {
  documentId: string | number;
  title: string;
  description: string;
  author?: { name?: string | null } | null;
  cover?: { url: string } | null;
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Navbar />

        {/* Header */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <div className="rounded-3xl bg-white/60 backdrop-blur shadow-sm ring-1 ring-black/5 px-8 py-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Blogs
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
              Discover insights, stories, and updates from our blog.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section
          className="
            mx-auto grid max-w-6xl gap-8 px-6 pb-16
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {articles.length > 0 ? (
            articles.map((article: Article) => (
              <Link
                href={`/blog/${article.documentId}`}
                key={article.documentId}
                className="group"
              >
                <article
                  className="
                    flex h-full flex-col
                    overflow-hidden rounded-3xl
                    bg-white shadow-sm ring-1 ring-black/5
                    transition duration-300
                    hover:-translate-y-1.5
                    hover:shadow-xl hover:ring-indigo-200
                  "
                >
                  {/* Image */}
                  <div
                    className="
                      relative h-60 overflow-hidden
                      flex-shrink-0
                      bg-gray-100
                    "
                  >
                    {article.cover ? (
                      <Image
                        src={`${STRAPI_URL}${article.cover.url}`}
                        alt={article.title}
                        fill
                        className="
                          object-cover
                          transition duration-500
                          group-hover:scale-110
                        "
                      />
                    ) : null}

                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/40
                        to-transparent
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2
                      className="
                        text-xl sm:text-2xl font-bold text-gray-900
                        line-clamp-2
                        group-hover:text-indigo-600
                        transition
                      "
                    >
                      {article.title}
                    </h2>

                    <p
                      className="
                        mt-3 flex-1
                        text-gray-600
                        line-clamp-3
                      "
                    >
                      {article.description}
                    </p>

                    <div
                      className="
                        mt-5 flex items-center justify-between
                        gap-4
                      "
                    >
                      {article.author?.name ? (
                        <p className="text-sm text-gray-500">
                          By {article.author.name}
                        </p>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Editorial
                        </span>
                      )}

                      <span
                        className="
                          text-sm font-semibold
                          text-indigo-600
                          group-hover:translate-x-0.5
                          transition
                        "
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-full">
              <div className="mx-auto max-w-md rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-black/5">
                <h2 className="text-2xl font-bold text-gray-900">
                  No articles yet
                </h2>
                <p className="mt-3 text-gray-600">
                  Once new posts are published in Strapi, they’ll show up
                  here.
                </p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="
                      inline-flex items-center justify-center
                      rounded-full bg-indigo-600 px-6 py-3 text-white font-semibold
                      transition hover:bg-indigo-700
                    "
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
