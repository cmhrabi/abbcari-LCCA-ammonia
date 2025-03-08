import { ResponsiveLine, Serie } from "@nivo/line";
import Text from "../../design/Text/Text";
import React from "react"

interface CostChartProps {
    cost_data: Serie[];
    cost_title: string;
}


const CostChart: React.FC<CostChartProps> = ({ cost_data, cost_title }) => {
    return (
        <div className="bg-primary-50 shadow-card rounded-3px p-6 space-y-5">
            <Text textSize="chart-title">
                {cost_title}
            </Text>
            <div className="bg-white h-[350px]">
                <ResponsiveLine
                    data={cost_data}
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    xScale={{
                        type: "linear",
                        min: 2025,
                        max: 2060,
                    }}
                    yScale={{
                        type: "linear",
                        min: 100,
                        max: 150000,
                        stacked: true,
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Year",
                        legendOffset: 36,
                        legendPosition: "middle",
                        tickValues: [2030, 2040, 2050, 2060],
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "LCCA ($/tCO2eq)",
                        legendOffset: -50,
                        legendPosition: "middle",

                    }}
                    curve="monotoneX"
                    colors={["#4F46E5", "#506AC7"]}
                    lineWidth={3}
                    pointSize={6}
                    pointBorderWidth={2}
                    pointColor={{ theme: "background" }}
                    pointBorderColor={{ from: "serieColor" }}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "top-left",
                            direction: "row",
                            justify: false,
                            translateX: 10,
                            translateY: -40,
                            itemsSpacing: 5,
                            itemDirection: "left-to-right",
                            itemWidth: 100,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                        },
                    ]}
                    
                />
            </div>
        </div>

    )
}

export default CostChart;