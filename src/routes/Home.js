import React, { useState } from 'react';
import { dbService } from 'fBase';

const Home = () => {
  const [feed, setFeed] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('feeds').add({
      feed,
      createdAt: Date.now(),
    });
    setFeed('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setFeed(value);
  };
  return (
    <div>
      <form>
        <input
          value={feed}
          onChange={onChange}
          type="text"
          placeholder="
    What are you wearing today?"
          maxLength={120}
        />
        <input onClick={onSubmit} type="submit" value="share" />
      </form>
    </div>
  );
};
export default Home;
