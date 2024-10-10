import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPlaybackObjectAtom } from "@/src/Global/atoms";
import {FastAverageColor} from "fast-average-color";

import ProgressBar from "./ProgressBar";

import CloseIcon from "@/public/Images/close.svg";
import LargePlaceholder from "@/public/Images/placeholder-large.svg";
import PlaybackControls from "./PlaybackControls";
import DevicesIcon from "@/public/Images/devices.svg";
import TimelineIcon from "@/public/Images/timeline.svg";
import RemoteImage from "./RemoteImage";

function FullScreenPlayer({ toggle }:{toggle: () => void}) {
  const currentPlaybackObject = useRecoilValue(currentPlaybackObjectAtom);
  const albumCoverRef = useRef(null)
  const fac = new FastAverageColor(); //TODO do the spotify / apple music thing where you have a linear gradient that's kinda slanted...use either two shades of the average color or the top two colors

  function setBackgroundColor() {
	console.log("trying to set background color")

	if (albumCoverRef.current) {
		const color = fac.getColor(albumCoverRef.current);
		console.log({color})

		const container = document.getElementById("full-screen-player-container")!
		container.style.backgroundColor = color.hex;
	} else {
		console.log("no image element")
	}
  }

  function albumCoverDidLoad() {
	console.log("album cover did load")
    if (currentPlaybackObject.track) {
      setBackgroundColor();
    }
  }

  useEffect(() => {
	setBackgroundColor()
	
  }, [currentPlaybackObject.track]);

  useEffect(() => {
	
  })

  

  return (
		<div
			id="full-screen-player-container"
			className="bg-secondarybg fixed top-0 bottom-0 left-0 right-0">
			<div className="bg-black bg-opacity-5 w-full h-full px-8 py-6 fullscreen-player space-y-8">
				<button onClick={toggle} className="text-black w-6">
					<CloseIcon style={{fill: "#FFFFFF", opacity: "0.7"}} />
				</button>

				{/* don't touch this because it will break */}
				<div className="max-w-full overflow-hidden flex place-content-center h-full">
					
					{
					currentPlaybackObject.track ? (
						
						<RemoteImage src={currentPlaybackObject.track.artwork} className="place-self-center" imgClass="aspect-square rounded-lg mx-auto" onLoad={albumCoverDidLoad} ref={albumCoverRef} width={375} height={375} />
						
					) : (
						<LargePlaceholder className = "rounded-lg max-h-full mx-auto"/>
					)}
					
				</div>

				<div id="info-and-controls" className="info-and-controls">
					<div id="info">
						<p className="text-white text-xl font-medium one-line">
							{currentPlaybackObject.track
								? currentPlaybackObject.track.title
								: ""}
						</p>
						<p className="text-lg text-white opacity-70 md:font-medium one-line">
							{currentPlaybackObject.track
								? currentPlaybackObject.track.artist
								: ""}
						</p>
					</div>

					<div className="my-auto">
						<ProgressBar isFullScreen={true} />
					</div>

					<div className="flex justify-between">
						<button className="medium-only w-6">
							<DevicesIcon fill="#FFFFFF" />
						</button>

						<PlaybackControls isFullScreen={true} />

						<button className="medium-only w-6">
							<TimelineIcon fill="#FFFFFF" />
						</button>
					</div>

					<div className="justify-between flex md:hidden">
						<button>
							<DevicesIcon fill="#FFFFFF" className = "w-6"/>
						</button>

						<button>
							<TimelineIcon fill="#FFFFFF" className = "w-6"/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FullScreenPlayer;
