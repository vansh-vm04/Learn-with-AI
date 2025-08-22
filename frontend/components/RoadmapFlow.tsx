"use client";

import { useEffect, useRef } from "react";
import { colors } from "@/constants/colors";
import { motion } from "framer-motion";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  resources: { title: string; url: string }[];
  prerequisites: string[];
}

interface RoadmapResponse {
  roadmapTitle: string;
  roadmap: RoadmapNode[];
}

export default function Roadmap({
  roadmapData,
}: {
  roadmapData: RoadmapResponse;
}) {
  const roadmapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    roadmapRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roadmapData]);

  if (!roadmapData) return null;

  return (
    <div ref={roadmapRef} className="flex flex-col items-center space-y-8 p-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-15 text-white">
        {roadmapData.roadmapTitle}
      </h2>

      <div className="flex justify-center  flex-wrap gap-8">
        {roadmapData.roadmap?.map((node, idx) => (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: idx * 0.1,
            }}
            key={node.id}
            className={`${colors[idx % 6]} brutalist-card`}
          >
            <div className="brutalist-card__header">
              <div className="brutalist-card__alert">
                Step {idx + 1}: {node.title}
              </div>
            </div>
            <div className="brutalist-card__message">{node.description}</div>
            <div className="brutalist-card__actions">
              {node.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`brutalist-card__button ${
                    i % 2 == 0
                      ? "brutalist-card__button--read"
                      : "brutalist-card__button--mark"
                  }`}
                >
                  {r.title}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
