import React from 'react';
import './SetBuilder.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';
import renderSlotIcon from '../utils/armor-icons';
import { findSkillLimit, buildArmorSets } from '../utils/skills';

const SetBuilder = ({ armorData, selectedSkills, skills }) => {
    
    const armorSets = buildArmorSets(armorData, selectedSkills, skills);

    return (
        <Panel className="set-builder-panel">
            {armorSets.map((set, idx) => (
                <div key={idx} className="content-wrapper">
                    <div key={idx} className="armor-set-container">
                        <h3>Armor Set</h3>
                        <ul>
                            {Object.keys(set.armorSet).map((slot, idx) => (
                            <li key={`${slot}-${idx}`}>
                                {renderSlotIcon(slot)} 
                                {set.armorSet[slot]}
                            </li>
                            ))} 
                        </ul>
                    </div>
                    <div className="skills-container">
                        <h3>Skills</h3>
                        <ul>
                            {Object.keys(set.skills).map((skill, idx) => (
                            <li key={`${skill}-${idx}`}>
                                <strong>{skill}</strong>
                                <SkillBar level={set.skills[skill]} limit={findSkillLimit(skill, skills)} />
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </Panel>
    );
};

export default SetBuilder;
