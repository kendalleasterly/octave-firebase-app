"use client"

import "./App.css"
import "./globals.css"

import {
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil"
import Notification from "@/src/Components/Notification"

import Player from "@/src/Components/Player"
import Menu from "@/src/Components/Menu"
import {
	contextSelectionAtom,
	headerTextAtom,
	isDarkAtom,
	timelineIsActiveAtom,
} from "@/src/Global/atoms"
import Timeline from "./Timeline"
import { notificationsAtom } from "@/src/Models/NotificationModel"
import { ReactNode, useEffect, useRef, useState } from "react"
import SmallMenu from "@/src/Components/SmallMenu"
import { useAccountModel } from "@/src/Models/AccountModel"

import { usePathname } from "next/navigation"

export default function AppLayout({ children }: { children: ReactNode }) {

	const [timelineIsActive, setTimelineIsActive] =
		useRecoilState(timelineIsActiveAtom)
	const isDark = useRecoilValue(isDarkAtom)
	const notifications = useRecoilValue(notificationsAtom)
	const headerText = useRecoilValue(headerTextAtom)
	const pathname = usePathname()
	const accountModel = useAccountModel()
	const setContextSelection = useSetRecoilState(contextSelectionAtom)

    const bodyRef = useRef(null) as {current: HTMLDivElement | null}
    const [isClient, setIsCLient] = useState(false)

	useEffect(() => {
		setTimelineIsActive(false)
		setContextSelection(-1)
	}, [pathname])

	useEffect(() => {
		accountModel.checkForGoogleRedirect()
		accountModel.getAccount()
	}, [])
	

	useEffect(() => {


        setIsCLient(true)

        if (bodyRef.current) {
            bodyRef.current.className = getClassName()
        }

	}, [])

	return (
        isClient ?
		<div id="color-scheme" ref = {bodyRef} className={isDark ? "dark" : ""}>
			<div id="app-notifications-player" className="bg-white dark:bg-gray-900">
				<div className="content-with-player md:pb-23" id="main-content">
					<div className="main">
						<div className="medium-only border-r h-fullscreen overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 dark:border-gray-700 border-gray-200 pt-10 pl-12 pb-4">
							<Menu />
						</div>

						<div
							id="content"
							className={
								"px-6 pt-4 md:pl-10 md:pt-10 md:pr-12 pb-6 md:pb-4 h-fullscreen overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500  " +
								(pathname.includes("/album") ? "space-y-3" : "space-y-6")
							}
							onScroll={() => setContextSelection(-1)}
						>
							<ConditionalSmallMenu>
								{timelineIsActive ? <Timeline /> : children}
							</ConditionalSmallMenu>

							
						</div>
					</div>
				</div>
				<div className="hidden fixed bottom-16 py-6 px-8 space-y-4 md:block mb-2 z-auto w-full">
					{notifications.map((notification, key) => {
						return <Notification notificationObject={notification} key={key} />
					})}
				</div>

				<div className="fixed bottom-14 py-6 px-8 space-y-4 md:hidden w-screen mb-2">
					{notifications.length > 0 && (
						<Notification notificationObject={notifications[0]} />
					)}
				</div>
				<Player />
			</div>
		</div>
        :
        <div>{children}</div>
        
	)

	function ConditionalSmallMenu({children}:{children:ReactNode}) {
		if (typeof window !== "undefined") {
			if (headerText !== "" || window.innerWidth < 768) {
				return <div>
						
						<SmallMenu>
							{children}
						</SmallMenu>
				</div>
				
			}
		}
		return children
	}

	function getClassName() {

		if (isDark) {
			return "dark"
		} else {
			return ""
		}
	}
	
}
