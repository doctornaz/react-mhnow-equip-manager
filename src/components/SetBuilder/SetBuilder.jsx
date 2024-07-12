import React from 'react';
import './SetBuilder.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';
import renderSlotIcon from '../utils/armor-icons';
import { findSkillLimit, buildArmorSet, calculateSkills } from './skills';

const SetBuilder = ({ armorData, selectedSkills, skills }) => {
    
    const armorSet = buildArmorSet(armorData, selectedSkills);
    const skillLevels = calculateSkills(armorSet, armorData, skills);
    const uniqueSkills = [...new Set(Object.keys(skillLevels)
        .concat(selectedSkills.filter(skill => skillLevels[skill.name] !== undefined)
        .map(skill => skill.name)))];

    return (
        <Panel className="set-builder-panel">
            <div className="content-wrapper">
                <div className="armor-set-container">
                    <h3>Armor Set</h3>
                    <ul>
                        {console.log(armorSet)}
                        {Object.keys(armorSet).map(slot => (
                            <li key={slot.name}>
                                {renderSlotIcon(slot)} {armorSet[slot]}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="skills-container">
                    <h3>Skills</h3>
                    <ul>
                        {uniqueSkills.map(skill => (
                            <li key={skill}>
                                <strong>{skill}</strong>
                                <SkillBar level={skillLevels[skill]} limit={findSkillLimit(skill, skills)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Panel>
    );
};

export default SetBuilder;
