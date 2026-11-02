"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className = "",
  rotate = "",
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    orange: "bg-amber-50/90 dark:bg-amber-500/10",
    blue: "bg-blue-50/90 dark:bg-blue-500/10",
    purple: "bg-indigo-50/90 dark:bg-indigo-500/10",
  };
  const defaultTextColors = {
    orange: "text-amber-600 dark:text-amber-400",
    blue: "text-[#1E40AF] dark:text-[#60A5FA]",
    purple: "text-indigo-600 dark:text-indigo-400",
  };
  const defaultBorderColors = {
    orange: "border-amber-200/80 dark:border-amber-500/25",
    blue: "border-blue-200/80 dark:border-blue-500/25",
    purple: "border-indigo-200/80 dark:border-indigo-500/25",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <div
      className={`relative w-full max-w-sm mx-auto md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="bg-white dark:bg-[#121B2B] p-2.5 rounded-[25px] shadow-[0px_10px_25px_0px_rgba(30,64,175,0.08)] dark:shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
        <Pin className={`w-8 h-8 ${textColor} z-20 mb-5 mx-auto drop-shadow-sm`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[18px] p-5 h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className={`${textColor} text-4xl font-extrabold mb-4 select-none tracking-tight`}
            style={{
              fontFamily: '"Comic Sans MS", "Chalkboard SE", "Caveat", cursive, sans-serif',
            }}
          >
            {number}
          </span>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-slate-100 leading-snug mb-2">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-[6deg]" },
  {
    className: "md:absolute md:top-[120px] md:right-[15%]",
    rotate: "-rotate-[6deg]",
  },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-[6deg]" },
  {
    className: "md:absolute md:top-[570px] md:right-[10%]",
    rotate: "-rotate-[6deg]",
  },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-[6deg]" },
];

export default function HowItWorks({
  features,
  className = "",
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Discover Local Drives",
      description:
        "Browse verified community initiatives across Dhaka—from winter clothing distributions in Mirpur to urban greening at Ramna.",
      colorTheme: "blue",
    },
    {
      title: "Instant 1-Click RSVP",
      description:
        "No tedious paperwork. Confirm your attendance in a second and lock in your volunteer slot with automated calendar sync.",
      colorTheme: "orange",
    },
    {
      title: "Mobilize On-Ground",
      description:
        "Meet fellow changemakers at the reporting hub with real-time briefing and coordination from verified community leads.",
      colorTheme: "blue",
    },
    {
      title: "Track Social Footprint",
      description:
        "Monitor your attended drives, total volunteer hours contributed, and community milestones directly in your live dashboard.",
      colorTheme: "purple",
    },
    {
      title: "Earn Verified Pass",
      description:
        "Receive an official printable credential stamped with your verified community service hours for CV and social proof.",
      colorTheme: "orange",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else height = 1130;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`bg-transparent max-md:pt-6 max-md:pb-16 md:py-16 px-4 sm:px-8 relative ${className}`}
      >
        
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]"
          style={{
            backgroundImage: "linear-gradient(#1E40AF 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 290 150 C 500 150, 550 270, 710 270";
                    if (index === 1)
                      return acc + " C 850 270, 500 350, 290 450";
                    if (index === 2)
                      return acc + " C 290 600, 550 720, 750 720";
                    if (index === 3)
                      return acc + " C 950 720, 500 800, 290 850";
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-blue-300/80 dark:text-blue-600/50"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colorTheme={step.colorTheme || "blue"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

