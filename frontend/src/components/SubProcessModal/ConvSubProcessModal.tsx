import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import Input from "../../design/Input/Input";
import {
  addSubProcess,
  updateSubProcess,
} from "../../Slices/conventionalSlice";
import { useAppDispatch } from "../../hooks";
import { ProcessCardInfo } from "../ProcessCard/ProcessCard";

interface ConvSubProcessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  info?: ProcessCardInfo;
  editID?: number;
}

const ConvSubProcessModal: React.FC<ConvSubProcessModalProps> = ({
  isOpen,
  onOpenChange,
  info,
  editID,
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string | undefined>(info?.name);
  const [disabled, setDisabled] = useState(true);

  const [baseCost, setBaseCost] = useState<string | undefined>(
    String(info?.baseCost),
  );
  const [learningRate, setLearningRate] = useState<string | undefined>(
    String(info?.learningRate),
  );
  const [scalingFactor, setScalingFactor] = useState<string | undefined>(
    String(info?.scalingFactor ?? "100"),
  );
  const [installationFactor, setInstallationFactor] = useState<
    string | undefined
  >(String(info?.installationFactor ?? "0"));
  const [energyRequirement, setEnergyRequirement] = useState<
    string | undefined
  >(String(info?.energyRequirement));
  const [efficiency, setEfficiency] = useState<string | undefined>(
    String(info?.efficiency ?? "100"),
  );
  const [ngReq, setNgReq] = useState<string | undefined>(
    String(info?.ngReq ?? "0"),
  );

  const onSubmit = () => {
    if (
      name &&
      baseCost &&
      learningRate &&
      scalingFactor &&
      installationFactor &&
      energyRequirement &&
      efficiency
    ) {
      if (editID !== undefined) {
        dispatch(
          updateSubProcess({
            subProcess: {
              baseCost: parseFloat(baseCost),
              learningRate: parseFloat(learningRate),
              scalingFactor: parseFloat(scalingFactor),
              installationFactor: parseFloat(installationFactor),
              energyRequirement: parseFloat(energyRequirement),
              efficiency: parseFloat(efficiency),
              ngReq: parseFloat(ngReq ?? "0"),
              name,
            },
            index: editID,
          }),
        );
      } else {
        dispatch(
          addSubProcess({
            baseCost: parseFloat(baseCost),
            learningRate: parseFloat(learningRate),
            scalingFactor: parseFloat(scalingFactor),
            installationFactor: parseFloat(installationFactor),
            energyRequirement: parseFloat(energyRequirement),
            efficiency: parseFloat(efficiency),
            ngReq: parseFloat(ngReq ?? "0"),
            name,
          }),
        );
        resetModal();
      }
    }
  };

  const resetModal = () => {
    setBaseCost(undefined);
    setEfficiency(undefined);
    setInstallationFactor(undefined);
    setName(undefined);
    setLearningRate(undefined);
    setScalingFactor(undefined);
    setEnergyRequirement(undefined);
  };

  const [baselineError, setBaselineError] = useState("");
  const [learningRateError, setLearningRateError] = useState("");
  const [scalingFactorError, setScalingFactorError] = useState("");
  const [installationFactorError, setInstallationFactorError] = useState("");
  const [energyRequirementError, setEnergyRequirementError] = useState("");
  const [efficiencyError, setEfficiencyError] = useState("");
  const [ngReqError, setNgReqError] = useState("");

  useEffect(() => {
    if (
      name &&
      baseCost &&
      learningRate &&
      scalingFactor &&
      installationFactor &&
      energyRequirement &&
      efficiency &&
      ngReq &&
      !baselineError &&
      !learningRateError &&
      !scalingFactorError &&
      !installationFactorError &&
      !energyRequirementError &&
      !efficiencyError &&
      !ngReqError
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    name,
    baseCost,
    learningRate,
    scalingFactor,
    installationFactor,
    energyRequirement,
    efficiency,
    ngReq,
  ]);

  useEffect(() => {
    if (baseCost && parseFloat(baseCost) < 0) {
      setBaselineError("Baseline cost must be positive");
    } else {
      setBaselineError("");
    }
  }, [baseCost]);

  useEffect(() => {
    if (
      learningRate &&
      (parseFloat(learningRate) < 0 || parseFloat(learningRate) > 100)
    ) {
      setLearningRateError("Learning rate must be between 1% and a 100%");
    } else {
      setLearningRateError("");
    }
  }, [learningRate]);

  useEffect(() => {
    if (
      scalingFactor &&
      (parseFloat(scalingFactor) < 0 || parseFloat(scalingFactor) > 100)
    ) {
      setScalingFactorError("Scaling factor must be between 1% and a 100%");
    } else {
      setScalingFactorError("");
    }
  }, [scalingFactor]);

  useEffect(() => {
    if (
      installationFactor &&
      (parseFloat(installationFactor) < 0 ||
        parseFloat(installationFactor) > 100)
    ) {
      setInstallationFactorError(
        "Installation factor must be between 1% and a 100%",
      );
    } else {
      setInstallationFactorError("");
    }
  }, [installationFactor]);

  useEffect(() => {
    if (energyRequirement && parseFloat(energyRequirement) < 0) {
      setEnergyRequirementError("Energy requirement must be positive");
    } else {
      setEnergyRequirementError("");
    }
  }, [energyRequirement]);

  useEffect(() => {
    if (
      efficiency &&
      (parseFloat(efficiency) < 0 || parseFloat(efficiency) > 100)
    ) {
      setEfficiencyError("Efficiency must be between 1% and a 100%");
    } else {
      setEfficiencyError("");
    }
  }, [efficiency]);

  useEffect(() => {
    if (ngReq && parseFloat(ngReq) < 0) {
      setNgReqError("Natural gas requirement must be positive");
    } else {
      setNgReqError("");
    }
  }, [ngReq]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        body: "p-12 rounded-b-[10px]",
        footer: "px-4 pb-5 pt-3",
        header: "pt-5 border-t-3 border-primary",
      }}
      radius="sm"
      size="4xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <Text color="secondary" textSize="sub3">
                {editID === undefined ? "Add a subprocess" : "Edit subprocess"}
              </Text>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-3 gap-x-4 gap-y-6 overflow-visible text-nowrap">
                <div className="col-span-2 col-start-1">
                  <Input
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    helpMessage="The name will be used to refer to the subprocess that you have added."
                  />
                </div>
                <div></div>
                <Input
                  type="number"
                  error={baselineError}
                  label="Baseline Cost"
                  value={baseCost}
                  start={
                    <Text textSize="sub3" color="grey-blue">
                      $M
                    </Text>
                  }
                  onChange={(e) => setBaseCost(e.target.value)}
                  helpMessage="The capital cost value of the defined subprocess at the starting year."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
                />
                <Input
                  type="number"
                  error={learningRateError}
                  label="Learning rate"
                  value={learningRate}
                  onChange={(e) => setLearningRate(e.target.value)}
                  end={
                    <Text textSize="sub3" color="grey-blue">
                      %
                    </Text>
                  }
                  helpMessage="The learning rate indicates the percentage by which the cost of production goes down while doubling the cumulative capacity. "
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
                />
                <Input
                  type="number"
                  error={scalingFactorError}
                  label="Scaling factor"
                  value={scalingFactor}
                  onChange={(e) => setScalingFactor(e.target.value)}
                  end={
                    <Text textSize="sub3" color="grey-blue">
                      %
                    </Text>
                  }
                  helpMessage="The performance or cost of a technology changes with its size or capacity."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
                />
                <Input
                  type="number"
                  error={installationFactorError}
                  label="Installation factor"
                  value={installationFactor}
                  onChange={(e) => setInstallationFactor(e.target.value)}
                  end={
                    <Text textSize="sub3" color="grey-blue">
                      %
                    </Text>
                  }
                  helpMessage="The additional costs related to installing the technology."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
                />
                <Input
                  type="number"
                  error={efficiencyError}
                  label="Efficiency of process"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  end={
                    <Text textSize="sub3" color="grey-blue">
                      %
                    </Text>
                  }
                  helpMessage="The effectiveness in converting input energy into useful output."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
                />
                <div className="text-nowrap">
                  <Input
                    type="number"
                    error={energyRequirementError}
                    label="Electricity requirement at base capacity"
                    value={energyRequirement}
                    onChange={(e) => setEnergyRequirement(e.target.value)}
                    end={
                      <Text color="grey-blue" textSize="input">
                        MW
                      </Text>
                    }
                    helpMessage="The amount of energy consumed by the existing system operating at its standard capacity."
                    link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
                  />
                </div>
                <Input
                  type="number"
                  error={ngReqError}
                  label="Natural gas requirement at base capacity"
                  value={ngReq}
                  onChange={(e) => setNgReq(e.target.value)}
                  end={
                    <Text color="grey-blue" textSize="input">
                      MW
                    </Text>
                  }
                  helpMessage="The amount of natural gas required to operate the subprocess."
                  link="https://www.notion.so/User-Manual-1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480adabf6d854ccd444b9"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="grey"
                onClick={() => {
                  if (editID === undefined) {
                    resetModal();
                  }
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onSubmit();
                  onClose();
                }}
                disabled={disabled}
              >
                {editID === undefined ? "Add" : "Save Changes"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConvSubProcessModal;
