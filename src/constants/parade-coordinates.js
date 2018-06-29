// @flow
import { scaleWithFont } from "../components/Text";
import { velvetColor } from "./colors";

const terminalStyle = {
  height: Math.max(18, scaleWithFont("xSmall", 18)),
  width: Math.max(18, scaleWithFont("xSmall", 18)),
  backgroundColor: velvetColor,
  borderRadius: Math.max(9, scaleWithFont("xSmall", 9)),
  justifyContent: "center",
  alignItems: "center"
};

export const terminals = [
  {
    key: "start",
    coordinates: { longitude: -0.14223, latitude: 51.51616 },
    text: { text: "A", type: "xSmall", color: "whiteColor" },
    style: terminalStyle
  },
  {
    key: "finish",
    coordinates: { longitude: -0.12664, latitude: 51.50497 },
    text: { text: "B", type: "xSmall", color: "whiteColor" },
    style: terminalStyle
  }
];

export const region = {
  latitude: 51.5085,
  longitude: -0.134192,
  latitudeDelta: 0.02,
  longitudeDelta: 0.000002
};

export const route = [
  { longitude: -0.14223, latitude: 51.51616 },
  { longitude: -0.14221, latitude: 51.5161 },
  { longitude: -0.14214, latitude: 51.51605 },
  { longitude: -0.14212, latitude: 51.51603 },
  { longitude: -0.1421, latitude: 51.51596 },
  { longitude: -0.14207, latitude: 51.51589 },
  { longitude: -0.14198, latitude: 51.51563 },
  { longitude: -0.1419, latitude: 51.51538 },
  { longitude: -0.14189, latitude: 51.51532 },
  { longitude: -0.14186, latitude: 51.51523 },
  { longitude: -0.14182, latitude: 51.51511 },
  { longitude: -0.14176, latitude: 51.5149 },
  { longitude: -0.14166, latitude: 51.5146 },
  { longitude: -0.14161, latitude: 51.51445 },
  { longitude: -0.14158, latitude: 51.51438 },
  { longitude: -0.14154, latitude: 51.5143 },
  { longitude: -0.14148, latitude: 51.5142 },
  { longitude: -0.14145, latitude: 51.51415 },
  { longitude: -0.1414, latitude: 51.51409 },
  { longitude: -0.14133, latitude: 51.51404 },
  { longitude: -0.14128, latitude: 51.51399 },
  { longitude: -0.14123, latitude: 51.51393 },
  { longitude: -0.14118, latitude: 51.51387 },
  { longitude: -0.14112, latitude: 51.51379 },
  { longitude: -0.14107, latitude: 51.51372 },
  { longitude: -0.14097, latitude: 51.51361 },
  { longitude: -0.14079, latitude: 51.51343 },
  { longitude: -0.14055, latitude: 51.51314 },
  { longitude: -0.14022, latitude: 51.51278 },
  { longitude: -0.13994, latitude: 51.51247 },
  { longitude: -0.13969, latitude: 51.51219 },
  { longitude: -0.13962, latitude: 51.51212 },
  { longitude: -0.13959, latitude: 51.51208 },
  { longitude: -0.13955, latitude: 51.51205 },
  { longitude: -0.13933, latitude: 51.51179 },
  { longitude: -0.13927, latitude: 51.51172 },
  { longitude: -0.13921, latitude: 51.51166 },
  { longitude: -0.13917, latitude: 51.51162 },
  { longitude: -0.1387, latitude: 51.51109 },
  { longitude: -0.13814, latitude: 51.51047 },
  { longitude: -0.13811, latitude: 51.51043 },
  { longitude: -0.13804, latitude: 51.51037 },
  { longitude: -0.138, latitude: 51.51034 },
  { longitude: -0.13792, latitude: 51.51029 },
  { longitude: -0.13784, latitude: 51.51025 },
  { longitude: -0.13774, latitude: 51.5102 },
  { longitude: -0.13762, latitude: 51.51016 },
  { longitude: -0.13753, latitude: 51.51012 },
  { longitude: -0.13741, latitude: 51.51009 },
  { longitude: -0.13729, latitude: 51.51006 },
  { longitude: -0.13712, latitude: 51.51002 },
  { longitude: -0.13698, latitude: 51.51 },
  { longitude: -0.13687, latitude: 51.50998 },
  { longitude: -0.13678, latitude: 51.50997 },
  { longitude: -0.13664, latitude: 51.50996 },
  { longitude: -0.13651, latitude: 51.50995 },
  { longitude: -0.13638, latitude: 51.50995 },
  { longitude: -0.13632, latitude: 51.50995 },
  { longitude: -0.1362, latitude: 51.50996 },
  { longitude: -0.13607, latitude: 51.50996 },
  { longitude: -0.13601, latitude: 51.50997 },
  { longitude: -0.13593, latitude: 51.50998 },
  { longitude: -0.13591, latitude: 51.50998 },
  { longitude: -0.13576, latitude: 51.51 },
  { longitude: -0.13564, latitude: 51.51003 },
  { longitude: -0.13553, latitude: 51.51005 },
  { longitude: -0.1354, latitude: 51.51007 },
  { longitude: -0.13526, latitude: 51.51011 },
  { longitude: -0.13517, latitude: 51.51013 },
  { longitude: -0.13515, latitude: 51.51014 },
  { longitude: -0.13514, latitude: 51.51014 },
  { longitude: -0.13513, latitude: 51.51014 },
  { longitude: -0.13512, latitude: 51.51014 },
  { longitude: -0.1351, latitude: 51.51013 },
  { longitude: -0.13483, latitude: 51.50972 },
  { longitude: -0.13476, latitude: 51.50964 },
  { longitude: -0.13465, latitude: 51.50953 },
  { longitude: -0.13438, latitude: 51.50925 },
  { longitude: -0.13433, latitude: 51.50918 },
  { longitude: -0.13381, latitude: 51.50858 },
  { longitude: -0.13228, latitude: 51.50718 },
  { longitude: -0.13182, latitude: 51.50734 },
  { longitude: -0.131, latitude: 51.50764 },
  { longitude: -0.13097, latitude: 51.50765 },
  { longitude: -0.13092, latitude: 51.50765 },
  { longitude: -0.13087, latitude: 51.50765 },
  { longitude: -0.13082, latitude: 51.50765 },
  { longitude: -0.13078, latitude: 51.50765 },
  { longitude: -0.1305, latitude: 51.50762 },
  { longitude: -0.13032, latitude: 51.50761 },
  { longitude: -0.13007, latitude: 51.50758 },
  { longitude: -0.12995, latitude: 51.50756 },
  { longitude: -0.12905, latitude: 51.50746 },
  { longitude: -0.12894, latitude: 51.50745 },
  { longitude: -0.12887, latitude: 51.50744 },
  { longitude: -0.12872, latitude: 51.50743 },
  { longitude: -0.12847, latitude: 51.5074 },
  { longitude: -0.1283, latitude: 51.50737 },
  { longitude: -0.12821, latitude: 51.50734 },
  { longitude: -0.12817, latitude: 51.50732 },
  { longitude: -0.12808, latitude: 51.50728 },
  { longitude: -0.12807, latitude: 51.50727 },
  { longitude: -0.12796, latitude: 51.50718 },
  { longitude: -0.12793, latitude: 51.50716 },
  { longitude: -0.12775, latitude: 51.50713 },
  { longitude: -0.12771, latitude: 51.5071 },
  { longitude: -0.12766, latitude: 51.50707 },
  { longitude: -0.12761, latitude: 51.50702 },
  { longitude: -0.12756, latitude: 51.50697 },
  { longitude: -0.12749, latitude: 51.50692 },
  { longitude: -0.12738, latitude: 51.50665 },
  { longitude: -0.12721, latitude: 51.50631 },
  { longitude: -0.12722, latitude: 51.50626 },
  { longitude: -0.12721, latitude: 51.50623 },
  { longitude: -0.12721, latitude: 51.5062 },
  { longitude: -0.12717, latitude: 51.50613 },
  { longitude: -0.12709, latitude: 51.50598 },
  { longitude: -0.12702, latitude: 51.50584 },
  { longitude: -0.12692, latitude: 51.5056 },
  { longitude: -0.1268, latitude: 51.50534 },
  { longitude: -0.12672, latitude: 51.50517 },
  { longitude: -0.12664, latitude: 51.50497 }
];

export type Terminals = {
  key: string,
  coordinates: { longitude: number, latitude: number },
  text: { text: string, type: string, color: string },
  style: any
};

export type Coordinates = {
  latitude: number,
  longitude: number
};

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
};
