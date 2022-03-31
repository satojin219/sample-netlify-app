import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData, getHomeData } from "../lib/posts";
import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  const allPostsData = await getSortedPostsData();
  const homeData = await getHomeData();

  // console.log(JSON.parse(JSON.stringify(homeData)));
  return {
    props: {
      allPostsData,
      homeData,
    },
    revalidate: 60,
  };
}
type PostType = {
  id: number;
  date: object;
  title: string;
};

const Home: NextPage = ({ allPostsData, homeData }: any) => {
  return (
    <Layout home homeData={homeData}>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        {/* eslint-disable-next-line @next/next/no-page-custom-font*/}
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <title>{homeData.title}</title>
      </Head>{" "}
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Introduction</h2>
        <p dangerouslySetInnerHTML={{ __html: homeData.contentHtml }} />
        <div className={utilStyles.flexJustifyCenter}>
          <a
            className={utilStyles.marginX10px}
            href="https://github.com/satojin219?tab=overview&from=2022-03-01&to=2022-03-21"
          >
            <AiFillGithub size={40} color={"#000"} />
          </a>
          <a
            className={utilStyles.marginX10px}
            href="https://twitter.com/hrB2mOUG77Jkxyz"
          >
            <AiFillTwitterCircle size={40} />
          </a>
        </div>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date }: PostType) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${title}`}>
                <a>{title}</a>
              </Link>
              <span>{date}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>News</h2>
        <Link href={`/news/`}>
          <a>ニュース一覧へ</a>
        </Link>
      </section>
    </Layout>
  );
};

export default Home;
