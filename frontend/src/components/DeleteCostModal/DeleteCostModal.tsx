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

interface DeleteCostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deleteCost: () => void;
}

const DeleteCostModal: React.FC<DeleteCostModalProps> = ({
  isOpen,
  onOpenChange,
  deleteCost,
}) => {
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
            Delete a cost
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text color="secondary" textSize="button-lg">
            Are you sure you want to delete this cost? You will not be able to
            undo this action.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button color="transparent" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              deleteCost();
              onOpenChange(false);
            }}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCostModal;
