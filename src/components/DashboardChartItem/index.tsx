import { CHART_TYPE } from "src/Constants";
import { selectDateRange } from "src/redux/DashboardSlice";
import { useAppSelector } from "src/redux/hook";
import ComposedChartInfo, {
  ComposedChartInfoProps,
} from "../ComposedChartInfo";
import SingleNumberInfo, { SingleNumberInfoProps } from "../SingleNumberInfo";
import Col from "react-bootstrap/Col";
import Utils from "src/utils/Utils";
import { useDashboardRequest } from "src/hooks/UseRequest";
import { selectSelectedMerchantCode } from "src/redux/AuthSlice";
import { useEffect } from "react";

export interface DashboardChartItemProps {
  index: number;
  colNum?: number;
  chartType: CHART_TYPE;
  chartProps: ComposedChartInfoProps | SingleNumberInfoProps;
  url: string;
  mappingFn?: (item: any) => any;
  mappingType?: string | null;
  onChangeLoading?: (index, boolean) => void;
}

const DashboardChartItem = ({
  index,
  colNum = 6,
  chartType,
  chartProps,
  url,
  mappingFn,
  mappingType = "normal",
  onChangeLoading,
}: DashboardChartItemProps) => {
  const dateRange = useAppSelector(selectDateRange);
  const merchantCode = useAppSelector(selectSelectedMerchantCode);
  const { response, loading, error, refetch, refreshing } = useDashboardRequest(
    url,
    { merchantCode, fromDate: dateRange.startDate, toDate: dateRange.endDate }
  );

  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(index, loading);
    }
  }, [loading, index]);
  const data = mappingFn
    ? Utils.formatResponseData(response, mappingFn, mappingType)
    : response;

  const showChart = Utils.shouldShowChart(chartType, dateRange);
  if (!showChart) {
    return <></>;
  }

  if (
    chartType === CHART_TYPE.AREA ||
    chartType === CHART_TYPE.LINE ||
    chartType === CHART_TYPE.BAR
  ) {
    return (
      <Col md={colNum} className="align-items-stretch">
        <ComposedChartInfo
          {...(chartProps as ComposedChartInfoProps)}
          data={data}
          loading={refreshing}
          onRefresh={refetch}
          error={error}
        />
      </Col>
    );
  } else if (chartType === CHART_TYPE.NUMBER) {
    return (
      <SingleNumberInfo
        {...(chartProps as SingleNumberInfoProps)}
        data={data}
        loading={refreshing}
        onRefresh={refetch}
        error={error}
      />
    );
  }
  return <></>;
};

export default DashboardChartItem;
