import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useSocket } from '../services/socket';

function TeamPage({ user, logout }) {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    fetchTeam();
    fetchTasks();
  }, [teamId]);

  useEffect(() => {
    if (socket && teamId) {
      socket.emit('join_team', teamId);
      socket.on('receive_message', (data) => {
        setTeam(prev => ({
          ...prev,
          teamChat: [...prev.teamChat, data]
        }));
      });
    }
  }, [socket, teamId]);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTeam(res.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/tasks/team/${teamId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post(`/teams/${teamId}/chat`, { message }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (socket) {
        socket.emit('send_message', {
          teamId,
          userId: user._id,
          userName: user.name,
          message,
          timestamp: new Date()
        });
      }

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Loading...</div></div>;

  if (!team) return <div><Navbar user={user} logout={logout} /><div style={{textAlign: 'center', padding: '50px'}}>Team not found</div></div>;

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>{team.teamName}</h1>
          <span style={styles.status}>Active</span>
        </div>

        <div style={styles.grid}>
          {/* Left: Members & Chat */}
          <div style={styles.leftPanel}>
            <h3>👥 Team Members ({team.members.length})</h3>
            <div style={styles.membersList}>
              {team.members.map(member => (
                <div key={member.userId._id} style={styles.memberCard}>
                  <div>
                    <p style={styles.memberName}>{member.userId.name}</p>
                    <p style={styles.memberRole}>{member.role}</p>
                  </div>
                  <span style={styles.doerScore}>{member.userId.doerScore}</span>
                </div>
              ))}
            </div>

            <h3 style={{marginTop: '30px'}}>💬 Team Chat</h3>
            <div style={styles.chatBox}>
              {team.teamChat && team.teamChat.slice(-10).map((msg, idx) => (
                <div key={idx} style={styles.chatMessage}>
                  <strong>{msg.userName}</strong>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={styles.chatForm}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.chatInput}
              />
              <button type="submit" style={styles.sendBtn}>Send</button>
            </form>
          </div>

          {/* Right: Tasks */}
          <div style={styles.rightPanel}>
            <h3>📋 Tasks</h3>
            <div style={styles.tasksList}>
              {tasks.length === 0 ? (
                <p>No tasks yet</p>
              ) : (
                tasks.map(task => (
                  <div key={task._id} style={styles.taskCard}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <div style={styles.taskMeta}>
                      <span style={{...styles.badge, background: task.status === 'Done' ? '#28a745' : '#667eea'}}>
                        {task.status}
                      </span>
                      <span style={styles.priority}>{task.priority}</span>
                    </div>
                    {task.assignedTo && (
                      <p style={styles.assignedTo}>Assigned to: {task.assignedTo.name}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #f0f0f0'
  },
  status: {
    background: '#28a745',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  },
  leftPanel: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  rightPanel: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  memberCard: {
    background: '#f9f9f9',
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  memberName: {
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  memberRole: {
    margin: 0,
    color: '#999',
    fontSize: '12px'
  },
  doerScore: {
    background: '#667eea',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  chatBox: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    height: '300px',
    overflowY: 'auto',
    marginBottom: '15px'
  },
  chatMessage: {
    marginBottom: '12px',
    padding: '10px',
    background: 'white',
    borderRadius: '6px'
  },
  chatForm: {
    display: 'flex',
    gap: '10px'
  },
  chatInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px'
  },
  sendBtn: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  taskCard: {
    background: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea'
  },
  taskMeta: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  badge: {
    color: 'white',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  priority: {
    background: '#ffc107',
    color: '#333',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  assignedTo: {
    margin: '10px 0 0 0',
    fontSize: '12px',
    color: '#666'
  }
};

export default TeamPage; 
