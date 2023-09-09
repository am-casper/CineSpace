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

export default function VideoScreen({ searchParams }: { searchParams: any }) {

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
    </>
  );
}
