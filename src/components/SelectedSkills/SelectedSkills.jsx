import React from 'react';
import './SelectedSkills.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';

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

    // Function to calculate bars based on skill level
    const calculateBars = (level) => {
        const bars = [];
        for (let i = 1; i <= level; i++) {
            bars.push(<div key={i} className="skill-bar full"></div>);
        }
        return bars;
    };

    // Function to find the best armor combination for all selected skills
    const findBestArmor = () => {
        const skillLevels = {}; // Object to store total skill levels
        selectedSkills.forEach((skill) => {
            skillLevels[skill.name] = 0; // Initialize skill levels
        });

        // Calculate total skill levels from selected skills
        selectedSkills.forEach((skill) => {
            getMatchingArmor(skill.name).forEach((armor) => {
                skillLevels[skill.name] += armor.level;
            });
        });

        // Find the maximum total skill level among selected skills
        let maxTotal = 0;
        Object.values(skillLevels).forEach((level) => {
            if (level > maxTotal) {
                maxTotal = level;
            }
        });

        // Filter armor pieces that contribute to the maximum total skill level
        const bestArmor = {};
        selectedSkills.forEach((skill) => {
            bestArmor[skill.name] = getMatchingArmor(skill.name).filter((armor) => armor.level === maxTotal);
        });

        return bestArmor;
    };

    const bestArmor = findBestArmor();

    return (
        <Panel>
            <h3>Selected Skills:</h3>
            {selectedSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                    <strong>{skill.name}:</strong>
                    <span style={{fontSize: "smaller", fontStyle: "italic"}}>
                        {skill.description}
                    </span>
                    {/* Display matching armor for each selected skill */}
                    <ul>
                        {getMatchingArmor(skill.name).map((armor, idx) => (
                            <li
                                key={idx}
                                className={
                                    bestArmor[skill.name]?.find((a) => a.name === armor.name)
                                        ? 'best-armor'
                                        : ''
                                }
                            >
                                {armor.slot}: {armor.name} 
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
