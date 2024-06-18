import React from 'react';
import './SkillBar.css';

const SkillBar = ({ level, limit }) => {
    const calculateBars = (level, limit) => {
        const bars = [];
        // If limit is null or 0, render full bars
        if (limit === undefined || limit === null || limit === 0) {
            for (let i = 1; i <= level; i++) {
                bars.push(<div key={i} className="skill-bar full"></div>);
            }
        } 
        else {
            for (let i = 1; i <= limit; i++) {
                if (i <= level)
                    bars.push(<div key={i} className="skill-bar full"></div>);
                else
                    bars.push(<div key={i} className="skill-bar empty"></div>);
            }
        }
        return bars;
  };

  return <div className="skill-bars inline">{calculateBars(level, limit)}</div>;
};

export default SkillBar;
