import ProductTable from "@/components/ProductTable";
import {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import ProductDialog from "@/components/ProductDialog";

function Product () {
    const [pullNewData, setPullNewDate] = useState('')

    const onSubmit = (msg) => {
       console.log("submitted")
    }

    useEffect(() => {
        console.log("rerender!")
    }, [pullNewData])

    return (
        <Layout page={1}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <ProductTable pullNewData={pullNewData}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <ProductDialog onSubmit={onSubmit} />
            </div>
        </Layout>
    )
}

export default Product
