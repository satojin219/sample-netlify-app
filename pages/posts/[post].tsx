import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout";
import { getPostData } from "../../lib/posts";
import { getAllPostIds } from "../../lib/posts";
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
        <div className={post.container}>
          <h1 className={post.title}>{postData.title}</h1>
          <p className={post.date}>{postData.date}</p>
          <div className={post.imgWrapper}>
            <img
              className={post.img}
              src={`/${postData.image}`}
              alt={postData.title}
              width="400"
              height="300"
            />
          </div>
            <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </Layout>
    </>
  );
};

export default Post;
