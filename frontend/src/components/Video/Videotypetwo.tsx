import Image from "next/image";
import "@/components/Video/videotypetwo.css";
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
  videoDesc: string;
  videoLink: string;
}

function Videotypetwo({
  thumbnailUrl,
  channelName,
  channelLink,
  channelImg,
  videoViews,
  videoTitle,
  videoTime,
  videoDesc,
  videoLink,
}: Props) {
  return (
    <div className="main">
      <Link href={videoLink}>
        <Image
          className="thumbnail"
          src={thumbnailUrl}
          alt=""
          objectFit="contain"
          height={200}
          width={400}
        />
      </Link>

      <div className="info">
        <Link href={videoLink}>
          <h1 className="title">{videoTitle}</h1>
          <p className="viewdate">
            {videoViews} views - {videoTime} ago
          </p>
        </Link>

        <Link href={channelLink}>
          <div className="channeldiv">
            <Avatar
              sx={{ width: 30, height: 30 }}
              className="-z-5"
              src={channelImg}
            />
            <p className="channel">{channelName}</p>
          </div>
        </Link>

        <Link href={videoLink}>
          <p className="desc">{videoDesc}</p>
        </Link>
      </div>
    </div>
  );
}

export default Videotypetwo;


