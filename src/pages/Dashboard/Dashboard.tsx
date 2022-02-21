import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UiService from "src/services/UiService";
import DashboardChartItem, {
  DashboardChartItemProps,
} from "src/components/DashboardChartItem";
import { getPaymentHubOverallDashboardConfig } from "./config";

const DashboardAbstract = () => {
  const { t } = useTranslation();
  const dashboardData = getPaymentHubOverallDashboardConfig(t);
  const [loadingArr, setLoadingArr] = useState<boolean[]>(
    dashboardData.map(() => true)
  );

  useEffect(() => {
    if (loadingArr.every((item) => item === true)) {
      UiService.showLoadingChart();
    }
    if (loadingArr.every((item) => item === false)) {
      UiService.hideLoadingChart();
    }
  }, [loadingArr]);

  const _handleChangeLoading = useCallback(
    (index: number, loading: boolean) => {
      const newLoadingArr = [...loadingArr];
      newLoadingArr[index] = loading;
      setLoadingArr(newLoadingArr);
    },
    [loadingArr]
  );

  const _renderChartItem = (item: DashboardChartItemProps, index) => {
    return (
      <DashboardChartItem
        key={index}
        {...item}
        onChangeLoading={_handleChangeLoading}
      />
    );
  };

  return <>{dashboardData.map(_renderChartItem)}</>;
};

export default DashboardAbstract;
