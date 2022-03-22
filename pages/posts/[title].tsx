import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { Layout } from "../../components/layout";
import { getPostData } from "../../lib/posts";
import Router, { useRouter } from "next/router";
import { getAllPostIds } from "../../lib/posts";
import title from "./title.module.css"

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.title);
  return {
    props: {
      postData,
    },
  };
}

export const Post = ({ postData }: any) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Layout>
        <h1 className={title.title}>{postData.title}</h1>
        <p className={title.date}>{postData.date}</p>
        <img className={title.img} src={`/${postData.image}`} alt={postData.title} />
        <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

      </Layout>
    </>
  );
};

export default Post;
