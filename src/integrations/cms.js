// @flow

import Config from "react-native-config";
// force contentful SDK to use browser API
import { createClient } from "contentful/dist/contentful.browser.min";
import { saveCmsData, loadCmsData } from "./storage";
import type { Event, FeaturedEvents, Asset } from "../data/event";

export type CmsEntry = Event | FeaturedEvents;
export type CmsData = {
  entries: CmsEntry[],
  deletedEntries: CmsEntry[],
  assets: Asset[],
  deletedAssets: Asset[],
  nextSyncToken: string
};
export type SavedData = {
  entries: CmsEntry[],
  assets: Asset[],
  syncToken: string
};

type SyncOpts = {
  initial: boolean,
  nextSyncToken?: string
};
type Client = {
  sync: SyncOpts => Promise<CmsData>
};

const client: Client = createClient({
  space: Config.CONTENTFUL_SPACE_ID,
  accessToken: Config.CONTENTFUL_API_KEY
});

export const getCmsData = async (
  loadCmsDataFn: typeof loadCmsData = loadCmsData,
  updateCmsDataFn: typeof updateCmsData = updateCmsData
): Promise<SavedData> => {
  const localCmsData = await loadCmsDataFn();
  const hasLocalCmsData = !!localCmsData;

  if (hasLocalCmsData) {
    return localCmsData;
  }

  return updateCmsDataFn();
};

export const updateCmsData = async (
  loadCmsDataFn: typeof loadCmsData = loadCmsData,
  saveCmsDataFn: typeof saveCmsData = saveCmsData,
  clientObj: Client = client
): Promise<SavedData> => {
  const localCmsData = await loadCmsDataFn();
  const hasLocalCmsData = !!localCmsData;

  const syncOpts = hasLocalCmsData
    ? {
        initial: false,
        nextSyncToken: localCmsData.syncToken,
        resolveLinks: false
      }
    : {
        initial: true,
        resolveLinks: false
      };

  const cmsData = await clientObj.sync(syncOpts);

  if (hasLocalCmsData && localCmsData.syncToken === cmsData.nextSyncToken) {
    return localCmsData;
  }

  const savedCmsData = await saveCmsDataFn(cmsData);

  return savedCmsData;
};
