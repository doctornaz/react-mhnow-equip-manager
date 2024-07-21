import { emptyArmorSet, slotOrder } from '../constants/consts';

// Function to filter and sort armor data based on selected skills
export const getArmorForSkill = (skillName, armorData) => {
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
    return sortArmor(matchingArmor);
};

/// Sort armor pieces by slot order and then by level (highest to lowest)
export const sortArmor = (matchingArmor) => {
    return matchingArmor.sort((a, b) => {
        const slotComparison = slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot);
        if (slotComparison === 0) {
            return b.level - a.level;
        }
        return slotComparison;
    });
}

/// Find a skill given it's skillName in a list of allSkills
export const findSkillLimit = (skillName, listOfSkills) => {
    const skillFromState = listOfSkills.find(skill => skill.name === skillName);
    return skillFromState ? skillFromState.limit : 0;
};

export const buildArmorSets = (armorData, selectedSkills, allSkills) => {
    const armorSets = [];

    selectedSkills.forEach(skill => {
        const set = emptyArmorSet;

        armorData.forEach(armorSetData => {
            Object.keys(armorSetData).forEach(setName => {
                armorSetData[setName].forEach(piece => {
                    //If piece has the skill, and slot is not occupied include i
                    if (piece.skills.some(s => s.name === skill.name) &&
                        slotOrder.includes(piece.slot) &&
                        set[piece.slot] === 'FREE SLOT'
                    ) {
                        set[piece.slot] = piece.name;
                    }
                });
            });
        });
        const skillLevels = calculateSkills(set, armorData, allSkills);
        armorSets.push({
            armorSet: set,
            skills: skillLevels
        });
    });

    return armorSets;
};

//todo remove if unused
export const buildArmorSet = (armorData, selectedSkills) => {
    const armorSet = {};

    slotOrder.forEach(slot => {
        armorSet[slot] = 'FREE SLOT';
    });

    selectedSkills.forEach(skill => {
        armorData.forEach(armorSetData => {
            Object.keys(armorSetData).forEach(setName => {
                armorSetData[setName].forEach(piece => {
                    //If piece has the skill, and slot is not occupied include i
                    if (piece.skills.some(s => s.name === skill.name) &&
                        slotOrder.includes(piece.slot) &&
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

//todo remove if unused
export const calculateSkills = (armorSet, armorData, allSkills) => {
    const skillLevels = {};

    Object.values(armorSet).forEach(pieceName => {
        if (pieceName !== 'FREE SLOT') {
            armorData.forEach(armorSetData => {
                Object.keys(armorSetData).forEach(setName => {
                    armorSetData[setName].forEach(piece => {
                        if (piece.name === pieceName) {
                            piece.skills.forEach(skill => {
                                // Check skill limit
                                const limit = findSkillLimit(skill.name, allSkills);
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

