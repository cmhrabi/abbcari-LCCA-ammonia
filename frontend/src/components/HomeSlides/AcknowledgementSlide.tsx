import React from "react";
import Text from "../../design/Text/Text";
import { Link } from "@heroui/react";

const AcknowledgementSlide: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="py-5 max-w-6xl m-auto flex justify-center flex-col">
        <div className="pb-2 justify-center">
          <Text>
            Special thanks to Soukaina Skribbe for creating the time-dependant{" "}
            <Link
              href="https://doi.org/10.1016/j.apenergy.2024.123859"
              isExternal
              underline="always"
              color="foreground"
            >
              <Text>LCCA model</Text>
            </Link>{" "}
            and for generously providing materials that enhanced our project.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AcknowledgementSlide;
