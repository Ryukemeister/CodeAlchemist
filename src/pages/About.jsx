import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-poppins text-5xl md:text-5xl font-semibold px-5 md:px-10 pt-8">
          Your{" "}
          <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
            code
          </span>
          , no matter the{" "}
          <span className="bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121] text-transparent bg-clip-text">
            language!{" "}
          </span>
        </h1>
        <p className="mx-5 mb-8 md:mb-2 md:mx-10 mt-5 font-openSans text-2xl leading-[150%]">
          CodeAlchemist is an online code conversion and code explanation
          service for software developers. With CodeAlchemist, developers can
          easily convert code from one language to another, as well as access
          explanations for code snippets. CodeAlchemist offers a wide range of
          language support, including popular languages like Java, JavaScript,
          Python, and more. It’s easy to use, and provides a simple, intuitive
          interface. CodeAlchemist is simple and straightforward to use. All
          that is required is to simply paste in the code snippet and choose the
          language to which it is to be converted. CodeAlchemist will then
          quickly and accurately convert the code. In addition to the code
          conversion feature, CodeAlchemist also offers explanations for code
          snippets. This means that developers can learn how to use code in
          different languages and apply it to their own projects. Overall,
          CodeAlchemist is the perfect tool for developers who want to make the
          most out of their coding experience.
        </p>
      </div>
    </div>
  );
}
