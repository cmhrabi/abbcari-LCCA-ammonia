import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="sm" size="4xl">
      <ModalContent>
        <ModalHeader>
          <Text color="secondary" textSize="sub1">
            Delete a cost
          </Text>
        </ModalHeader>
        <ModalBody>
          <Text color="primary" textSize="body">
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
