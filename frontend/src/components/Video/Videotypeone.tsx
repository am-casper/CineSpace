import Image from "next/image";
import "@/components/Video/videotypeone.css";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
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
  id,
  thumbnailUrl,
  channelName,
  channelLink,
  channelImg,
  videoViews,
  videoTitle,
  videoTime,
  videoLink,
}: Props) {
  const router = useRouter();

  return (
    <div className="main">
      <Link href={`/video?id=${id}`}>
        <Image
          className="thumbnail"
          src={thumbnailUrl}
          alt=""
          objectFit="contain"
          height={225}
          width={400}
        />
      </Link>

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
