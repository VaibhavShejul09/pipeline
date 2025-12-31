import { useState } from "react";

export default function TestCasePanel({ testCases = [], output }) {
  const [activeTab, setActiveTab] = useState("testcase");
  const [activeCase, setActiveCase] = useState(0);

  const current = testCases[activeCase] || {};
  const inputs = current.inputs || {};

  return (
    <div className="border-t border-gray-700 bg-[#1e1e1e] text-gray-200">
      {/* Tabs */}
      <div className="flex gap-6 px-4 py-2 border-b border-gray-700">
        {["testcase", "output"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${
              activeTab === tab
                ? "border-b-2 border-green-500 text-white"
                : "text-gray-400"
            }`}
          >
            {tab === "testcase" ? "Test Case" : "Output"}
          </button>
        ))}
      </div>

      {/* Case selector */}
      {activeTab === "testcase" && (
        <div className="flex gap-2 px-4 py-2 border-b border-gray-700">
          {testCases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCase(idx)}
              className={`px-3 py-1 text-sm rounded ${
                activeCase === idx
                  ? "bg-[#2d2d2d] text-white"
                  : "text-gray-400 hover:bg-[#2d2d2d]"
              }`}
            >
              Case {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-4 h-40 overflow-y-auto">
        {activeTab === "testcase" && (
          <>
            {Object.entries(inputs).map(([key, value]) => (
              <div key={key} className="flex gap-2 mb-2">
                <span className="text-gray-400">{key} =</span>
                <input
                  value={value}
                  disabled
                  className="flex-1 px-3 py-1 rounded bg-[#1a1a1a] text-gray-400 cursor-not-allowed"
                />
              </div>
            ))}

            {Object.keys(inputs).length === 0 && (
              <p className="text-gray-500 text-sm">
                No sample test cases
              </p>
            )}

            <p className="text-xs text-gray-500 mt-2">
              Sample test cases are read-only
            </p>
          </>
        )}

        {activeTab === "output" && (
          <pre className="text-green-400 text-sm whitespace-pre-wrap">
            {output || "Run the code to see output"}
          </pre>
        )}
      </div>
    </div>
  );
}
