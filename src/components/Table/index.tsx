// @ts-ignore
import ChangeBadge from "../ChangeBadge";
import { ChevronExpand } from "react-bootstrap-icons";
import { TableInfoItem } from "../TableInfo";
import { useAppSelector } from "src/redux/hook";
import { selectDateRange } from "src/redux/DashboardSlice";
import { useTranslation } from "react-i18next";
import Utils from "src/utils/Utils";
import { COLORS } from "src/Constants";
import DropdownDataTooltip, { useShowTooltip } from "../DropdownDataTooltip";
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
  const {
    showingTooltip,
    onClick: onClickDropdown,
    onMouseEnter: onMouseEnterDropdown,
    onMouseLeave: onMouseLeaveDropdown,
    onMouseUp: onMouseUpDropdown,
  } = useShowTooltip();

  return (
    <div>
      <DropdownDataTooltip
        showing={showingTooltip}
        toggle={
          <div
            className={isLast ? "chartTalbeItemLast" : "chartTalbeItem"}
            key={data.name}
            onClick={onClickDropdown}
            onMouseEnter={onMouseEnterDropdown}
            onMouseLeave={onMouseLeaveDropdown}
            onMouseUp={onMouseUpDropdown}
          >
            <div className="chartTableItemName flex3">{data.name}</div>
            <div className="chartTableItemValue flex3 d-flex flex-row justify-content-end">
              {data.displayValue}
            </div>
            <div className="flex2 d-flex flex-row justify-content-end">
              <ChangeBadge size={"small"} value={data.changePercent} />
            </div>
          </div>
        }
        tooltipData={{
          title: data.name,
          data,
          currentFromDate: dateRange.startDate,
          currentToDate: dateRange.endDate,
          previousFromDate: data.previousFromDate,
          previousToDate: data.previousToDate,
        }}
      />
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
