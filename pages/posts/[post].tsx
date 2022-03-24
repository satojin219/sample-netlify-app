import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout";
import { getPostData, getAllPostIds, getHomeData } from "../../lib/posts";
import post from "./post.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.post);
  const homeData = await getHomeData();
  return {
    props: {
      postData,
      homeData,
    },
  };
}

export const Post = ({ postData, homeData }: any) => {

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Layout homeData={homeData}>
        <div className={post.container}>
          <h1 className={post.title}>{postData.title}</h1>
          <p className={post.date}>{postData.date}</p>
          <div className={post.imgWrapper}>
            <picture>
              <source media="(min-width:320px;)"/>
              <source />
              {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={post.img}
              src={`/${postData.image}`}
              alt={postData.title}
              width="400"
              height="300"
            />
            </picture>
          </div>
          <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </Layout>
    </>
  );
};

export default Post;
