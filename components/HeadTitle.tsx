import Head from "next/head";

const HeadTitle = ({ name }: { name: string }) => {
  return (
    <Head>
      <title>{name}</title>
    </Head>
  );
};

export default HeadTitle;
