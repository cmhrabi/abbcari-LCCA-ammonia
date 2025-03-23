import React from "react";
import Text from "../../design/Text/Text";
import team_image from "../../assets/team_image.png";

const MeetTheTeam: React.FC = () => {
  return (
    <div className="bg-grey-bg">
      <div className="py-16 max-w-6xl m-auto flex items-center">
        <div>
          <div className="pb-9 grid grid-cols-2 gap-x-20 gap-y-4">
            <div>
              <Text textSize="sub1" color="primary">
                ABOUT THE CREATORS
              </Text>
              <div className="pb-9">
                <Text textSize="h1" color="secondary">
                  How Compass began
                </Text>
              </div>
              <div>
                <Text textSize="sub2">
                  Compass was developed by a team of Management Engineering
                  students, driven by their passion for sustainability and
                  combating climate change, as part of their fourth-year
                  capstone project. They were introduced by Professor XiaoYu Wu
                  and Abbcari Inc to the open-source LCCA model developed by the
                  National Research Council to assess and compare different
                  ammonia production and export pathways for Canada. This
                  comprehensive model requires both technical and economic
                  parameters that could affect the viability of the ammonia
                  pathways.
                </Text>
              </div>
            </div>
            <div className="h-full pr-15">
              <img
                src={team_image}
                alt="team"
                className="w-full h-full rounded-lg shadow-lg"
              />
              <div className="p-1">
                <Text>
                  Rifa Tamanna, Stuti Munshi, Sanjenah Visagan, Adnan Ifram,
                  Calum Hrabi
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
