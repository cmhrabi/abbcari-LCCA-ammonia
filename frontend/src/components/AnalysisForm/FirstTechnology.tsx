import React, { useEffect, useState } from "react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProcessCard from "../ProcessCard/ProcessCard";
import CostSection from "../../design/Cost/CostSection";
import { useDisclosure } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SubProcessModal from "../SubProcessModal/SubProcessModal";
import { deleteSubProcess } from "../../Slices/electrifiedSlice";

interface FirstTechnologyProps {
  setCurrStep: (arg0: number) => void;
}

const FirstTechnology: React.FC<FirstTechnologyProps> = ({ setCurrStep }) => {
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const subProcesses = useAppSelector(
    (state) => state.electrified.value.subProcesses,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useAppDispatch();

  const [editStates, setEditStates] = useState(
    subProcesses.map(() => ({ isOpen: false })),
  );
  const [localSubProcesses, setLocalSubProcesses] = useState(subProcesses);

  const handleOpen = (index: number) => {
    setEditStates((prevStates: { isOpen: boolean }[]) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, isOpen: true } : state,
      ),
    );
  };

  const handleClose = (index: number) => {
    setEditStates((prevStates: { isOpen: boolean }[]) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, isOpen: false } : state,
      ),
    );
  };

  useEffect(() => {
    setLocalSubProcesses(subProcesses);
    setEditStates(subProcesses.map(() => ({ isOpen: false })));
  }, [subProcesses]);

  useEffect(() => {
    setLocalSubProcesses(subProcesses);
  }, [editStates]);

  return (
    <>
      <div className="py-2.5">
        <Text color="secondary" textSize="sub3">
          Inputs for the &quot;{tech1Name}&quot; technology
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-y-14">
        <div className="grid grid-cols-2 gap-x-11 gap-y-12 shadow-card rounded-[10px] border-1 border-grey py-5 px-10">
          <CostSection
            type="text"
            label="Direct costs"
            onChange={() => {}}
            helpMessage="Test"
          />

          <CostSection
            type="number"
            label="Indirect costs"
            onChange={() => {}}
            helpMessage="Test"
          />
          {/* <Input
            type="number"
            label="Direct cost factor"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project. This includes, but is not limited to:"
          />
          <Input
            type="number"
            label="Indirect cost factor"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The indirect cost factor includes expenses not directly linked to production but necessary for project completion. This includes, but is not limited to:"
          />
          <Input
            type="number"
            label="Working capital cost"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
          />
          <Input
            label="Depreciation percentage"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The depreciation percentage is an indication of how quickly your technology will lose its productive value over time. An accurate representation is required to estimate the net capital expenditure."
          />
          <Input
            label="Duration of use (hours)"
            onChange={() => {}}
            placeholder="Value"
            helpMessage="The depreciation percentage is an indication of how quickly your technology will lose its productive value over time. An accurate representation is required to estimate the net capital expenditure."
          /> */}
        </div>
        <div>
          <div className="flex flex-row justify-between items-end pb-2">
            <Text color="secondary" textSize="sub3">
              Subprocesses
            </Text>
            <Button color="transparent" size="noPadding" onClick={onOpen}>
              + Add Subprocess
            </Button>
          </div>
          <div className="grid gap-4 grid-cols-1">
            {localSubProcesses.length > 0 ? (
              localSubProcesses.map((subP, i) => {
                const info = {
                  baseCost: subP.baseCost,
                  learningRate: subP.learningRate,
                  scalingFactor: subP.scalingFactor,
                  installationFactor: subP.installationFactor,
                  energyRequirement: subP.energyRequirement,
                  efficiency: subP.efficiency,
                  name: subP.name,
                };
                const { isOpen } = editStates[i];

                return (
                  <div
                    key={i}
                    className="flex flex-row items-center justify-between"
                  >
                    <ProcessCard info={info} handleEdit={() => handleOpen(i)} />
                    <Button
                      isIconOnly
                      color="transparent"
                      onClick={() => {
                        dispatch(deleteSubProcess(i));
                      }}
                    >
                      <XMarkIcon className="size-4 text-grey-blue" />
                    </Button>
                    <SubProcessModal
                      isOpen={isOpen}
                      onOpenChange={() => handleClose(i)}
                      editID={i}
                      info={info}
                    />
                  </div>
                );
              })
            ) : (
              <ProcessCard />
            )}
          </div>
        </div>
        <div className="space-x-6">
          <Button color="grey" onClick={() => setCurrStep(0)}>
            Back
          </Button>
          <Button color="primary" onClick={() => setCurrStep(3)}>
            Next
          </Button>
        </div>
      </div>
      <SubProcessModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default FirstTechnology;
