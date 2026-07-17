import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STRAPI_URL = "https://13.49.66.119.sslip.io";

async function getTestimonials() {
  const res = await fetch(`${STRAPI_URL}/api/testimonials?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const json = await res.json();

  return json.data;
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5F3EE]">
        {/* Hero Section */}
        <section className="px-6 pb-16 pt-20 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E1116]/40">
            Client Reviews
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0E1116] sm:text-5xl">
            Loved by our clients
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#0E1116]/55">
            Discover what our customers say about their experience working
            with us.
          </p>
        </section>

        {/* Testimonials Grid */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item: any) => (
              <article
                key={item.id}
                className="
                  group relative overflow-hidden
                  rounded-3xl border border-black/[0.06] bg-white p-8
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl
                "
              >
                {/* Quote Icon */}
                <div className="absolute right-7 top-6 font-serif text-5xl text-[#0E1116]/[0.06] transition group-hover:text-[#C8FF4D]/40">
                  &ldquo;
                </div>

                {/* User */}
                <div className="relative flex items-center gap-4">
                  {item.Image?.url && (
                    <Image
                      src={`${STRAPI_URL}${item.Image.url}`}
                      alt={item.Name}
                      width={90}
                      height={90}
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-[#F5F3EE]"
                    />
                  )}

                  <div>
                    <h2 className="text-lg font-semibold text-[#0E1116]">
                      {item.Name}
                    </h2>

                    <p className="mt-0.5 text-sm text-[#0E1116]/45">
                      {item.Designation}
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-[#0E1116]">
                      {item.Company}
                    </p>
                  </div>
                </div>

                {/* Testimonial */}
                <p className="relative mt-7 leading-7 text-[#0E1116]/65">
                  {item.Testimonial}
                </p>

                {/* Rating */}
                <div className="mt-8 flex items-center justify-between border-t border-[#0E1116]/[0.06] pt-5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.Rating }).map((_, i) => (
                      <span key={i} className="text-lg text-[#0E1116]">
                        ★
                      </span>
                    ))}
                  </div>

                  <span className="rounded-full bg-[#C8FF4D]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#1E6B33]">
                    Verified client
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}