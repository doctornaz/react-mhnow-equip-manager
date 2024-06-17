import React, { useState, useEffect } from 'react';
import './SkillSearch.css';

const SkillSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [skills, setSkills] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        fetch('/data/skills.json')
            .then(response => response.json())
            .then(data => setSkills(data))
            .catch(error => console.error('Error fetching skills:', error));
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSkills([]);
        } else {
            const filtered = skills.filter(skill =>
                skill.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSkills(filtered);
        }
    }, [searchTerm, skills]);

    const handleCheckboxChange = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="skill-search-container">
            <div className="hamburger" onClick={toggleSidebar}>
                ☰
            </div>
            {showSidebar && (
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <div className="selected-skills-panel">
                        <h3>Selected Skills:</h3>
                        {selectedSkills.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <strong>{skill.name}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="results-panel">
                {filteredSkills.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => handleCheckboxChange(skill)}
                        />
                        <strong>{skill.name}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillSearch;
