import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import NavBar from "@/components/NavBar";
import ProductTable from "../components/ProductTable";
import { useEffect, useState } from 'react';
import DialogWindow from '@/components/DialogWindow';

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
        <div className={styles.description}>
          <NavBar />
          <ProductTable pullNewData={pullNewData}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
          <DialogWindow onSubmit={onSubmit} />
        </div>
      </main>
    </>
  )
}
