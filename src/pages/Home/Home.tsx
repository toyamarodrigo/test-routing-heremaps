import React from "react";

import { LeafletMap } from "../../components/LeafletMap/LeaftletMap";
import { BasicLayout } from "../../layout";

interface Props {}

export const Home = (props: Props) => {
  return (
    <BasicLayout>
      <LeafletMap />
    </BasicLayout>
  );
};
