/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: Analytics Dashboard Page
 * 
 * A comprehensive analytics page for admin showing
 * donation statistics, trends, and insights
 */

import React, { useState, useEffect } from 'react';
import { 
    FaChartLine, 
    FaChartBar, 
    FaChartPie,
    FaTint, 
    FaUsers, 
    FaHeart,
    FaCalendarAlt,
    FaArrowUp,
    FaArrowDown,
    FaCheck,
    FaClock,
    FaExclamationCircle
} from 'react-icons/fa';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('month');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Sample analytics data
    const stats = {
        totalDonations: { value: 1247, change: 12.5, trend: 'up' },
        activeDonors: { value: 856, change: 8.3, trend: 'up' },
        pendingRequests: { value: 34, change: -5.2, trend: 'down' },
        successRate: { value: 94.2, change: 2.1, trend: 'up' }
    };

    const bloodTypeDistribution = [
        { type: 'A+', count: 234, percentage: 24, color: 'bg-red-500' },
        { type: 'B+', count: 198, percentage: 20, color: 'bg-rose-500' },
        { type: 'O+', count: 312, percentage: 32, color: 'bg-pink-500' },
        { type: 'O-', count: 89, percentage: 9, color: 'bg-orange-500' },
        { type: 'A-', count: 67, percentage: 7, color: 'bg-amber-500' },
        { type: 'B-', count: 45, percentage: 5, color: 'bg-yellow-500' },
        { type: 'AB+', count: 23, percentage: 2, color: 'bg-emerald-500' },
        { type: 'AB-', count: 12, percentage: 1, color: 'bg-teal-500' }
    ];

    const monthlyTrends = [
        { month: 'Jul', donations: 89 },
        { month: 'Aug', donations: 112 },
        { month: 'Sep', donations: 98 },
        { month: 'Oct', donations: 134 },
        { month: 'Nov', donations: 156 },
        { month: 'Dec', donations: 178 }
    ];

    const recentActivity = [
        { id: 1, type: 'donation', message: 'New donation completed', user: 'Rahim Ahmed', time: '2 min ago', icon: FaHeart, color: 'text-red-500 bg-red-50' },
        { id: 2, type: 'request', message: 'Urgent request created', user: 'Fatima Khan', time: '15 min ago', icon: FaTint, color: 'text-rose-500 bg-rose-50' },
        { id: 3, type: 'user', message: 'New donor registered', user: 'Kamal Hossain', time: '1 hour ago', icon: FaUsers, color: 'text-blue-500 bg-blue-50' },
        { id: 4, type: 'fulfilled', message: 'Request fulfilled', user: 'Nusrat Jahan', time: '2 hours ago', icon: FaCheck, color: 'text-emerald-500 bg-emerald-50' }
    ];

    const topLocations = [
        { name: 'Dhaka', donations: 456, percentage: 37 },
        { name: 'Chittagong', donations: 234, percentage: 19 },
        { name: 'Sylhet', donations: 178, percentage: 14 },
        { name: 'Khulna', donations: 145, percentage: 12 },
        { name: 'Rajshahi', donations: 112, percentage: 9 }
    ];

    const StatCard = ({ title, value, change, trend, icon: Icon, suffix = '' }) => (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">
                        {value}{suffix}
                    </h3>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                        <span>{Math.abs(change)}%</span>
                        <span className="text-gray-400">vs last {timeRange}</span>
                    </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                    <Icon className="text-white text-2xl" />
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
                    <p className="text-gray-500 mt-1">Track donations, requests, and donor activity</p>
                </div>
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <select 
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="week">Last 7 days</option>
                        <option value="month">Last 30 days</option>
                        <option value="quarter">Last 3 months</option>
                        <option value="year">Last year</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Donations" 
                    value={stats.totalDonations.value} 
                    change={stats.totalDonations.change} 
                    trend={stats.totalDonations.trend}
                    icon={FaHeart}
                />
                <StatCard 
                    title="Active Donors" 
                    value={stats.activeDonors.value} 
                    change={stats.activeDonors.change} 
                    trend={stats.activeDonors.trend}
                    icon={FaUsers}
                />
                <StatCard 
                    title="Pending Requests" 
                    value={stats.pendingRequests.value} 
                    change={stats.pendingRequests.change} 
                    trend={stats.pendingRequests.trend}
                    icon={FaClock}
                />
                <StatCard 
                    title="Success Rate" 
                    value={stats.successRate.value} 
                    change={stats.successRate.change} 
                    trend={stats.successRate.trend}
                    icon={FaChartLine}
                    suffix="%"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Trends */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <FaChartBar className="text-red-500" />
                            Monthly Trends
                        </h3>
                    </div>
                    <div className="flex items-end justify-between gap-4 h-48">
                        {monthlyTrends.map((item, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                <div 
                                    className="w-full bg-gradient-to-t from-red-500 to-rose-400 rounded-t-lg transition-all hover:from-red-600 hover:to-rose-500"
                                    style={{ height: `${(item.donations / 200) * 100}%` }}
                                ></div>
                                <span className="text-sm text-gray-600 mt-2">{item.month}</span>
                                <span className="text-xs text-gray-400">{item.donations}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blood Type Distribution */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
                        <FaChartPie className="text-red-500" />
                        Blood Types
                    </h3>
                    <div className="space-y-3">
                        {bloodTypeDistribution.slice(0, 5).map((item, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{item.type}</span>
                                    <span className="text-gray-500">{item.count} ({item.percentage}%)</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${item.color} rounded-full transition-all`}
                                        style={{ width: `${item.percentage * 3}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                                    <activity.icon />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{activity.message}</p>
                                    <p className="text-gray-500 text-sm">{activity.user}</p>
                                </div>
                                <span className="text-gray-400 text-sm">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Locations */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Top Locations</h3>
                    <div className="space-y-4">
                        {topLocations.map((location, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-gray-700">{location.name}</span>
                                        <span className="text-gray-500 text-sm">{location.donations} donations</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full"
                                            style={{ width: `${location.percentage * 2.5}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
