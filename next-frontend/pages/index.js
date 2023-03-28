import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ProductTableRow from "../components/ProductTableRow"
import NavBar from "@/components/NavBar";
import ProductTable from "../components/ProductTable";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Seller Helper</title>
      </Head>
      <main className={styles.main}>
          <NavBar />

        <div className={styles.description}>
            <ProductTable />
            {/*<ProductTableRow />*/}
        </div>
        <div className={styles.center}>
        </div>

        <div className={styles.grid}>
        </div>
      </main>
    </>
  )
}
