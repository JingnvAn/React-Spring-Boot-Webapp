import HolidayList from "@/components/HolidayList";
import Layout from "@/components/Layout";
import HolidayDialog from "@/components/HolidayDialog";

function Holiday() {
    const onSubmit = () => {
        console.log("New Holiday submitted")
    }

    return (
        <Layout page={2}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <HolidayList />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                <HolidayDialog onSubmit={onSubmit} />
            </div>
        </Layout>
    )
}

export default Holiday