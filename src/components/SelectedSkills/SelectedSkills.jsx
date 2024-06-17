import React from 'react';
import './SelectedSkills.css';

const SelectedSkills = ({ selectedSkills, armorData }) => {
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

        // Sort armor pieces by level (highest to lowest)
        return matchingArmor.sort((a, b) => b.level - a.level);
    };

    return (
        <div className="selected-skills-panel">
            <h3>Selected Skills:</h3>
            {selectedSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                    <strong>{skill.name}</strong>
                    {/* Display matching armor for each selected skill */}
                    <ul>
                        {getMatchingArmor(skill.name).map((armor, idx) => (
                            <li key={idx}>
                                {armor.name} - Level {armor.level} (Slot: {armor.slot}, Set: {armor.setName})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SelectedSkills;
