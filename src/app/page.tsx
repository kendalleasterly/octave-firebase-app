"use client";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerTextAtom, isDarkAtom } from "@/src/Global/atoms";
import { accountAtom, useAccountModel } from "@/src/Models/AccountModel";
import { Playlist, usePlaylistModel } from "@/src/Models/PlaylistModel";
import { PlaylistArtwork } from "./playlist/[playlistID]/PlaylistComponents";
import Link from "next/link";
import ButtonComponent from "../Components/ButtonComponent";

function Home() {
  const setHeaderText = useRecoilState(headerTextAtom)[1];
  const account = useRecoilValue(accountAtom);
  const accountModel = useAccountModel();
  const playlistModel = usePlaylistModel();
  const [accountPlaylists, setAccountPlaylists] = useState<{
    [key: string]: Playlist;
  }>({});

  useEffect(() => {
    setHeaderText("Home");

    for (const simplePlaylist of account.simplePlaylists) {
      playlistModel.getPlaylist(simplePlaylist.id).then((playlist) => {
        accountPlaylists[playlist.id] = playlist;
        setAccountPlaylists(accountPlaylists);
      });
    }
  }, [account.simplePlaylists, accountPlaylists]);

  return (
    <div className="flex w-full justify-center px-4">
      <div className="space-y-8 text max-w-2xl xl:max-w-4xl">
        <p className=" text-3xl">Welcome to Octave</p>

        <div className="text text-lg space-y-4 flex flex-row justify-center">
          <ul className="list-disc space-y-2">
            <li>
              Try to search for songs, play them, and add them to your queue
              using the 3 dots menu on the right to each song.
            </li>
            <li>
              You can view currently playing songs in the full screen player!
              <ul className="list-disc pl-8">
                <li>
                  If on desktop, click the expand icon in the bottom right.
                </li>
                <li>
                  If on mobile, tap the bottom bar containing the playback
                  controls.
                </li>
              </ul>
            </li>
            {account.isSignedIn ?? (
              <li>
                To get the full experience, create a free account! You&apos;ll
                be able to create playlists, add songs to your playlists, etc.
              </li>
            )}
          </ul>
        </div>

        <div className="">
          <div className="w-full flex flex-row justify-center space-x-4">
            <div className="w-full">
              <Link href={"/search"}>
                <ButtonComponent
                  text="Search Now"
                  action={() => {}}
                ></ButtonComponent>
              </Link>
            </div>
{account.isSignedIn ?? <ButtonComponent
              text="Sign In"
              action={() => {
                accountModel.signIn();
              }}
            ></ButtonComponent>}
            
          </div>
        </div>

            <p className="dark:text-gray-500 text-gray-400">* Note: Octave does not play the music you request, rather redirects you to your requested song on youtube. Royalty-free audio is played as a placeholder to deomonstrate Octave&apos;s playback capabilities.</p>

      </div>
    </div>
  );
}

export default Home;
