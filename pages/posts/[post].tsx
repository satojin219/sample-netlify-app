import Head from "next/head";
import Image from "next/image";
import { Layout } from "../../components/layout";
import { getPostData, getAllPostIds, getHomeData } from "../../lib/posts";
import post from "./post.module.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../components/ErrorFallback";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Tokyo");

const intervalSecond = 60;
const formatStyle = "MM/DD HH:mm:ss";

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  if (!paths) {
    return {
      notFound: true,
    };
  }
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  // const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.post)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      if (e instanceof EvalError) {
        console.log("EvalError");
      } else if (e instanceof RangeError) {
        console.log("rangeError");
      } else if (e instanceof ReferenceError) {
        console.log("referenceError");
      } else if (e instanceof SyntaxError) {
        console.log("syntaxError");
      } else if (e instanceof TypeError) {
        console.log("typeError");
      } else if (e instanceof URIError) {
        console.log("URIError");
      } else {
        console.log("unknownError");
      }
      console.log(`name: ${e.name}`);
      console.log(`message: ${e.message}`);
      console.log(`stack: ${e.stack}`);
    });

  const homeData = await getHomeData()
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((e) => {
      if (e instanceof EvalError) {
        console.log("EvalError");
      } else if (e instanceof RangeError) {
        console.log("rangeError");
      } else if (e instanceof ReferenceError) {
        console.log("referenceError");
      } else if (e instanceof SyntaxError) {
        console.log("syntaxError");
      } else if (e instanceof TypeError) {
        console.log("typeError");
      } else if (e instanceof URIError) {
        console.log("URIError");
      } else {
        console.log("unknownError");
      }
      console.log(`name: ${e.name}`);
      console.log(`message: ${e.message}`);
      console.log(`stack: ${e.stack}`);
    });

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
    revalidate: 60,
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

  const onError = (error: Error, info: { componentStack: string }) => {
    console.log("error.message", error.message);
    console.log("info.componentStack:", info.componentStack);
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <Head>
          <title></title>
          {postData.title}
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
      </ErrorBoundary>
    </>
  );
};

export default Post;
