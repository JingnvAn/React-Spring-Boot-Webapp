import ProductTable from "@/components/ProductTable";
import Layout from "@/components/Layout";
import ProductDialog from "@/components/ProductDialog";

function Product () {
    const onSubmit = () => {
       console.log("new product submitted")
    }

    return (
        <Layout page={1}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <ProductTable />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <ProductDialog onSubmit={onSubmit} />
            </div>
        </Layout>
    )
}

export default Product
