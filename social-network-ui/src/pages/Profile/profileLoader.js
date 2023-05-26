import { json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';

const profileLoader = async ({ params }) => {
  try {
    const response = await axiosIns.get(`/api/users/p/${params.username}`);

    return response;
  } catch (e) {
    return json({ Error: e });
  }
};

export default profileLoader;
