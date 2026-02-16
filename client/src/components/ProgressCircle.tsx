const cleanPercentage = (percentage = 0) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour = "#3F3732", pct = 0 }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={colour}
      strokeWidth={"0.5rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage = 0, colour = "#3F3732" }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill={colour}
      className="font-[Quicksand] text-xl font-semibold md:text-2xl lg:text-3xl"
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const ProgressCircle = ({ percentage = 0, colour = "#3F3732" }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200} className="mx-auto">
      <g transform={`rotate(-90 ${"100 100"}) scale(1 -1) translate(0 -200)`}>
        <Circle colour="#B5838D" />
        <Circle colour={colour} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default ProgressCircle;
