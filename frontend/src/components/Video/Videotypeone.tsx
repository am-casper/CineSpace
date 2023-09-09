import Image from "next/image";
import "@/components/Video/videotypeone.css";
import { Avatar } from "@mui/material";
import Link from "next/link";

interface Props {
  thumbnailUrl: string;
  channelName: string;
  channelLink: string;
  channelImg: string;
  videoViews: string;
  videoTitle: string;
  videoTime: string;
  videoLink: string;
}

function Videotypeone({
  thumbnailUrl,
  channelName,
  channelLink,
  channelImg,
  videoViews,
  videoTitle,
  videoTime,
  videoLink,
}: Props) {
  return (
    <div className="main">
      <Image
        className="thumbnail"
        src={thumbnailUrl}
        alt=""
        objectFit="contain"
        height={225}
        width={400}
      />
      <div className="info">
        <Avatar className="-z-5" src={channelImg} />
        <div className="text">
          <Link href={videoLink}>
            <h1 className="title">{videoTitle}</h1>
          </Link>
          <p className="channel">
            <Link href={channelLink}>{channelName}</Link>
          </p>
          <p className="viewdate">
            {videoViews} views - {videoTime} ago
          </p>
        </div>
      </div>
    </div>
  );
}

export default Videotypeone;
