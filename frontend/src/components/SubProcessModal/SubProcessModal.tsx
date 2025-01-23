import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import Input from "../../design/Input/Input";
import { addSubProcess } from "../../Slices/electrifiedSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface SubProcessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editID?: number;
}

const SubProcessModal: React.FC<SubProcessModalProps> = ({
  isOpen,
  onOpenChange,
  editID,
}) => {
  const subProcesses = useAppSelector(
    (state) => state.electrified.value.subProcesses,
  );

  const [baseCost, setBaseCost] = useState<string | undefined>(
    subProcesses[editID]?.baseCost.toString(),
  );
  const [learningRate, setLearningRate] = useState<string | undefined>(
    editID !== undefined
      ? subProcesses[editID]?.learningRate.toString()
      : undefined,
  );
  const [scalingFactor, setScalingFactor] = useState<string | undefined>(
    editID !== undefined
      ? subProcesses[editID]?.scalingFactor.toString()
      : undefined,
  );
  const [installationFactor, setInstallationFactor] = useState<
    string | undefined
  >(
    editID !== undefined
      ? subProcesses[editID]?.installationFactor.toString()
      : undefined,
  );
  const [energyRequirement, setEnergyRequirement] = useState<
    string | undefined
  >(
    editID !== undefined
      ? subProcesses[editID]?.energyRequirement.toString()
      : undefined,
  );
  const [efficiency, setEfficiency] = useState<string | undefined>(
    editID !== undefined
      ? subProcesses[editID]?.efficiency.toString()
      : undefined,
  );
  const [name, setName] = useState<string>(
    editID !== undefined ? subProcesses[editID]?.name.toString() : "",
  );

  const dispatch = useAppDispatch();

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
      dispatch(
        addSubProcess({
          baseCost: parseFloat(baseCost),
          learningRate: parseFloat(learningRate),
          scalingFactor: parseFloat(scalingFactor),
          installationFactor: parseFloat(installationFactor),
          energyRequirement: parseFloat(energyRequirement),
          efficiency: parseFloat(efficiency),
          name,
        }),
      );
    }
  };

  const setStatesToUndefined = () => {
    setBaseCost(undefined);
    setLearningRate(undefined);
    setScalingFactor(undefined);
    setInstallationFactor(undefined);
    setEnergyRequirement(undefined);
    setEfficiency(undefined);
    setName("");
  };

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
                Add a subprocess
              </Text>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                <div className="col-span-2 col-start-1">
                  <Input
                    type="text"
                    label="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div></div>
                <Input
                  type="number"
                  label="Baseline Cost"
                  value={baseCost}
                  onChange={(e) => setBaseCost(e.target.value)}
                />
                <Input
                  type="number"
                  label="Learning Rate"
                  value={learningRate}
                  onChange={(e) => setLearningRate(e.target.value)}
                />
                <Input
                  type="number"
                  label="Scaling Factor"
                  value={scalingFactor}
                  onChange={(e) => setScalingFactor(e.target.value)}
                />
                <Input
                  type="number"
                  label="Installation Factor"
                  value={installationFactor}
                  onChange={(e) => setInstallationFactor(e.target.value)}
                />
                <div className="text-nowrap">
                  <Input
                    type="number"
                    label="Energy Requirement at Base Capacity"
                    value={energyRequirement}
                    onChange={(e) => setEnergyRequirement(e.target.value)}
                  />
                </div>
                <Input
                  type="number"
                  label="Efficiency of Process"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="grey"
                onClick={() => {
                  setStatesToUndefined();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onSubmit();
                  setStatesToUndefined();
                  onClose();
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubProcessModal;
