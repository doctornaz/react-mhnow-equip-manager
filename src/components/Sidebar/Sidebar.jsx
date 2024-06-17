import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ skills, onSkillSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [unselectedSkills, setUnselectedSkills] = useState([]);

    useEffect(() => {
        // Filter skills based on search term
        const filtered = skills.filter(skill =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Separate selected and unselected skills
        const selected = [];
        const unselected = [];
        filtered.forEach(skill => {
            if (skill.selected) {
                selected.push(skill);
            } else {
                unselected.push(skill);
            }
        });

        // Update states
        setSelectedSkills(selected);
        setUnselectedSkills(unselected);
    }, [searchTerm, skills]);

    const handleCheckboxChange = (skill) => {
        // Toggle skill selection
        const updatedSkills = skills.map(s =>
            s.name === skill.name ? { ...s, selected: !s.selected } : s
        );
        onSkillSelect(skill);
        setSelectedSkills(updatedSkills.filter(s => s.selected));
        setUnselectedSkills(updatedSkills.filter(s => !s.selected));
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="sidebar">
            <div className="search-container">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                    {searchTerm && (
                        <button className="clear-button" onClick={handleClearSearch}>
                            X
                        </button>
                    )}
                </div>
            </div>
            <div className="sidebar-content">
                <div className="filtered-skills">
                    {/* Display selected skills */}
                    {selectedSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <input
                                type="checkbox"
                                checked={skill.selected}
                                onChange={() => handleCheckboxChange(skill)}
                            />
                            <strong>{skill.name}</strong>
                        </div>
                    ))}
                    {/* Display unselected skills */}
                    {unselectedSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <input
                                type="checkbox"
                                checked={skill.selected}
                                onChange={() => handleCheckboxChange(skill)}
                            />
                            <span>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
