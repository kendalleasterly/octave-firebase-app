'use client'

import { useEffect, useState } from "react"
import { animated, useTransition } from "@react-spring/web"
import { useRecoilState } from "recoil"
import { NotificationObject, notificationsAtom } from "@/src/Models/NotificationModel"

import CollectionSuccessIcon from "@/public/Images/collection-success.svg"
import CollectionErrorIcon from "@/public/Images/collection-error.svg"
import ErrorIcon from "@/public/Images/error.svg"
import SuccessIcon from "@/public/Images/success.svg"
import Image from "next/image"


function Notification({ notificationObject }: {notificationObject: NotificationObject}) {
	const [isShowing, setIsShowing] = useState(true)
	const [notifications, setNotifications] = useRecoilState(notificationsAtom)

	useEffect(() => {

		setTimeout(() => {
			setIsShowing(false)
		}, 5000)
	})

	const transitions = useTransition(isShowing, {
		from: { opacity: 0.25, transform:"translatey(100%)"},
		enter: { opacity: 1, transform: "translatey(0%)"},
		leave: { opacity: 0, transform: "translatey(100)"},
		onDestroyed: () => {
			const index = notifications.indexOf(notificationObject)

			if (index > -1) {
			let newNotifications = [...notifications]

			newNotifications.splice(index, 1)
			setNotifications(newNotifications)
			} else {
				console.log("couldn't find that one",index)
			}
		},
	})

	function getIcon() {

		switch (notificationObject.iconType) {
			case "collection success":
				return <CollectionSuccessIcon/>
			case "collection error":
				return <CollectionErrorIcon/>
			case "error":
				return <ErrorIcon/>
			case "success":
				return <SuccessIcon/>
			default:
				return ""
		}

	}

	return transitions(
		(styles, item) =>
			item && (
				<animated.div style={styles}>
					<div className="flex bg-tertiarybg px-6 py-2 rounded-lg space-x-4 mx-auto z-50">
						<div className="w-6 z-50">{getIcon()}</div>
						

						<div>
							<p className="text-sm text-white md:text-base one-line">{notificationObject.title}</p>
							<p className="text-xs md:text-sm text-gray-400 one-line">
								{notificationObject.description}
							</p>
						</div>
					</div>
				</animated.div>
			)
	)
}

export default Notification
