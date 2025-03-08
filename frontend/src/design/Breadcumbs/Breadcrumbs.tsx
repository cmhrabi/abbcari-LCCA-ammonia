import React from "react";
import {
  Breadcrumbs as NextBreadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbsProps {
  items: { label: string; link: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="pb-8">
      <NextBreadcrumbs>
        {items.map((item, index) => (
          <BreadcrumbItem
            classNames={{
              item: "text-breadcrumb underline data-[current=true]:text-breadcrumb-final data-[current=true]:no-underline",
            }}
            size="sm"
            key={index}
            onClick={() => navigateTo(item.link)}
          >
            {item.label}
          </BreadcrumbItem>
        ))}
      </NextBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
