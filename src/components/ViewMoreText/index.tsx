import { useState } from "react";
import { useTranslation } from "react-i18next";
import Utils from "src/utils/Utils";

interface ViewMoreTextProps {
  text?: string;
  maxCharacter?: number;
}

interface TextLink {
  text: string;
  isLink: boolean;
  href?: string;
}
interface Match {
  start: number;
  end: number;
}

const ViewMoreText = ({ text, maxCharacter = 200 }: ViewMoreTextProps) => {
  const { t } = useTranslation();
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const _handleClickLink = (e, link: string) => {
    e.preventDefault();
    // Utils.openBrowser(link);
  };

  const _toggleExpand = () => {
    setIsExpand(!isExpand);
  };

  const _getLinkifyText = (str: string): React.ReactNode => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = str.matchAll(urlRegex);
    const matchArr: Match[] = [];
    for (const match of matches) {
      matchArr.push({
        start: match?.index || 0,
        end: (match?.index || 0) + match[0].length,
      });
    }
    const textLinkArr: TextLink[] = [];

    for (let i = 0; i < matchArr.length; i++) {
      if (i === 0) {
        if (matchArr[0].start > 0) {
          textLinkArr.push({
            text: str.slice(0, matchArr[0].start),
            isLink: false,
          });
        }
      } else {
        if (matchArr[i].start > matchArr[i - 1].end) {
          textLinkArr.push({
            text: str.slice(matchArr[i - 1].end, matchArr[i].start),
            isLink: false,
          });
        }
      }
      const url = str.slice(matchArr[i].start, matchArr[i].end);
      textLinkArr.push({
        text: url,
        isLink: true,
        href: url,
      });
      if (i >= matchArr.length - 1) {
        textLinkArr.push({
          text: str.slice(matchArr[i].end, str.length),
          isLink: false,
        });
      }
    }

    return (
      <>
        {textLinkArr.map((item, index) => {
          if (item.isLink) {
            return (
              <a
                className={"link"}
                href={item.href}
                onClick={(e) => _handleClickLink(e, item.href || "")}
                key={item.text + "_" + index}
              >
                {item.text}
              </a>
            );
          } else {
            return <span key={item.text + "_" + index}>{item.text}</span>;
          }
        })}
      </>
    );

    // const urls = linkify.find(str).filter((item) => item.isLink);
    // if (!urls || urls.length === 0) {
    //   return <span>{str}</span>;
    // }

    // const textLinkArr: TextLink[] = [];
    // for (let i = 0; i < urls.length; i++) {
    //   if (i === 0) {
    //     if (urls[0].start > 0) {
    //       textLinkArr.push({
    //         text: str.slice(0, urls[0].start),
    //         isLink: false,
    //       });
    //     }
    //   } else {
    //     if (urls[i].start > urls[i - 1].end) {
    //       textLinkArr.push({
    //         text: str.slice(urls[i - 1].end, urls[i].start),
    //         isLink: false,
    //       });
    //     }
    //   }
    //   console.log("url", urls[i]);
    //   textLinkArr.push({
    //     text: str.slice(urls[i].start, urls[i].end),
    //     isLink: true,
    //     href: urls[i].value,
    //   });
    //   if (i >= urls.length - 1) {
    //     textLinkArr.push({
    //       text: str.slice(urls[i].end, str.length),
    //       isLink: false,
    //     });
    //   }
    // }
    // console.log("textLinkArr", textLinkArr);
    // return (
    //   <>
    //     {textLinkArr.map((item, index) => {
    //       if (item.isLink) {
    //         return (
    //           <a
    //             className={"link"}
    //             href={item.href}
    //             onClick={(e) => _handleClickLink(e, item.href || "")}
    //             key={item.text + "_" + index}
    //           >
    //             {item.text}
    //           </a>
    //         );
    //       } else {
    //         return <span key={item.text + "_" + index}>{item.text}</span>;
    //       }
    //     })}
    //   </>
    // );
  };

  if (!text) {
    return <></>;
  }
  if (text.length < maxCharacter) {
    return (
      <div className="body14 textBlack2 prewrap">{_getLinkifyText(text)}</div>
    );
  }
  return (
    <div className="body14 textBlack2 prewrap">
      {isExpand
        ? _getLinkifyText(text + " ")
        : _getLinkifyText(text.slice(0, maxCharacter) + "... ")}
      <span
        className="title14 textGray4 w500 viewMoreAnchor"
        onClick={_toggleExpand}
      >
        {isExpand ? t("collapse") : t("view-more")}
      </span>
    </div>
  );
};

export default ViewMoreText;
