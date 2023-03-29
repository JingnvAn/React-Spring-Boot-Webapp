import HolidayComponent from "@/components/HolidayComponent";
import NavBar from "@/components/NavBar";
import ProductTable from "@/components/ProductTable";
import DialogWindow from "@/components/DialogWindow";
import {useEffect, useState} from "react";
import Layout from "@/components/Layout";

function Holiday() {
    const [pullNewData, setPullNewDate] = useState('')

    const onSubmit = () => {
        console.log("submitted")
    }

    useEffect(() => {
        console.log("rerender!")
    }, [pullNewData])

    return (
        <Layout page={2}>

        </Layout>
    )
}

export default Holiday