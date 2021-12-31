import axios from '../utils/axios';

export async function me() {
  const response = await axios.get('/auth');
  return response.data;
}

export type LoginInput = {
  username: string;
  password: string;
};

export async function login(input: LoginInput) {
  return await axios.post('/auth/login', input);
}

export type SignUpInput = {
  name: string;
  username: string;
  password: string;
};

export async function signUp(input: SignUpInput) {
  return await axios.post('/auth/signup', input);
}
