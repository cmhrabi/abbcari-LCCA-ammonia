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
import { addSubProcess, updateSubProcess } from "../../Slices/electrifiedSlice";
import { useAppDispatch } from "../../hooks";
import { ProcessCardInfo } from "../ProcessCard/ProcessCard";

interface SubProcessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  info?: ProcessCardInfo;
  editID?: number;
}

const SubProcessModal: React.FC<SubProcessModalProps> = ({
  isOpen,
  onOpenChange,
  info,
  editID,
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string | undefined>(info?.name);
  const [baseCost, setBaseCost] = useState<string | undefined>(
    String(info?.baseCost),
  );
  const [learningRate, setLearningRate] = useState<string | undefined>(
    String(info?.learningRate),
  );
  const [scalingFactor, setScalingFactor] = useState<string | undefined>(
    String(info?.scalingFactor),
  );
  const [installationFactor, setInstallationFactor] = useState<
    string | undefined
  >(String(info?.installationFactor));
  const [energyRequirement, setEnergyRequirement] = useState<
    string | undefined
  >(String(info?.energyRequirement));
  const [efficiency, setEfficiency] = useState<string | undefined>(
    String(info?.efficiency),
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
            name,
          }),
        );
      }
    }
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
                {editID === undefined ? "Add a Subprocess" : "Edit Subprocess"}
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
              >
                {editID === undefined ? "Add" : "Save changes"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SubProcessModal;
