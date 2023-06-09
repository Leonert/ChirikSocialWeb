import { redirect } from 'react-router-dom';

export default async function homeSearchAction({ params, request }) {
  const formData = await request.formData();
  const searchValue = formData.get('search');
  const searchParams = new URLSearchParams();
  searchParams.append('value', searchValue);
  searchParams.append('tab', 'users');

  return redirect(`/search?${searchParams}`);
}
