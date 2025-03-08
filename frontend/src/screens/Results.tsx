import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Breadcrumbs from "../design/Breadcumbs/Breadcrumbs";
import { useAppSelector } from "../hooks";
import ResultsCard from "../design/ResultsCard/ResultsCard";
import { Serie } from "@nivo/line";
import AdjustableCard from "../design/AdjustableCard/AdjustableCard";
import LCCALineChart from "../components/Charts/LCCALineChart";
import CostChart from "../components/Charts/CostChart";
import Button from "../design/Button/Button";

const data: Serie[] = [
    {
        id: "LCCA",
        data: [
            { x: 2025, y: 70000 },
            { x: 2030, y: 100000 },
            { x: 2035, y: 50000 },
            { x: 2040, y: 10000 },
            { x: 2045, y: 20000 },
            { x: 2050, y: 10000 },
            { x: 2055, y: 10000 },
            { x: 2060, y: 10000 },
        ],
    },
    // {
    //     id: "carbon price",
    //     data: [
    //         { x: 2025, y: 100 },
    //         { x: 2030, y: 20000 },
    //         { x: 2035, y: 20000 },
    //         { x: 2040, y: 20000 },
    //         { x: 2045, y: 200 },
    //         { x: 2050, y: 200 },
    //         { x: 2055, y: 200 },
    //         { x: 2060, y: 200 },
    //     ],
    // },
];

const cost_data: Serie[] = [
    {
        id: "CAPEX",
        data: [
            { x: 2025, y: 70000 },
            { x: 2030, y: 100000 },
            { x: 2035, y: 50000 },
            { x: 2040, y: 10000 },
            { x: 2045, y: 20000 },
            { x: 2050, y: 10000 },
            { x: 2055, y: 10000 },
            { x: 2060, y: 10000 },
        ],
    },
    {
        id: "OPEX",
        data: [
            { x: 2025, y: 100 },
            { x: 2030, y: 20000 },
            { x: 2035, y: 20000 },
            { x: 2040, y: 20000 },
            { x: 2045, y: 200 },
            { x: 2050, y: 200 },
            { x: 2055, y: 200 },
            { x: 2060, y: 200 },
        ],
    },
    {
        id: "Import/Export",
        data: [
            { x: 2025, y: 100 },
            { x: 2030, y: 20000 },
            { x: 2035, y: 20000 },
            { x: 2040, y: 20000 },
            { x: 2045, y: 200 },
            { x: 2050, y: 200 },
            { x: 2055, y: 200 },
            { x: 2060, y: 200 },
        ],
    },
]


// const CustomDashedSolidLines = ({ series, lineGenerator, xScale, yScale }) => {
//     return (
//         <>
//             {series.map(({ id, data, color }) => (
//                 <path
//                     key={id}
//                     d={lineGenerator(
//                         data.map((d) => ({ x: xScale(d.data.x), y: yScale(d.data.y) }))
//                     )}
//                     fill="none"
//                     stroke={color}
//                     strokeWidth={3}
//                     strokeDasharray={id === "carbon price" ? "6 6" : "0"} // Dashed for Carbon Price, Solid for others
//                 />
//             ))}
//         </>
//     );
// };




const Review = () => {
    const analysisName = useAppSelector((state) => state.name.value.analysisName);
    const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
    const tech2Name = useAppSelector((state) => state.name.value.tech2Name);

    return (
        <>
            <NavBar title="COMPASS" />
            <div className="py-11 max-w-6xl m-auto">
                <Breadcrumbs
                    items={[
                        { label: "LCCA Analysis", link: "/analysis" },
                        { label: "Start New", link: "/analysis/start" },
                        { label: `${analysisName} Analysis`, link: "" },
                    ]}
                />
                <div>
                    <Text color="secondary" textSize="h2">
                        “{tech1Name} vs. {tech2Name}” Results
                    </Text>
                </div>

                <div className="pt-12 pb-3 justify-between flex flex-row items-end">
                    <Text color="secondary" textSize="results-title">
                        Overview
                    </Text>
                    <Button
                    color="primary"
                >
                    Export to PDF
                </Button>
                </div>       
                <div className="space-y-12">
                <div className="pt-4 grid grid-cols-3 gap-7">
                    <ResultsCard
                        title="Your initial investment"
                        value="$10,987,000"
                        caption={`if you implemented the ${tech1Name} technology`}
                    />
                    <ResultsCard
                        title="Emissions reduced"
                        value="5,800,000 tCO2eq"
                        caption={`in 10 years`}
                    />
                    <ResultsCard
                        title="Projected savings"
                        value="$32,007,786"
                        caption={`in 10 years`}  
                    />
                </div>
                <div className="flex flex-row">
                    <div className="w-2/3">
                        <LCCALineChart title="Projected LCCA (Levelized cost of carbon abatement) from 2025 to 2060 ($/tCO2eq)" data={data} />
                    </div>
                    <div className="w-1/3">
                        <AdjustableCard />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-7">
                    <CostChart
                        cost_title="Total cost of implementing the technology"
                        cost_data={cost_data}
                    />
                    <CostChart
                        cost_title="Emissions breakdown"
                        cost_data={cost_data}
                    />
                </div>
                </div>

                <div className="pt-14 space-x-5">
                <Button
                    color="grey"
                >
                    Start another analysis
                </Button>
                </div>
            </div>
        </>
    );
};

export default Review;
