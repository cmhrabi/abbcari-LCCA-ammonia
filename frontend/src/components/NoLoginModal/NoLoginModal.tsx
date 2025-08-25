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
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";

interface NoLoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoLoginModal: React.FC<NoLoginModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { loginWithRedirect } = useAuth0();

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
        {() => (
          <>
            <ModalHeader>
              <LockClosedIcon className="size-11 text-primary" />
            </ModalHeader>
            <ModalBody>
              <Text textSize="sub3">
                Whoops! Cannot access this saved analyses without logging in.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => loginWithRedirect()}>
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NoLoginModal;
