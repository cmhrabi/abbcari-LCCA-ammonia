import { ResponsiveLine, Serie } from "@nivo/line";
import Text from "../../design/Text/Text";
import React from "react";

interface CostChartProps {
  cost_data: Serie[];
  cost_title: string;
}

const CostChart: React.FC<CostChartProps> = ({ cost_data, cost_title }) => {
  const getMaxSum = (
    capex: number[],
    opex: number[],
    importExport: number[],
  ) => {
    const sums = capex.map(
      (value, index) => value + opex[index] + importExport[index],
    );
    return Math.max(...sums);
  };

  const maxSum = getMaxSum(
    cost_data[0].data.map((d) => d.y as number),
    cost_data[1].data.map((d) => d.y as number),
    cost_data[2].data.map((d) => d.y as number),
  );

  return (
    <div className="bg-primary-50 shadow-card rounded-3px p-6 space-y-5">
      <Text textSize="chart-title">{cost_title}</Text>
      <div className="bg-white h-[350px]">
        <ResponsiveLine
          data={cost_data}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          xScale={{
            type: "linear",
            min: 2025,
            max: 2050,
          }}
          yScale={{
            type: "linear",
            min: 100,
            max: maxSum + maxSum * 0.1,
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
            legend: "Cost ($M)",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          curve="monotoneX"
          colors={["#C294C7", "#D0E8AA", "#E67577", "#506AC7"]}
          lineWidth={1}
          pointSize={0}
          pointBorderWidth={2}
          pointColor={{ theme: "background" }}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          enableArea
          areaOpacity={0.9}
          legends={[
            {
              anchor: "top-left",
              direction: "row",
              justify: false,
              translateX: 10,
              translateY: -40,
              itemsSpacing: 10,
              itemDirection: "left-to-right",
              itemWidth: 100,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "square",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CostChart;
