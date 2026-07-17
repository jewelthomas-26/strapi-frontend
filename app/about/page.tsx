'use client';

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
const AboutPage = () => {
  const router = useRouter();
  return (
    <main className="bg-gray-50 min-h-screen">
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About Our Blog</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-100">
            Welcome to our blogging platform where ideas, knowledge, and
            creativity come together. We share insightful articles, tutorials,
            and stories to inspire and educate readers around the world.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
            alt="Blog Workspace"
            className="rounded-2xl shadow-xl"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-8 mb-6">
            Our blog is built for curious minds who love learning something
            new every day. Whether you&apos;re interested in technology, web
            development, lifestyle, productivity, or personal growth, you&apos;ll
            find valuable content written with passion and care.
          </p>

          <p className="text-gray-600 leading-8">
            We believe knowledge should be accessible to everyone. Our mission
            is to create high-quality articles that are informative, engaging,
            and easy to understand.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-4xl font-bold text-blue-600">500+</h3>
              <p className="text-gray-500 mt-2">Articles Published</p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-4xl font-bold text-purple-600">50K+</h3>
              <p className="text-gray-500 mt-2">Monthly Readers</p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-4xl font-bold text-green-600">100+</h3>
              <p className="text-gray-500 mt-2">Guest Authors</p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h3 className="text-4xl font-bold text-red-500">24/7</h3>
              <p className="text-gray-500 mt-2">Content Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Mission
          </h2>

          <p className="text-lg text-gray-600 leading-8">
            We aim to empower readers with practical knowledge, inspiring
            stories, and the latest trends. Every article is crafted to provide
            value, spark curiosity, and help our audience grow personally and
            professionally.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Join Our Community
          </h2>

          <p className="text-lg text-gray-100 mb-8">
            Subscribe and never miss our latest articles, tutorials, and
            updates.
          </p>

          <button
            onClick={() => router.push("/blog")}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Explore Blogs
          </button>
        </div>
      </section>
        <Footer />
    </main>
  );
};

export default AboutPage;