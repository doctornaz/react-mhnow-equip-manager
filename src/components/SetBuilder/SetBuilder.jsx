import React from 'react';
import './SetBuilder.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';

const SetBuilder = ({ armorData, selectedSkills, skills }) => {
    const buildArmorSet = (armorData, selectedSkills) => {
        const slots = ['Head', 'Torso', 'Arms', 'Waist', 'Legs'];
        const armorSet = {};

        slots.forEach(slot => {
            armorSet[slot] = 'FREE SLOT';
        });

        selectedSkills.forEach(skill => {
            armorData.forEach(armorSetData => {
                Object.keys(armorSetData).forEach(setName => {
                    armorSetData[setName].forEach(piece => {
                        if (
                            piece.skills.some(s => s.name === skill.name) &&
                            slots.includes(piece.slot) &&
                            armorSet[piece.slot] === 'FREE SLOT'
                        ) {
                            armorSet[piece.slot] = piece.name;
                        }
                    });
                });
            });
        });

        return armorSet;
    };

    const calculateSkills = (armorSet, armorData) => {
        const skillLevels = {};

        Object.values(armorSet).forEach(pieceName => {
            if (pieceName !== 'FREE SLOT') {
                armorData.forEach(armorSetData => {
                    Object.keys(armorSetData).forEach(setName => {
                        armorSetData[setName].forEach(piece => {
                            if (piece.name === pieceName) {
                                piece.skills.forEach(skill => {
                                    // Check skill limit
                                    const limit = findSkillLimit(skill.name);
                                    if (skillLevels[skill.name]) {
                                        // Prevent exceeding skill limit
                                        skillLevels[skill.name] = Math.min(skillLevels[skill.name] + skill.level, limit);
                                    } else {
                                        skillLevels[skill.name] = Math.min(skill.level, limit);
                                    }
                                });
                            }
                        });
                    });
                });
            }
        });

        return skillLevels;
    };

    const findSkillLimit = (skillName) => {
        const selectedSkill = selectedSkills.find(skill => skill.name === skillName);
        if (selectedSkill) {
            return selectedSkill.limit;
        } else {
            const skillFromState = skills.find(skill => skill.name === skillName);
            return skillFromState ? skillFromState.limit : 0;
        }
    };

    const armorSet = buildArmorSet(armorData, selectedSkills);
    const skillLevels = calculateSkills(armorSet, armorData);

    // Get all unique skills from the armor set
    const uniqueSkills = [...new Set(Object.keys(skillLevels).concat(selectedSkills.map(skill => skill.name)))];

    return (
        <Panel className="">
            <h2>Armor Set</h2>
            <ul>
                {Object.keys(armorSet).map(slot => (
                    <li key={slot}>
                        <strong>{slot}:</strong> {armorSet[slot]}
                    </li>
                ))}
            </ul>
            <h2>Skills</h2>
            <ul>
                {uniqueSkills.map(skill => (
                    <li key={skill}>
                        <strong>{skill}:</strong>
                        <SkillBar level={skillLevels[skill]} limit={findSkillLimit(skill)} />
                    </li>
                ))}
            </ul>
        </Panel>
    );
};

export default SetBuilder;
