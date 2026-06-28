import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ProfilePage({ user, logout }) {
  const [profile, setProfile] = useState(user);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    experience: user?.experience || '',
    availability: user?.availability || '20',
    lookingFor: user?.lookingFor || '',
    location: user?.location || '',
    linkedIn: user?.linkedIn || '',
    twitter: user?.twitter || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `/users/profile`,
        {
          ...formData,
          skills: formData.skills.split(',').map(s => s.trim())
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      setProfile(res.data);
      setEditing(false);
      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div>
        <Navbar user={user} logout={logout} />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        {/* Profile Header */}
        <div style={styles.header}>
          <div style={styles.profileSection}>
            <div style={styles.avatar}>
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <div style={styles.profileInfo}>
              <h1>{profile.name}</h1>
              <p style={styles.subtitle}>{profile.experience || 'Founder'}</p>
              <p style={styles.location}>📍 {profile.location || 'Not specified'}</p>
              <div style={styles.stats}>
                <div>
                  <strong>{profile.doerScore || 0}</strong>
                  <p>Doer Score</p>
                </div>
                <div>
                  <strong>{profile.matches?.length || 0}</strong>
                  <p>Matches</p>
                </div>
                <div>
                  <strong>{profile.skills?.length || 0}</strong>
                  <p>Skills</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            style={styles.editBtn}
          >
            {editing ? '✖ Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Main Content */}
        <div style={styles.grid}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            {/* Bio Section */}
            <div style={styles.section}>
              <h2>About</h2>
              {editing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  style={styles.textarea}
                />
              ) : (
                <p style={styles.bio}>{profile.bio || 'No bio added yet'}</p>
              )}
            </div>

            {/* Skills Section */}
            <div style={styles.section}>
              <h2>Skills</h2>
              {editing ? (
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Marketing (comma-separated)"
                  style={styles.input}
                />
              ) : (
                <div style={styles.skillsList}>
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, idx) => (
                      <span key={idx} style={styles.skillTag}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No skills added yet</p>
                  )}
                </div>
              )}
            </div>

            {/* Looking For Section */}
            <div style={styles.section}>
              <h2>Looking For</h2>
              {editing ? (
                <textarea
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleChange}
                  placeholder="What are you looking for in a cofounder?"
                  style={styles.textarea}
                />
              ) : (
                <p>{profile.lookingFor || 'Not specified'}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            {/* Contact Info */}
            <div style={styles.section}>
              <h2>Contact Info</h2>
              {editing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="linkedIn"
                    placeholder="LinkedIn URL"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    name="twitter"
                    placeholder="Twitter Handle"
                    value={formData.twitter}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </>
              ) : (
                <div style={styles.contactList}>
                  <p>📧 {profile.email}</p>
                  {profile.linkedIn && <p>🔗 <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
                  {profile.twitter && <p>🐦 <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer">@{profile.twitter}</a></p>}
                </div>
              )}
            </div>

            {/* Availability Section */}
            <div style={styles.section}>
              <h2>Availability</h2>
              {editing ? (
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="5">5 hours/week</option>
                  <option value="10">10 hours/week</option>
                  <option value="20">20 hours/week</option>
                  <option value="30">30 hours/week</option>
                  <option value="40">40+ hours/week</option>
                </select>
              ) : (
                <p>{formData.availability} hours/week</p>
              )}
            </div>

            {/* Experience */}
            <div style={styles.section}>
              <h2>Experience</h2>
              {editing ? (
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select experience level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Founder">Founder</option>
                </select>
              ) : (
                <p>{profile.experience || 'Not specified'}</p>
              )}
            </div>

            {/* Location */}
            <div style={styles.section}>
              <h2>Location</h2>
              {editing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  style={styles.input}
                />
              ) : (
                <p>{profile.location || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {editing && (
          <div style={styles.saveSection}>
            <button
              onClick={handleSave}
              disabled={loading}
              style={styles.saveBtn}
            >
              {loading ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        )}

        {/* Achievements */}
        <div style={styles.achievementsSection}>
          <h2>🏆 Achievements</h2>
          <div style={styles.achievementsList}>
            {profile.badges && profile.badges.length > 0 ? (
              profile.badges.map((badge, idx) => (
                <div key={idx} style={styles.achievementCard}>
                  <div style={styles.badgeIcon}>{badge.icon}</div>
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                </div>
              ))
            ) : (
              <p>Complete tasks and matches to earn badges!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  header: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  profileSection: {
    display: 'flex',
    gap: '30px',
    flex: 1
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 'bold'
  },
  profileInfo: {
    flex: 1
  },
  subtitle: {
    color: '#666',
    marginTop: '5px'
  },
  location: {
    color: '#999',
    marginTop: '10px'
  },
  stats: {
    display: 'flex',
    gap: '30px',
    marginTop: '20px'
  },
  editBtn: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginBottom: '40px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  section: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  bio: {
    color: '#666',
    lineHeight: '1.6',
    marginTop: '10px'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'inherit',
    minHeight: '120px',
    boxSizing: 'border-box'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '10px',
    boxSizing: 'border-box'
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px'
  },
  skillTag: {
    background: '#667eea',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px'
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: '#666'
  },
  saveSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  saveBtn: {
    padding: '12px 30px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  achievementsSection: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  achievementsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  achievementCard: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  badgeIcon: {
    fontSize: '32px',
    marginBottom: '10px'
  }
};

export default ProfilePage;