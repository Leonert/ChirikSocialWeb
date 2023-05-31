import { json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';

const searchLoader = async ({ params, request }) => {
  const searchValue = new URL(request.url).searchParams.get('value');
  try {
    const response = await axiosIns.get(`/api/search/users?q=${searchValue}`);

    return response;
  } catch (e) {
    return json({ Error: e });
  }
};

export default searchLoader;
