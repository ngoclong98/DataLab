import Dropdown from "react-bootstrap/Dropdown";
import DataTooltip from "../DataTooltip";
import CustomDropdownToggle from "src/components/CustomDropdownToggle";
import { useState } from "react";
import { TOOLTIP_TIMEOUT } from "src/Constants";
import { AlignType } from "react-bootstrap/esm/types";

interface DropdownDataTooltipProps {
  toggle: React.ReactNode;
  tooltipData: any;
  showing: boolean;
  align?: AlignType;
}
const DropdownDataTooltip = ({
  toggle,
  tooltipData,
  showing,
  align = "end",
}: DropdownDataTooltipProps) => {
  const _toggleToolTip = () => {};

  return (
    <Dropdown onToggle={_toggleToolTip} show={showing} align={align}>
      <Dropdown.Toggle as={CustomDropdownToggle}>{toggle}</Dropdown.Toggle>
      <Dropdown.Menu className="dropdownDataTooltip">
        <DataTooltip {...tooltipData} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const useShowTooltip = () => {
  const [showingTooltip, setShowingTooltip] = useState(false);
  const [lastTriggerTooltip, setLastTriggerTooltip] = useState<number>();
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout>();

  const toggleToolTip = () => {
    setShowingTooltip(!showingTooltip);
  };

  const onClick = () => {
    const now = new Date().getTime();
    if (lastTriggerTooltip && now - lastTriggerTooltip < 100) {
      return;
    }
    toggleToolTip();
  };

  const onMouseLeave = () => {
    console.log("onMouseLeave");
    setShowingTooltip(false);
  };

  const _clearOldTooltipTimeout = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(undefined);
    }
  };

  const onMouseEnter = () => {
    console.log("onMouseEnter");
    setShowingTooltip(true);
    setLastTriggerTooltip(new Date().getTime());
    _clearOldTooltipTimeout();
  };
  const onMouseUp = (e) => {
    const timeout = setTimeout(() => {
      setShowingTooltip(false);
      setTooltipTimeout(undefined);
    }, TOOLTIP_TIMEOUT);
    setTooltipTimeout(timeout);
  };
  return {
    showingTooltip,
    setShowingTooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  };
};
export default DropdownDataTooltip;
