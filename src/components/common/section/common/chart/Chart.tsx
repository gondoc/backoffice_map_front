import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import dayjs from "dayjs";
import {CSSProperties} from "styled-components";
import {useYearHistQuery} from "@query/MapQuery";
import {useEffect} from "react";
import {IYearHistory} from "@type/hist.types";
import {useCategoryStatQuery} from "@query/CategoryQuery";
import {useLocationQuery} from "@query/LocationQuery";

const Chart = () => {

    const {data: yearData} = useYearHistQuery();
    const {data: categoryData} = useCategoryStatQuery();
    const {data: siteData} = useLocationQuery();

    // useEffect(() => {
    //     console.log("yearData ", yearData);
    // }, [yearData])
    //
    // useEffect(() => {
    //     console.log("categoryData ", categoryData)
    // }, [categoryData])
    //
    // useEffect(() => {
    //     console.log("siteData ,", siteData)
    // }, [siteData])

    const makeData = () => {
        if (!yearData) {
            return [];
        }
        return yearData?.map((data: IYearHistory) => {
            if (data?.yearLabel && data?.histRecords) {
                return {date: data.yearLabel, value: data.histRecords.length}
            } else {
                return [];
            }
        });
    }

    //
    // const data = [
    //     {date: '2025-05-10', value: 12},
    //     {date: '2025-05-11', value: 15},
    //     {date: '2025-05-12', value: 8},
    //     {date: '2025-05-13', value: 20},
    // ];

    return (
        <ResponsiveContainer width="50%" height={300} style={style}>
            <LineChart data={makeData()}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format('YYYY')}/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="value" stroke="#517EBC" strokeWidth={1.3}/>
            </LineChart>
            {/*<BarChart data={makeData()}>*/}
            {/*    <CartesianGrid strokeDasharray="3 3"/>*/}
            {/*    <XAxis dataKey="date" tickFormatter={(date) => dayjs(date).format('YYYY')}/>*/}
            {/*    <YAxis/>*/}
            {/*    <Tooltip/>*/}
            {/*    <Line type="monotone" dataKey="value" stroke="#517EBC" strokeWidth={1.3}/>*/}
            {/*</BarChart>*/}
        </ResponsiveContainer>
    )
}

export default Chart

const style: CSSProperties = {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    border: "2px solid #769FCD",
    boxShadow: "1px 1px 5px rgb(0, 0, 0, 0.2)"

}