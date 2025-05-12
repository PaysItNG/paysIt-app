import { ElementType, FC } from "react";
import StarLoader from "./ui/loaders/StarLoader";

type PropType = {
  setSelectedTab: (val: string) => void;
  selectedTab: string;
  dataCount?: {
    [key: string]: {
      count: string;
      loading: boolean;
    };
  };
  statusTabs: {
    name: string;
    key: string;
    icon?: ElementType;
    bColor?: string;
    tColor?: string;
  }[];
};

const StatusCards: FC<PropType> = ({
  setSelectedTab,
  selectedTab,
  dataCount,
  statusTabs,
}) => {
  const handleSelect = (val: string) => {
    setSelectedTab(val);
  };

  return (
    <>
      <div className={"grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-2"}>
        {statusTabs?.map((item, index) => {
          return (
            <div
              key={index}
              className={`py-4 -top border-[1px] border-[#dfe2e6] transition-background ${
                selectedTab === item?.key ? "bg-default-100" : "bg-white"
              } shadow flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3 cursor-pointer`}
              onClick={() => handleSelect(item?.key)}
              style={{
                boxShadow:
                  "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${item?.bColor} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  {item.icon && (
                    <item.icon
                      size={25}
                      className={`!font-bold ${item.tColor}`}
                    />
                  )}
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                  {item?.name}
                </span>
              </div>
              <span className="text-[16px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                {dataCount?.[item?.key]?.loading ? (
                  <StarLoader size={20} />
                ) : (
                  dataCount?.[item?.key]?.count || 0
                )}
                {/* {item?.total} */}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StatusCards;
