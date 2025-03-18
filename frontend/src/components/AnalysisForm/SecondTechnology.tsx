import React, { useEffect, useState } from "react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProcessCard from "../ProcessCard/ProcessCard";
import CostSection from "../../design/Cost/CostSection";
import { Checkbox, useDisclosure } from "@heroui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ConvSubProcessModal from "../SubProcessModal/ConvSubProcessModal";
import {
  addDirectCost,
  addIndirectCost,
  deleteDirectCost,
  deleteIndirectCost,
  setBottomUpCalc,
  setDepreciationPercent,
  setDirectCostFactor,
  setDuration,
  setIndirectCostFactor,
  setWorkingCapitalCost,
  setWorkingCapitalFactor,
  ConvSubProcess,
  updateDirectCost,
  updateIndirectCost,
  updateBottomUpProcess,
  setWaterRequirement,
  setUpstreamEmissions,
  setOnsightEmissions,
  setInstallationCost,
} from "../../Slices/conventionalSlice";
import Input from "../../design/Input/Input";
import DeleteProcessModal from "../DeleteProcessModal/DeleteProcessModal";

interface SecondTechnologyProps {
  setCurrStep: (arg0: number) => void;
}

const SecondTechnology: React.FC<SecondTechnologyProps> = ({ setCurrStep }) => {
  const tech2Name = useAppSelector((state) => state.name.value.tech2Name);
  const analysisType = useAppSelector((state) => state.name.value.type);
  const subProcesses = useAppSelector(
    (state) => state.conventional.value.subProcesses,
  );
  const conventionalValues = useAppSelector(
    (state) => state.conventional.value,
  );
  const bottomUpCalc = useAppSelector(
    (state) => state.conventional.value.bottomUpCalc,
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useAppDispatch();

  const [editStates, setEditStates] = useState(
    subProcesses.map(() => ({ isOpenEdit: false, isOpenDelete: false })),
  );
  const [localSubProcesses, setLocalSubProcesses] = useState(subProcesses);
  const [bottomUpProcess, setBottomUpProcess] = useState({
    name: tech2Name,
    baseCost: "",
    installationFactor: "0",
    scalingFactor: "100",
    learningRate: "",
    efficiency: "100",
    energyRequirement: "",
  });

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
    const process = {
      baseCost: parseFloat(bottomUpProcess.baseCost),
      learningRate: parseFloat(bottomUpProcess.learningRate),
      scalingFactor: parseFloat(bottomUpProcess.scalingFactor),
      installationFactor: parseFloat(bottomUpProcess.installationFactor),
      energyRequirement: parseFloat(bottomUpProcess.energyRequirement),
      efficiency: parseFloat(bottomUpProcess.efficiency),
      name: tech2Name,
    } as ConvSubProcess;
    dispatch(updateBottomUpProcess(process));
  }, [bottomUpProcess]);

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
          Inputs for the &quot;{tech2Name}&quot; technology
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-y-14">
        <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10">
          <div className="pb-7">
            <Checkbox
              color="primary"
              isSelected={bottomUpCalc}
              defaultSelected={bottomUpCalc}
              onChange={(e) => {
                dispatch(setBottomUpCalc(e.target.checked));
              }}
            >
              Use bottom-up cost estimation
            </Checkbox>
          </div>
          {conventionalValues.bottomUpCalc && (
            <div className="flex flex-row gap-x-16">
              <CostSection
                type="text"
                label="Direct costs"
                onChange={() => {}}
                helpMessage="Test"
                rows={conventionalValues.directCosts}
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
                rows={conventionalValues.indirectCosts}
                editRow={(index, name, cost) => {
                  dispatch(
                    updateIndirectCost({
                      index: index,
                      cost: { name, cost },
                    }),
                  );
                }}
                addRow={() => {
                  dispatch(addIndirectCost({ name: "", cost: "" }));
                }}
                deleteRow={(index) => {
                  dispatch(deleteIndirectCost(index));
                }}
              />
              <div className="min-w-32">
                <Input
                  type="number"
                  label="Installation cost"
                  onChange={(e) => {
                    dispatch(setInstallationCost(e.target.value));
                  }}
                  value={conventionalValues.installationCost}
                  start={
                    <Text textSize="sub3" color="grey-blue">
                      $M
                    </Text>
                  }
                  helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project. This includes, but is not limited to:"
                />
              </div>
              <div className="min-w-32 text-nowrap">
                <Input
                  type="number"
                  label="Working capital cost"
                  onChange={(e) => {
                    dispatch(setWorkingCapitalCost(e.target.value));
                  }}
                  value={conventionalValues.workingCapitalCost}
                  start={
                    <Text textSize="sub3" color="grey-blue">
                      $M
                    </Text>
                  }
                  helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project. This includes, but is not limited to:"
                />
              </div>
            </div>
          )}
          {!conventionalValues.bottomUpCalc && (
            <div className="grid grid-cols-3 gap-x-40 gap-y-5">
              <Input
                type="number"
                label="Direct cost factor"
                onChange={(e) => {
                  dispatch(setDirectCostFactor(parseFloat(e.target.value)));
                }}
                value={conventionalValues.directCostFactor}
                helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project. This includes, but is not limited to:"
              />
              <Input
                type="number"
                label="Indirect cost factor"
                onChange={(e) => {
                  dispatch(setIndirectCostFactor(parseFloat(e.target.value)));
                }}
                value={conventionalValues.indirectCostFactor}
                helpMessage="The indirect cost factor includes expenses not directly linked to production but necessary for project completion. This includes, but is not limited to:"
              />
              <Input
                type="number"
                label="Working capital cost factor"
                onChange={(e) => {
                  dispatch(setWorkingCapitalFactor(parseFloat(e.target.value)));
                }}
                value={conventionalValues.workingCapitalFactor}
                helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
              />
            </div>
          )}
        </div>
        <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10">
          <div className="grid grid-cols-3 gap-x-40 gap-y-5">
            <Input
              type="number"
              label="Water Requirement"
              onChange={(e) => {
                dispatch(setWaterRequirement(e.target.value));
              }}
              value={conventionalValues.waterRequirement}
              end={
                <Text color="grey-blue" textSize="input">
                  tH<sub>2</sub>O/tNH<sub>3</sub>
                </Text>
              }
            />
            <Input
              type="number"
              label="Onsite Emissions"
              onChange={(e) => {
                dispatch(setOnsightEmissions(e.target.value));
              }}
              value={conventionalValues.onsightEmissions}
              end={
                <Text color="grey-blue" textSize="input">
                  kgCO<sub>2</sub>/kgH<sub>2</sub>
                </Text>
              }
              helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
            />
            <Input
              type="number"
              label="Upstream Emissions"
              onChange={(e) => {
                dispatch(setUpstreamEmissions(e.target.value));
              }}
              value={conventionalValues.upstreamEmissions}
              end={
                <Text color="grey-blue" textSize="input">
                  kgCO<sub>2</sub>/kgH<sub>2</sub>
                </Text>
              }
              helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
            />
            {analysisType === "phi" && (
              <>
                <Input
                  type="number"
                  label="Depreciation percent"
                  onChange={(e) => {
                    dispatch(
                      setDepreciationPercent(parseFloat(e.target.value)),
                    );
                  }}
                  value={conventionalValues.depreciationPercent}
                  end={
                    <Text color="grey-blue" textSize="input">
                      %
                    </Text>
                  }
                />
                <Input
                  type="number"
                  label="Duration of use"
                  onChange={(e) => {
                    dispatch(setDuration(parseFloat(e.target.value)));
                  }}
                  value={conventionalValues.duration}
                  end={
                    <Text color="grey-blue" textSize="input">
                      years
                    </Text>
                  }
                  helpMessage="The worker capital cost are the costs associated with labor and employee-related expenses."
                />
              </>
            )}
          </div>
        </div>
        {bottomUpCalc ? (
          <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10 grid grid-cols-3 gap-x-8 gap-y-8">
            <Input
              type="number"
              label="Learning rate"
              value={conventionalValues.bottomUpProcess.learningRate}
              onChange={(e) =>
                setBottomUpProcess({
                  ...bottomUpProcess,
                  learningRate: e.target.value,
                })
              }
              end={
                <Text textSize="sub3" color="grey-blue">
                  %
                </Text>
              }
            />
            <Input
              type="number"
              label="Scaling factor"
              value={conventionalValues.bottomUpProcess.scalingFactor}
              onChange={(e) =>
                setBottomUpProcess({
                  ...bottomUpProcess,
                  scalingFactor: e.target.value,
                })
              }
              end={
                <Text textSize="sub3" color="grey-blue">
                  %
                </Text>
              }
            />
            <Input
              type="number"
              label="Installation factor"
              value={conventionalValues.bottomUpProcess.installationFactor}
              onChange={(e) =>
                setBottomUpProcess({
                  ...bottomUpProcess,
                  installationFactor: e.target.value,
                })
              }
              end={
                <Text textSize="sub3" color="grey-blue">
                  %
                </Text>
              }
            />
            <Input
              type="number"
              label="Efficiency of process"
              value={conventionalValues.bottomUpProcess.efficiency}
              onChange={(e) =>
                setBottomUpProcess({
                  ...bottomUpProcess,
                  efficiency: e.target.value,
                })
              }
              end={
                <Text textSize="sub3" color="grey-blue">
                  %
                </Text>
              }
            />
            <div className="text-nowrap">
              <Input
                type="number"
                label="Energy requirement at base capacity"
                value={conventionalValues.bottomUpProcess.energyRequirement}
                onChange={(e) =>
                  setBottomUpProcess({
                    ...bottomUpProcess,
                    energyRequirement: e.target.value,
                  })
                }
                end={
                  <Text color="grey-blue" textSize="input">
                    pJ/year
                  </Text>
                }
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-row justify-between items-end pb-2">
              <Text color="secondary" textSize="sub3">
                Subprocesses
              </Text>
              <Button color="transparent" size="noPadding" onClick={onOpen}>
                + Add subprocess
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
                    ngReq: subP.ng_req,
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
                      <ConvSubProcessModal
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
                        conventional
                      />
                    </div>
                  );
                })
              ) : (
                <ProcessCard />
              )}
            </div>
          </div>
        )}
        <div className="space-x-6">
          <Button color="grey" onClick={() => setCurrStep(1)}>
            Back
          </Button>
          <Button color="primary" onClick={() => setCurrStep(3)}>
            Next
          </Button>
        </div>
      </div>
      <ConvSubProcessModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default SecondTechnology;
