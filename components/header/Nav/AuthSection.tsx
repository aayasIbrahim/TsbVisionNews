import Link from "next/link";

interface AuthSectionProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthSection: React.FC<AuthSectionProps> = ({ isOpen, setIsOpen }) => (
  <div className="flex space-x-0 ml-4">
    <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition rounded-l-lg">
      Eng
    </button>

    <Link
      href="/login"
      onClick={() => setIsOpen(!isOpen)}
      className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition rounded-r-lg"
    >
      Login
    </Link>
  </div>
);

export default AuthSection;
