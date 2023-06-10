import { Tag } from "antd";
import { useEffect, useState } from "react";

const TableCategoryTagItem = ({ items }: { items: string[] }) => {
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

export default TableCategoryTagItem;
