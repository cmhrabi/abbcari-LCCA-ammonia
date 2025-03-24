import React, { useEffect, useState } from "react";
import Text from "../../design/Text/Text";
import Button from "../../design/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProcessCard from "../ProcessCard/ProcessCard";
import CostSection from "../../design/Cost/CostSection";
import { Checkbox, useDisclosure } from "@heroui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import SubProcessModal from "../SubProcessModal/SubProcessModal";
import {
  addDirectCost,
  addDirectCostError,
  addIndirectCost,
  deleteDirectCost,
  deleteIndirectCost,
  setBottomUpCalc,
  setDirectCostFactor,
  setIndirectCostFactor,
  setWorkingCapitalCost,
  setWorkingCapitalFactor,
  updateBottomUpProcess,
  updateDirectCost,
  updateIndirectCost,
  setInstallationCost,
  setWaterRequirement,
  addIndirectCostError,
  BottomUpProcess,
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
  const bottomUpCalc = useAppSelector(
    (state) => state.electrified.value.bottomUpCalc,
  );
  const [bottomUpProcess, setBottomUpProcess] = useState({
    name: tech1Name,
    baseCost: electrifiedValues.bottomUpProcess.baseCost,
    installationFactor: electrifiedValues.bottomUpProcess.installationFactor,
    scalingFactor: electrifiedValues.bottomUpProcess.scalingFactor,
    learningRate: electrifiedValues.bottomUpProcess.learningRate,
    efficiency: electrifiedValues.bottomUpProcess.efficiency,
    energyRequirement: electrifiedValues.bottomUpProcess.energyRequirement,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);

  const [editStates, setEditStates] = useState(
    subProcesses.map(() => ({ isOpenEdit: false, isOpenDelete: false })),
  );
  const [localSubProcesses, setLocalSubProcesses] = useState(subProcesses);
  const [waterRequirementError, setWaterRequirementError] = useState("");
  const [learningRateError, setLearningRateError] = useState("");
  const [scalingFactorError, setScalingFactorError] = useState("");
  const [installationFactorError, setInstallationFactorError] = useState("");
  const [efficiencyError, setEfficiencyError] = useState("");
  const [dirCostFactorError, setDirCostFactorError] = useState("");
  const [indirCostFactorError, setIndirCostFactorError] = useState("");
  const [workingCapitalFactorError, setWorkingCapitalFactorError] =
    useState("");
  const [installationCostError, setInstallationCostError] = useState("");
  const [workingCapitalCostError, setWorkingCapitalCostError] = useState("");

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
      baseCost: bottomUpProcess.baseCost,
      learningRate: bottomUpProcess.learningRate,
      scalingFactor: bottomUpProcess.scalingFactor,
      installationFactor: bottomUpProcess.installationFactor,
      energyRequirement: bottomUpProcess.energyRequirement,
      efficiency: bottomUpProcess.efficiency,
      name: tech1Name,
    } as BottomUpProcess;
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

  useEffect(() => {
    if (electrifiedValues.bottomUpCalc) {
      setDisabled(
        !(
          (
            electrifiedValues.installationCost &&
            electrifiedValues.directCosts[0].cost &&
            electrifiedValues.indirectCosts[0].cost &&
            electrifiedValues.workingCapitalCost &&
            electrifiedValues.waterRequirement &&
            parseFloat(electrifiedValues.bottomUpProcess.learningRate) >= 0 &&
            parseFloat(electrifiedValues.bottomUpProcess.scalingFactor) >= 0 &&
            parseFloat(electrifiedValues.bottomUpProcess.installationFactor) >=
              0 &&
            parseFloat(electrifiedValues.bottomUpProcess.efficiency) >= 0 &&
            parseFloat(electrifiedValues.bottomUpProcess.energyRequirement) >=
              0 &&
            !learningRateError &&
            !scalingFactorError &&
            !installationFactorError &&
            !efficiencyError &&
            !waterRequirementError &&
            !installationCostError &&
            !workingCapitalCostError
          )
          // isNegative
        ),
      );
    } else if (!electrifiedValues.bottomUpCalc) {
      setDisabled(
        !(
          (
            electrifiedValues.directCostFactor &&
            electrifiedValues.indirectCostFactor &&
            electrifiedValues.workingCapitalFactor &&
            electrifiedValues.waterRequirement &&
            electrifiedValues.subProcesses.length > 0 &&
            !waterRequirementError &&
            !dirCostFactorError &&
            !indirCostFactorError &&
            !workingCapitalFactorError
          )
          // isNegative
        ),
      );
    } else {
      setDisabled(true);
    }
  }, [
    electrifiedValues,
    bottomUpCalc,
    learningRateError,
    scalingFactorError,
    installationFactorError,
    efficiencyError,
    waterRequirementError,
    installationCostError,
    workingCapitalCostError,
    dirCostFactorError,
    indirCostFactorError,
    workingCapitalFactorError,
  ]);

  useEffect(() => {
    if (electrifiedValues.waterRequirement.includes("-")) {
      setWaterRequirementError("Water requirement must be a positive number.");
    } else {
      setWaterRequirementError("");
    }
  }, [electrifiedValues.waterRequirement]);

  useEffect(() => {
    if (parseFloat(electrifiedValues.bottomUpProcess.learningRate) > 100) {
      setLearningRateError("Learning rate must less than 100%.");
    } else {
      setLearningRateError("");
    }
  }, [electrifiedValues.bottomUpProcess.learningRate]);

  useEffect(() => {
    if (parseFloat(electrifiedValues.bottomUpProcess.scalingFactor) > 100) {
      setScalingFactorError("Scaling factor must be less than 100%.");
    } else {
      setScalingFactorError("");
    }
  }, [electrifiedValues.bottomUpProcess.scalingFactor]);

  useEffect(() => {
    if (
      parseFloat(electrifiedValues.bottomUpProcess.installationFactor) > 100
    ) {
      setInstallationFactorError("Installation factor must be less than 100%.");
    } else {
      setInstallationFactorError("");
    }
  }, [electrifiedValues.bottomUpProcess.installationFactor]);

  useEffect(() => {
    if (parseFloat(electrifiedValues.bottomUpProcess.efficiency) > 100) {
      setEfficiencyError("Efficiency must be less than 100%.");
    } else {
      setEfficiencyError("");
    }
  });

  useEffect(() => {
    if (electrifiedValues.directCostFactor > 100) {
      setDirCostFactorError("Direct cost factor must be less than 100%.");
    } else {
      setDirCostFactorError("");
    }
  }, [electrifiedValues.directCostFactor]);

  useEffect(() => {
    if (electrifiedValues.indirectCostFactor > 100) {
      setIndirCostFactorError("Indirect cost factor must be less than 100%.");
    } else {
      setIndirCostFactorError("");
    }
  }, [electrifiedValues.indirectCostFactor]);

  useEffect(() => {
    if (electrifiedValues.workingCapitalFactor > 100) {
      setWorkingCapitalFactorError(
        "Working capital cost factor must be less than 100%.",
      );
    } else {
      setWorkingCapitalFactorError("");
    }
  }, [electrifiedValues.workingCapitalFactor]);

  useEffect(() => {
    if (electrifiedValues.installationCost.includes("-")) {
      setInstallationCostError("Installation cost must be a positive number.");
    } else {
      setInstallationCostError("");
    }
  }, [electrifiedValues.installationCost]);

  useEffect(() => {
    if (electrifiedValues.workingCapitalCost.includes("-")) {
      setWorkingCapitalCostError(
        "Working capital cost must be a positive number.",
      );
    } else {
      setWorkingCapitalCostError("");
    }
  }, [electrifiedValues.workingCapitalCost]);

  return (
    <>
      <div className="py-2.5">
        <Text color="secondary" textSize="sub3">
          Inputs for the &quot;{tech1Name}&quot; technology
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
          {electrifiedValues.bottomUpCalc && (
            <div className="flex flex-row gap-x-16">
              <CostSection
                type="text"
                label="Direct costs"
                helpMessage="Each direct cost represents the different costs tied to the physical creation of the project. These values will be summed together."
                link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
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
                setError={(index, error) =>
                  dispatch(addDirectCostError({ index, error }))
                }
              />
              <CostSection
                type="number"
                label="Indirect costs"
                helpMessage="Each indirect cost represents the different costs that are not directly linked to the process, but are necessary for project completion. These values will be summed together."
                link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
                rows={electrifiedValues.indirectCosts}
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
                setError={(index, error) =>
                  dispatch(addIndirectCostError({ index, error }))
                }
              />
              <div className="min-w-32">
                <Input
                  type="number"
                  error={installationCostError}
                  label="Installation cost"
                  onChange={(e) => {
                    dispatch(setInstallationCost(e.target.value));
                  }}
                  value={electrifiedValues.installationCost}
                  start={
                    <Text textSize="sub3" color="grey-blue">
                      $M
                    </Text>
                  }
                  helpMessage="This value is inclusive of all the costs that are necessary to install the process."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
                />
              </div>
              <div className="min-w-32 text-nowrap">
                <Input
                  type="number"
                  error={workingCapitalCostError}
                  label="Working capital cost"
                  onChange={(e) => {
                    dispatch(setWorkingCapitalCost(e.target.value));
                  }}
                  value={electrifiedValues.workingCapitalCost}
                  start={
                    <Text textSize="sub3" color="grey-blue">
                      $M
                    </Text>
                  }
                  helpMessage="This value is inclusive of all short-term capital required to maintain the day-to-day expenses."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
                />
              </div>
            </div>
          )}
          {!bottomUpCalc && (
            <div className="grid grid-cols-3 gap-x-40 gap-y-5">
              <Input
                type="number"
                error={dirCostFactorError}
                label="Direct cost factor"
                onChange={(e) => {
                  dispatch(setDirectCostFactor(parseFloat(e.target.value)));
                }}
                value={electrifiedValues.directCostFactor}
                end={
                  <Text textSize="sub3" color="grey-blue">
                    %
                  </Text>
                }
                helpMessage="The direct cost factor includes expenses directly tied to the physical creation of a project."
                link="https://www.notion.so/User-Manual-1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf055248047bb7adf156d51667d"
              />
              <Input
                type="number"
                error={indirCostFactorError}
                label="Indirect cost factor"
                onChange={(e) => {
                  dispatch(setIndirectCostFactor(parseFloat(e.target.value)));
                }}
                end={
                  <Text textSize="sub3" color="grey-blue">
                    %
                  </Text>
                }
                value={electrifiedValues.indirectCostFactor}
                helpMessage="The indirect cost factor includes expenses not directly linked to production but necessary for project completion."
                link="https://www.notion.so/User-Manual-1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf055248047bb7adf156d51667d"
              />
              <Input
                type="number"
                error={workingCapitalFactorError}
                label="Working capital cost factor"
                onChange={(e) => {
                  dispatch(setWorkingCapitalFactor(parseFloat(e.target.value)));
                }}
                end={
                  <Text textSize="sub3" color="grey-blue">
                    %
                  </Text>
                }
                value={electrifiedValues.workingCapitalFactor}
                helpMessage="The working capital is a factor that represents the short-term capital required to maintain day-to-day expenses."
                link="https://www.notion.so/User-Manual-1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf055248047bb7adf156d51667d"
              />
            </div>
          )}
        </div>
        <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10">
          <div className="grid grid-cols-3 gap-x-40 gap-y-5">
            <Input
              type="number"
              error={waterRequirementError}
              label="Water requirement"
              onChange={(e) => {
                dispatch(setWaterRequirement(e.target.value));
              }}
              value={electrifiedValues.waterRequirement}
              end={
                <Text color="grey-blue" textSize="input">
                  tH<sub>2</sub>O/tNH<sub>3</sub>
                </Text>
              }
              helpMessage="Water requirement is the amount of water needed to support the process in implementation."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf055248047bb7adf156d51667d"
            />
          </div>
        </div>
        {bottomUpCalc ? (
          <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10 grid grid-cols-3 gap-x-8 gap-y-8">
            <Input
              type="number"
              error={learningRateError}
              label="Learning rate"
              value={String(electrifiedValues.bottomUpProcess.learningRate)}
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
              helpMessage="The learning rate indicates the percentage by which the cost of production goes down while doubling the cumulative capacity. "
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
            />
            <Input
              type="number"
              error={scalingFactorError}
              label="Scaling factor"
              value={String(electrifiedValues.bottomUpProcess.scalingFactor)}
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
              helpMessage="The performance or cost of a technology changes with its size or capacity."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
            />
            <Input
              type="number"
              error={installationFactorError}
              label="Installation factor"
              value={String(
                electrifiedValues.bottomUpProcess.installationFactor,
              )}
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
              helpMessage="The additional costs related to installing the technology."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
            />
            <Input
              type="number"
              error={efficiencyError}
              label="Efficiency of process"
              value={String(electrifiedValues.bottomUpProcess.efficiency)}
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
              helpMessage="The effectiveness in converting input energy into useful output."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
            />
            <div className="text-nowrap">
              <Input
                type="number"
                label="Electricity requirement at base capacity"
                value={String(
                  electrifiedValues.bottomUpProcess.energyRequirement,
                )}
                onChange={(e) =>
                  setBottomUpProcess({
                    ...bottomUpProcess,
                    energyRequirement: e.target.value,
                  })
                }
                end={
                  <Text color="grey-blue" textSize="input">
                    MW
                  </Text>
                }
                helpMessage="The amount of energy consumed by the existing system operating at its standard capacity."
                link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
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
        )}
        <div className="space-x-6">
          <Button color="grey" onClick={() => setCurrStep(0)}>
            Back
          </Button>
          <Button
            color="primary"
            disabled={disabled}
            onClick={() => setCurrStep(2)}
          >
            Next
          </Button>
        </div>
      </div>
      <SubProcessModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default FirstTechnology;
