import { useEffect, useRef, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
	currentPlaybackObjectAtom,
	isDarkAtom,
	isPlayingAtom,
	timelineIsActiveAtom,
} from "@/src/Global/atoms"

import TimelineIcon from "@/public/Images/timeline.svg"
import DevicesIcon from "@/public/Images/devices.svg"
import FullScreenPlayer from "./FullScreenPlayer"
import ProgressBar from "./ProgressBar"
import { usePlaybackModel } from "@/src/Models/PlaybackModel"
import SkipIcon from "@/public/Images/skip.svg"
import PlayingIconSmall from "@/public/Images/playing-small.svg"
import PausedIconSmall from "@/public/Images/paused-small.svg"
import PlaybackControls from "./PlaybackControls"
import ExpandIcon from "@/public/Images/expand.svg"
import { usePlaceholder } from "./Placeholder"
import Link from "next/link"
import Image from "next/image"
import { audioRefAtom } from "@/src/Global/references"
import RemoteImage from "./RemoteImage"

function Player() {
	const currentPlaybackObject = useRecoilValue(currentPlaybackObjectAtom)
	const isPlaying = useRecoilValue(isPlayingAtom)
	const playerRef: any = useRef(null)
	const setPlayerRef = useSetRecoilState(audioRefAtom)

	const {
		handlePlaying,
		handlePause,
		handleEnded,
		handleUpdate,
		playPause,
		skip,
	} = usePlaybackModel()

	const [timelineIsActive, setTimelineIsActive] =
		useRecoilState(timelineIsActiveAtom)

	const [isFullScreen, setIsFullScreen] = useState(false)
	const isDark = useRecoilValue(isDarkAtom)
	const placeholder = usePlaceholder()
	const buttonColor = isDark ? "#FFFFFF" : "#3F3F46"

	useEffect(() => {
		setPlayerRef(playerRef)
	}, [playerRef, setPlayerRef])


	return (
		<div>
			<audio
				autoPlay
				src={currentPlaybackObject.url}
				id="custom-player"
				onPlaying={handlePlaying}
				onPause={handlePause}
				onEnded={handleEnded}
				onTimeUpdate={handleUpdate}
				ref = {playerRef}

			></audio>

			{!isFullScreen ? (
				<div>
					<div className="player justify-between w-full bg-white dark:bg-gray-900 border-t dark:border-gray-700 border-gray-200 px-6 md:px-12 md:py-4 ">
						<div className="z-10 self-center">
							<div
								className="md:hidden"
								onClick={() => setIsFullScreen(!isFullScreen)}
							>
								<SongInfo />
							</div>

							<div className="medium-only">
								<SongInfo />
							</div>
						</div>

						<div
							id="controls-tertiary"
							className="place-self-center md:w-full z-10"
						>
							<div className="space-x-4 md:hidden flex flex-row">
								<button onClick={playPause} className="w-6">
									{isPlaying ? (
										<PlayingIconSmall fill={buttonColor} />
									) : (
										<PausedIconSmall fill={buttonColor} />
									)}
								</button>

								<button onClick={skip} className="w-6">
									<SkipIcon fill={buttonColor} />
								</button>
							</div>

							<div className="medium-only md:mb-2">
								<PlaybackControls />
							</div>

							<div className="medium-only md:px-2">
								<ProgressBar />
							</div>
						</div>

						<div className="space-x-8 place-self-end hidden md:flex self-center z-10">
							<button onClick={() => setTimelineIsActive(!timelineIsActive)} className="w-6">
								<TimelineIcon
									fill={timelineIsActive ? "#EB634D" : buttonColor}
								/>
							</button>

							<button className="w-6">
								<DevicesIcon fill={buttonColor} />
							</button>

							<button onClick={() => setIsFullScreen(true)} className="w-6">
								<ExpandIcon fill={buttonColor} />
							</button>
						</div>

						<div
							className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 border-gray-200 w-full h-full absolute left-0 right-0 bottom-0 z-0 md:hidden"
							onClick={() => setIsFullScreen(!isFullScreen)}
						></div>
					</div>
				</div>
			) : (
				<FullScreenPlayer toggle={() => setIsFullScreen(false)} />
			)}
		</div>
	)

	function SongInfo() {
		return (
			<div id="song-info" className="flex space-x-4 my-auto">
				<Link
					href={`${
						currentPlaybackObject.track
							? "/album/" + currentPlaybackObject.track.albumID
							: "#"
					}`}
					className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
				>
					{currentPlaybackObject.track &&
					currentPlaybackObject.track.thumbnail != "" ? (
						<div>
								<RemoteImage src={currentPlaybackObject.track.thumbnail} className="md:hidden" imgClass="rounded-md" width={48} height={48}/>
								<RemoteImage src={currentPlaybackObject.track.thumbnail} className="medium-only" imgClass="rounded-md" width={56} height={56}/>
						</div>
						
						
					) : (
						placeholder.getPlaceholder()
					)}
				</Link>

				<div className="space-y-1.5 my-auto">
					<p className="text-base text one-line">
						{currentPlaybackObject.track
							? currentPlaybackObject.track.title
							: ""}
					</p>
					<p
						className="medium-only font-medium text-gray-400 one-line"
						id="player-artist"
					>
						{currentPlaybackObject.track
							? currentPlaybackObject.track.artist
							: ""}
					</p>
				</div>
			</div>
		)
	}
}

export default Player
