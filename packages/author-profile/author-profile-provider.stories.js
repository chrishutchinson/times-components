import React from "react";
import { storiesOf } from "@storybook/react-native";
import { ApolloProvider } from "react-apollo";
import { pagination } from "@times-components/pagination";

import AuthorProfileProvider from "./author-profile-provider";
import client from "./apollo-client";

const PaginationChanger = pagination(AuthorProfileProvider);

storiesOf("AuthorProfileProvider", module).add("AuthorProfileProvider", () =>
  <ApolloProvider client={client}>
    <PaginationChanger
      generatePageLink={page => `https://www.thetimes.co.uk?page=${page}`}
      imageRatio="3:2"
      slug="fiona-hamilton"
      page={1}
      pageSize={3}
    />
  </ApolloProvider>
);
