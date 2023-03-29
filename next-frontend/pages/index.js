import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import NavBar from "@/components/NavBar";
import ProductTable from "../components/ProductTable";
import InputBox from '@/components/InputBox';
import { useEffect, useState } from 'react';

export default function Home() {
  const [pullNewData, setPullNewDate] = useState('')

  const onSubmit = (msg) => {
    setPullNewDate('pull')
  }

  useEffect(() => {
    console.log("rerender!")
  }, [pullNewData])

  return (
    <>
      <Head>
        <title>Seller Helper</title>
      </Head>
      <main className={styles.main}>
          <NavBar />

        <div className={styles.description}>
          <ProductTable pullNewData={pullNewData}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
          <InputBox onSubmit={onSubmit} />
        </div>
      </main>
    </>
  )
}
