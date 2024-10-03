"use client";
import ObjectRow from "@/src/Components/ObjectRow";
import Song from "@/src/Components/Song";
import { headerTextAtom } from "@/src/Global/atoms";
import { accountAtom } from "@/src/Models/AccountModel";
import { useSpotifyModel } from "@/src/Models/SpotifyModel";
import { useTrackModel } from "@/src/Models/TrackModel";
import { Track } from "@/src/Models/typedefs";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Favorites() {
  const account = useRecoilValue(accountAtom);
  const spotifyModel = useSpotifyModel();
  const trackModel = useTrackModel();
  const setHeaderText = useSetRecoilState(headerTextAtom)
  const [savedTracks, setSavedTracks] = useState<Track[]>([]);

  useEffect(() => {
    setHeaderText("Favorites")
    if (account.isSignedIn) {
      console.log(Object.keys(account.savedTracks));
      spotifyModel
        .getTracksFromSongIDs(Object.keys(account.savedTracks), true)
        .then((tracks) => {
          setSavedTracks(tracks);
        });
    }
  }, [account.isSignedIn]);

  return (
    <div>
        
        {account.isSignedIn ? (

            savedTracks.map((track, i) => {
                return (<Song track={track} index={i} key={i}/>)
            })

        ) : (
            <p className="text">
                Sign into an account to access your saved tracks!
            </p>
        )}
      
    </div>
  );
}
