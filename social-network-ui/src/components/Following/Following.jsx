import React from 'react';

import PostList from '../PostList/PostList';

export default function Following() {
  return (
    <div>
      <PostList apiUrl={'/api/posts/following?'} />
    </div>
  );
}
