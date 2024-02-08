import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import sydney from "@/public/assets/sydney.png"; // Assuming the path to the image is correct
const About = () => {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			<main className="flex-grow">
				<div className="p-5 md:p-4 flex flex-col items-center justify-center">
					<div
						className="bg-purple-200/50 shadow-lg rounded-md p-4 flex flex-col md:flex-row items-center justify-between mt-36"
						style={{ maxWidth: "85%" }}
					>
						<div className="md:w-1/2 w-full">
							<Image
								src={sydney}
								alt="Sydney"
								width={700} // Adjusted to make the photo slightly smaller
								height={700} // Adjusted to make the photo slightly smaller
								className="rounded-lg"
							/>
						</div>
						<div className="md:w-1/2 w-full text-sm md:text-lg leading-relaxed md:pl-4">
							<p>
								I started ceramics in January 2021. I was lucky enough to be
								able to borrow a wheel from my sister who studied ceramics in
								college. From there I taught myself the basics of wheel-throwing
								and hand-building from books and videos online. With lots of
								help I quickly established a home studio where I live in
								Hendersonville, NC. I purchased a massive vintage Skutt kiln and
								became consumed by clay, realizing I found my passion. In May of
								the same year, I quit my day job and started a ceramics and
								houseplant company--Vine and Frond was born. I grew up
								surrounded by houseplants; so naturally, combining my two
								passions of creating with clay and caring for greenery, I
								started making planters and selling tropical plants at local
								pop-up markets in the Asheville area. I now have my terra cotta
								goods and plants in a handful of shops around town and am
								starting a new venture with an online shop, with more functional
								ceramic pieces. Thanks for your support in my small business!
							</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
export default About;
