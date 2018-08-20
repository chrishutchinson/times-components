import React from "react";
import Puff from "./src/puff";
import defaultFixture from "./fixtures/default";

export default {
  name: "Composed/Puff",
  children: [
    {
      type: "story",
      name: "Default",
      component: () => <Puff {...defaultFixture()} />
    }
  ]
};
