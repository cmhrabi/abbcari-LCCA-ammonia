import { PointTooltipProps, ResponsiveLine, Serie } from "@nivo/line";
import Text from "../../design/Text/Text";
import React from "react";

interface EmissionsChartProps {
  emissions_data: Serie[];
  emissions_title: string;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({
  emissions_data,
  emissions_title,
}) => {
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
      Emissions (tCO<sub>2</sub>eq):{" "}
      {`${Number(point.data.y).toExponential(2)}`}
    </div>
  );
  return (
    <div className="bg-primary-50 shadow-card rounded-3px p-6 space-y-5">
      <Text textSize="chart-title">{emissions_title}</Text>
      <div className="bg-white h-[350px]">
        <ResponsiveLine
          data={emissions_data}
          margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
          xScale={{
            type: "linear",
            min: 2025,
            max: 2050,
          }}
          yScale={{
            type: "linear",
            min: 100,
            max:
              Math.max(...emissions_data[0].data.map((d) => d.y as number)) *
              1.1,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Year",
            legendOffset: 36,
            legendPosition: "middle",
            tickValues: [2030, 2040, 2050],
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Cumulative Emissions (tCO2eq)",
            legendOffset: -70,
            legendPosition: "middle",
            format: (value) => value.toExponential(2),
          }}
          curve="monotoneX"
          colors={["#E67577", "#D0E8AA"]}
          lineWidth={3}
          pointSize={6}
          pointBorderWidth={2}
          pointColor={{ theme: "background" }}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          tooltip={CustomTooltip}
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

export default EmissionsChart;
