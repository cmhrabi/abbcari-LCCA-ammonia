import React from "react";
import Text from "../Text/Text";
import Button from "../Button/Button";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Input from "../../design/Input/Input";
import Select from "../../design/Select/Select";
import { setDiscount, setProvince } from "../../Slices/generalSlice";
import { Tab, Tabs } from "@heroui/react";
import {
  updateBottomUpProcess,
  updateSubProcess,
} from "../../Slices/electrifiedSlice";
import {
  updateBottomUpProcess as updateConvBottomUpProcess,
  updateSubProcess as updateConvSubProcess,
} from "../../Slices/conventionalSlice";

interface AdjustableCardProps {
  onClickAdjust: () => void;
}

const AdjustableCard: React.FC<AdjustableCardProps> = ({ onClickAdjust }) => {
  const generalValues = useAppSelector((state) => state.general.value);
  const electrifiedValues = useAppSelector((state) => state.electrified.value);
  const conventionalValues = useAppSelector(
    (state) => state.conventional.value,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="shadow-card bg-primary-50 rounded-3px py-9 px-8">
      <div className="flex flex-row items-center gap-x-4 pb-5">
        <Text textSize="sub3">Adjustable parameters</Text>
      </div>
      <Tabs
        variant="underlined"
        classNames={{
          tab: "data-[selected=true]:bg-white",
          tabList: "rounded-none bg-grey p-0",
          tabContent: "group-data-[selected=true]:text-black",
          panel: "bg-grey-bg rounded-b-3px",
        }}
        color="primary"
      >
        <Tab id="general" title="General parameters">
          <div className="grid grid-cols-3 gap-x-6">
            <Select
              label="Province or territory used in analysis"
              onChange={(e) => dispatch(setProvince(e.target.value))}
              value={generalValues.province}
              options={[
                { value: "No Selection", label: "No Selection" },
                { value: "Alberta", label: "Alberta" },
                { value: "British Columbia", label: "British Columbia" },
                { value: "Manitoba", label: "Manitoba" },
                { value: "New Brunswick", label: "New Brunswick" },
                {
                  value: "Newfoundland and Labrador",
                  label: "Newfoundland and Labrador",
                },
                { value: "Nova Scotia", label: "Nova Scotia" },
                { value: "Ontario", label: "Ontario" },
                {
                  value: "Prince Edward Island",
                  label: "Prince Edward Island",
                },
                { value: "Quebec", label: "Quebec" },
                { value: "Saskatchewan", label: "Saskatchewan" },
                {
                  value: "Northwest Territories",
                  label: "Northwest Territories",
                },
                { value: "Yukon", label: "Yukon" },
              ]}
              helpMessage="The province you want to influence the projected cost based on its geographical location on the electricity grid."
            />
            <Input
              label="Discount rate"
              onChange={(e) => dispatch(setDiscount(e.target.value))}
              value={generalValues.discount}
              placeholder="Value"
              helpMessage="The rate at which future costs are adjusted to reflect the present value."
              type="number"
              end={
                <Text color="grey-blue" textSize="input">
                  %
                </Text>
              }
            />
          </div>
        </Tab>
        <Tab id="electrified" title="Electrified process parameters">
          <div className="space-y-4">
            {electrifiedValues.bottomUpCalc ? (
              <div className="grid grid-cols-3 gap-x-6">
                <Input
                  label="Learning rate"
                  onChange={(e) =>
                    dispatch(
                      updateBottomUpProcess({
                        ...electrifiedValues.bottomUpProcess,
                        learningRate: parseFloat(e.target.value),
                      }),
                    )
                  }
                  value={electrifiedValues.bottomUpProcess.learningRate}
                  placeholder="Value"
                  type="number"
                  end={
                    <Text color="grey-blue" textSize="input">
                      %
                    </Text>
                  }
                />
                <Input
                  label="Scaling factor"
                  onChange={(e) =>
                    dispatch(
                      updateBottomUpProcess({
                        ...electrifiedValues.bottomUpProcess,
                        scalingFactor: parseFloat(e.target.value),
                      }),
                    )
                  }
                  value={electrifiedValues.bottomUpProcess.scalingFactor}
                  placeholder="Value"
                  type="number"
                  end={
                    <Text color="grey-blue" textSize="input">
                      %
                    </Text>
                  }
                />
              </div>
            ) : (
              electrifiedValues.subProcesses.map((subProcess, index) => (
                <div key={index}>
                  <div className="flex flex-row items-center gap-x-4 px-2 py-4">
                    <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                      <Text color="primary" textSize="input">
                        {subProcess.name}
                      </Text>
                    </div>
                    <Text textSize="sub2">Subprocess parameters</Text>
                  </div>
                  <div className="grid grid-cols-3 gap-x-6">
                    <Input
                      label="Learning rate"
                      onChange={(e) =>
                        dispatch(
                          updateSubProcess({
                            index,
                            subProcess: {
                              ...subProcess,
                              learningRate: parseFloat(e.target.value),
                            },
                          }),
                        )
                      }
                      value={subProcess.learningRate}
                      placeholder="Value"
                      type="number"
                      end={
                        <Text color="grey-blue" textSize="input">
                          %
                        </Text>
                      }
                    />
                    <Input
                      label="Baseline cost"
                      value={subProcess.baseCost}
                      onChange={(e) =>
                        dispatch(
                          updateSubProcess({
                            index,
                            subProcess: {
                              ...subProcess,
                              baseCost: parseFloat(e.target.value),
                            },
                          }),
                        )
                      }
                      placeholder="Value"
                      type="number"
                      start={
                        <Text color="grey-blue" textSize="input">
                          $M
                        </Text>
                      }
                    />

                    <Input
                      label="Scaling factor"
                      onChange={(e) =>
                        dispatch(
                          updateSubProcess({
                            index,
                            subProcess: {
                              ...subProcess,
                              scalingFactor: parseFloat(e.target.value),
                            },
                          }),
                        )
                      }
                      value={subProcess.scalingFactor}
                      placeholder="Value"
                      type="number"
                      end={
                        <Text color="grey-blue" textSize="input">
                          %
                        </Text>
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Tab>
        <Tab id="conventional" title="Conventional process parameters">
          <div className="space-y-4">
            {conventionalValues.bottomUpCalc ? (
              <div className="grid grid-cols-3 gap-x-6">
                <Input
                  label="Learning rate"
                  onChange={(e) =>
                    dispatch(
                      updateConvBottomUpProcess({
                        ...conventionalValues.bottomUpProcess,
                        learningRate: parseFloat(e.target.value),
                      }),
                    )
                  }
                  value={conventionalValues.bottomUpProcess.learningRate}
                  placeholder="Value"
                  type="number"
                  end={
                    <Text color="grey-blue" textSize="input">
                      %
                    </Text>
                  }
                />
                <Input
                  label="Scaling factor"
                  onChange={(e) =>
                    dispatch(
                      updateConvBottomUpProcess({
                        ...conventionalValues.bottomUpProcess,
                        scalingFactor: parseFloat(e.target.value),
                      }),
                    )
                  }
                  value={conventionalValues.bottomUpProcess.scalingFactor}
                  placeholder="Value"
                  type="number"
                  end={
                    <Text color="grey-blue" textSize="input">
                      %
                    </Text>
                  }
                />
              </div>
            ) : (
              conventionalValues.subProcesses.map((subProcess, index) => (
                <div key={index}>
                  <div className="flex flex-row items-center gap-x-4 px-2 py-4">
                    <div className="rounded-full bg-primary-50 flex items-center justify-center border-1 border-primary px-2">
                      <Text color="primary" textSize="input">
                        {subProcess.name}
                      </Text>
                    </div>
                    <Text textSize="sub2">Subprocess parameters</Text>
                  </div>
                  <div className="grid grid-cols-3 gap-x-6">
                    <Input
                      label="Learning rate"
                      onChange={(e) =>
                        dispatch(
                          updateConvSubProcess({
                            index,
                            subProcess: {
                              ...subProcess,
                              learningRate: parseFloat(e.target.value),
                            },
                          }),
                        )
                      }
                      value={subProcess.learningRate}
                      placeholder="Value"
                      type="number"
                      end={
                        <Text color="grey-blue" textSize="input">
                          %
                        </Text>
                      }
                    />
                    <Input
                      label="Baseline cost"
                      value={subProcess.baseCost}
                      onChange={(e) =>
                        dispatch(
                          updateConvSubProcess({
                            index,
                            subProcess: {
                              ...subProcess,
                              baseCost: parseFloat(e.target.value),
                            },
                          }),
                        )
                      }
                      placeholder="Value"
                      type="number"
                      start={
                        <Text color="grey-blue" textSize="input">
                          $M
                        </Text>
                      }
                    />

                    <Input
                      label="Scaling factor"
                      onChange={(e) =>
                        dispatch(
                          updateConvSubProcess({
                            index,
                            subProcess: {
                              ...subProcess,
                              scalingFactor: parseFloat(e.target.value),
                            },
                          }),
                        )
                      }
                      value={subProcess.scalingFactor}
                      placeholder="Value"
                      type="number"
                      end={
                        <Text color="grey-blue" textSize="input">
                          %
                        </Text>
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Tab>
      </Tabs>

      <div className="flex justify-end pt-4">
        <Button color="primary" onClick={onClickAdjust}>
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default AdjustableCard;
