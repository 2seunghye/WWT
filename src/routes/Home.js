import React, { useState } from 'react';

const Home = () => {
  const [feed, setFeed] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
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
