const data = {
  firstName: 'Misha',
  lastName: 'Romanenko',
  birthDate: new Date(2020, 10, 10).toISOString().split('T')[0],
  accCreateDate: '20/10/2020',
  username: 'username',
  subscriberNumber: 20,
  followNumber: 50,
  userTweets: {
    username: 'tweeUsername',
    postID: 1,
  },
  BIO: 'BIO',
  location: 'Kyiv',
  website: 'instagram.com',
  avatar: 'https://nftnow.com/wp-content/uploads/2022/08/pudgy-penguin-6873.png',
  profileBackground: '',
};

const profileLoader = async ({ params }) => {
  return data;
};

export default profileLoader;
