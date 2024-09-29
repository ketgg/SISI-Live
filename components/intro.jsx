const Intro = () => {
  return (
    <>
      <h2 className="text-xl md:text-2xl">
        Hello! I&apos;m <strong>SISI</strong> — short for &quot;Say It, Sign
        It!&quot;
      </h2>
      <p className="font-extralight text-sm md:text-base">
        I can turn your text or audio into American Sign Language(ASL)
        animations. Simply type in the box below or use the{" "}
        <strong className="bg-foreground text-background rounded-full px-[0.375rem]">
          Record
        </strong>{" "}
        button to speak your input. Once you&apos;re ready, hit the{" "}
        <strong className="bg-foreground text-background rounded-full px-[0.375rem]">
          Play
        </strong>{" "}
        button to watch your words come to life in ASL!
      </p>
    </>
  )
}

export default Intro
