"use client"

import { headerTextAtom } from "@/src/Global/atoms";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Recent() {

    const setHeaderText = useSetRecoilState(headerTextAtom)

    useEffect(() => {
        setHeaderText("Recent")
    })

    return (
        <div>
            <p className="text">Recent tracks coming soon!</p>
        </div>
    );
}