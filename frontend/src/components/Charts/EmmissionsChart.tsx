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
  const transformData = (data: Serie[]): Serie[] => {
    return data.map((serie) => ({
      ...serie,
      data: serie.data.map((d) => ({
        ...d,
        y: (d.y as number) / 1000000,
      })),
    }));
  };

  const transformedData = transformData(emissions_data);
  const maxValue = Math.max(
    ...transformedData.flatMap((serie) => serie.data.map((d) => d.y as number)),
  );

  const minValue = Math.min(
    ...transformedData.flatMap((serie) => serie.data.map((d) => d.y as number)),
  );

  const minYear = Math.min(
    ...transformedData.flatMap((serie) => serie.data.map((d) => d.x as number)),
  );
  const maxYear = Math.max(
    ...transformedData.flatMap((serie) => serie.data.map((d) => d.x as number)),
  );
  const tickValues =
    maxYear > 2040 ? [minYear, 2030, 2040, 2050] : [minYear, 2030, 2040];
  return (
    <div className="bg-primary-50 shadow-card rounded-3px p-6 space-y-5">
      <Text textSize="chart-title">{emissions_title}</Text>
      <div className="bg-white h-[275px]">
        <ResponsiveLine
          data={transformedData}
          margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
          xScale={{
            type: "linear",
            min: minYear,
            max: maxYear,
          }}
          yScale={{
            type: "linear",
            min: minValue,
            max: maxValue * 1.1,
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
