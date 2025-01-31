import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Button from "../../design/Button/Button";
import Text from "../../design/Text/Text";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteSubProcess } from "../../Slices/electrifiedSlice";

interface DeleteProcessModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    deleteID: number;
    subProcessName: string;
}


const DeleteProcessModal: React.FC<DeleteProcessModalProps> = ({
    isOpen,
    onOpenChange,
    deleteID,
    subProcessName,
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
            // footer: "px-4 pb-5 pt-3",
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
                    <Text color="secondary" textSize="button-lg" >
                        Are you sure you want to delete the {subProcessName} process? You will not be able to undo this action.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button color="grey" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => dispatch(deleteSubProcess(deleteID))}>
                        Continue
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteProcessModal;