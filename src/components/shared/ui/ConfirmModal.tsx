import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
} from "@heroui/react";
import Button from "./Button";
import { useConfirmModal } from "@/store/confirmModalStore";
import { HeroUiDefaultColor } from "@/lib/utils/typeConfig";

const ConfirmModal = () => {
  const {
    isOpen,
    closeConfirm,
    data: {
      title,
      description,
      onOk,
      okButtonProps,
      cancelButtonProps,
      okText,
      cancelText,
    },
  } = useConfirmModal();

  return (
    <>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onClose={closeConfirm}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center text-center gap-">
                  <div className="text-center font-black text-base text-black font-sans">
                    {title}
                  </div>
                  <p className="text-default-500/70 text-[0.85rem] font-semibold font-sans">
                    {description}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col">
                <Divider />
                <div className="w-full flex gap-3 mt-2">
                  <Button
                    variant="bordered"
                    onPress={onClose}
                    radius="sm"
                    className="w-full"
                    {...cancelButtonProps}
                  >
                    {String(cancelText)}
                  </Button>
                  <Button
                    color={
                      (okButtonProps?.color as HeroUiDefaultColor) || "primary"
                    }
                    onPress={onOk}
                    radius="sm"
                    className="w-full"
                    {...okButtonProps}
                  >
                    {String(okText)}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
