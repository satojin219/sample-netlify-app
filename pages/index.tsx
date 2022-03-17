import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { Component } from "react";
import { attributes, react as HomeContent } from "../content/home.md";

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
type PostType = {
  id: number;
  date: string;
  title: string;
};

const Home: NextPage = ({ allPostsData }: any) => {
  return (
    <Layout home>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <title>{siteTitle}</title>
      </Head>{" "}
      <section className={utilStyles.headingMd}>
        <p>こんにちは、私の名前は佐藤仁です。好きな食べ物は鯖の味噌煮です。</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* <article>
        <h1>{allPostsData.title}</h1>
        <HomeContent />
        <ul>
          {allPostsData.cats.map((cat: any, k: any) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article> */}
      {/* Keep the existing code here */}
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }: PostType) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
