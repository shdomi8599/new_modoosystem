import { Tag } from "antd";
import { useEffect, useState } from "react";

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
