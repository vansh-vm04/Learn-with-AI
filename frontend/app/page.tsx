"use client";

import { motion } from "framer-motion";
import { Book, Brain, Code, LineChart } from "lucide-react";
import RoadmapFlow from "@/components/RoadmapFlow";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LandingPage() {
  const [input, setInput] = useState("");
  const [roadmapData, setRoadmapData] = useState();
  const [loading,setLoading] = useState(false);

  const fetchRoadmap = async () => {
    try {
      setLoading(true)
      const toastId = toast.loading("Generating Roadmap");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/roadmap`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: input }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.content.error) {
        toast.update(toastId, {
          render: "Please learn something good",
          type: "warning",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      } else {
        toast.update(toastId, {
          render: "Roadmap Generated",
          type: "success",
          autoClose: 1000,
          isLoading: false,
        });
      }

      setRoadmapData(data.content);
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (input.trim()) {
      fetchRoadmap();
    } else {
      toast.error("Please enter something to learn");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-400 via-blue-600 to-blue-500 w-full overflow-hidden flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
        className="flex min-h-screen relative flex-col gap-4 h-screen justify-center items-center"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-20 left-20 text-blue-400"
        >
          <Book size={40} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute bottom-20 right-20 text-green-400"
        >
          <Brain size={40} />
        </motion.div>

        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-40 right-40 text-yellow-400"
        >
          <LineChart size={40} />
        </motion.div>

        <motion.div
          animate={{ x: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute bottom-40 left-40 text-purple-400"
        >
          <Code size={40} />
        </motion.div>
        <span className="text-5xl font-extrabold mb-6 text-white">
          Generate Your Learning Roadmap
        </span>
        <p className="text-lg text-gray-300 mb-8">
          Enter what you want to learn, and get a personalized roadmap with
          resources.
        </p>
        <div className="flex gap-4">
          <div className="brutalist-container">
            <label htmlFor="topic" className="brutalist-label">
              I want to learn
            </label>
            <input
              id="topic"
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="e.g. Machine Learning"
              className="brutalist-input smooth-type"
            />
          </div>
          <button disabled={loading} onClick={handleGenerate} className="comic-button">
            Generate
          </button>
        </div>
      </motion.div>
      <div className="w-full max-w-6xl px-6">
        {roadmapData && <RoadmapFlow roadmapData={roadmapData} />}
      </div>
    </div>
  );
}
