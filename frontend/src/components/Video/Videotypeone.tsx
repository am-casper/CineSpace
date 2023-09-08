import Image from "next/image";
import "@/components/Video/videotypeone.css";
import { Avatar } from "@mui/material";

interface Props {
  thumbnail: string;
}

function Videotypeone({ thumbnail }: Props) {
  return (
    <div className="main">
      <Image
        className="thumbnail"
        src={thumbnail}
        alt=""
        objectFit="contain"
        height={200}
        width={400}
      />
      <div className="info">
        <Avatar className="-z-5"/>
        <div className="text">
            <h1 className="title">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, fugit consectetur</h1>
            <p className="channel">mdgspace</p>
            <p className="viewdate">1B views - 1 year ago</p>
        </div>
      </div>
    </div>
  );
}

export default Videotypeone;
