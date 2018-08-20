import React from "react";
import { View, Text } from "react-native";
import Card from "@times-components/card";
import ArticleSummary, {
  ArticleSummaryHeadline,
  ArticleSummaryContent
} from "@times-components/article-summary";
import { TextLink } from "@times-components/link";

import styles from "./styles";

import PuffWrapper from "./puff-wrapper";

const Puff = ({ labelProps, headline, content, image, url }) => (
  <View style={styles.PuffContainer}>
    <PuffWrapper>
      <Card
        showImage={true}
        image={{
          uri: image
        }}
        imageRatio={3 / 2}
        imageSize={400}
        contentContainerClass="puffContent"
        imageContainerClass="puffImage"
      >
        <ArticleSummary
          labelProps={labelProps}
          headline={() => <ArticleSummaryHeadline headline={headline} />}
          content={() => <ArticleSummaryContent ast={content} />}
        />
        <TextLink url={url}>Read more</TextLink>
      </Card>
    </PuffWrapper>
  </View>
);

export default Puff;
