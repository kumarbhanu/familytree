import React, { useState } from "react";
import { ChevronDown, ChevronRight, User } from "lucide-react";

const levelColors = [
  "bg-red-500", // Great Grandfather
  "bg-blue-500", // Grandfather
  "bg-green-500", // Father
  "bg-purple-500", // Uncle
  "bg-yellow-500", // Grand-Uncle
  "bg-pink-500", // Son
  "bg-teal-500" // Cousin
];

const bgGradientColors = [
  "bg-gradient-to-r from-red-500 to-red-300", // Great Grandfather
  "bg-gradient-to-r from-blue-500 to-blue-300", // Grandfather
  "bg-gradient-to-r from-green-500 to-green-300", // Father
  "bg-gradient-to-r from-purple-500 to-purple-300", // Uncle
  "bg-gradient-to-r from-yellow-500 to-yellow-300", // Grand-Uncle
  "bg-gradient-to-r from-pink-500 to-pink-300", // Son
  "bg-gradient-to-r from-teal-500 to-teal-300" // Cousin
];

const getRelation = (level) => {
  const relations = ["Great Grandfather", "Grandfather", "Father", "Uncle", "Grand-Uncle", "Son", "Cousin"];
  return relations[level] || "Relative";
};

const FamilyMember = ({ member, parentName = "", level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const relation = member.relation || getRelation(level);
  const bgColor = levelColors[level] || "bg-gray-500";
  const bgGradient = bgGradientColors[level] || "bg-gray-500";
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="mt-4 border-l-4 border-gray-300 pl-6">
      <div
        className={`flex items-center gap-4 cursor-pointer p-4 rounded-xl shadow-lg hover:shadow-2xl transition ${bgGradient} text-white`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />) : <User size={24} />}
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{member.name}</p>
          <span className="text-sm bg-white text-gray-900 px-3 py-1 rounded-full shadow">
            {relation} {hasChildren && ` | ${member.children.length} Children`}
          </span>
          {parentName && <span className="text-xs text-gray-200">Son of {parentName}</span>}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2">
          {member.children?.map((child) => (
            <FamilyMember key={child.id} member={child} parentName={member.name} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FamilyTree = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-xl shadow-2xl bg-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">📜 Family Tree</h2>
      <FamilyMember member={data} />
    </div>
  );
};

export default FamilyTree;
