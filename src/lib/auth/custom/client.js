'use client';

import axios from 'axios';

function generateToken() {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

let user;

class AuthClient {
  async signUp(_) {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_) {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params) {
    const { email, password } = params;

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users/signin`, {
        email,
        password,
      });
      const { token } = response.data; // Assuming the API returns a `token`
      localStorage.setItem('custom-auth-token', token);
    } catch (error) {
      return { error: 'Invalid credentials' };
    }
    return {};
  }

  async resetPassword(_) {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_) {
    return { error: 'Update reset not implemented' };
  }

  async getUser() {
    // Make API request

    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      user = response.data.data.user;
      const [firstName, lastName] = user.name.split(' ');
      user.firstName = firstName;
      user.lastName = lastName;
      user.avatar = user.avatar || '/assets/avatar-10.png';
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut() {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
