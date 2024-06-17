import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ skills, onSkillSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);

    useEffect(() => {
        setFilteredSkills(
            skills.filter(skill =>
                skill.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, skills]);

    const handleCheckboxChange = (skill) => {
        onSkillSelect(skill);
    };

    return (
        <div className="sidebar">
            <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="sidebar-content">
                <div className="filtered-skills">
                    {filteredSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <input
                                type="checkbox"
                                checked={skill.selected}
                                onChange={() => handleCheckboxChange(skill)}
                            />
                            <strong>{skill.name}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
