export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col px-8 pb-8">
      <div className="relative w-full flex-1 overflow-hidden rounded-2xl">
        <img
          src="/background-image.jpg"
          alt="Background Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="bg-background absolute inset-0 z-10 opacity-75" />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="mx-auto flex w-3/4 flex-col items-center gap-8">
            <h3 className="text-center text-3xl font-semibold md:text-4xl lg:text-5xl">
              Practice without pressure. Grow without the grind.
            </h3>
            <h4 className="w-7/12 text-center font-[Quicksand] sm:text-xl md:text-2xl lg:text-3xl">
              GreenSprout helps you master the technical hurdles for the tech
              industry's most in-demand roles
            </h4>
            <div className="flex w-full gap-8 md:gap-16">
              <div className="flex flex-col gap-4">
                <h5 className="text-sm font-semibold md:text-base">
                  CALM, REPETITIVE LEARNING
                </h5>
                <p className="font-[Quicksand] text-sm md:text-base">
                  Practice your skills knowledge with trivia questions tailored
                  to your desired tech role.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-sm font-semibold md:text-base">
                  INSTANT FEEDBACK
                </h5>
                <p className="font-[Quicksand] text-sm md:text-base">
                  This is not your average quiz. We help you turn "I don't know"
                  into "I got this", no stress necessary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
