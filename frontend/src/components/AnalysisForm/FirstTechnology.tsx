import React, { useEffect, useState } from "react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProcessCard from "../ProcessCard/ProcessCard";
import CostSection from "../../design/Cost/CostSection";
import { Checkbox, useDisclosure } from "@nextui-org/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import SubProcessModal from "../SubProcessModal/SubProcessModal";
import {
  addDirectCost,
  addIndirectCost,
  deleteDirectCost,
  deleteIndirectCost,
  setBottomUpCalc,
  setDirectCostFactor,
  setIndirectCostFactor,
  setWorkingCapitalFactor,
  updateDirectCost,
  updateIndirectCost,
} from "../../Slices/electrifiedSlice";
import Input from "../../design/Input/Input";
import DeleteProcessModal from "../DeleteProcessModal/DeleteProcessModal";

interface FirstTechnologyProps {
  setCurrStep: (arg0: number) => void;
}

const FirstTechnology: React.FC<FirstTechnologyProps> = ({ setCurrStep }) => {
  const tech1Name = useAppSelector((state) => state.name.value.tech1Name);
  const subProcesses = useAppSelector(
    (state) => state.electrified.value.subProcesses,
  );
  const electrifiedValues = useAppSelector((state) => state.electrified.value);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useAppDispatch();

  const [editStates, setEditStates] = useState(
    subProcesses.map(() => ({ isOpenEdit: false, isOpenDelete: false })),
  );
  const [localSubProcesses, setLocalSubProcesses] = useState(subProcesses);

  const handleOpenEdit = (index: number) => {
    setEditStates(
      (prevStates: { isOpenEdit: boolean; isOpenDelete: boolean }[]) =>
        prevStates.map((state, i) =>
          i === index
            ? { ...state, isOpenEdit: true, isOpenDelete: false }
            : state,
        ),
    );
  };

  const handleOpenDelete = (index: number) => {
    setEditStates(
      (prevStates: { isOpenEdit: boolean; isOpenDelete: boolean }[]) =>
        prevStates.map((state, i) =>
          i === index
            ? { ...state, isOpenEdit: false, isOpenDelete: true }
            : state,
        ),
    );
  };

  const handleClose = (index: number) => {
    setEditStates(
      (prevStates: { isOpenEdit: boolean; isOpenDelete: boolean }[]) =>
        prevStates.map((state, i) =>
          i === index
            ? { ...state, isOpenEdit: false, isOpenDelete: false }
            : state,
        ),
    );
  };

  useEffect(() => {
    setLocalSubProcesses(subProcesses);
    setEditStates(
      subProcesses.map(() => ({ isOpenEdit: false, isOpenDelete: false })),
    );
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
        <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10">
          <div className="pb-3">
            <Checkbox
              color="primary"
              checked={electrifiedValues.bottomUpCalc}
              onChange={(e) => {
                dispatch(setBottomUpCalc(e.target.checked));
              }}
            >
              Use bottom-up cost estimation
            </Checkbox>
          </div>
          {electrifiedValues.bottomUpCalc && (
            <div className="grid grid-cols-2 gap-x-32 gap-y-5 mr-20">
              <CostSection
                type="text"
                label="Direct costs"
                onChange={() => {}}
                helpMessage="Test"
                rows={electrifiedValues.directCosts}
                editRow={(index, name, cost) => {
                  dispatch(
                    updateDirectCost({ index: index, cost: { name, cost } }),
                  );
                }}
                addRow={() => {
                  dispatch(addDirectCost({ name: "", cost: "" }));
                }}
                deleteRow={(index) => {
                  dispatch(deleteDirectCost(index));
                }}
              />

              <CostSection
                type="number"
                label="Indirect costs"
                helpMessage="Test"
                rows={electrifiedValues.indirectCosts}
                editRow={(index, name, cost) => {
                  dispatch(
                    updateIndirectCost({ index: index, cost: { name, cost } }),
                  );
                }}
                addRow={() => {
                  dispatch(addIndirectCost({ name: "", cost: "" }));
                }}
                deleteRow={(index) => {
                  dispatch(deleteIndirectCost(index));
                }}
              />
            </div>
          )}
          {!electrifiedValues.bottomUpCalc && (
            <div className="grid grid-cols-3 gap-x-40 gap-y-5">
              <Input
                type="number"
                label="Direct cost factor"
                onChange={(e) => {
                  dispatch(setDirectCostFactor(parseFloat(e.target.value)));
                }}
                value={electrifiedValues.directCostFactor}
                helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project. This includes, but is not limited to:"
              />
              <Input
                type="number"
                label="Indirect cost factor"
                onChange={(e) => {
                  dispatch(setIndirectCostFactor(parseFloat(e.target.value)));
                }}
                value={electrifiedValues.indirectCostFactor}
                helpMessage="The indirect cost factor includes expenses not directly linked to production but necessary for project completion. This includes, but is not limited to:"
              />
              <Input
                type="number"
                label="Working capital cost factor"
                onChange={(e) => {
                  dispatch(setWorkingCapitalFactor(parseFloat(e.target.value)));
                }}
                value={electrifiedValues.workingCapitalFactor}
                helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
              />
            </div>
          )}
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
                const { isOpenEdit, isOpenDelete } = editStates[i];

                return (
                  <div
                    key={i}
                    className="flex flex-row items-center justify-between"
                  >
                    <ProcessCard
                      info={info}
                      handleEdit={() => handleOpenEdit(i)}
                    />
                    <Button
                      isIconOnly
                      color="transparent"
                      onClick={() => {
                        handleOpenDelete(i);
                      }}
                    >
                      <XCircleIcon className="size-5 text-grey-blue" />
                    </Button>
                    <SubProcessModal
                      isOpen={isOpenEdit}
                      onOpenChange={() => handleClose(i)}
                      editID={i}
                      info={info}
                    />
                    <DeleteProcessModal
                      isOpen={isOpenDelete}
                      onOpenChange={() => handleClose(i)}
                      deleteID={i}
                      subProcessName={info.name}
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
