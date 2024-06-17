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

    const armorSet = buildArmorSet(armorData, selectedSkills);

    return (
        <div className="set-builder">
            <h2>Armor Set</h2>
            <ul>
                {Object.keys(armorSet).map(slot => (
                    <li key={slot}>
                        <strong>{slot}:</strong> {armorSet[slot]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SetBuilder;
