import RoleItem from "../components/RoleItem";
import { rolesCopy } from "../constants/rolesCopy";

export default function RolesPage() {
  return (
    <div className="mx-auto flex min-h-screen flex-col gap-4 px-8 pb-8">
      <h1 className="mx-auto text-2xl font-semibold md:text-3xl lg:text-4xl">
        Select Role
      </h1>
      <ul className="custom-scrollbar flex max-w-2xl flex-col gap-1 pr-8 md:max-w-3xl lg:max-w-4xl">
        {rolesCopy.map((role) => (
          <RoleItem key={role.label} {...role} />
        ))}
      </ul>
    </div>
  );
}
