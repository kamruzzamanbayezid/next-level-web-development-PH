import Link from "next/link";
import React from "react";

const PracticeLayout = ({
  cricketGroup,
  footballGroup,
}: {
  cricketGroup: React.ReactNode;
  footballGroup: React.ReactNode;
}) => {
  const navLinks = [
    { id: 1, name: "Television", path: "/television" },
    { id: 2, name: "Cricket", path: "/cricket" },
    { id: 3, name: "BPL", path: "/cricket/bpl" },
    { id: 4, name: "Football", path: "/football" },
    { id: 5, name: "Badminton", path: "/badminton" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Basic Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f4f4f4",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2 style={{ margin: 0, color: "black", fontWeight: "bold" }}>
          Practice
        </h2>

        {/* Simple UL for Navigation */}
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "20px",
          }}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.path}
                style={{
                  textDecoration: "none",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      {/* Parallel Routes */}
      <div className="flex gap-5 p-5">
        <div className="w-full">{cricketGroup}</div>
        <div className="w-full">{footballGroup}</div>
      </div>
    </div>
  );
};

export default PracticeLayout;
