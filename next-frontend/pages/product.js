import NavBar from "@/components/NavBar";
import ProductTable from "@/components/ProductTable";
import DialogWindow from "@/components/DialogWindow";
import {useEffect, useState} from "react";
import Layout from "@/components/Layout";

function Product () {
    const [pullNewData, setPullNewDate] = useState('')

    const onSubmit = () => {
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
                <DialogWindow onSubmit={onSubmit} />
            </div>
        </Layout>
    )
}

export default Product
