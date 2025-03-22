import React from "react";
import Text from "../../design/Text/Text";

const AcknowledgementSlide: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="py-5 max-w-6xl m-auto flex justify-center flex-col">
        {/* <div className="justify-center"> */}
          <div className="pb-2 justify-center">
            <Text>
              Special thanks to Soukaina Skribbe for creating the time-dependant
              LCCA model and for generously providing materials that enhanced
              our project.
            </Text>
          </div>
          {/* <Text>
            Skribbe, Soukaina, et al. “The Levelized Cost of Carbon Abatement
            (LCCA) in Substituting Conventional Ammonia Production with
            Power-to-Ammonia for Fertilizer, Hydrogen and Export.” Applied
            Energy, vol. 373, 2024, pp. 123859-,
            https://doi.org/10.1016/j.apenergy.2024.123859.
          </Text> */}
        </div>
      {/* </div> */}
    </div>
  );
};

export default AcknowledgementSlide;
