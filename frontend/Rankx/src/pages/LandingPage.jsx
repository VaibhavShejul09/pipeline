import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function LandingPage() {
  return (
    <div className="bg-[#020617] text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-[#020617]/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              DevLearn
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              Beta
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-slate-300">
            <a href="#courses" className="hover:text-white">Courses</a>
            <a href="#labs" className="hover:text-white">Labs</a>
            <a href="#dsa" className="hover:text-white">DSA</a>
            <a href="#paths" className="hover:text-white">Paths</a>
          </div>

          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 blur-3xl" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center"
        >
          {/* Left */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Learn <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">DSA</span>,  
              <br />
              Master <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">DevOps</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              A complete learning platform with video courses, LeetCode-style DSA problems, and
              real Docker & Kubernetes labs — inspired by KodeKloud.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-2xl font-bold hover:scale-[1.05] transition">
                Start Learning Free
              </button>
              <button className="border border-slate-700 px-8 py-4 rounded-2xl text-slate-300 hover:bg-slate-900">
                Try a Lab
              </button>
            </div>

            <div className="mt-8 flex gap-6 text-sm text-slate-400">
              <span>✔ No setup required</span>
              <span>✔ Real environments</span>
              <span>✔ Career focused</span>
            </div>
          </div>

          {/* Right – Terminal */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black/70 border border-slate-800 rounded-3xl p-6 shadow-2xl"
          >
            <pre className="text-green-400 text-sm leading-relaxed font-mono">
$ docker build -t backend-app .{"\n"}
$ docker run -d backend-app{"\n"}
$ kubectl apply -f deployment.yaml{"\n"}
✔ Pod running successfully
            </pre>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-y border-slate-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            ["500+", "DSA Problems"],
            ["120+", "Docker & K8s Labs"],
            ["60+", "Video Courses"],
            ["Job Ready", "Learning Paths"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="text-slate-400 mt-2">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LEARNING FLOW ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Learn → Practice → Apply → Master
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {["Video Courses", "Hands-on Labs", "DSA Practice", "Career Readiness"].map(step => (
            <motion.div
              key={step}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-slate-800 rounded-2xl p-6 text-center"
            >
              <h3 className="font-semibold">{step}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= COURSES ================= */}
      {/* (UNCHANGED CONTENT – only animation added) */}
      <section id="courses" className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-extrabold mb-12">
          🎥 Structured Video Courses
        </h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            "DSA for Beginners",
            "Advanced DSA Patterns",
            "Docker Zero to Hero",
            "Kubernetes for Developers",
            "Backend Engineering",
            "System Design Basics",
          ].map(course => (
            <motion.div
              key={course}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="bg-white/5 backdrop-blur border border-slate-800 rounded-3xl p-6 hover:border-green-400 transition"
            >
              <h3 className="text-lg font-semibold">{course}</h3>
              <p className="text-slate-400 text-sm mt-2">
                Video • Practice • Quizzes
              </p>
              <button className="mt-5 text-green-400 font-medium hover:underline">
                View Course →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= DSA GRID ================= */}
      <section id="dsa" className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-extrabold mb-12">
          🧩 DSA Problem Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Arrays", "Strings", "Linked List", "Stack", "Queue", "Tree", "Graph", "Dynamic Programming"].map(topic => (
            <div
              key={topic}
              className="bg-white/5 border border-slate-800 rounded-xl p-5 hover:border-green-400 transition"
            >
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* ================= LABS (UNCHANGED CONTENT) ================= */}
      <section id="labs" className="bg-gradient-to-br from-blue-950 to-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-extrabold mb-4">
            🧪 Hands-On Docker & Kubernetes Labs
          </h2>
          <p className="text-slate-400 max-w-2xl mb-12">
            Practice in real cloud environments with guided steps and auto-validation —
            just like KodeKloud.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Build Docker Images",
              "Container Networking",
              "Deploy Kubernetes Pods",
              "Services & Load Balancing",
              "ConfigMaps & Secrets",
              "Scaling & Rollouts",
            ].map(lab => (
              <div
                key={lab}
                className="bg-black/50 backdrop-blur border border-slate-800 rounded-3xl p-6 hover:border-blue-400 transition"
              >
                <h3 className="font-semibold">{lab}</h3>
                <p className="text-slate-400 text-sm mt-2">
                  Real Terminal · Guided · Auto-Check
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PATHS ================= */}
      <section id="paths" className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-extrabold mb-12">
          🚀 Career Learning Paths
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {["Backend Engineer Path", "DevOps Engineer Path"].map(path => (
            <div
              key={path}
              className="bg-white/5 border border-slate-800 rounded-3xl p-8"
            >
              <h3 className="text-xl font-semibold">{path}</h3>
              <p className="text-slate-400 mt-2">
                Courses → Labs → DSA → Assessments
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h2 className="text-5xl font-extrabold">
          Become a <span className="text-green-400">Job-Ready Engineer</span>
        </h2>
        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          Learn DSA, Backend, Docker & Kubernetes — all in one focused platform.
        </p>

        <button className="mt-10 bg-gradient-to-r from-green-400 to-blue-500 text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-[1.05] transition">
          Create Free Account
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 py-10 text-slate-500 text-sm flex flex-col md:flex-row justify-between gap-4">
          <span>© 2026 DevLearn</span>
          <span>Privacy · Terms · Contact</span>
        </div>
      </footer>
    </div>
  );
}
