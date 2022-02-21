import PullToRefresh from "react-simple-pull-to-refresh";
import DashboardToolbar from "src/components/DashboardToolbar";
import Loading from "src/components/Loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BarsChartInfo from "src/components/BarsChartInfo";
import { COLORS } from "src/Constants";
import ComposedChartInfo from "src/components/ComposedChartInfo";
import DonutChartInfo from "src/components/DonutChartInfo";
import FunnelChart from "src/components/FunnelChart";

const ThienNguyen = () => {
  const _handleRefresh = async () => {
    console.log("Refreshing");
  };

  const _handleScroll = (e) => {};

  let data: any[] = [];
  for (let i = 30; i > 0; i--) {
    const date = new Date(new Date().setDate(new Date().getDate() - i));
    data.push({
      day: `${date.getDate()}/${date.getMonth() + 1}`,
      value: date.getDay() * 100,
    });
  }

  console.log(data);
  return <></>;
  // return (
  //   <div className="screenContainer">
  //     <DashboardToolbar title="Thien Nguyen" />
  //     <PullToRefresh
  //       onRefresh={_handleRefresh}
  //       refreshingContent={<Loading containerClassName="columnCenter" />}
  //     >
  //       <div
  //         className="screenScrollContainer refreshContent"
  //         onScroll={_handleScroll}
  //       >
  //         <div className="dashboardContent">
  //           <Row className="g-md-2">
  //             <Col md={6}>
  //               <BarsChartInfo
  //                 data={data}
  //                 title="Cashin Transaction Amount"
  //                 value={210316}
  //                 changePercent={-7.99}
  //                 xAxisDataKey="day"
  //                 dataKeys={["value"]}
  //                 colors={[COLORS.PRIMARY]}
  //                 barSize={8}
  //                 showLegend={false}
  //               />
  //             </Col>
  //             <Col md={6}>
  //               <BarsChartInfo
  //                 data={data}
  //                 title="Cashin Transaction Amount"
  //                 value={210316}
  //                 changePercent={-7.99}
  //                 xAxisDataKey="day"
  //                 dataKeys={["value", "value"]}
  //                 colors={[COLORS.PRIMARY, COLORS.SUCCESS]}
  //                 barSize={3}
  //               />
  //             </Col>
  //             <Col md={6}>
  //               <ComposedChartInfo
  //                 data={REVENUE_DATA}
  //                 title="Users"
  //                 value={"84,485"}
  //                 changePercent={-7.5}
  //                 xAxisDataKey="date"
  //                 lineType="monotone"
  //                 lineDataKeys={["currentPeriod"]}
  //                 areaDataKeys={["previousPeriod"]}
  //                 lineColors={[COLORS.PRIMARY]}
  //                 areaColors={[COLORS.SUCCESS]}
  //               />
  //             </Col>
  //             <Col md={6}>
  //               <DonutChartInfo
  //                 data={DONUT_DATA}
  //                 title="Prevenue by Method"
  //                 tableData={SUBCRIPTION_DATA}
  //               ></DonutChartInfo>
  //             </Col>
  //             <Col md={6}>
  //               <DonutChartInfo
  //                 data={DONUT_DATA}
  //                 title="Mobilot"
  //                 tableData={SUBCRIPTION_DATA}
  //               ></DonutChartInfo>
  //             </Col>
  //             <Col md={6}>
  //               <FunnelChart
  //                 data={FUNNEL_DATA}
  //                 title="CONVERSION RATE"
  //                 tableData={SUBCRIPTION_DATA}
  //               ></FunnelChart>
  //             </Col>
  //           </Row>
  //         </div>
  //       </div>
  //     </PullToRefresh>
  //   </div>
  // );
};

export default ThienNguyen;
