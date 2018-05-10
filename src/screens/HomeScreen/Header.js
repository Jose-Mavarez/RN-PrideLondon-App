// @flow
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { sortBy } from "ramda";
import homeSupportUsBgBottomLeft from "../../../assets/images/homeSupportUsBgBottomLeft.png";
import homeSupportUsBgTopRight from "../../../assets/images/homeSupportUsBgTopRight.png";
import ButtonWithShapes from "../../components/ButtonWithShapes";
import ContentPadding from "../../components/ContentPadding";
import Text from "../../components/Text";
import { whiteColor, lightNavyBlueColor } from "../../constants/colors";
import { SUPPORT_US } from "../../constants/routes";
import text from "../../constants/text";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import type { HeaderBanner } from "../../data/header-banner";

import locale from "../../data/locale";

type Props = {
  headerBanners: HeaderBanner[],
  getAssetSource: FieldRef => ImageSource,
  navigation: NavigationScreenProp<NavigationState>
};

const pickBanner = (banners: HeaderBanner[]): HeaderBanner => {
  const sortedBanners = sortBy(
    banner => banner.fields.heroImage[locale].sys.id,
    banners
  );
  const day = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
  return sortedBanners[day % banners.length];
};

const Header = ({ headerBanners, getAssetSource, navigation }: Props) => {
  const banner = pickBanner(headerBanners);
  if (!banner) return null;

  const heroImage = getAssetSource(banner.fields.heroImage[locale]);
  const heroImageHeight = 218; // 225 (header) - 7 (marginTop)
  const heroImageWidth = heroImage.width * (heroImageHeight / heroImage.height);

  return (
    <View>
      <View
        style={[
          styles.container,
          { backgroundColor: banner.fields.backgroundColour[locale] }
        ]}
      >
        <Image
          resizeMode="contain"
          source={heroImage}
          style={[
            styles.image,
            { width: heroImageWidth, height: heroImageHeight }
          ]}
        />
        <ContentPadding style={styles.headingContainer}>
          <Text type="uber" color="lightNavyBlueColor" style={styles.heading}>
            {banner.fields.heading[locale]}
          </Text>
          {banner.fields.headingLine2 && (
            <Text type="uber" color="lightNavyBlueColor" style={styles.heading}>
              {banner.fields.headingLine2[locale]}
            </Text>
          )}
          {banner.fields.subHeading && (
            <Text type="h2" color="whiteColor" style={styles.subHeading}>
              {banner.fields.subHeading[locale]}
            </Text>
          )}
        </ContentPadding>
      </View>
      <ContentPadding style={styles.supportUsButtonContainer}>
        <ButtonWithShapes
          color={lightNavyBlueColor}
          title={text.homeSupportUs}
          description={text.homeSupportUsDescription}
          centerText
          bgBottomLeft={homeSupportUsBgBottomLeft}
          bgTopRight={homeSupportUsBgTopRight}
          navigation={navigation}
          url={SUPPORT_US}
        />
      </ContentPadding>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 225
  },
  image: {
    marginTop: 7,
    marginHorizontal: 10,
    alignSelf: "flex-end"
  },
  headingContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  heading: {
    backgroundColor: whiteColor,
    paddingHorizontal: 8,
    paddingTop: 8
  },
  subHeading: {
    backgroundColor: lightNavyBlueColor,
    paddingHorizontal: 8,
    paddingTop: 4
  },
  supportUsButtonContainer: {
    marginTop: -37,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  }
});

export default Header;
