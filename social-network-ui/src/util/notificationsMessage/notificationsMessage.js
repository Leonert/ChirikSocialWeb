import toast from 'react-hot-toast';

export const notify = (text) => toast(text);

function createFollowerNotification(notification) {
  const { name, profileImage, username, timestamp } = notification.initiator;
  const message = `${name} subscribed to you.`;

  return {
    name,
    profileImage,
    username,
    timestamp,
    message,
  };
}

function createLikeNotification(notification) {
  const { name, profileImage, username, timestamp } = notification.initiator;
  const message = `${name} liked your post`;

  return {
    name,
    profileImage,
    username,
    timestamp,
    message,
  };
}

function createRetweetNotification(notification) {
  const { name, profileImage, username, timestamp } = notification.initiator;
  const message = `${name} retweeted your post`;

  return {
    name,
    profileImage,
    username,
    timestamp,
    message,
  };
}

function createReplyNotification(notification) {
  const { name, profileImage, username, timestamp } = notification.initiator;
  const message = `${name} replied to your post`;

  return {
    name,
    profileImage,
    username,
    timestamp,
    message,
  };
}

function createEntranceNotification(notification) {
  const { timestamp } = notification;
  const message = 'You are logged in.';

  return {
    timestamp,
    message,
  };
}

export const createNotifications = (notification) => {
  switch (notification.notificationType) {
    case 'FOLLOWER':
      return createFollowerNotification(notification);
    case 'LIKE':
      return createLikeNotification(notification);
    case 'RETWEET':
      return createRetweetNotification(notification);
    case 'REPLY':
      return createReplyNotification(notification);
    case 'ENTRANCE':
      return createEntranceNotification(notification);
    default:
      break;
  }
};
