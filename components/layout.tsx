import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import News from "../pages/news";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

export const Layout = ({ home, children, homeData, isNewsPage }: any) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            homeData.title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={homeData.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/${homeData.image}`}
          className={utilStyles.borderCircle}
          height="144"
          width="144"
          alt={homeData.title}
        />
        <h1 className={utilStyles.heading2Xl}>{homeData.title}</h1>
      </header>
      <div className={styles.container}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <main>{children}</main>
        </ErrorBoundary>
        {!home && (
          <div className={styles.backToHome}>
            {isNewsPage ? (
              <Link href="/news">
                <a>← ニュース一覧へ戻る</a>
              </Link>
            ) : (
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Layout;
