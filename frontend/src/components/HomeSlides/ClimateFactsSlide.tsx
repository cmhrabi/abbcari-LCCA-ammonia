import React from "react";
import Text from "../../design/Text/Text";

const ClimateFactsSlide: React.FC = () => {
  return (
    <div className="bg-grey-bg">
      <div className="py-16 max-w-6xl m-auto flex justify-center flex-col">
        <div className="pb-6 grid gap-y-4 grid-cols-1 w-4/6">
            <Text textSize="sub1" color="primary" align="left">
              OUR MISSION
            </Text>
            <div className="whitespace-nowrap">
              <Text textSize="h2" color="secondary" align="left">
                Help Canada reach Net Zero
              </Text>
            </div>
        </div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="border-r border-[#A0A0A0]">
                <div className="flex justify-start gap-x-4">
                  <Text textSize="nav-title" color="secondary" align="center">
                    1.3%
                  </Text>
                    <Text textSize="sub2" className="whitespace-nowrap" align="center">
                      Of global carbon emissions are from ammonia production
                    </Text>
                </div>
              </td>
              <td className="justify-items-center">
                <div className="w-4/5 flex items-center gap-x-4">
                  <div className="whitespace-nowrap">
                    <Text textSize="nav-title" color="secondary" align="center">
                      565 million
                    </Text>
                  </div>
                  <Text textSize="sub2" className="whitespace-nowrap" align="center">
                    Metric tons of CO2 produced by Canada in 2018
                  </Text>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClimateFactsSlide;
