import React from 'react';

import HeadArmorSlotIcon from '../icons/hunter/Head/HeadArmorSlotIcon';
import TorsoArmorSlotIcon from '../icons/hunter/Torso/TorsoArmorSlotIcon';
import ArmsArmorSlotIcon from '../icons/hunter/Arms/ArmsArmorSlotIcon';
import WaistArmorSlotIcon from '../icons/hunter/Waist/WaistArmorSlotIcon';
import LegsArmorSlotIcon from '../icons/hunter/Legs/LegsArmorSlotIcon';

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

export default renderSlotIcon;