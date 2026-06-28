import React, { useState, useEffect } from 'react';
import { FaTrophy, FaStar, FaFire, FaMedal } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('month'); // month, week, all-time
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/leaderboard?period=${filter}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error('Failed to load leaderboard');
      // Mock data for demo
      setUsers(mockLeaderboardData);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMedalIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="text-yellow-500 text-2xl" />;
    if (rank === 2) return <FaMedal className="text-gray-400 text-2xl" />;
    if (rank === 3) return <FaMedal className="text-orange-600 text-2xl" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 1000) return 'bg-red-100 text-red-800';
    if (score >= 500) return 'bg-orange-100 text-orange-800';
    if (score >= 100) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FaTrophy className="text-yellow-500 text-4xl mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Leaderboard</h1>
          </div>
          <p className="text-gray-600">Top Cofounders Making an Impact</p>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {['week', 'month', 'all-time'].map((period) => (
                <button
                  key={period}
                  onClick={() => setFilter(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === period
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {period === 'all-time' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 mt-4">Loading leaderboard...</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {filteredUsers.slice(0, 3).map((user, index) => (
                <div
                  key={user._id}
                  className={`rounded-lg p-6 text-center text-white transform transition hover:scale-105 ${
                    index === 0
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 md:col-span-1 md:order-2'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-400 to-gray-600 md:order-1'
                      : 'bg-gradient-to-br from-orange-400 to-orange-600 md:order-3'
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    {getMedalIcon(index + 1)}
                  </div>
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-white overflow-hidden">
                    <img
                      src={user.profilePicture || 'https://via.placeholder.com/64'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-sm opacity-90 mb-3">{user.email}</p>
                  <div className="flex items-center justify-center gap-2">
                    <FaFire className="text-orange-300" />
                    <span className="text-2xl font-bold">{user.score || 0}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                      <th className="px-6 py-4 text-left">Rank</th>
                      <th className="px-6 py-4 text-left">User</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-center">Matches</th>
                      <th className="px-6 py-4 text-center">Score</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr
                          key={user._id}
                          className="border-b hover:bg-indigo-50 transition"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {getMedalIcon(index + 1)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.profilePicture || 'https://via.placeholder.com/40'}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.title || 'Cofounder'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {user.matches || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBadgeColor(user.score || 0)}`}>
                              {user.score || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status || 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          No users found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <FaTrophy className="text-yellow-500 text-3xl mx-auto mb-2" />
                <h4 className="text-gray-600 text-sm">Total Users</h4>
                <p className="text-2xl font-bold text-gray-800">{filteredUsers.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <FaFire className="text-orange-500 text-3xl mx-auto mb-2" />
                <h4 className="text-gray-600 text-sm">Top Score</h4>
                <p className="text-2xl font-bold text-gray-800">
                  {filteredUsers[0]?.score || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <FaStar className="text-blue-500 text-3xl mx-auto mb-2" />
                <h4 className="text-gray-600 text-sm">Avg Score</h4>
                <p className="text-2xl font-bold text-gray-800">
                  {filteredUsers.length > 0
                    ? Math.round(
                        filteredUsers.reduce((acc, u) => acc + (u.score || 0), 0) /
                          filteredUsers.length
                      )
                    : 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <FaMedal className="text-purple-500 text-3xl mx-auto mb-2" />
                <h4 className="text-gray-600 text-sm">Total Matches</h4>
                <p className="text-2xl font-bold text-gray-800">
                  {filteredUsers.reduce((acc, u) => acc + (u.matches || 0), 0)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Mock Data for Demo
const mockLeaderboardData = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    title: 'Full Stack Developer',
    score: 1250,
    matches: 15,
    status: 'active',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    profilePicture: 'https://i.pravatar.cc/150?img=2',
    title: 'Product Manager',
    score: 980,
    matches: 12,
    status: 'active',
  },
  {
    _id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    title: 'Designer',
    score: 870,
    matches: 10,
    status: 'active',
  },
  {
    _id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
    title: 'Marketing',
    score: 750,
    matches: 8,
    status: 'active',
  },
  {
    _id: '5',
    name: 'Alex Brown',
    email: 'alex@example.com',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    title: 'Business Analyst',
    score: 620,
    matches: 6,
    status: 'active',
  },
];

export default Leaderboard;