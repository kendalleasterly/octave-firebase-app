function ButtonComponent({text, action}: {text: string, action: () => void}) {
	return (
		<button
			className="py-1 bg-accent-20 dark:bg-accent-80 rounded-lg px-10 w-full "
			onClick={action}>
			<p className="text-accent-80 dark:text-accent-20 font-semibold text-center">
				{text}
			</p>
		</button>
	);
}

export default ButtonComponent;
