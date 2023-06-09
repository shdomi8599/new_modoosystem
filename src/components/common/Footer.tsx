import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import whiteLogo from "../../../public/logo/white_logo.png";
import { FOOTER_ITEMS } from "@/datas/data/data";

const Footer = () => {
  const router = useRouter();

  const onClickLink = (e: { preventDefault: () => void }, href: string) => {
    !href && e.preventDefault();
  };

  return (
    <Box>
      <div className="logo-box">
        <Image
          onClick={() => router.push("/")}
          src={whiteLogo}
          height={50}
          alt="logo"
        />
      </div>
      <div className="items-box">
        {FOOTER_ITEMS.map((item) => (
          <div key={item.name} className="item">
            <div className="item-name">
              <span>{item.name}</span>
            </div>
            <ul className="content">
              {item.content.map((content) => (
                <li key={content.name}>
                  <Link
                    className={item.name === "회사소개" ? "disabled" : ""}
                    onClick={(e) => onClickLink(e, content.href)}
                    href={content.href}
                  >
                    {content.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};
export default Footer;

const Box = styled.footer`
  padding: 40px calc((100% - 1280px) / 2);
  background-color: var(--main-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 40px;
  }

  .disabled {
    cursor: text;
  }

  .logo-box {
    margin-left: 8px;
  }

  .items-box {
    display: flex;
    gap: 16px;
    @media (max-width: 960px) {
      flex-direction: column;
      gap: 32px;
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      padding: 0px 12px;
      @media (max-width: 960px) {
      }

      .item-name {
        span {
          border-radius: 10px;
          padding: 6px;
          border: 2px solid white;
          color: #ffffff;
        }
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        a {
          font-size: 12px;
        }
      }
    }
  }
`;
