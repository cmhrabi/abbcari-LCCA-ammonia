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
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

interface NoLoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoLoginModal: React.FC<NoLoginModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        body: "px-7 pb-7 pt-4",
        footer: "px-4 pb-4 pt-3",
        header: "justify-center pt-4",
      }}
      radius="sm"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <WrenchScrewdriverIcon className="size-11 text-primary" />
            </ModalHeader>
            <ModalBody>
              <Text textSize="sub3">
                Whoops! Login capabilities are not available at the moment.
              </Text>
              <Text>
                The team is working hard to bring this feature to you soon.
                Please check back later.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose}>
                Back
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NoLoginModal;
