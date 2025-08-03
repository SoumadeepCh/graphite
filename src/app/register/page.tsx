'use client';
import React from 'react';

const RegisterPage = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = '/';
    }
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <form onSubmit={handleSubmit} className="flex flex-col w-80 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-foreground" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-foreground" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-foreground" />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
