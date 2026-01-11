import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIState = {
  selectedEventId: string | null;
};

const initialState: UIState = {
  selectedEventId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectEvent(state, action: PayloadAction<string | null>) {
      state.selectedEventId = action.payload;
    },
  },
});

export const { selectEvent } = uiSlice.actions;
export default uiSlice.reducer;
