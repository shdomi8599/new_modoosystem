import { useEffect, useState } from "react";

import { Tag } from "antd";

interface Props {
  items: string[];
}

const TableInstallTagItem = ({ items }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(items);
  }, [items]);

  return (
    <>
      {categories?.map((item, idx) => (
        <Tag key={idx}>{item}</Tag>
      ))}
    </>
  );
};

export default TableInstallTagItem;
