import { PointTooltipProps, ResponsiveLine, Serie } from "@nivo/line";
import Text from "../../design/Text/Text";
import React, { useEffect, useState } from "react";

interface LineChartProps {
  data: Serie[];
  title: React.ReactNode;
}

const LCCALineChart: React.FC<LineChartProps> = ({ data, title }) => {
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
      LCCA ($/tCO<sub>2</sub>eq): {`${Number(point.data.y).toFixed(2)}`}
    </div>
  );

  const [filteredData, setFilteredData] = useState(data);
  const [hasNegativeValues, setHasNegativeValues] = useState(false);
  const [roundedMaxValue, setRoundedMaxValue] = useState(0);
  const [roundedMinValue, setRoundedMinValue] = useState(0);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(0);
  const [tickValues, setTickValues] = useState<number[]>([]);

  useEffect(() => {
    setFilteredData(
      data.map((serie) => ({
        ...serie,
        data: serie.data.filter((d) => typeof d.y === "number" && d.y > 0),
      })),
    );

    setHasNegativeValues(
      data.some((serie) =>
        serie.data.some((d) => typeof d.y === "number" && d.y < 0),
      ),
    );

    const maxValue = Math.max(
      ...filteredData.flatMap((serie) => serie.data.map((d) => d.y as number)),
    );
    setRoundedMaxValue(Math.pow(10, Math.ceil(Math.log10(maxValue))));

    const minValue = Math.min(
      ...filteredData.flatMap((serie) => serie.data.map((d) => d.y as number)),
    );
    setRoundedMinValue(Math.pow(10, Math.floor(Math.log10(minValue))));

    const minYear = Math.min(
      ...filteredData.flatMap((serie) => serie.data.map((d) => d.x as number)),
    );
    setMinYear(minYear);
    const maxYear = Math.max(
      ...filteredData.flatMap((serie) => serie.data.map((d) => d.x as number)),
    );
    setMaxYear(maxYear);
    setTickValues(
      maxYear > 2040 ? [minYear, 2030, 2040, 2050] : [minYear, 2030, 2040],
    );
  }, [data]);

  return (
    <div className="bg-primary-50 shadow-card rounded-3px p-6 mr-7 space-y-5">
      <Text textSize="chart-title">{title}</Text>
      <div className="bg-white h-[650px]">
        <ResponsiveLine
          data={filteredData}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          xScale={{
            type: "linear",
            min: minYear,
            max: maxYear,
          }}
          yScale={{
            type: "log",
            base: 10,
            min: roundedMinValue,
            max: roundedMaxValue,
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
            tickValues: Array.from({ length: 20 }, (_, i) => Math.pow(10, i)),
            legend: "LCCA ($/tCO2eq)",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          curve="monotoneX"
          colors={
            filteredData.length > 1 ? ["#D56E33", "#4F46E5"] : ["#4F46E5"]
          }
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
      {hasNegativeValues && (
        <Text textSize="sub4" color="secondary">
          Missing values indicate that the electrified process creates more
          emissions than the conventional ones so LCCA cannot be computed.
        </Text>
      )}
    </div>
  );
};

export default LCCALineChart;
