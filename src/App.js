import React, { useState, useEffect } from 'react';
import './App.css';
import Panel from './components/Panel/Panel'
import Sidebar from './components/Sidebar/Sidebar';
import SelectedSkills from './components/SelectedSkills/SelectedSkills';
import SetBuilder from './components/SetBuilder/SetBuilder';

function App() {
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [armorData, setArmorData] = useState([]);

    useEffect(() => {
        fetch('/data/skills.json') // Load all skills
            .then(response => response.json())
            .then(data => setSkills(data.map(skill => ({ ...skill, selected: false }))))
            .catch(error => console.error('Error fetching skills:', error));
        
        fetch('/data/armor.json') // Load armor data
            .then(response => response.json())
            .then(data => setArmorData(data))
            .catch(error => console.error('Error fetching armor data:', error));
    }, []);

    const handleSkillSelect = (skill) => {
        const updatedSkills = skills.map(s =>
            s.name === skill.name ? { ...s, selected: !s.selected } : s
        );
        setSkills(updatedSkills);
        setSelectedSkills(updatedSkills.filter(s => s.selected));
    };

    return (
        <div className="App">
            <Sidebar skills={skills} onSkillSelect={handleSkillSelect} />
            <div className="content">
                <div className="main-content">
                    <Panel className="">
                        <SelectedSkills selectedSkills={selectedSkills} armorData={armorData} />
                    </Panel>
                    <Panel className="">
                        <SetBuilder armorData={armorData} selectedSkills={selectedSkills} skills={skills}/>
                    </Panel>
                </div>
            </div>
        </div>
    );
}

export default App;
