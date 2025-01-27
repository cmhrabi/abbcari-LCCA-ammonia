"use client";

import type { ComponentProps } from "react";
import type { ButtonProps } from "@nextui-org/react";

import React from "react";
import { useControlledState } from "@react-stately/utils";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@nextui-org/react";

export type RowStepProps = {
  title?: React.ReactNode;
  className?: string;
};

export interface WizardProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**   * An array of steps.   *   * @default []   */ steps?: RowStepProps[];
  /**   * The color of the steps.   *   * @default "primary"   */
  color?: ButtonProps["color"];
  /**   * The current step index.   */
  currentStep?: number;
  /**   * The default step index.   *   * @default 0   */
  defaultStep?: number;
  /**   * Whether to hide the progress bars.   *   * @default false   */
  hideProgressBars?: boolean;
  /**   * The custom class for the steps wrapper.   */
  className?: string;
  /**   * The custom class for the step.   */
  stepClassName?: string;
  /**   * Callback function when the step index changes.   */
  onStepChange?: (stepIndex: number) => void;
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <m.path
        animate={{ pathLength: 1 }}
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
      />
    </svg>
  );
}

const Wizard = React.forwardRef<HTMLButtonElement, WizardProps>(
  (
    {
      color = "primary",
      steps = [],
      defaultStep = 0,
      onStepChange,
      currentStep: currentStepProp,
      stepClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep] = useControlledState(
      currentStepProp,
      defaultStep,
      onStepChange,
    );

    const colors = React.useMemo(() => {
      let userColor;
      let fgColor;

      const colorsVars = [
        "[--active-fg-color:var(--step-fg-color)]",
        "[--active-border-color:var(--step-color)]",
        "[--active-color:var(--step-color)]",
        "[--complete-background-color:var(--step-color)]",
        "[--complete-border-color:var(--step-color)]",
        "[--inactive-border-color:hsl(var(--nextui-default-300))]",
        "[--inactive-color:hsl(var(--nextui-default-300))]",
      ];

      switch (color) {
        case "primary":
          userColor = "#506AC7";
          fgColor = "#000000";
          break;
        case "secondary":
          userColor = "[--step-color:hsl(var(--nextui-secondary))]";
          fgColor = "[--step-fg-color:hsl(var(--nextui-secondary-foreground))]";
          break;
        case "success":
          userColor = "[--step-color:hsl(var(--nextui-success))]";
          fgColor = "[--step-fg-color:hsl(var(--nextui-success-foreground))]";
          break;
        case "warning":
          userColor = "[--step-color:hsl(var(--nextui-warning))]";
          fgColor = "[--step-fg-color:hsl(var(--nextui-warning-foreground))]";
          break;
        case "danger":
          userColor = "[--step-color:hsl(var(--nextui-error))]";
          fgColor = "[--step-fg-color:hsl(var(--nextui-error-foreground))]";
          break;
        case "default":
          userColor = "[--step-color:hsl(var(--nextui-default))]";
          fgColor = "[--step-fg-color:hsl(var(--nextui-default-foreground))]";
          break;
        default:
          userColor = "#506AC7";
          fgColor = "#000000";
          break;
      }

      if (!className?.includes("--step-fg-color")) colorsVars.unshift(fgColor);
      if (!className?.includes("--step-color")) colorsVars.unshift(userColor);
      if (!className?.includes("--inactive-bar-color"))
        colorsVars.push(
          "[--inactive-bar-color:hsl(var(--nextui-default-300))]",
        );

      return colorsVars;
    }, [color, className]);

    return (
      <nav aria-label="Progress">
        <ol
          className={cn(
            "flex items-center w-full justify-between",
            colors,
            className,
          )}
        >
          {steps?.map((step, stepIdx) => {
            const status =
              currentStep === stepIdx
                ? "active"
                : currentStep < stepIdx
                  ? "inactive"
                  : "complete";

            return (
              <li
                key={stepIdx}
                className={cn(
                  "flex w-full relative after:inline-block after:absolute lg:after:top-5 after:top-5 after:left-1",
                  {
                    "after:content-['']  after:w-full after:h-0.5  after:bg-[#506AC7]":
                      stepIdx !== steps.length - 1,
                  },
                  {
                    "after:content-['']  after:w-full after:h-0.5 after:bg-[image:linear-gradient(to_right,#506AC7_0%,#506AC7_50%,#4F5E71_50%,#4F5E71_100%)]":
                      stepIdx === currentStep && stepIdx !== steps.length - 1,
                  },
                  {
                    "after:content-['']  after:w-full after:h-0.5 after:bg-grey-label":
                      stepIdx > currentStep && stepIdx !== steps.length - 1,
                  },

                  {
                    "after:content-['']  after:w-full after:h-0.5 after:bg-[image:linear-gradient(to_right,#4F5E71_0%,#4F5E71_50%,#4F5E71_50%,#4F5E71_100%)]":
                      stepIdx === steps.length - 1,
                  },
                  {
                    "after:content-['']  after:w-full after:h-0.5 after:bg-[#506AC7]":
                      stepIdx === currentStep && stepIdx === steps.length - 1,
                  },
                )}
              >
                <button
                  key={stepIdx}
                  ref={ref}
                  aria-current={status === "active" ? "step" : undefined}
                  className={cn(
                    "group z-10 flex w-full flex-col items-center justify-center rounded-large py-2.5 cursor-default",
                    stepClassName,
                  )}
                  onClick={() => {}}
                  {...props}
                >
                  <div className="h-ful bg-white relative flex items-center">
                    <LazyMotion features={domAnimation}>
                      <m.div animate={status} className="relative">
                        <m.div
                          className={cn(
                            "relative flex h-[24px] w-[24px] items-center justify-center rounded-full border-medium text-large font-semibold text-default-foreground",
                            {
                              "shadow-lg": status === "complete",
                            },
                          )}
                          initial={false}
                          transition={{ duration: 0.25 }}
                          variants={{
                            inactive: {
                              backgroundColor: "transparent",
                              borderColor: "var(--inactive-border-color)",
                              color: "#4F5E71",
                            },
                            active: {
                              backgroundColor: "transparent",
                              borderColor: "var(--active-border-color)",
                              color: "#506AC7",
                            },
                            complete: {
                              backgroundColor:
                                "var(--complete-background-color)",
                              borderColor: "#506AC7",
                            },
                          }}
                        >
                          <div className="flex items-center justify-center">
                            {status === "complete" ? (
                              <CheckIcon className="h-4 w-4 text-[#506AC7]" />
                            ) : (
                              <span className="text-input">{stepIdx + 1}</span>
                            )}
                          </div>
                        </m.div>
                      </m.div>
                    </LazyMotion>
                  </div>
                  <div className="max-w-full flex-1 text-start text-nowrap">
                    <div
                      className={cn(
                        "text-breadcrumb font-sans overflow-visible transition-[color,opacity] duration-300 group-active:opacity-80",
                      )}
                    >
                      {step.title}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Wizard.displayName = "Wizard";

export default Wizard;
