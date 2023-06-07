import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components";

type Props = {
  styles: React.ReactElement[];
};

const MyDocument = ({ styles }: Props) => {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="주차관제 전문회사 모두시스템입니다."
        />
        <meta property="og:title" content="모두시스템" />
        <meta
          property="og:description"
          content="주차관제 전문회사 모두시스템입니다."
        />
        <meta property="og:image" content="/logo/black_logo.png" />
        <meta property="og:url" content="https://sidequest.co.kr/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="모두시스템" />
        <meta
          name="twitter:description"
          content="주차관제 전문회사 모두시스템입니다."
        />
        <meta name="twitter:image" content="/logo/black_logo.png" />
        <link rel="canonical" href="https://sidequest.co.kr/" />
        <link rel="icon" href="/logo/favicon.png" />
        {styles}
      </Head>
      <body>
        <Main />
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false`}
        />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps & { styles: React.ReactElement[] }> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    const initialProps = await Document.getInitialProps(ctx);
    const styles = sheet.getStyleElement();
    return { ...initialProps, styles };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
