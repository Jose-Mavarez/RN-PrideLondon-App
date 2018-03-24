// @flow
import type { Reducer } from "redux";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { EventFiltersAction } from "../actions/event-filters";

export type State = {
  date: ?DateOrDateRange,
  time: Set<Time>
};

const defaultState = {
  date: null,
  time: new Set()
};

const eventFilters: Reducer<State, EventFiltersAction> = (
  state: State = defaultState,
  action: EventFiltersAction
) => {
  switch (action.type) {
    case "UPDATE_EVENT_FILTERS":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default eventFilters;