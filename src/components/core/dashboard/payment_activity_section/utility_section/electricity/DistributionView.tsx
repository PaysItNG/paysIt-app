import Input from "@/components/shared/ui/Input";
import { FC, useState } from "react";
import { BiCheck, BiMapPin, BiSearch } from "react-icons/bi";
import { GoZap } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export interface ElectricityDistribution {
  id: string;
  name: string;
  fullName: string;
  state: string;
  region: string;
  color: string;
  subscribers: string;
  coverage: string[];
}
const electricityDistributions: ElectricityDistribution[] = [
  {
    id: "ikeja-electric",
    name: "IKEDC",
    fullName: "Ikeja Electric",
    state: "Lagos",
    region: "Southwest",
    color: "bg-green-500",
    subscribers: "2.1M+",
    coverage: ["Lagos Island", "Ikeja", "Agege", "Mushin"],
  },
  {
    id: "eko-electric",
    name: "EKEDC",
    fullName: "Eko Electricity",
    state: "Lagos",
    region: "Southwest",
    color: "bg-blue-500",
    subscribers: "1.8M+",
    coverage: ["Victoria Island", "Lekki", "Ajah", "Ikoyi"],
  },
  {
    id: "kano-electric",
    name: "KEDCO",
    fullName: "Kano Electricity",
    state: "Kano",
    region: "Northwest",
    color: "bg-purple-500",
    subscribers: "1.5M+",
    coverage: ["Kano", "Jigawa", "Katsina"],
  },
  {
    id: "portharcourt-electric",
    name: "PHED",
    fullName: "Port Harcourt Electric",
    state: "Rivers",
    region: "South-South",
    color: "bg-orange-500",
    subscribers: "1.2M+",
    coverage: ["Port Harcourt", "Bayelsa", "Cross River", "Akwa Ibom"],
  },
  {
    id: "jos-electric",
    name: "JED",
    fullName: "Jos Electricity",
    state: "Plateau",
    region: "North-Central",
    color: "bg-red-500",
    subscribers: "900K+",
    coverage: ["Jos", "Bauchi", "Gombe", "Taraba"],
  },
  {
    id: "ibadan-electric",
    name: "IBEDC",
    fullName: "Ibadan Electricity",
    state: "Oyo",
    region: "Southwest",
    color: "bg-indigo-500",
    subscribers: "1.6M+",
    coverage: ["Ibadan", "Oyo", "Osun", "Kwara", "Ogun"],
  },
  {
    id: "kaduna-electric",
    name: "KAEDCO",
    fullName: "Kaduna Electric",
    state: "Kaduna",
    region: "Northwest",
    color: "bg-teal-500",
    subscribers: "1.3M+",
    coverage: ["Kaduna", "Sokoto", "Kebbi", "Zamfara"],
  },
  {
    id: "abuja-electric",
    name: "AEDC",
    fullName: "Abuja Electric",
    state: "FCT",
    region: "North-Central",
    color: "bg-cyan-500",
    subscribers: "1.4M+",
    coverage: ["Abuja", "Niger", "Kogi", "Nasarawa"],
  },
  {
    id: "enugu-electric",
    name: "EEDC",
    fullName: "Enugu Electric",
    state: "Enugu",
    region: "Southeast",
    color: "bg-emerald-500",
    subscribers: "1.1M+",
    coverage: ["Enugu", "Ebonyi", "Abia", "Anambra", "Imo"],
  },
  {
    id: "benin-electric",
    name: "BEDC",
    fullName: "Benin Electric",
    state: "Edo",
    region: "South-South",
    color: "bg-yellow-500",
    subscribers: "1.0M+",
    coverage: ["Benin", "Delta", "Ondo", "Ekiti"],
  },
  {
    id: "aba-electric",
    name: "ABA",
    fullName: "ABA Electric",
    state: "Abia",
    region: "Southeast",
    color: "bg-pink-500",
    subscribers: "800K+",
    coverage: ["Aba", "Umuahia", "Arochukwu"],
  },
  {
    id: "yola-electric",
    name: "YEDC",
    fullName: "YOLA Electric",
    state: "Adamawa",
    region: "Northeast",
    color: "bg-violet-500",
    subscribers: "700K+",
    coverage: ["Yola", "Adamawa", "Taraba", "Borno"],
  },
];

type PropTypes = {
  selectedDistribution: ElectricityDistribution;
  setSelectedDistribution: React.Dispatch<
    React.SetStateAction<ElectricityDistribution>
  >;
};

const DistributionView: FC<PropTypes> = ({
  selectedDistribution,
  setSelectedDistribution,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleDistributionSelect = (distribution: ElectricityDistribution) => {
    setSelectedDistribution(distribution);
  };
  const filteredDistributions = electricityDistributions.filter((dist) => {
    const matchesSearch =
      dist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dist.state.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div>
      <div className="space-y-3 animate-in slide-in-from-top duration-300">
        <label className="block text-sm font-semibold text-gray-700">
          Select Distribution Company
        </label>
        <div>
          <div className="w-[340px]">
            <Input
              isClearable
              classNames={{
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/50",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  ,
                  "cursor-text!",
                ],
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by distribution name..."
              radius="sm"
              startContent={
                <BiSearch className="text-black/50 mb-0.5 dark:text-white/90 pointer-events-none shrink-0" />
              }
            />
          </div>
        </div>
        <div className="space-y-2 max-h-[30rem] overflow-y-auto">
          {filteredDistributions?.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              spaceBetween={5}
              slidesPerView={2}
              navigation
            >
              {filteredDistributions.map((distribution) => (
                <SwiperSlide
                  key={distribution.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg transform overflow-clip ${
                    selectedDistribution?.id === distribution.id
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => handleDistributionSelect(distribution)}
                >
                  {/* Selection Indicator */}
                  {selectedDistribution?.id === distribution.id && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      <BiCheck className="w-5 h-5" />
                    </div>
                  )}

                  {/* Distribution Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`${distribution.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md`}
                      >
                        <GoZap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {distribution.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {distribution.fullName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Distribution Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <BiMapPin className="w-4 h-4 text-green-500 mr-2" />
                      <span className="font-medium">
                        {distribution.state} State
                      </span>
                    </div>
                  </div>

                  {/* Coverage Areas */}
                  {/* <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Coverage Areas:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {distribution.coverage.slice(0, 3).map((area, index) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                      {distribution.coverage.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{distribution.coverage.length - 3} more
                        </span>
                      )}
                    </div>
                  </div> */}

                  {/* Select Button */}
                  <button
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      selectedDistribution?.id === distribution.id
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    {selectedDistribution?.id === distribution.id
                      ? "Selected"
                      : "Select"}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // </div>
            <div className="text-center py-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No distributions found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionView;
