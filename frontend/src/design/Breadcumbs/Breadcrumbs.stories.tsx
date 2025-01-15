import Breadcrumbs from "./Breadcrumbs";
import React from "react";

export default {
  title: "Design/Breadcrumbs",
};

const BreadcrumbsDemo = () => {
  return (
    <Breadcrumbs
      items={[
        { label: "home", link: "" },
        { label: "next", link: "" },
        { label: "final", link: "" },
      ]}
    />
  );
};

export const Variants = BreadcrumbsDemo.bind({});
