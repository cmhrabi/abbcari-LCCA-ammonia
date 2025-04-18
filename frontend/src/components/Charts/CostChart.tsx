import { PointTooltipProps, ResponsiveLine, Serie } from "@nivo/line";
import Text from "../../design/Text/Text";
import React from "react";

interface CostChartProps {
  cost_data: Serie[];
  cost_title: string;
}

const CostChart: React.FC<CostChartProps> = ({ cost_data, cost_title }) => {
  const CustomTooltip = ({ point }: PointTooltipProps) => (
    <div
      style={{
        background: "white",
        padding: "5px 10px",
        border: "1px solid #ccc",
      }}
    >
      <strong>{point.serieId}</strong>
      <br />
      {`Year: ${point.data.x}`}
      {", "}
      Cost ($M): {`${Number(point.data.y).toFixed(2)}`}
    </div>
  );
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

  const minYear = Math.min(
    ...cost_data.flatMap((serie) => serie.data.map((d) => d.x as number)),
  );
  const maxYear = Math.max(
    ...cost_data.flatMap((serie) => serie.data.map((d) => d.x as number)),
  );
  const tickValues =
    maxYear > 2040 ? [minYear, 2030, 2040, 2050] : [minYear, 2030, 2040];

  return (
    <div className="bg-primary-50 shadow-card rounded-3px p-6 space-y-5">
      <Text textSize="chart-title">{cost_title}</Text>
      <div className="bg-white h-[275px]">
        <ResponsiveLine
          data={cost_data}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          xScale={{
            type: "linear",
            min: minYear,
            max: maxYear,
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
            tickValues: tickValues,
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
          colors={["#1C2465", "#C294C7", "#48773D"]}
          lineWidth={1}
          pointSize={0}
          pointBorderWidth={2}
          pointColor={{ theme: "background" }}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          enableArea
          tooltip={CustomTooltip}
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
