import { motion } from "framer-motion";

export default function TagLines({ inView }) {
	return (
		<>
			<motion.h1
				whileHover={{
					scale: 1.1,
					textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
				}}
				className="p-2 text-sm sm:text-2xl cursor-pointer"
				initial={{ x: -1000 }}
				animate={{ x: inView ? 0 : -1000 }}
				transition={{ type: "spring", stiffness: 30 }}
			>
				@vineandfrond
			</motion.h1>
			<motion.h1
				whileHover={{
					scale: 1.1,
					textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
				}}
				className="p-2 text-sm sm:text-2xl cursor-pointer"
				initial={{ x: 1000 }}
				animate={{ x: inView ? 0 : 1000 }}
				transition={{ type: "spring", stiffness: 30 }}
			>
				#vineandfrond
			</motion.h1>
		</>
	);
}
