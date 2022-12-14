import Spinner from "./Spinner";
import EditInactive from "./EditInactive";
import DeleteInactive from "./DeleteInactive";
import DeleteActive from "./DeleteActive";

const Icon = ({
  name,
  className,
  ariaHidden,
}: {
  name: string;
  className?: string;
  ariaHidden?: boolean;
}): JSX.Element => {
  switch (name) {
    case "spinner":
      return <Spinner className={className} ariaHidden={ariaHidden} />;
    case "delete-inactive":
      return <DeleteInactive className={className} ariaHidden={ariaHidden} />;
    case "delete-active":
      return <DeleteActive className={className} ariaHidden={ariaHidden} />;
    case "edit-inactive":
      return <EditInactive className={className} ariaHidden={ariaHidden} />;
    default:
      return <Spinner className={className} ariaHidden={ariaHidden} />;
  }
};

export default Icon;
