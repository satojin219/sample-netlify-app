import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

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
  date: object;
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title }: PostType) => (
            
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${title}`}>
              <a>{title}</a>
              </Link>

            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
