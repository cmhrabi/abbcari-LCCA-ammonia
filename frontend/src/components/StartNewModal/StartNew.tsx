import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@heroui/react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { resetState as resetStateName } from "../../Slices/nameSlice";
import { resetState as resetStateGeneral } from "../../Slices/generalSlice";
import { resetState as resetStateConventional } from "../../Slices/conventionalSlice";
import { resetState as resetStateElectrified } from "../../Slices/electrifiedSlice";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../../utils/utils";

interface StartNewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const StartNewModal: React.FC<StartNewModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nameValues = useAppSelector((state) => state.name.value);
  const [exportLoading, setExportLoading] = useState(false);
  const generateResultPDF = async () => {
    await generatePDF(
      "results_export",
      `${nameValues.tech1Name}_vs_${nameValues.tech2Name}_LCCA`,
    );
    setExportLoading(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="sm"
      size="2xl"
      classNames={{
        body: "px-16 py-10 rounded-b-[10px]",
        header: "pt-5 border-t-3 border-danger",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <Text color="black" textSize="modal">
            Are you sure?
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text color="secondary" textSize="button-lg">
            Please export your current analysis before starting a new one.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            color="transparent"
            size="medium"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            color="grey"
            onClick={() => {
              setExportLoading(true);
              generateResultPDF();
            }}
          >
            {exportLoading ? <Spinner size="sm" color="white" /> : "Export"}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              dispatch(resetStateName());
              dispatch(resetStateGeneral());
              dispatch(resetStateConventional());
              dispatch(resetStateElectrified());
              navigate("/analysis/start");
            }}
          >
            Start New
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StartNewModal;
