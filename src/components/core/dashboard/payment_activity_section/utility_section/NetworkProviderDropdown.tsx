import Button from "@/components/shared/ui/Button";
import { serviceProvider } from "@/lib/utils/serviceProvider";
import { NetworkType } from "@/lib/utils/typeConfig";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { FC } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

type PropType = {
  network: NetworkType;
  setNetwork: (key: NetworkType) => void;
};

const NetworkDropDown: FC<PropType> = ({ network, setNetwork }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          size="lg"
          radius="sm"
          className="rounded-r-none flex gap-1 !border-r-0"
          endContent={<HiOutlineChevronDown size={20} />}
        >
          <div>
            <Avatar
              src={
                serviceProvider[network] || "https://images.unsplash.com/broken"
              }
              name={network}
              radius="full"
              className="h-7 w-7"
            />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu with icons"
        variant="faded"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([network])}
        onSelectionChange={(key) => setNetwork(key.anchorKey as NetworkType)}
      >
        <DropdownItem key="MTN" textValue="MTN">
          <div className="flex gap-1">
            <div>
              <Avatar
                src={serviceProvider["MTN"]}
                radius="full"
                className="h-6 w-6"
              />
            </div>
            MTN
          </div>
        </DropdownItem>
        <DropdownItem key="AIRTEL" textValue="AIRTEL">
          <div className="flex gap-1">
            <div>
              <Avatar
                src={serviceProvider["AIRTEL"]}
                radius="full"
                className="h-6 w-6"
              />
            </div>
            AIRTEL
          </div>
        </DropdownItem>
        <DropdownItem key="GLO" textValue="GLO">
          <div className="flex gap-1">
            <div>
              <Avatar
                src={serviceProvider["GLO"]}
                radius="full"
                className="h-6 w-6"
              />
            </div>
            GLO
          </div>
        </DropdownItem>
        <DropdownItem key="ETISALAT" textValue="ETISALAT">
          <div className="flex gap-1">
            <div>
              <Avatar
                src={serviceProvider["ETISALAT"]}
                radius="full"
                className="h-6 w-6"
              />
            </div>
            ETISALAT
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NetworkDropDown;
