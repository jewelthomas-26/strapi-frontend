"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Phone,
  Loader2,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type ApplicationForm = {
  name: string;
  email: string;
  position: string;
  number: string;
  resume: File | null;
};

const POSITIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Intern",
];

const BENEFITS = [
  {
    title: "Career growth",
    body: "Structured mentorship and a real path from junior to lead.",
  },
  {
    title: "Remote-friendly",
    body: "Work from wherever you're most productive, on your schedule.",
  },
  {
    title: "Ship real product",
    body: "Small teams, fast releases, code that reaches users in days.",
  },
];

export default function CareersPage() {
  const [form, setForm] = useState<ApplicationForm>({
    name: "",
    email: "",
    position: "",
    number: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const STRAPI_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL || "https://13.49.66.119.sslip.io";

    try {
      let resumeId: number | null = null;

      // Step 1: upload the file separately (if provided)
      if (form.resume) {
        const uploadData = new FormData();
        uploadData.append("files", form.resume);

        const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
          method: "POST",
          body: uploadData,
        });

        const uploadText = await uploadRes.text();
        let uploadJson: any = null;
        try {
          uploadJson = uploadText ? JSON.parse(uploadText) : null;
        } catch {
          console.error("Non-JSON upload response:", uploadText);
        }

        if (!uploadRes.ok) {
          console.error("Upload error:", uploadJson ?? uploadText);
          throw new Error(uploadJson?.error?.message || "File upload failed.");
        }

        // Strapi returns an array of uploaded file objects
        resumeId = uploadJson?.[0]?.id ?? null;
      }

      // Step 2: create the entry as plain JSON (no FormData, no file)
      const res = await fetch(`${STRAPI_URL}/api/join-our-teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            Name: form.name,
            Email: form.email,
            Position: form.position,
            Number: form.number,
            Resume: resumeId ? [resumeId] : [], // array because field is "multiple media"
            publishedAt: new Date().toISOString(),
          },
        }),
      });

      console.log("Status:", res.status, res.statusText);

      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        console.error("Non-JSON response from Strapi:", text);
      }

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Application submitted. We'll be in touch soon.",
        });
        setForm({ name: "", email: "", position: "", number: "", resume: null });
      } else {
        console.error("Strapi error:", data ?? text);
        setStatus({
          type: "error",
          message: data?.error?.message || `Request failed with status ${res.status}.`,
        });
      }
    } catch (err: any) {
      console.error("Network/JS error:", err);
      setStatus({
        type: "error",
        message: err?.message || "Could not reach the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const success = status?.type === "success";

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setForm((f) => ({ ...f, resume: file }));
  };

  return (
    <main className="min-h-screen bg-[#F5F3EE]">
      <div className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E1116]/50">
            Careers
          </span>

          <Link
            href="/"
            className="group flex items-center gap-1.5 text-sm font-medium text-[#0E1116]/70 hover:text-[#0E1116]"
          >
            <ArrowLeft
              size={15}
              className="transition group-hover:-translate-x-0.5"
            />
            Back home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          {/* Left — brand / pitch panel */}
          <section className="lg:sticky lg:top-10 rounded-[28px] bg-[#0E1116] p-10 text-white">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8FF4D]">
              We're hiring
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Build what's next,
              <br />
              with us.
            </h1>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
              We're a small team that ships fast and cares about the craft.
              If that sounds like your kind of place, we'd like to hear from
              you.
            </p>

            <div className="mt-10 space-y-6 border-t border-white/10 pt-8">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <ArrowUpRight
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C8FF4D]"
                  />
                  <div>
                    <h3 className="text-[15px] font-semibold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
              Applications reviewed every week
            </p>
          </section>

          {/* Right — form */}
          <section className="rounded-[28px] border border-black/[0.06] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_-24px_rgba(0,0,0,0.12)] sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-[#0E1116]">
              Apply now
            </h2>
            <p className="mt-1.5 text-sm text-[#0E1116]/50">
              Takes about two minutes.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#0E1116]/40"
                >
                  Full name
                </label>
                <input
                  id="name"
                  required
                  disabled={loading}
                  placeholder="Jordan Lee"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full border-b-2 border-[#0E1116]/10 bg-transparent py-2 text-[15px] text-[#0E1116] outline-none placeholder:text-[#0E1116]/25 focus:border-[#0E1116] disabled:opacity-50"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#0E1116]/40"
                  >
                    <Mail size={12} /> Email
                  </label>
                  <input
                    id="email"
                    required
                    disabled={loading}
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="mt-2 w-full border-b-2 border-[#0E1116]/10 bg-transparent py-2 text-[15px] text-[#0E1116] outline-none placeholder:text-[#0E1116]/25 focus:border-[#0E1116] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#0E1116]/40"
                  >
                    <Phone size={12} /> Phone
                  </label>
                  <input
                    id="phone"
                    required
                    disabled={loading}
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.number}
                    onChange={(e) =>
                      setForm({ ...form, number: e.target.value })
                    }
                    className="mt-2 w-full border-b-2 border-[#0E1116]/10 bg-transparent py-2 text-[15px] text-[#0E1116] outline-none placeholder:text-[#0E1116]/25 focus:border-[#0E1116] disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Position — pill toggle group */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#0E1116]/40">
                  Position
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {POSITIONS.map((p) => {
                    const active = form.position === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        disabled={loading}
                        onClick={() => setForm({ ...form, position: p })}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${
                          active
                            ? "border-[#0E1116] bg-[#0E1116] text-white"
                            : "border-[#0E1116]/15 text-[#0E1116]/70 hover:border-[#0E1116]/40"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
                {/* keep a real select in the DOM for form semantics / required validation */}
                <select
                  required
                  value={form.position}
                  onChange={() => {}}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <option value="">Select Position</option>
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resume — dropzone */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#0E1116]/40">
                  Resume
                </label>

                <label
                  htmlFor="resume"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`mt-2.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
                    dragActive
                      ? "border-[#0E1116] bg-[#0E1116]/[0.03]"
                      : "border-[#0E1116]/15 hover:border-[#0E1116]/30"
                  }`}
                >
                  {form.resume ? (
                    <>
                      <FileCheck2 size={22} className="text-[#0E1116]" />
                      <span className="text-sm font-medium text-[#0E1116]">
                        {form.resume.name}
                      </span>
                      <span className="text-xs text-[#0E1116]/40">
                        Click to replace
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={22} className="text-[#0E1116]/40" />
                      <span className="text-sm font-medium text-[#0E1116]/70">
                        Drop your resume here, or click to browse
                      </span>
                      <span className="text-xs text-[#0E1116]/35">
                        PDF or Word, up to 10MB
                      </span>
                    </>
                  )}
                  <input
                    id="resume"
                    required
                    disabled={loading}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        resume: e.target.files?.[0] || null,
                      })
                    }
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                disabled={loading}
                aria-busy={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#0E1116] py-3.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-[#0E1116]/30"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting
                  </>
                ) : (
                  <>
                    Submit application
                    <Send
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {/* Status */}
              {status && (
                <div
                  className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium ${
                    success
                      ? "bg-[#EAF7E9] text-[#1E6B33]"
                      : "bg-[#FDECEC] text-[#B3261E]"
                  }`}
                >
                  {success ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}