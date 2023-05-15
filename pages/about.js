import Footer from "@/components/Footer";
import Header from "@/components/Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="h-screen p-10 grid grid-cols-2">
        <div className="flex justify-center items-center">
          <h1>photo here</h1>
        </div>
        <p className='text-xl'>
          I started ceramics in January 2021. I was lucky enough to be able to
          borrow a wheel from my sister who studied ceramics in college. From
          there I taught myself the basics of wheel-throwing and hand-building
          from books and videos online. With lots of help I quickly established
          a home studio where I live in Hendersonville, NC. I purchased a
          massive vintage Skutt kiln and became consumed by clay, realizing I
          found my passion. In May of the same year, I quit my day job and
          started a ceramics and houseplant company--Vine and Frond was born. I
          grew up surrounded by houseplants; so naturally, combining my two
          passions of creating with clay and caring for greenery, I started
          making planters and selling tropical plants at local pop-up markets in
          the Asheville area. I now have my terra cotta goods and plants in a
          handful of shops around town and am starting a new venture with an
          online shop, with more functional ceramic pieces. Thanks for your
          support in my small business!
        </p>
      </div>
      <Footer />
    </div>
  );
};
export default About;
