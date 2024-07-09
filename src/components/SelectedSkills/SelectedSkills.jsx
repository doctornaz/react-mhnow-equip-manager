import React from 'react';
import './SelectedSkills.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';

import renderSlotIcon from '../utils/armor-icons';


const SelectedSkills = ({ selectedSkills, armorData }) => {
    // Slot order
    const slotOrder = ['Head', 'Torso', 'Arms', 'Waist', 'Legs'];

    // Function to filter and sort armor data based on selected skills
    const getMatchingArmor = (skillName) => {
        if (!armorData) return []; // Return empty array if armorData is undefined
        let matchingArmor = [];

        // Loop through each armor set
        armorData.forEach((armorSet) => {
            Object.keys(armorSet).forEach((setName) => {
                const armorPieces = armorSet[setName];
                // Loop through each armor piece in the set
                armorPieces.forEach((armorPiece) => {
                    // Check if the armor piece has the selected skill
                    const matchingSkill = armorPiece.skills.find((skill) => skill.name === skillName);
                    if (matchingSkill) {
                        matchingArmor.push({
                            setName: setName,
                            name: armorPiece.name,
                            level: matchingSkill.level,
                            slot: armorPiece.slot // Include armor slot for reference
                        });
                    }
                });
            });
        });

        // Sort armor pieces by slot order and then by level (highest to lowest)
        return matchingArmor.sort((a, b) => {
            const slotComparison = slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot);
            if (slotComparison === 0) {
                return b.level - a.level;
            }
            return slotComparison;
        });
    };

    return (
        <Panel className="">
            <h3>Selected Skills:</h3>
            {selectedSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                    <strong>{skill.name}:</strong>
                    <span style={{ fontSize: "smaller", fontStyle: "italic" }}>
                        {skill.description}
                    </span>
                    {/* Display matching armor for each selected skill */}
                    <ul>
                        {getMatchingArmor(skill.name).map((armor, idx) => (
                            <li
                                key={idx}
                                className={''}
                            >
                                {renderSlotIcon(armor.slot)} {armor.name} 
                                <SkillBar level={armor.level} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </Panel>
    );
};

export default SelectedSkills;
