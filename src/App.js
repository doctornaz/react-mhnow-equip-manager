import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import SelectedSkills from './components/SelectedSkills/SelectedSkills';
import SetBuilder from './components/SetBuilder/SetBuilder';
import './App.css';

function App() {
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [armorData, setArmorData] = useState([]);

    useEffect(() => {
        fetch('/data/skills.json') // Load all skills
            .then(response => response.json())
            .then(data => {
                // Sort skills by name
                const sortedSkills = data.sort((a, b) => a.name.localeCompare(b.name));
                // Set sorted skills to state
                setSkills(sortedSkills.map(skill => ({ ...skill, selected: false })));
            })
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
                <SelectedSkills armorData={armorData} selectedSkills={selectedSkills} />
                <SetBuilder armorData={armorData} selectedSkills={selectedSkills} skills={skills}/>
            </div>
        </div>
    );
}

export default App;
