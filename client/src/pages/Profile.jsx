import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../api';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { role } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await getProfile();
                const userData = res.data.user || res.data;
                setProfile(userData);
                setForm(userData);
                setError(null);
            } catch (err) {
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleEdit = () => {
        setEditMode(true);
        setSuccess(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setEditMode(false);
        setForm(profile);
        setSuccess(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await updateProfile(form);
            const res = await getProfile();
            const userData = res.data.user || res.data;
            setProfile(userData);
            setForm(userData);
            setEditMode(false);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="p-8">Loading profile...</div></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><div className="p-8 text-red-600">{error}</div></div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-xl w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
                {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
                {!editMode ? (
                    <div>
                        <div className="mb-4"><span className="font-semibold">First Name:</span> {profile.firstName}</div>
                        <div className="mb-4"><span className="font-semibold">Last Name:</span> {profile.lastName}</div>
                        <div className="mb-4"><span className="font-semibold">Email:</span> {profile.email}</div>
                        {role !== 'admin' && (
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleEdit}>
                                Edit Profile
                            </button>
                        )}
                    </div>
                ) : (
                    role !== 'admin' ? (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName || ''}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName || ''}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email || ''}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                    disabled
                                />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                    Save
                                </button>
                                <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-gray-500">Admins cannot update their profile.</div>
                    )
                )}
            </div>
        </div>
    );
};

export default Profile;
