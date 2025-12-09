import { getAllDates } from "@/utils/utils";
// import { CiSearch } from "react-icons/ci";
import Logo from "../ui/Logo";
import Clock from "../ui/Clock";
function TopBar() {
  return (
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-4 gap-4">
      {/* Logo */}
      <div className="flex justify-center sm:justify-start flex-shrink-0 w-full sm:w-auto">
        <Logo />
      </div>

      {/* Right Section: Date above Search */}
      <div className="flex flex-col w-full sm:w-auto gap-2">
        {/* Date */}
        <p className="font-solaiman font-normal text-gray-700 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] leading-relaxed text-center sm:text-left">
          {getAllDates()}
        </p>

        {/* Search */}
        <div className="mt-2 sm:mt-[20px] w-full sm:w-[380px] sm:ms-auto">
         <Clock/>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
