import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout";
import { getPostData, getAllPostIds, getHomeData } from "../../lib/posts";
import news from "./news.module.css";
import Link from "next/link";

export async function getServerSideProps() {
  const homeData = await getHomeData();
  const dummyDatas = [
    {
      date: "2022-03-28",
      title: "ドライブ・マイ・カーがアカデミー国際長編映画賞",
      content:
        "「ドライブ・マイ・カー」は、村上春樹さんの短編小説を原作に、喪失と再生を描いた物語で、西島秀俊さん、三浦透子さん、霧島れいかさん、岡田将生さんらが出演。アカデミー賞の前哨戦とされる今年のゴールデングローブ賞で、日本映画として62年ぶりに非英語映画賞（旧外国語映画賞）を受賞したほか、昨年のカンヌ国際映画祭でも濱口監督らが日本作品として初めて脚本賞を受賞した。",
      image: "img_65b3d1d3600f5ad1c9e0914bd415daab276206.jpeg",
    },
    {
      date: "2022-03-28",
      title: "ドライブ・マイ・カーがアカデミー国際長編映画賞",
      content:
        "「ドライブ・マイ・カー」は、村上春樹さんの短編小説を原作に、喪失と再生を描いた物語で、西島秀俊さん、三浦透子さん、霧島れいかさん、岡田将生さんらが出演。アカデミー賞の前哨戦とされる今年のゴールデングローブ賞で、日本映画として62年ぶりに非英語映画賞（旧外国語映画賞）を受賞したほか、昨年のカンヌ国際映画祭でも濱口監督らが日本作品として初めて脚本賞を受賞した。",
      image: "img_65b3d1d3600f5ad1c9e0914bd415daab276206.jpeg",
    },
    {
      date: "2022-03-28",
      title: "ドライブ・マイ・カーがアカデミー国際長編映画賞",
      content:
        "「ドライブ・マイ・カー」は、村上春樹さんの短編小説を原作に、喪失と再生を描いた物語で、西島秀俊さん、三浦透子さん、霧島れいかさん、岡田将生さんらが出演。アカデミー賞の前哨戦とされる今年のゴールデングローブ賞で、日本映画として62年ぶりに非英語映画賞（旧外国語映画賞）を受賞したほか、昨年のカンヌ国際映画祭でも濱口監督らが日本作品として初めて脚本賞を受賞した。",
      image: "img_65b3d1d3600f5ad1c9e0914bd415daab276206.jpeg",
    },
  ];
  return {
    props: {
      homeData,
      dummyDatas,
    },
  };
}

export const News = ({ homeData, dummyDatas }: any) => {
  return (
    <>
      <Head>
        <title>{homeData.title}</title>
      </Head>
      <Layout homeData={homeData}>
        <div className={news.container}>
          <h1 className={news.title}>ニュース</h1>
          {dummyDatas.map((dummyData: any,index:number) => {
            return (
              <Link
                key={index}
                href={`/news/${dummyData.date}/${dummyData.title}`}
              >
                <a href="">{`${dummyData.date}${" "}${dummyData.title}`}</a>
              </Link>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default News;
