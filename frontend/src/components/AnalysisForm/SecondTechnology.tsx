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
  addDirectCostError,
  addIndirectCostError,
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
  updateDirectCost,
  updateIndirectCost,
  updateBottomUpProcess,
  setWaterRequirement,
  setUpstreamEmissions,
  setOnsightEmissions,
  setInstallationCost,
  ConvBottomUpProcess,
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
  const [disabled, setDisabled] = useState(true);

  const [editStates, setEditStates] = useState(
    subProcesses.map(() => ({ isOpenEdit: false, isOpenDelete: false })),
  );
  const [localSubProcesses, setLocalSubProcesses] = useState(subProcesses);
  const [bottomUpProcess, setBottomUpProcess] = useState({
    name: tech2Name,
    baseCost: String(conventionalValues.bottomUpProcess.baseCost),
    installationFactor: String(
      conventionalValues.bottomUpProcess.installationFactor,
    ),
    scalingFactor: String(conventionalValues.bottomUpProcess.scalingFactor),
    learningRate: String(conventionalValues.bottomUpProcess.learningRate),
    efficiency: String(conventionalValues.bottomUpProcess.efficiency),
    energyRequirement: String(
      conventionalValues.bottomUpProcess.energyRequirement,
    ),
    ngReq: String(conventionalValues.bottomUpProcess.ngReq),
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
  const [waterRequirementError, setWaterRequirementError] = useState("");
  const [onSiteEmissionsError, setOnsightEmissionsError] = useState("");
  const [upstreamEmissionsError, setUpstreamEmissionsError] = useState("");
  const [learningRateError, setLearningRateError] = useState("");
  const [scalingFactorError, setScalingFactorError] = useState("");
  const [installationFactorError, setInstallationFactorError] = useState("");
  const [efficiencyError, setEfficiencyError] = useState("");
  const [dirCostFactorError, setDirCostFactorError] = useState("");
  const [indirCostFactorError, setIndirCostFactorError] = useState("");
  const [workingCapitalFactorError, setWorkingCapitalFactorError] =
    useState("");

  useEffect(() => {
    const process = {
      baseCost: bottomUpProcess.baseCost,
      learningRate: bottomUpProcess.learningRate,
      scalingFactor: bottomUpProcess.scalingFactor,
      installationFactor: bottomUpProcess.installationFactor,
      energyRequirement: bottomUpProcess.energyRequirement,
      efficiency: bottomUpProcess.efficiency,
      ngReq: bottomUpProcess.ngReq,
      name: tech2Name,
    } as ConvBottomUpProcess;
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
    if (conventionalValues.bottomUpCalc) {
      setDisabled(
        !(
          conventionalValues.directCosts[0].cost &&
          conventionalValues.indirectCosts[0].cost &&
          conventionalValues.installationCost &&
          conventionalValues.workingCapitalCost &&
          conventionalValues.waterRequirement &&
          conventionalValues.onsiteEmissions &&
          conventionalValues.upstreamEmissions &&
          parseFloat(conventionalValues.bottomUpProcess.learningRate) >= 0 &&
          parseFloat(conventionalValues.bottomUpProcess.scalingFactor) >= 0 &&
          parseFloat(conventionalValues.bottomUpProcess.installationFactor) >=
            0 &&
          parseFloat(conventionalValues.bottomUpProcess.energyRequirement) >=
            0 &&
          parseFloat(conventionalValues.bottomUpProcess.efficiency) >= 0 &&
          parseFloat(conventionalValues.bottomUpProcess.ngReq) >= 0 &&
          !learningRateError &&
          !scalingFactorError &&
          !installationFactorError &&
          !efficiencyError &&
          !onSiteEmissionsError &&
          !upstreamEmissionsError &&
          !waterRequirementError
        ),
      );
    } else if (!conventionalValues.bottomUpCalc) {
      setDisabled(
        !(
          conventionalValues.directCostFactor &&
          conventionalValues.indirectCostFactor &&
          conventionalValues.workingCapitalFactor &&
          conventionalValues.depreciationPercent &&
          conventionalValues.waterRequirement &&
          conventionalValues.onsiteEmissions &&
          conventionalValues.upstreamEmissions &&
          conventionalValues.duration &&
          !waterRequirementError &&
          !onSiteEmissionsError &&
          !upstreamEmissionsError &&
          !dirCostFactorError &&
          !indirCostFactorError &&
          !workingCapitalFactorError
        ),
      );
    } else {
      setDisabled(true);
    }
  }, [bottomUpCalc, conventionalValues.bottomUpProcess, conventionalValues]);

  useEffect(() => {
    if (conventionalValues.waterRequirement.includes("-")) {
      setWaterRequirementError("Water requirement must be positive.");
    } else {
      setWaterRequirementError("");
    }
  }, [conventionalValues.waterRequirement]);

  useEffect(() => {
    if (conventionalValues.onsiteEmissions.includes("-")) {
      setOnsightEmissionsError("Onsite emissions must be positive.");
    } else {
      setOnsightEmissionsError("");
    }
  }, [conventionalValues.onsiteEmissions]);

  useEffect(() => {
    if (conventionalValues.upstreamEmissions.includes("-")) {
      setUpstreamEmissionsError("Upstream emissions must be positive.");
    } else {
      setUpstreamEmissionsError("");
    }
  }, [conventionalValues.upstreamEmissions]);

  useEffect(() => {
    if (conventionalValues.directCostFactor > 100) {
      setDirCostFactorError("Direct cost factor must be less than 100%.");
    } else {
      setDirCostFactorError("");
    }
  }, [conventionalValues.directCostFactor]);

  useEffect(() => {
    if (conventionalValues.indirectCostFactor > 100) {
      setIndirCostFactorError("Indirect cost factor must be less than 100%.");
    } else {
      setIndirCostFactorError("");
    }
    console.log(conventionalValues.bottomUpProcess.learningRate);
  }, [conventionalValues.indirectCostFactor]);

  useEffect(() => {
    if (conventionalValues.workingCapitalFactor > 100) {
      setWorkingCapitalFactorError(
        "Working capital cost factor must be less than 100%.",
      );
    } else {
      setWorkingCapitalFactorError("");
    }
  }, [conventionalValues.workingCapitalFactor]);

  useEffect(() => {
    if (parseFloat(conventionalValues.bottomUpProcess.learningRate) > 100) {
      setLearningRateError("Learning rate must less than 100%.");
    } else {
      setLearningRateError("");
    }
  }, [conventionalValues.bottomUpProcess.learningRate]);

  useEffect(() => {
    if (parseFloat(conventionalValues.bottomUpProcess.scalingFactor) > 100) {
      setScalingFactorError("Scaling factor must be less than 100%.");
    } else {
      setScalingFactorError("");
    }
  }, [conventionalValues.bottomUpProcess.scalingFactor]);

  useEffect(() => {
    if (
      parseFloat(conventionalValues.bottomUpProcess.installationFactor) > 100
    ) {
      setInstallationFactorError("Installation factor must be less than 100%.");
    } else {
      setInstallationFactorError("");
    }
  }, [conventionalValues.bottomUpProcess.installationFactor]);

  useEffect(() => {
    if (parseFloat(conventionalValues.bottomUpProcess.efficiency) > 100) {
      setEfficiencyError("Efficiency must be less than 100%.");
    } else {
      setEfficiencyError("");
    }
  }, [conventionalValues.bottomUpProcess.efficiency]);

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
                helpMessage="Each direct cost represents the different costs tied to the physical creation of the project. These values will be summed together."
                link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
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
                setError={(index, error) =>
                  dispatch(addDirectCostError({ index, error }))
                }
              />
              <CostSection
                type="number"
                label="Indirect costs"
                helpMessage="Each indirect cost represents the different costs that are not directly linked to the process, but are necessary for project completion. These values will be summed together."
                link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
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
                setError={(index, error) =>
                  dispatch(addIndirectCostError({ index, error }))
                }
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
                  helpMessage="This value is inclusive of all the costs that are necessary to install the process."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
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
                  helpMessage="This value is inclusive of all short-term capital required to maintain the day-to-day expenses."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1bf5baf0552480e5a0fedb754e1641dd"
                />
              </div>
            </div>
          )}
          {!conventionalValues.bottomUpCalc && (
            <div className="grid grid-cols-3 gap-x-40 gap-y-5">
              <Input
                type="number"
                error={dirCostFactorError}
                label="Direct cost factor"
                onChange={(e) => {
                  dispatch(setDirectCostFactor(parseFloat(e.target.value)));
                }}
                value={conventionalValues.directCostFactor}
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
                value={conventionalValues.indirectCostFactor}
                end={
                  <Text textSize="sub3" color="grey-blue">
                    %
                  </Text>
                }
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
                value={conventionalValues.workingCapitalFactor}
                end={
                  <Text textSize="sub3" color="grey-blue">
                    %
                  </Text>
                }
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
              value={conventionalValues.waterRequirement}
              end={
                <Text color="grey-blue" textSize="input">
                  tH<sub>2</sub>O/tNH<sub>3</sub>
                </Text>
              }
              helpMessage="Water requirement is the amount of water needed to support the process in implementation."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf055248047bb7adf156d51667d"
            />
            <Input
              type="number"
              error={onSiteEmissionsError}
              label="Onsite emissions"
              onChange={(e) => {
                dispatch(setOnsightEmissions(e.target.value));
              }}
              value={conventionalValues.onsiteEmissions}
              end={
                <Text color="grey-blue" textSize="input">
                  kgCO<sub>2</sub>/kgH<sub>2</sub>
                </Text>
              }
              helpMessage="The direct emissions from activities that occur at a specific location where the energy is generated."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf05524800fb707c7dac5a7a51d"
            />
            <Input
              type="number"
              error={upstreamEmissionsError}
              label="Upstream emissions"
              onChange={(e) => {
                dispatch(setUpstreamEmissions(e.target.value));
              }}
              value={conventionalValues.upstreamEmissions}
              end={
                <Text color="grey-blue" textSize="input">
                  kgCO<sub>2</sub>/kgH<sub>2</sub>
                </Text>
              }
              helpMessage="The indirect emissions during the extraction, production or transportation of raw materials."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf05524800fb707c7dac5a7a51d"
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
                  helpMessage="The depreciation percentage represents the rate at which the value of the existing plant decreases."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480adabf6d854ccd444b9"
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
                  helpMessage="The number of years that a plant will be in use."
                  link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480adabf6d854ccd444b9"
                />
              </>
            )}
          </div>
        </div>
        {bottomUpCalc ? (
          <div className="shadow-card rounded-[10px] border-1 border-grey py-5 px-10 grid grid-cols-3 gap-x-8 gap-y-8">
            <Input
              type="number"
              error={learningRateError}
              label="Learning rate"
              value={String(conventionalValues.bottomUpProcess.learningRate)}
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
              helpMessage="The learning rate indicates the percentage by which the cost of production goes down while doubling the cumulative capacity."
              link="https://www.notion.so/1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480239045c30094eb37a0"
            />
            <Input
              type="number"
              error={scalingFactorError}
              label="Scaling factor"
              value={String(conventionalValues.bottomUpProcess.scalingFactor)}
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
                conventionalValues.bottomUpProcess.installationFactor,
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
              value={String(conventionalValues.bottomUpProcess.efficiency)}
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
                  conventionalValues.bottomUpProcess.energyRequirement,
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
            <div className="text-nowrap">
              <Input
                type="number"
                label="Natural gas requirement at base capacity"
                helpMessage="The amount of natural gas required to operate the subprocess."
                link="https://www.notion.so/User-Manual-1b65baf055248030ac08e9dc0cad11d4?pvs=4#1ba5baf0552480adabf6d854ccd444b9"
                value={String(conventionalValues.bottomUpProcess.ngReq)}
                onChange={(e) =>
                  setBottomUpProcess({
                    ...bottomUpProcess,
                    ngReq: e.target.value,
                  })
                }
                end={
                  <Text color="grey-blue" textSize="input">
                    MW
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
                    ngReq: subP.ngReq,
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
          <Button
            color="primary"
            disabled={disabled}
            onClick={() => setCurrStep(3)}
          >
            Next
          </Button>
        </div>
      </div>
      <ConvSubProcessModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default SecondTechnology;
