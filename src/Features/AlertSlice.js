import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [] // queue of alerts
};

const alertSlice = createSlice (
  {
    name: "alert",

    initialState,

    reducers: {
      enqueueAlert: ( state, action ) => {
        state.alerts.push ( action.payload );
      },

      dequeueAlert: ( state ) => {
        state.alerts.shift ();
      },

      clearAllAlerts: ( state ) => {
        state.alerts = [];
      }
    }
  }
);

export const { enqueueAlert, dequeueAlert, clearAllAlerts } = alertSlice.actions;

export default alertSlice.reducer;