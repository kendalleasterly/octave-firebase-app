import { animated, useSpring, useTransition } from "@react-spring/web"
import React, { ReactNode } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { headerTextAtom, isDarkAtom, menuIsActiveAtom } from "@/src/Global/atoms"

import MenuIcon from "@/public/Images/menu.svg"
import Menu from "./Menu"

function SmallMenu({children}:{children: ReactNode}) {
	const [menuIsActive, setMenuIsActive] = useRecoilState(menuIsActiveAtom)
	const isDark = useRecoilValue(isDarkAtom)
	const headerText = useRecoilValue(headerTextAtom)

	const maskTransitions = useTransition(menuIsActive, {
		from: { opacity: 0 },
		enter: { opacity: 0.5 },
		leave: { opacity: 0 },
	})

	const menuTransitions = useTransition(menuIsActive, {
		from: { display: "block", opacity: 0 },
		enter: { opacity: 1 },
		leave: { display: "hidden", opacity: 0 },
	})

	return (
		<div>
			<div className="one-button-header z-50 mb-6">

				<button
					onClick={() => setMenuIsActive(true)}
					className="rounded-full md:hidden h-11"
				>
					<MenuIcon fill={isDark ? "#FFFFFF" : "#3F3F46"} className="w-6"/>
				</button>

				<p className="text-lg md:text-xl text font-semibold m-auto text-center w-full md:text-left">
					{headerText}
				</p>
			</div>

			{children}

			{maskTransitions(
				(styles, item) =>
					item && (
						<animated.div style={styles}>
							<div
								className="bg-black fixed left-0 right-0 top-0 bottom-0"
								onClick={() => setMenuIsActive(false)}
							></div>
						</animated.div>
					)
			)}

			{menuTransitions(
				(styles, item) =>
					item && (
						
							<animated.div style={styles} className="z-50" >
							<div className="bg-white dark:bg-gray-900 fixed left-0 w-4/5 z-50 top-0 bottom-0 pb-17 px-6 pt-6 overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500">
								<Menu />
							</div>
						</animated.div>
						
						
					)
			)}
		</div>
	)
}

export default SmallMenu
