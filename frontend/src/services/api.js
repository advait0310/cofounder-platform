import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Users
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (data) => API.put('/users/profile', data);
export const getCandidates = () => API.get('/users/swipe-candidates');
export const getUser = (userId) => API.get(`/users/${userId}`);

// Matching
export const swipe = (data) => API.post('/matching/swipe', data);
export const getMatches = () => API.get('/matching/my-matches');
export const assignTrial = (matchId, data) => API.post(`/matching/${matchId}/assign-trial`, data);

// AI Matching
export const getAIRecommendations = () => API.get('/ai-matching/recommendations');

// Teams
export const createTeam = (data) => API.post('/teams/create', data);
export const getTeam = (teamId) => API.get(`/teams/${teamId}`);
export const sendMessage = (teamId, data) => API.post(`/teams/${teamId}/chat`, data);
export const getUserTeams = (userId) => API.get(`/teams/user/${userId}`);

// Tasks
export const createTask = (data) => API.post('/tasks/create', data);
export const updateTask = (taskId, data) => API.put(`/tasks/${taskId}`, data);
export const getTeamTasks = (teamId) => API.get(`/tasks/team/${teamId}`);
export const updateTaskProgress = (taskId, data) => API.put(`/tasks/${taskId}/progress`, data);

// Smart Tasks
export const autoAssignTask = (data) => API.post('/smart-tasks/auto-assign', data);
export const findBestMatch = (data) => API.post('/smart-tasks/find-best-match', data);

// Startups
export const createStartup = (data) => API.post('/startups/create', data);
export const updateLandingPage = (startupId, data) => API.put(`/startups/${startupId}/landing-page`, data);
export const addProduct = (startupId, data) => API.post(`/startups/${startupId}/products`, data);
export const collectLead = (startupId, data) => API.post(`/startups/${startupId}/leads`, data);
export const getAnalytics = (startupId) => API.get(`/startups/${startupId}/analytics`);

// Leaderboard
export const getTopBuilders = () => API.get('/leaderboard/top-builders');
export const getTopTeams = () => API.get('/leaderboard/top-teams');
export const getUserRank = (userId) => API.get(`/leaderboard/rank/${userId}`);

// Skills
export const verifySkill = (data) => API.post('/skills/verify', data);
export const getUserSkills = (userId) => API.get(`/skills/user/${userId}`);
export const takeSkillTest = (skill, data) => API.post(`/skills/test/${skill}`, data);

// Mentorship
export const registerMentor = (data) => API.post('/mentorship/register-mentor', data);
export const getAllMentors = () => API.get('/mentorship/all');
export const getMentor = (mentorId) => API.get(`/mentorship/${mentorId}`);
export const requestMentorship = (mentorId) => API.post(`/mentorship/${mentorId}/request-mentorship`, {});

// Funding
export const createFundingRound = (data) => API.post('/funding/create-round', data);
export const findInvestors = (fundingRoundId) => API.get(`/funding/find-investors?fundingRoundId=${fundingRoundId}`);
export const invest = (roundId, data) => API.post(`/funding/${roundId}/invest`, data);
export const getFundingDashboard = (startupId) => API.get(`/funding/dashboard/${startupId}`);

// Equity
export const generateEquityAgreement = (data) => API.post('/equity/generate-agreement', data);
export const getEquityAgreement = (agreementId) => API.get(`/equity/${agreementId}`);
export const signEquityAgreement = (agreementId) => API.post(`/equity/${agreementId}/sign`, {});

// Analytics
export const getTeamAnalytics = (teamId) => API.get(`/analytics/team/${teamId}`);

// Admin
export const getAdminAnalytics = () => API.get('/admin/analytics');
export const getAdminUsers = () => API.get('/admin/users');

export default API; 
