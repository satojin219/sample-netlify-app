import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { Layout } from "../../components/layout";
import { getPostData } from "../../lib/posts";
import Router, { useRouter } from "next/router";
import { getAllPostIds } from "../../lib/posts";

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
  console.log(postData);
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Layout>
        <h1>{postData.title}</h1>
        <img src={`/${postData.image}`} alt={postData.title} />
        <p>{postData.date}</p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

      </Layout>
    </>
  );
};

export default Post;
