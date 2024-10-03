import "./globals.css"
import { ReactNode } from "react"
import Provider from "./provider"
import ComingSoon from "./ComingSoon"

// export const dynamic = "force-dynamic"
//Note: the above line was necessary during firebase's experimental web hosting for next.js, but since the release of firebase app hosting it is no longer necessary.

const isComingSoon = false

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html>
			<body>
				{isComingSoon ? <ComingSoon /> : <Provider>{children}</Provider>}
			</body>
		</html>
	)
}
