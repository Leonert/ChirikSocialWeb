import React from 'react';

import PostList from '../PostList/PostList';
import Spinner from '../Spinner/Spinner';

export default function Following() {
  return (
    <div>
      <PostList apiUrl={'/api/posts/following?'} />
    </div>
  );
}
