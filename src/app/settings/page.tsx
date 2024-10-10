'use client'

import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { headerTextAtom, isDarkAtom } from '@/src/Global/atoms';
import { accountAtom, useAccountModel } from '@/src/Models/AccountModel';
import ButtonComponent from '@/src/Components/ButtonComponent';

function Settings() {

    const [isDark, setIsDark] = useRecoilState(isDarkAtom)
	const setHeaderText = useSetRecoilState(headerTextAtom)
	const account = useRecoilValue(accountAtom)
	const accountModel = useAccountModel()

	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setHeaderText("Settings")

		setIsClient(true)

	})

	function setNewIsDark(newIsDark:boolean) {

        setIsDark(newIsDark)
       

        localStorage.setItem("isDark", newIsDark ? "true": "false")
    }

    return (
		isClient ?
			<div className = "flex flex-col">

				{account.isSignedIn ? (
					<div>
						<p className='text'>Name: {account.name}</p>
						<p className='text'>Email: {account.email}</p>
					</div>
					
				) : (
					<p className='text'>Sign in to get access to Playlists and save songs to your library!</p>
				)}
				

				<div className="space-y-4 my-4">
					<ButtonComponent text={account.isSignedIn ? "Sign Out" : "Sign In"} action={account.isSignedIn ? accountModel.signOut : accountModel.signIn} />
					<ButtonComponent text={`Turn ${isDark ? "off" : "on"} Dark Mode`} action={() => setNewIsDark(!isDark)} />
				</div>
				

			</div>
			:
			<p>Loading...</p>
		);
}

export default Settings
