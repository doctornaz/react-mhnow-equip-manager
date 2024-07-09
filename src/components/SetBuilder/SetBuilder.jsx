import React from 'react';
import './SetBuilder.css';
import Panel from '../Panel/Panel';
import SkillBar from '../SkillBar/SkillBar';

// Import slot-specific icon components
import HeadArmorSlotIcon from '../icons/hunter/Head/HeadArmorSlotIcon';
import TorsoArmorSlotIcon from '../icons/hunter/Torso/TorsoArmorSlotIcon';
import ArmsArmorSlotIcon from '../icons/hunter/Arms/ArmsArmorSlotIcon';
import WaistArmorSlotIcon from '../icons/hunter/Waist/WaistArmorSlotIcon';
import LegsArmorSlotIcon from '../icons/hunter/Legs/LegsArmorSlotIcon';

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

    const renderSlotIcon = (slot) => {
        switch (slot) {
            case 'Head':
                return <HeadArmorSlotIcon rank={10} size={16} />;
            case 'Torso':
                return <TorsoArmorSlotIcon rank={10} size={16} />;
            case 'Arms':
                return <ArmsArmorSlotIcon rank={10} size={16} />;
            case 'Waist':
                return <WaistArmorSlotIcon rank={10} size={16} />;
            case 'Legs':
                return <LegsArmorSlotIcon rank={10} size={16} />;
            default:
                return null;
        }
    };

    const armorSet = buildArmorSet(armorData, selectedSkills);
    const skillLevels = calculateSkills(armorSet, armorData);

    // Get all unique skills from the armor set
    const uniqueSkills = [...new Set(Object.keys(skillLevels)
        .concat(selectedSkills.filter(skill => skillLevels[skill.name] !== undefined)
        .map(skill => skill.name)))];
        
    return (
        <Panel className="set-builder-panel">
            <div className="armor-set-container">
                <h3>Armor Set</h3>
                <ul>
                    {Object.keys(armorSet).map(slot => (
                        <li key={slot}>
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
                            <SkillBar level={skillLevels[skill]} limit={findSkillLimit(skill)} />
                        </li>
                    ))}
                </ul>
            </div>
        </Panel>
    );
};

export default SetBuilder;
