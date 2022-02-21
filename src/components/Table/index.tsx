// @ts-ignore
import ChangeBadge from "../ChangeBadge";
import { ChevronExpand } from "react-bootstrap-icons";
import { TableInfoItem } from "../TableInfo";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import { useTranslation } from "react-i18next";
import Utils from "src/utils/Utils";
import CustomDropdownToggle from "src/components/CustomDropdownToggle";
import Dropdown from "react-bootstrap/Dropdown";
import DataTooltip from "../DataTooltip";
import { COLORS, TOOLTIP_TIMEOUT } from "src/Constants";
import { useState } from "react";
interface TableProps {
  title?: string;
  tableTitle: string;
  data: TableInfoItem[];
}

interface TableInfoProps {
  data: TableInfoItem;
  isLast: boolean;
}
const TableItem = ({ data, isLast }: TableInfoProps) => {
  const dateRange = useAppSelector(selectDateRange);
  const [showingTooltip, setShowingTooltip] = useState(false);
  const [lastTriggerTooltip, setLastTriggerTooltip] = useState<number>();
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout>();

  const _toggleToolTip = () => {
    console.log("Toggle tooltoip", showingTooltip);
    if (!showingTooltip) {
      _clearOldTooltipTimeout();
    }
    setShowingTooltip(!showingTooltip);
  };

  const _clearOldTooltipTimeout = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(undefined);
    }
  };

  return (
    <div>
      <Dropdown
        align={"end"}
        show={showingTooltip}
        onMouseEnter={(e) => {
          setShowingTooltip(true);
          setLastTriggerTooltip(new Date().getTime());
          _clearOldTooltipTimeout();
        }}
        onMouseLeave={(e) => {
          setShowingTooltip(false);
        }}
        onMouseUp={(e) => {
          const timeout = setTimeout(() => {
            setShowingTooltip(false);
            setTooltipTimeout(undefined);
          }, TOOLTIP_TIMEOUT);
          setTooltipTimeout(timeout);
        }}
        onClick={() => {
          const now = new Date().getTime();
          if (lastTriggerTooltip && now - lastTriggerTooltip < 100) {
            return;
          }
          _toggleToolTip();
        }}
      >
        <Dropdown.Toggle as={CustomDropdownToggle}>
          <div
            className={isLast ? "chartTalbeItemLast" : "chartTalbeItem"}
            key={data.name}
          >
            <div className="chartTableItemName flex3">{data.name}</div>
            <div className="chartTableItemValue flex3 d-flex flex-row justify-content-end">
              {data.displayValue}
            </div>
            <div className="flex2 d-flex flex-row justify-content-end">
              <ChangeBadge size={"small"} value={data.changePercent} />
            </div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdownDataTooltip">
          <DataTooltip
            title={data.name}
            data={data}
            currentColor={COLORS.PRIMARY}
            previousColor={COLORS.SEPERATOR}
            currentFromDate={dateRange.startDate}
            currentToDate={dateRange.endDate}
            previousFromDate={data.previousFromDate}
            previousToDate={data.previousToDate}
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const Table = ({ title, tableTitle, data }: TableProps) => {
  const dateRange = useAppSelector(selectDateRange);
  const { t } = useTranslation();

  const _renderTableRow = (item: TableInfoItem, index: number) => {
    const isLast = index >= data.length - 1;
    return <TableItem data={item} isLast={isLast} key={item.name} />;
  };

  return (
    <>
      <div className="chartTitle">{title}</div>
      <div className="chartTableHeader">
        <div className="subTitle12 textOnSurface flex3">{tableTitle}</div>
        <div className="subTitle12 textOnSurface d-flex flex-row justify-content-end flex3 text-end">
          {Utils.getDisplayDateRange(dateRange, t)}
        </div>
        <div className="flex2 d-flex flex-row justify-content-end textOnPrimary">
          <ChevronExpand fontSize={16} />
        </div>
      </div>
      {data?.map(_renderTableRow)}
    </>
  );
};

export default Table;
