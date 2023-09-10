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
import useSidebarStore from "@/global/sideBarStore";

export default function VideoScreen({ searchParams }: { searchParams: any }) {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
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

      <div className={`infoo ${sbactive ? "activeinfo" : ""}`}>
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
        className={`description ${sbactive ? "descactive" : ""}`}
        onClick={() => {
          setdesc(!desc);
        }}
      >
        <p> {video?.viewsCount} Views | 16 hours ago</p>
        <div className={`${desc ? "less" : "more"}`}>
          {video?.desc}
        </div>
        <h1></h1>
      </div>
    </>
  );
}
