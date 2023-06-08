import { InstallStatus } from "@/types/pageData";
import { Card, Spin, Tag } from "antd";
import { useState } from "react";
const { Meta } = Card;

const InstallStatusesCard = ({ data }: { data: InstallStatus }) => {
  const [category, setCategory] = useState(false);
  const categoryOver = () => {
    setCategory(true);
  };
  const categoryOut = () => {
    setCategory(false);
  };

  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const currentImgHandler = (idx: number) => {
    setLoading(true);
    setCurrentImg(idx);
  };
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <Card
      className="card"
      hoverable
      cover={
        <>
          {loading && (
            <div className="spin-box">
              <Spin />
            </div>
          )}
          <img
            onLoad={handleImageLoad}
            alt="install"
            src={data.src[currentImg]}
          />
        </>
      }
    >
      <Meta title={data.title} />
      <div
        onMouseOver={categoryOver}
        onMouseOut={categoryOut}
        className="category-box"
      >
        {category ? (
          <ul>
            {data.categori.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <span>설치제품</span>
        )}
      </div>
      <ul className="tag-box">
        {data.src.map((_, idx) => (
          <Tag
            onClick={() => currentImgHandler(idx)}
            key={idx}
            color={idx === currentImg ? "blue" : "black"}
          >
            {idx + 1}
          </Tag>
        ))}
      </ul>
    </Card>
  );
};

export default InstallStatusesCard;
