import React from 'react';
import './SelectedSkills.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';

import renderSlotIcon from '../utils/armor-icons';
import { getArmorForSkill } from '../utils/skills';

const SelectedSkills = ({ selectedSkills, armorData }) => {
    return (
        <Panel className="">
            <h3>Selected Skills:</h3>
            {selectedSkills.map((skill, index) => (
                <SkillListing key={index} skill={skill} armorData={armorData} />
            ))}
        </Panel>
    );
};

const SkillListing = ({ skill, armorData }) => {
    return (
        <div className="skill-item">
            <strong>{skill.name}:</strong>
            <span className="skill-description">{skill.description}</span>
            {/* Display matching armor for each selected skill */}
            <ul>
                {getArmorForSkill(skill.name, armorData).map((armor, idx) => (
                    <li key={idx} className={''}>
                        {renderSlotIcon(armor.slot)} {armor.name} 
                        <SkillBar level={armor.level} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectedSkills;
