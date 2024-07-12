
import { slotOrder } from '../constants/consts';

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

/// Find a skill given it's skillName in a list of allSkills
// export const findSkillLimit = (skillName, listOfSkills) => {
//     const skillFromState = listOfSkills.find(skill => skill.name === skillName);
//     return skillFromState ? skillFromState.limit : 0;
// };

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
