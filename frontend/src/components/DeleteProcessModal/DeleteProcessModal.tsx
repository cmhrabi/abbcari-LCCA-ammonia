import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useAppDispatch } from "../../hooks";
import { deleteSubProcess } from "../../Slices/electrifiedSlice";
import { deleteSubProcess as deleteConvSubProcess } from "../../Slices/conventionalSlice";

interface DeleteProcessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deleteID: number;
  subProcessName: string;
  conventional?: boolean;
}

const DeleteProcessModal: React.FC<DeleteProcessModalProps> = ({
  isOpen,
  onOpenChange,
  deleteID,
  subProcessName,
  conventional = false,
}) => {
  const dispatch = useAppDispatch();
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
            Delete a subprocess
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text color="secondary" textSize="button-lg">
            Are you sure you want to delete the {subProcessName} process? You
            will not be able to undo this action.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button color="grey" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={
              conventional
                ? () => dispatch(deleteConvSubProcess(deleteID))
                : () => dispatch(deleteSubProcess(deleteID))
            }
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProcessModal;
