import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATE_RANGE_VALUE } from "src/Constants";
import DateRange from "src/models/DateRange";
import Utils from "src/utils/Utils";
import { RootState } from "./store";

interface DashboardState {
  dateRange: DateRange;
}

const initialState: DashboardState = {
  dateRange: Utils.getPredefineDateRange(DATE_RANGE_VALUE.LAST_30_DAY),
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    saveDateRange(state, action: PayloadAction<DateRange>) {
      state.dateRange = action.payload;
    },
  },
});

export const { saveDateRange } = DashboardSlice.actions;

export const selectDateRange = (state: RootState) => state.dashboard.dateRange;

export default DashboardSlice.reducer;
