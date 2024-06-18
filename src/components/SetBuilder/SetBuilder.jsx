import React from 'react';
import './SetBuilder.css';

const SetBuilder = ({ armorData, selectedSkills }) => {
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
                                    if (skillLevels[skill.name]) {
                                        skillLevels[skill.name] += skill.level;
                                    } else {
                                        skillLevels[skill.name] = skill.level;
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

    const buildSkillBars = (level, limit) => {
        const bars = [];
        for (let i = 1; i <= (limit || 0); i++) {
            if (i <= level) {
                bars.push(<div key={i} className="skill-bar full"></div>);
            } else {
                bars.push(<div key={i} className="skill-bar empty"></div>);
            }
        }
        return bars;
    };

    const armorSet = buildArmorSet(armorData, selectedSkills);
    const skillLevels = calculateSkills(armorSet, armorData);

    return (
        <div className="set-builder-panel">
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
                {Object.keys(skillLevels).map(skill => (
                    <li key={skill}>
                        <strong>{skill}:</strong>
                        <div className="skill-bars">
                            {buildSkillBars(skillLevels[skill], selectedSkills.find(s => s.name === skill)?.limit)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SetBuilder;
