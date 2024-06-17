import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'; // Updated import path

function App() {
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => {
        fetch('/data/skills.json')
            .then(response => response.json())
            .then(data => setSkills(data.map(skill => ({ ...skill, selected: false }))))
            .catch(error => console.error('Error fetching skills:', error));
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
            <div className="content">
                {/* <header className="App-header">
                    <h1>Welcome to Skill Search</h1>
                </header> */}
                <Sidebar skills={skills} onSkillSelect={handleSkillSelect} />
                {/* <div className="selected-skills-panel">
                    <h3>Selected Skills:</h3>
                    {selectedSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <strong>{skill.name}</strong>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export default App;
