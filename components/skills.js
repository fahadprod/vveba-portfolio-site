'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    id: null,
    name: '',
    percentage: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/skills');
      setSkills(response.data);
    } catch (err) {
      setError('Failed to load skills');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openModal = (skill = null) => {
    setCurrentSkill(skill ? { ...skill } : {
      id: null,
      name: '',
      percentage: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const normalizedPercentage = currentSkill.percentage.endsWith('%')
        ? currentSkill.percentage
        : `${currentSkill.percentage}%`;

      if (currentSkill.id) {
        // Update existing skill using PATCH
        await axios.patch(`http://localhost:3001/skills/${currentSkill.id}`, {
          ...currentSkill,
          percentage: normalizedPercentage
        });
      } else {
        // Create new skill - exclude ID from payload
        const { id, ...newSkill } = currentSkill;
        await axios.post('http://localhost:3001/skills', {
          ...newSkill,
          percentage: normalizedPercentage
        });
      }
      await fetchSkills();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save skill');
      console.error('Save error:', err);
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await axios.delete(`http://localhost:3001/skills/${id}`);
      // Optimistic update
      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
    } catch (err) {
      if (err.response?.status === 404) {
        await fetchSkills();
      } else {
        setError('Failed to delete skill');
        console.error('Delete error:', err);
      }
    }
  };

  if (isLoading) return <div className="loading">Loading skills...</div>;

  return (
    <section className="skills">
      <h1 className="section-bg-heading">My Skills</h1>
      <h1 className="section-heading">Professional Skills</h1>
      <h3 className="sub-heading">My <span>Skills</span></h3>
      <div className="section-border"></div>

      <button onClick={() => openModal()} className="add-skill-btn">
        <Plus size={20} /> Add New Skill
      </button>

      {error && <div className="error-message">{error}</div>}

      <div className="skills-cards">
        {skills.map(skill => (
          <div key={skill.id} className="skills-card">
            <div className="skill-header">
              <div className="skill">
                <span>{skill.name}</span>
                <span>{skill.percentage}</span>
              </div>
              <div className="skill-actions">
                <button onClick={() => openModal(skill)} className="icon-btn">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(skill.id)} className="icon-btn">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p>{skill.description}</p>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: skill.percentage }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="skill-modal"
        overlayClassName="skill-modal-overlay"
      >
        <h2>{currentSkill.id ? 'Edit Skill' : 'Add New Skill'}</h2>
        {error && <div className="modal-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              name="name"
              value={currentSkill.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Percentage</label>
            <input
              type="number"
              name="percentage"
              min="0"
              max="100"
              step="1"
              value={currentSkill.percentage.replace('%', '')}
              onChange={handleInputChange}
              placeholder="e.g., 85"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={currentSkill.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={closeModal}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </section>
  );
}