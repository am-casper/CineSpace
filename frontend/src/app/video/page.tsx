"use client";
import { Comment, Video } from "@/utils/types";
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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import useSidebarStore from "@/global/sideBarStore";
import { useMediaQuery } from "react-responsive";
import React from "react";
import { set } from "mongoose";

export default function VideoScreen({ searchParams }: { searchParams: any }) {
  const [usercmt, setusercmt] = useState("");
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [desc, setdesc] = useState(false);
  const id = searchParams.id;
  const playerRef = useRef<ReactPlayer | null>(null);
  const [bitRate, setBitRate] = useState("400k");
  const link = `https://res.cloudinary.com/cinespace/video/upload/br_${bitRate}/v1693681213/${id}`;
  const [showVid, setShowVid] = useState(false);
  const [seekTo, setSeekTo] = useState<number>(0);

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  // Added by me
  const fetchVideo = async () => {
    axios.get(`http://localhost:8000/video/${id}`).then((res) => {
      setVideo(res.data.data.document);
    });
  };
  const [video, setVideo] = useState<Video>();
  useEffect(() => {
    fetchVideo();
  }, []);
  const postcomment = () => {
    const oldComments = video?.comments;
    const newComment: Comment = { comment: usercmt, dislikeCount: 0 };
    const newComments = [newComment, ...oldComments!];
    axios
      .put(`http://localhost:8000/video/${id}`, {
        comments: newComments,
      })
      .then((res) => {
        fetchVideo();
      });
  };
  // end
  function seekforward(event: any): void {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime()! + 5);
  }
  function seekbackward(event: any): void {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime()! - 5);
  }

  function onStart() {
    if (searchParams.t && seekTo == 0) {
      setSeekTo(parseFloat(searchParams.t));
      playerRef.current?.seekTo(searchParams.t);
    } else playerRef.current?.seekTo(seekTo);
  }
  return (
    <>
      {" "}
      <div className="thumb">
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
            style={{
              width: "100%",
            }}
            src={`https://res.cloudinary.com/cinespace/image/upload/v1693728639/${video?.thumbnailPublic}.png`}
            onClick={() => {
              setShowVid(true);
            }}
          ></img>
        )}
      </div>
      <br />
      <div className="grid grid-cols-3">
        <div className="flex">
          <button
            onClick={seekforward}
            style={{
              width: "fit-content",
              marginLeft: "110px",
            }}
            className="flex items-center"
          >
            <SeekForwardIcon />
            &nbsp;5 sec
          </button>
          <button
            onClick={seekbackward}
            style={{
              display: "flex",
              // padding: "0.5rem 1rem",
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
            className={`subbtn px-2 ${subscribed ? "bg-slate-500" : ""}}`}
            onClick={() => {
              setSubscribed(!subscribed);
              //TODO: add subscribe backend call
            }}
          >
            {isMobile ? (
              subscribed ? (
                <NotificationsActiveIcon />
              ) : (
                <NotificationsOffIcon />
              )
            ) : subscribed ? (
              <div>
                <NotificationsOffIcon />
                Unbscribe
              </div>
            ) : (
              <div>
                <NotificationsActiveIcon />
                Subsribe
              </div>
            )}
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
            {/* {"Share"} */}
            {!isMobile && "Share"}
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
        <div className={`${desc ? "less" : "more"}`}>{video?.desc}</div>
      </div>
      <div className="comments">
        <h1>{video?.comments.length} Comments</h1>
        <input
          type="text"
          className="commentinput"
          onFocus={onFocus}
          placeholder="Add a comment..."
          onChange={(e) => {
            setusercmt(e.target.value);
          }}
        />
        {focused && (
          <div className="commentoptions">
            <div
              className="cancelbtn"
              onClick={() => {
                setFocused(false);
                setusercmt("");
                //TODO: database stuff
              }}
            >
              Cancel
            </div>

            <div
              className={`${
                usercmt ? "commentbtnactive" : "commentbtndisabled"
              }`}
              onClick={postcomment}
            >
              Comment
            </div>
          </div>
        )}
        {video?.comments.map((comment) => {
          return (
            <div className="comment">
              <h1>{comment.comment}</h1>
              <div
                className="dislike"
                onClick={() => {
                  //TODO: database stuff
                }}
              >
                {liked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                {comment?.dislikeCount}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
