import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  selectedEventId: string | null;
};

const initialState: UIState = { selectedEventId: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectEvent: (s, a: PayloadAction<string | null>) => {
      s.selectedEventId = a.payload;
    },
  },
});
