import React from "react";
import "./style/LogoStrip.css";

// Import logos
import logo1 from "../assets/logos/logo1.jpeg";
import logo2 from "../assets/logos/logo2.jpeg";
import logo3 from "../assets/logos/logo3.jpeg";
import logo4 from "../assets/logos/logo4.jpeg";
import logo5 from "../assets/logos/logo5.jpeg";
import logo6 from "../assets/logos/logo6.jpeg";
import logo7 from "../assets/logos/logo7.jpeg";
import logo8 from "../assets/logos/logo8.jpeg";
import logo9 from "../assets/logos/logo9.jpeg";
import logo10 from "../assets/logos/logo10.jpeg";
import logo11 from "../assets/logos/logo11.jpeg";
import logo12 from "../assets/logos/logo1.jpeg";

// First row logos (6 logos)
const row1Logos = [
  { name: "Logo 1", image: logo1 },
  { name: "Logo 2", image: logo2 },
  { name: "Logo 3", image: logo3 },
  { name: "Logo 4", image: logo4 },
  { name: "Logo 5", image: logo5 },
  { name: "Logo 6", image: logo6 },
];

// Second row logos (same 6 logos repeated)
const row2Logos = [
  { name: "Logo 7", image: logo7 },
  { name: "Logo 8", image: logo8 },
  { name: "Logo 9", image: logo9 },
  { name: "Logo 10", image: logo10 },
  { name: "Logo 11", image: logo11 },
  { name: "Logo 12", image: logo12 },
];

// Create double arrays for infinite scroll
const allRow1 = [...row1Logos, ...row1Logos];
const allRow2 = [...row2Logos, ...row2Logos];

function Strip({ items, reverse }) {
  return (
    <div className="ls__row">
      <div className={`ls__inner ${reverse ? "ls__inner--reverse" : ""}`}>
        {items.map((logo, i) => (
          <div key={i} className="ls__item">
            <div className="ls__logo-container">
              <img 
                src={logo.image} 
                alt={logo.name}
                className="ls__logo-img"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoStrip() {
  return (
    <section className="ls">
      <div className="ls__wrap">
        <div className="ls__fade ls__fade--left" />
        <Strip items={allRow1} reverse={false} />
        <Strip items={allRow2} reverse={true} />
        <div className="ls__fade ls__fade--right" />
      </div>
    </section>
  );
}