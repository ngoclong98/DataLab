import { useState } from "react";
import { ChevronDown, ChevronLeft } from "react-bootstrap-icons";
import useCollapse from "react-collapsed";
interface ExapandableListProps {
  title: string;
  id: number;
  children: React.ReactNode;
  selected: boolean;
}
const ExapandableList = ({
  id,
  title,
  children,
  selected,
}: ExapandableListProps) => {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div>
      <div
        className={`sidebarHeader ${
          selected ? "textPrimary" : "textOnSurface"
        }`}
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          type: "div",
        })}
      >
        <div className="flex-fill">{title}</div>
        {isExpanded ? (
          <ChevronDown className="sidebarChevron" />
        ) : (
          <ChevronLeft className="sidebarChevron" />
        )}
      </div>

      <section {...getCollapseProps()}>{children}</section>
    </div>
  );
};

export default ExapandableList;
