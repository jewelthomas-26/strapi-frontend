"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";

const STRAPI_URL = "http://192.168.1.104:1337";

interface BlockRendererProps {
  blocks?: any[];
}

export default function BlockRenderer({ blocks = [] }: BlockRendererProps) {
  if (!blocks.length) return null;

  return (
    <div className="mt-12 space-y-12">
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <div
                key={index}
                className="
  prose prose-lg max-w-none
  prose-headings:text-[#0E1116]
  prose-headings:font-bold
  prose-p:!text-[#0E1116]
  prose-p:leading-8
  prose-strong:!text-[#0E1116]
  prose-a:!text-[#0E1116]
  prose-a:underline
  prose-a:decoration-[#C8FF4D]
  prose-a:decoration-2
  prose-a:underline-offset-2
  prose-blockquote:!text-[#0E1116]
"
              >
                <ReactMarkdown>{block.body}</ReactMarkdown>
              </div>
            );

          case "shared.quote":
            return (
              <blockquote
                key={index}
                className="
                text-black
                  relative overflow-hidden rounded-2xl
                  border-l-4 border-[#C8FF4D]
                  bg-[#0E1116] p-8
                "
              >
                <div className="absolute left-5 top-2 font-serif text-6xl text-white/10">
                  &ldquo;
                </div>

                <p className="relative text-xl leading-relaxed text-white/90 md:text-2xl">
                  {block.body}
                </p>

                {block.title && (
                  <footer className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[#C8FF4D]">
                    — {block.title}
                  </footer>
                )}
              </blockquote>
            );

          case "shared.media":
            return (
              <div key={index}>
                {block.file ? (
                  <div className="overflow-hidden rounded-3xl border border-black/[0.06] shadow-lg">
                    {block.file.mime?.startsWith("video") ? (
                      <video
                        src={`${STRAPI_URL}${block.file.url}`}
                        controls
                        className="w-full rounded-3xl"
                      />
                    ) : (
                      <Image
                        src={`${STRAPI_URL}${block.file.url}`}
                        alt={block.file.alternativeText || "Article image"}
                        width={block.file.width || 1200}
                        height={block.file.height || 800}
                        className="w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#0E1116]/10 bg-[#0E1116]/[0.03] p-5 font-medium text-[#0E1116]/60">
                    Media exists but was not populated from Strapi.
                  </div>
                )}
              </div>
            );

          case "shared.slider":
            return (
              <div key={index}>
                {block.images ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {block.images.map((img: any) => (
                      <div
                        key={img.id}
                        className="overflow-hidden rounded-2xl border border-black/[0.06] shadow-md"
                      >
                        <Image
                          src={`${STRAPI_URL}${img.url}`}
                          alt={img.alternativeText || "Gallery image"}
                          width={img.width}
                          height={img.height}
                          className="w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#0E1116]/10 bg-[#0E1116]/[0.03] p-5 font-medium text-[#0E1116]/60">
                    Slider exists but was not populated from Strapi.
                  </div>
                )}
              </div>
            );

          default:
            return (
              <div
                key={index}
                className="overflow-auto rounded-xl border border-[#0E1116]/10 bg-[#0E1116]/[0.03] p-5"
              >
                <pre className="text-sm text-[#0E1116]">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            );
        }
      })}
    </div>
  );
}