import axiosIns from '../axiosInstance';

export const getUser = async (username) => {
  try {
    const { data } = await axiosIns({
      method: 'GET',
      url: `/api/users/p/${username}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    // eslint-disable-next-line
    console.log('Error');
  }
};
