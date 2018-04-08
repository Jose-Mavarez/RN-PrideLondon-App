// @flow
import {
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter,
  buildPriceFilter
} from "./basic-event-filters";
import {
  selectDateFilter,
  selectTimeFilter,
  buildEventFilter
} from "./event-filters";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { Event } from "../data/event";

jest.mock("./basic-event-filters");
const untypedBuildDateFilter: any = buildDateFilter;
const untypedBuildDateRangeFilter: any = buildDateRangeFilter;
const untypedBuildTimeFilter: any = buildTimeFilter;
const untypedBuildPriceFilter: any = buildPriceFilter;

export type BuildStateArguments = {
  date: ?DateOrDateRange,
  time: Set<Time>,
  categories?: Set<string>,
  price?: boolean
};

const buildState = (
  selectedFilers: BuildStateArguments,
  stagedFilters: BuildStateArguments
) => ({
  events: {
    entries: [],
    assets: [],
    loading: false,
    refreshing: false
  },
  eventFilters: {
    selectedFilters: {
      date: selectedFilers.date,
      time: selectedFilers.time,
      categories: selectedFilers.categories || new Set(),
      price: selectedFilers.price || false
    },
    stagedFilters: {
      date: stagedFilters.date,
      time: stagedFilters.time,
      categories: stagedFilters.categories || new Set(),
      price: stagedFilters.price || false
    }
  }
});

export type BuildEventArguments = {
  startTime: string,
  endTime: string,
  categories?: Array<string>,
  eventPriceLow?: number,
  eventPriceHigh?: number
};

const buildEvent = ({
  startTime,
  endTime,
  categories = [],
  eventPriceLow = 0,
  eventPriceHigh = 10
}: BuildEventArguments) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime },
      categories: { "en-GB": categories },
      eventPriceLow: { "en-GB": eventPriceLow },
      eventPriceHigh: { "en-GB": eventPriceHigh }
    }
  }: any): Event);

describe("selectDateFilter", () => {
  it("returns the date part of the eventFilters", () => {
    const state = buildState(
      {
        date: "2018-01-01",
        time: new Set(["morning"])
      },
      {
        date: "2018-01-02",
        time: new Set(["morning"])
      }
    );

    const actual = selectDateFilter(state);
    expect(actual).toBe("2018-01-01");
  });

  it("returns the date part of the staged eventFilters", () => {
    const state = buildState(
      {
        date: "2018-01-01",
        time: new Set(["morning"])
      },
      {
        date: "2018-01-02",
        time: new Set(["morning"])
      }
    );

    const actual = selectDateFilter(state, true);
    expect(actual).toBe("2018-01-02");
  });
});

describe("selectTimeFilter", () => {
  it("returns the time part of the eventFilters", () => {
    const time = new Set(["morning"]);
    const state = buildState(
      {
        date: "2018-01-01",
        time
      },
      {
        date: "2018-01-01",
        time: new Set(["afternoon"])
      }
    );

    const actual = selectTimeFilter(state);
    expect(actual).toBe(time);
  });

  it("returns the time part of the staged eventFilters", () => {
    const time = new Set(["afternoon"]);
    const state = buildState(
      {
        date: "2018-01-01",
        time: new Set(["morning"])
      },
      {
        date: "2018-01-01",
        time
      }
    );

    const actual = selectTimeFilter(state, true);
    expect(actual).toBe(time);
  });
});

describe("buildEventFilter", () => {
  const event = buildEvent({
    startTime: "2018-08-02T08:00:00",
    endTime: "2018-08-02T15:00:00"
  });

  it("builds always truthy date filter when date is null", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        date: null,
        time: new Set(["morning", "afternoon", "evening"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).not.toHaveBeenCalled();
    expect(untypedBuildDateRangeFilter).not.toHaveBeenCalled();
  });

  it("builds date filter when date is a string", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: "2018-08-02",
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        date: "2018-08-02",
        time: new Set(["morning", "afternoon", "evening"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).toHaveBeenCalledWith(
      state.eventFilters.selectedFilters.date
    );
    expect(untypedBuildDateRangeFilter).not.toHaveBeenCalled();
  });

  it("builds staged date filter when date is a string", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: "2018-08-02",
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        date: "2018-08-03",
        time: new Set(["morning", "afternoon", "evening"])
      }
    );
    const filter = buildEventFilter(state, true);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).toHaveBeenCalledWith(
      state.eventFilters.stagedFilters.date
    );
    expect(untypedBuildDateRangeFilter).not.toHaveBeenCalled();
  });

  it("builds date range filter when date is a range", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateRangeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: {
          startDate: "2018-08-02",
          endDate: "2018-08-03"
        },
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        date: {
          startDate: "2018-08-02",
          endDate: "2018-08-03"
        },
        time: new Set(["morning", "afternoon", "evening"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).not.toHaveBeenCalled();
    expect(untypedBuildDateRangeFilter).toHaveBeenCalledWith(
      state.eventFilters.selectedFilters.date
    );
  });

  it("builds always truthy time filter when time array is empty", () => {
    const state = buildState(
      {
        date: null,
        time: new Set()
      },
      {
        date: null,
        time: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).not.toHaveBeenCalled();
  });

  it("builds always truthy time filter when time array contains all possible values", () => {
    const state = buildState(
      {
        date: null,
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        date: null,
        time: new Set(["morning", "afternoon", "evening"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).not.toHaveBeenCalled();
  });

  it("builds time filter, which returns true when one of the times match", () => {
    untypedBuildTimeFilter
      .mockReturnValue(() => true)
      .mockReturnValueOnce(() => false);

    const state = buildState(
      {
        date: null,
        time: new Set(["morning", "evening"])
      },
      {
        date: null,
        time: new Set(["morning", "evening"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).toHaveBeenCalledWith("morning");
    expect(untypedBuildTimeFilter).toHaveBeenCalledWith("evening");
  });

  it("builds filter, which returns false when time filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => false);
    untypedBuildDateFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: "2018-02-01",
        time: new Set(["morning"])
      },
      {
        date: "2018-02-01",
        time: new Set(["morning"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns false when date filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: "2018-02-01",
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        date: "2018-02-01",
        time: new Set(["morning", "afternoon", "evening"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds truthy price filter when price is false", () => {
    const state = buildState(
      {
        date: null,
        time: new Set(),
        price: false
      },
      {
        date: null,
        time: new Set(),
        price: false
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildPriceFilter).not.toHaveBeenCalled();
  });

  it("builds filter, which returns false when price filter returns false", () => {
    untypedBuildPriceFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        time: new Set(),
        price: true
      },
      {
        date: null,
        time: new Set(),
        price: true
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when price filter returns true", () => {
    untypedBuildPriceFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        time: new Set(),
        price: true
      },
      {
        date: null,
        time: new Set(),
        price: true
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });
});

afterEach(() => {
  untypedBuildDateFilter.mockReset();
  untypedBuildDateRangeFilter.mockReset();
  untypedBuildTimeFilter.mockReset();
  untypedBuildPriceFilter.mockReset();
});
