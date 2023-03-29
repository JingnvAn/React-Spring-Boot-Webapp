import Head from 'next/head'
import Layout from "@/components/Layout";

function Home() {

  return (
    <>
      <Head>
        <title>Seller Helper</title>
      </Head>
      <Layout page={0}>
        <h2>Welcome to Seller Helper!</h2>
      </Layout>
    </>
  )
}

export default Home
