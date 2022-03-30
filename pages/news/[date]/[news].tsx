import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../../components/layout";
import { getPostData, getAllPostIds, getHomeData } from "../../../lib/posts";
import news from "./news.module.css";

export async function getServerSideProps() {
  const homeData = await getHomeData();
  const dummyData = {
    date: "2022-03-28",
    title: "ドライブ・マイ・カーがアカデミー国際長編映画賞",
    content:
      "「ドライブ・マイ・カー」は、村上春樹さんの短編小説を原作に、喪失と再生を描いた物語で、西島秀俊さん、三浦透子さん、霧島れいかさん、岡田将生さんらが出演。アカデミー賞の前哨戦とされる今年のゴールデングローブ賞で、日本映画として62年ぶりに非英語映画賞（旧外国語映画賞）を受賞したほか、昨年のカンヌ国際映画祭でも濱口監督らが日本作品として初めて脚本賞を受賞した。",
    image: "img_65b3d1d3600f5ad1c9e0914bd415daab276206.jpeg",
  };
  return {
    props: {
      homeData,
      dummyData,
    },
  };
}

export const News = ({ homeData, dummyData }: any) => {
  return (
    <>
      <Head>
        <title>{homeData.title}</title>
      </Head>
      <Layout homeData={homeData} isNewsPage={true}>
        <div className={news.container}>
          <h1 className={news.title}>{dummyData.title}</h1>
          <p className={news.date}>{dummyData.date}</p>
          <div className={news.imgWrapper}>
            <picture>
              <source media="(min-width:320px;)" />
              <source />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={news.img}
                src={`/${dummyData.image}`}
                alt={dummyData.title}
                width="400"
                height="300"
              />
            </picture>
          </div>
          <p>{dummyData.content}</p>
        </div>
      </Layout>
    </>
  );
};

export default News;
