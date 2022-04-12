import { HttpClient } from './HttpClient';

class UserApi extends HttpClient {
  login() {}
  async signUp(params: {
    id: string;
    password: string;
    name: string;
    nickname: string;
    frontResidentRegistrationNumber: string;
    seventhDigitOfResidentRegistrationNumber: number;
  }) {
    const {
      id,
      password,
      name,
      nickname,
      frontResidentRegistrationNumber,
      seventhDigitOfResidentRegistrationNumber,
    } = params;

    const { data } = await this.http.post('/signUp', {
      id,
      password,
      phoneNumber: '010-5427-8851',
      name,
      nickname,
      frontResidentRegistrationNumber,
      seventhDigitOfResidentRegistrationNumber,
    });

    return {
      data,
    };
  }
}

export const userApi = new UserApi({});
