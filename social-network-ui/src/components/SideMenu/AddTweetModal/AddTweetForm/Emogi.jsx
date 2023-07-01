import EmojiPicker from 'emoji-picker-react';
import React from 'react';

const Emoji = () => {
  const handleEmojiSelect = (emojiData) => {
    console.log(emojiData.emoji);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mt-5 mb-5">emoji</h2>
      <EmojiPicker onEmojiClick={handleEmojiSelect} />
    </div>
  );
};

export default Emoji;
