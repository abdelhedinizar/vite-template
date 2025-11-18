'use client';

import axios from 'axios';

let user;

class AuthClient {
  async signUp(_) {
    // Make API request
    const {firstname, lastname, email, password, confirmPassword} = _;
  try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users/signup`, {
        firstname,lastname,email,
        password,confirmPassword
      });
      const { token } = response.data.data; // Assuming the API returns a `token`
      localStorage.setItem('custom-auth-token', token);
    } catch (error) {
      return { error: 'Invalid credentials' };
    }
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
      user.avatar = user.photo === 'Default.jpg' ? '/assets/avatar-10.png' : user.photo;
      user.photo = user.photo === 'Default.jpg' ? '/assets/avatar-10.png' : user.photo;
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
