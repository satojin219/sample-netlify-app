import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout";
import { getPostData, getAllPostIds, getHomeData } from "../../lib/posts";
import post from "./post.module.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const intervalSecond = 60;
const formatStyle = "MM/DD HH:mm:ss";

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {

  let error = undefined;
  // const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.post).catch((e) => (error = e));
  const homeData = await getHomeData().catch((e) => (error = e));

  if (error) {
    console.log(error);
    return {
      error: `${error}`,
    };
  }

  const currentTime = dayjs().tz();
  const createdAt = currentTime.format(formatStyle);
  const nextCreatedAt = currentTime
    .add(intervalSecond, "s")
    .format(formatStyle);
  return {
    props: {
      postData,
      homeData,
      createdAt,
      nextCreatedAt,
    },
    revalidate:60

  };
}

export const Post = (props: any) => {
  const router = useRouter();
  if (props.error) {
    return (
      <div>
        <p>error has occurred</p>
        <div>{props.error}</div>
      </div>
    );
  }

  const { postData, homeData, createdAt, nextCreatedAt } = props;

  // if (router.isFallback) {
  //   return (
  //     <>
  //       <Head>
  //         <title>{postData.title}</title>
  //       </Head>
  //       <div>Loading...</div>
  //     </>
  //   );
  // }

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
              <source media="(min-width:320px;)" />
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
          <h2>Interval</h2>
          <p>{intervalSecond}s</p>
          <br />
          <h3>Page accessed time</h3>
          <p>{dayjs().tz().format(formatStyle)}</p>
          <h3>Next HTML can be generated time</h3>
          <p>{nextCreatedAt}</p>
          <h3>HTML created time</h3>
          <p>{createdAt}</p>
        </div>
      </Layout>
    </>
  );
};

export default Post;
