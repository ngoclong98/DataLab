import { DATE_RANGE_VALUE } from "src/Constants";

interface DateRange {
  startDate: string | null;
  endDate: string | null;
  rangeType?: DATE_RANGE_VALUE | null;
}
export default DateRange;
