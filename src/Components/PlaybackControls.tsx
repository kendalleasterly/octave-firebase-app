import SkipIcon from "@/public/Images/skip-forward.svg";
import BackIcon from "@/public/Images/skip-backward.svg";
import RepeatIcon from "@/public/Images/repeat.svg";
import ShuffleLightIcon from "@/public/Images/shuffle-light.svg";
import ShuffleDarkIcon from "@/public/Images/shuffle-dark.svg";
import ShufflingIcon from "@/public/Images/shuffling.svg";
import PlayingIcon from "@/public/Images/playing.svg";
import PausedIcon from "@/public/Images/paused.svg";

import {usePlaybackModel} from "@/src/Models/PlaybackModel";
import {useRecoilState, useRecoilValue} from "recoil";
import {isDarkAtom, isPlayingAtom, shufflingAtom} from "@/src/Global/atoms";

function PlaybackControls({isFullScreen}: {isFullScreen?: boolean}) {
	const isPlaying = useRecoilValue(isPlayingAtom);
	const shuffling = useRecoilValue(shufflingAtom);
	const isDark = useRecoilValue(isDarkAtom);
	const buttonColor = isFullScreen ? "#FFFFFF" : isDark ? "#FFFFFF" : "#3F3F46";

	const {skipBack, playPause, skip, toggleShuffling} = usePlaybackModel();

	return (
		<div
			id="controls-secondary"
			className="flex md:space-x-12 py-1 justify-between md:justify-center w-full">
			
			<button onClick={toggleShuffling} className="w-6">
				{isFullScreen ? (
					<ShuffleDarkIcon  />
				) : shuffling ? (
					<ShufflingIcon  />
				) : isDark ? (
					<ShuffleDarkIcon />
				) : (
					<ShuffleLightIcon />
				)}
			</button>

			<div id="controls-primary" className="flex md:space-x-8 space-x-10">
				<button onClick={skipBack} className="w-6">
					<BackIcon fill={buttonColor} />
				</button>

				<button onClick={playPause} className="w-6">
					{isPlaying ? (
						<PlayingIcon fill={buttonColor} />
					) : (
						<PausedIcon fill={buttonColor} />
					)}
				</button>

				<button onClick={skip} className="ml-4 w-6" >
					<SkipIcon fill={buttonColor} />
				</button>
			</div>

			<button className="w-6">
				<RepeatIcon fill={buttonColor} />
			</button>
		</div>
	);
}

export default PlaybackControls;
