import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";

import { getAllPosts } from "@/lib/api";
import Footer from "@/app/footer";
import { da } from "date-fns/locale";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h4 className="text-xl font-bold">
        <Link href="https://juricamigac.from.hr">Back to CV</Link>
      </h4>
    </section>
  );
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

function getFeaturedBlogPost(allPosts: any): any {
  return allPosts.filter((post: { featuredBlogPost: string; }) => post.featuredBlogPost === "YES");
}

function getMoreBlogPosts(allPosts: any): any[] {
  return allPosts.filter((post: { featuredBlogPost: string; }) => post.featuredBlogPost === "NO");
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = getFeaturedBlogPost(allPosts)[0];  
  const morePosts = getMoreBlogPosts(allPosts);
  
  return (
    <div className="container mx-auto px-5">
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
      <Footer />
    </div>
  );
}
