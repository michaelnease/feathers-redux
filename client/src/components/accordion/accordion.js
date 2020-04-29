import React, { useState, useEffect } from 'react';
import './accordion.css';

const style = {
  large: {
    height: 210,
  },
  medium: {
    height: 140,
  },
  small: {
    height: 70,
  },
};

export const AccordionFull = ({ children }) => {
  return <div className="full">{children}</div>;
};

export const AccordionSummary = ({ children }) => {
  return <div className="summary">{children}</div>;
};

export const AccordionDivider = () => {
  return <div className="divider" />;
};

export const AccordionPanel = ({ children }) => {
  return <div className="accordion-panel">{children}</div>;
};

const Panel = ({ render, active, activeBgColor, bgColor, currentPanel, setActiveIndex }) => {
  return (
    <div
      className={`panel ${active && 'active'}`}
      style={{ backgroundColor: active ? activeBgColor : bgColor }}
      onClick={() => setActiveIndex(currentPanel)}
    >
      {render}
    </div>
  );
};

export const Accordion = ({ children, size }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    for (let i in children) {
      if (children[i].props.active) setActiveIndex(parseInt(i));
    }
  }, []);

  return (
    <div className="accordion" style={style[size]}>
      {children.map((panel, i) => (
        <Panel
          key={i}
          render={panel}
          active={activeIndex === i}
          activeBgColor={children[i].props.activeBgColor}
          bgColor={children[i].props.bgColor}
          currentPanel={i}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
  );
};
