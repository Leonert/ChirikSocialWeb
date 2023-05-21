import axiosIns from '../axiosInstance';

export const getPost = async (id) => {
  try {
    const { data } = await axiosIns({
      method: 'GET',
      url: `/api/posts/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data.text;
  } catch (error) {
    // eslint-disable-next-line
    console.log('Error');
  }
};
