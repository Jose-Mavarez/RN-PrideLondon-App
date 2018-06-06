// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { State } from "../../reducers";
import type { Event } from "../../data/event-deprecated";
import type { HeaderBanner } from "../../data/header-banner";
import type { ImageDetails } from "../../data/image";
import { getImageDetails } from "../../data/image";
import strings from "../../constants/strings";
import {
  selectFeaturedEventsByTitle,
  selectEventsLoading
} from "../../selectors/events";
import { selectHeaderBanners } from "../../selectors/header-banner";
import Component from "./component";

type StateProps = {
  headerBanners: HeaderBanner[],
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getImageDetails: string => ?ImageDetails
};

type Props = StateProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State): StateProps => ({
  headerBanners: selectHeaderBanners(state),
  featuredEventsTitle: strings.featuredEventsTitle,
  featuredEvents: selectFeaturedEventsByTitle(
    state,
    strings.featuredEventsTitle
  ),
  loading: selectEventsLoading(state),
  getImageDetails: getImageDetails(state.data.images)
});

const mapDispatchToProps = {};

const connector: Connector<StateProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
