"use client";
import { Video } from "@/utils/types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { SeekForwardIcon, SeekBackwardIcon } from "@vidstack/react/icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "@/styles/video.css";
import { Avatar } from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";

export default function VideoScreen({ searchParams }: { searchParams: any }) {
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [desc, setdesc] = useState(false);
  const id = searchParams.id;
  console.log(id);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [bitRate, setBitRate] = useState("400k");
  const link = `https://res.cloudinary.com/cinespace/video/upload/br_${bitRate}/v1693681213/${id}.mp4`;
  const [showVid, setShowVid] = useState(false);
  const [seekTo, setSeekTo] = useState<number>(0);

  // Added by me
  const [video, setVideo] = useState<Video>();
  useEffect(() => {
    axios.get(`http://localhost:8000/video/${id}`).then((res) => {
      setVideo(res.data.data.document);
    });
  }, []);

  // end
  console.log(video);
  function seekforward(event: any): void {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime()! + 5);
  }
  function seekbackward(event: any): void {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime()! - 5);
  }

  function onStart() {
    if (searchParams.t && seekTo == 0) {
      console.log(searchParams.t);

      setSeekTo(parseFloat(searchParams.t));
      console.log(seekTo);
      playerRef.current?.seekTo(searchParams.t);
    } else playerRef.current?.seekTo(seekTo);
  }
  return (
    <>
      {" "}
      {showVid ? (
        <ReactPlayer
          muted={true}
          ref={playerRef}
          url={link}
          controls
          width="100%"
          height="fit-content"
          onStart={onStart}
          playing={showVid}
        />
      ) : (
        <img
          src="https://res.cloudinary.com/cinespace/image/upload/v1693728639/uybtxljvfcw0djnnmbvu.png"
          onClick={() => {
            setShowVid(true);
          }}
        ></img>
      )}
      <br />
      <div className="grid grid-cols-3">
        <div className="flex">
          <button
            onClick={seekforward}
            style={{
              width: "fit-content",
              display: "flex",
              padding: "0.5rem 1rem",
            }}
            className="flex items-center"
          >
            <SeekForwardIcon />
            &nbsp;5 sec
          </button>
          <button
            onClick={seekbackward}
            style={{
              width: "fit-content",
              display: "flex",
              padding: "0.5rem 1rem",
            }}
            className="flex items-center"
          >
            <SeekBackwardIcon />
            &nbsp;5 sec
          </button>
        </div>
        <div></div>
        <div className="flex flex-row justify-end">
          <Dropdown className="btn">
            <DropdownTrigger>
              <button className="btn border-gray-200">Quality</button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key) => {
                setSeekTo(playerRef.current?.getCurrentTime()!);
                setBitRate(key.toString());
              }}
            >
              <DropdownItem key="400k">144p</DropdownItem>
              <DropdownItem key="700k">240p</DropdownItem>
              <DropdownItem key="1m">360p</DropdownItem>
              <DropdownItem key="4m">480p</DropdownItem>
              <DropdownItem key="7m">720p</DropdownItem>
              <DropdownItem key="10m">1080p</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      //TODO: added by kitu
      <div className="info">
        <div className="channel">
          <Avatar sx={{ height: 50, width: 50 }} />
          <div className="channelinfo">
            <h1>{video?.uploadedBy}</h1>
            <p>{"884K subscribers"}</p>
          </div>
          <div
            className={`subbtn ${subscribed ? "bg-slate-500" : ""}}`}
            onClick={() => {
              setSubscribed(!subscribed);
              //TODO: add subscribe backend call
            }}
          >
            {subscribed ? "unsubscribe" : "subscribe"}
          </div>
        </div>
        <div className="buttons">
          <div
            className="dislike"
            onClick={() => {
              setLiked(!liked);
              //TODO: database stuff
            }}
          >
            {liked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
            {video?.dislikeCount}
          </div>
          <div className="share">
            <ReplyIcon />
            Share
          </div>
        </div>
      </div>
      <div
        className="description"
        onClick={() => {
          setdesc(!desc);
        }}
      >
        <p> {video?.viewsCount} Views | 16 hours ago</p>
        <div className={`${desc ? "less" : "more"}`}>
          {video?.desc}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          repellendus temporibus animi, maiores quae iste? Et laborum odio
          reprehenderit maiores hic. Maxime perspiciatis deserunt quidem vitae
          consequatur possimus beatae dicta explicabo adipisci rem reiciendis
          ipsa tenetur repellendus repellat vel, praesentium sed blanditiis
          sapiente totam, ut eaque excepturi. Ratione architecto aut dignissimos
          officia quos iure, tempora et id eveniet dolores aliquam unde
          blanditiis vitae repellendus hic provident. Doloremque consequuntur
          voluptatibus, est commodi facere maxime quas sit porro aut accusantium
          nihil tempora similique excepturi vel necessitatibus delectus iste
          ullam. Quaerat blanditiis error, impedit natus labore atque. Eos eaque
          ipsa quod officia quo blanditiis aliquam dolorum autem magni nesciunt,
          labore aspernatur voluptate recusandae deserunt similique sequi ipsam
          animi? Fuga ipsum voluptates vero aliquam sequi dolores ab consequatur
          cupiditate unde non vitae amet dolore quae, harum magni atque
          consequuntur, quam facere nesciunt! Ut ipsum eaque laboriosam corporis
          impedit aspernatur voluptatum quaerat natus, officiis qui temporibus
          numquam quos quo repellat commodi, magnam facere quasi repudiandae
          cupiditate, enim suscipit ipsa! Tenetur consequatur explicabo debitis
          esse. Aspernatur, iusto. Vel eos consequuntur doloribus saepe repellat
          eligendi nobis, nostrum, facere ex aut numquam velit assumenda qui
          quod nihil. Ad quis, beatae explicabo repudiandae voluptate odio ipsum
          aspernatur minima et obcaecati minus eius delectus consequuntur. Quae,
          maxime nesciunt amet nisi quo veniam fugit facere aliquam deserunt
          magni nihil eaque, natus suscipit consequatur harum numquam mollitia?
          Totam magni deserunt quibusdam quos nesciunt at quod illo blanditiis
          animi, dolores, error aliquam quidem quia ex unde. Blanditiis officia
          quam obcaecati ullam quisquam veniam porro a enim ad sunt, mollitia
          fugiat distinctio qui vero, ducimus omnis, tempore pariatur beatae
          minus totam? Praesentium, eveniet! Molestias expedita incidunt atque
          ea assumenda enim quo aliquid, error porro, dolores pariatur numquam?
          Aliquam obcaecati commodi accusamus culpa dolorem, possimus eveniet
          quas suscipit delectus ducimus et. Optio obcaecati, quam assumenda
          deleniti eos nobis a. Porro libero fugit reiciendis sequi impedit
          assumenda sit perferendis dolorem odio quasi vel commodi nulla magni,
          asperiores iure ad ipsum, tenetur explicabo animi. Illum nulla ipsam
          numquam officiis asperiores! Labore est sed, expedita porro blanditiis
          maxime fugit dolor repellat natus praesentium id! Libero reiciendis
          autem veniam ut numquam vero doloribus unde voluptas incidunt illum,
          nostrum asperiores, totam placeat, harum saepe. Laudantium inventore
          nam veniam reprehenderit enim, architecto aperiam quibusdam
          consectetur modi nisi nobis laborum ut deserunt velit eveniet est
          nesciunt temporibus repellendus vel aspernatur. Minima nulla ducimus
          nam debitis ad ipsa dolorum, sint optio sequi recusandae velit
          sapiente rem consequuntur. Nemo qui culpa maxime porro ad, fugit
          voluptas accusantium voluptates optio cupiditate architecto, quod
          delectus quaerat dolores, exercitationem quidem! Alias rem
          voluptatibus, velit reprehenderit aspernatur molestias ullam sequi
          exercitationem aperiam non illum perferendis provident minima autem
          tenetur cumque vel! Nesciunt architecto, laborum sequi minus corporis
          ullam sit illum quis aperiam illo vero quos dolorum dolorem numquam
          soluta consectetur dicta dolore exercitationem obcaecati suscipit
          ipsum, ad vitae? Hic, dolor inventore, dignissimos alias voluptatem
          ducimus quas, officia nobis doloremque dolorem harum distinctio ipsam
          quae vero porro non possimus minima. Possimus nostrum minus ullam
          optio! Eligendi praesentium officia possimus!
        </div>
        <h1></h1>
      </div>
    </>
  );
}
