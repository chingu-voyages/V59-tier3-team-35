import { useNavigate } from "react-router-dom";
import BrushIcon from "../icons/brushIcon";
import BullhornIcon from "../icons/BullhornIcon";
import ClipboardIcon from "../icons/ClipboardIcon";
import CodeIcon from "../icons/CodeIcon";
import PythonIcon from "../icons/pythonIcon";
import { useUserActions } from "../stores/userStore";
import type { Role } from "../types/Role";

const iconMap = {
  SCRUM_PRODUCT_OWNER: ClipboardIcon,
  SCRUM_MASTER: BullhornIcon,
  UIUX_DESIGNER: BrushIcon,
  WEB_DEVELOPER: CodeIcon,
  PYTHON_DEVELOPER: PythonIcon,
};

export default function RoleItem(role: {
  role: Role;
  label: string;
  description: string;
}) {
  const { setRole } = useUserActions();

  const Icon = iconMap[role.role];

  const navigate = useNavigate();

  const selectRole = () => {
    setRole(role.role);
    localStorage.setItem("role", role.role);
    navigate("/quiz");
  };

  return (
    <div
      className="border-b-border flex flex-col gap-2 border-b-2 px-11 py-6 hover:cursor-pointer"
      onClick={() => selectRole()}
    >
      <div className="flex items-stretch gap-4">
        <div className="flex-shrink-0 p-2">
          <Icon />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex font-semibold">
            <h3 className="">{role.label}</h3>
          </div>
          <p className="text-sm">{role.description}</p>
        </div>
      </div>
    </div>
  );
}
