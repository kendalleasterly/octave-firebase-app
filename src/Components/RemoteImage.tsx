import Image from "next/image"

export default function RemoteImage({imgClass, src, className, width, height, unbounded}: {className: string, imgClass: string, src: string, width?: number, height?: number, unbounded?:boolean}) {
	function imageLoader({width}:{width:number}) {
		return src
	}

	//IMPORTANT: this must have a parent div, which must have the relative class attribute along with all the ones you thought were in this one

	return (
		<div className={`${className} h-min z-0`}>
<Image
				loader={imageLoader}
				className={imgClass}
				src={src}

				fill={unbounded}
				unoptimized
				alt=""
				width={width}
				height={height}
			/>
		</div>
			
		
	)
}
