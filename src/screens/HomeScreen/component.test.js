// @flow
import React from "react";
import { shallow } from "enzyme";
import Component from "./component";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import type { Event, Asset } from "../../data/event";

const generateEvents = (count = 2): Event[] =>
  Array.from(Array(count)).map(
    (_, i) =>
      ({
        sys: {
          id: String(i + 1)
        },
        fields: {
          name: {
            "en-GB": "some other"
          },
          eventsListPicture: {
            "en-GB": {
              sys: {
                id: `asset${i + 1}`
              }
            }
          },
          startTime: {
            "en-GB": "2018-07-10T00:00"
          }
        }
      }: any)
  );

const asset: Asset = ({
  fields: {
    file: {
      "en-GB": {
        url: "http://example.com/image.png"
      }
    }
  }
}: any);

const getAssetById = jest.fn().mockReturnValue(asset);
const navigation: any = {
  navigate: jest.fn()
};

describe("HomeScreen Component", () => {
  const render = props =>
    shallow(
      <Component
        navigation={navigation}
        loading={false}
        featuredEventsTitle="Featured events"
        featuredEvents={generateEvents(2)}
        getAssetById={getAssetById}
        {...props}
      />
    );

  it("renders correctly", () => {
    const featuredEvents = generateEvents(5);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
    expect(getAssetById).toHaveBeenCalledTimes(4);
    expect(getAssetById).toHaveBeenCalledWith("asset1");
  });

  it("renders max 6 events", () => {
    const featuredEvents = generateEvents(10);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
    expect(getAssetById).toHaveBeenCalledTimes(6);
  });

  it("renders loading indicator when loading", () => {
    const output = render({
      loading: true
    });

    const loadingText = output.find("Text").first();

    expect(loadingText.children().text()).toEqual("Loading...");
  });

  it("navigates to featured event list when tapped", () => {
    const output = render();
    const viewAll = output.find({ testID: "view-all" });
    viewAll.simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith(FEATURED_EVENT_LIST, {
      title: "Featured events"
    });
  });

  it("navigates to event when tapped", () => {
    const output = render();
    const eventTile = output.find({ testID: "event-tile-1" });
    eventTile.simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith(EVENT_DETAILS, {
      eventId: "1"
    });
  });
});

afterEach(() => {
  getAssetById.mockClear();
  navigation.navigate.mockClear();
});
