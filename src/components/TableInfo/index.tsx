import ChartDataContainer from "../ChartDataContainer";
import Table from "../Table";

export interface TableInfoItem {
  name: string;
  value: number;
  displayValue: any;
  changePercent: number;
  previousValue?: number;
  displayPreviousValue?: any;
  currentFromDate?: string;
  currentToDate?: string;
  previousFromDate?: string;
  previousToDate?: string;
}

export interface TableInfoMapping {
  nameKeys: string[];
  valueKeys: any[];
  displayValueKeys: any[];
  changePercentKeys: number[];
  previousValueKeys?: any[];
  displayPreviousValueKeys?: any[];
  currentFromDateKey?: string;
  currentToDateKey?: string;
  previousFromDateKey?: string;
  previousToDateKey?: string;
}

interface TableInfoProps {
  title?: string;
  tableTitle: string;
  data: TableInfoItem[];
  loading?: boolean;
  error?: any;
  onRefresh?: () => void;
}
const TableInfo = ({
  title,
  tableTitle,
  data,
  loading = false,
  error,
  onRefresh,
}: TableInfoProps) => {
  return (
    <ChartDataContainer error={error} loading={loading} onRefresh={onRefresh}>
      {!!title && <div className="chartTitle">{title}</div>}
      <Table tableTitle={tableTitle} data={data} />
    </ChartDataContainer>
  );
};
export default TableInfo;
