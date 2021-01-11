import React, { useState, useEffect } from 'react';
import { dbService } from 'fBase';
import Feed from 'components/Feed';

const Home = ({ userObj }) => {
  const [feed, setFeed] = useState('');
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    dbService.collection('feeds').onSnapshot((snapshot) => {
      const feedArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeeds(feedArray);
    });
  }, []);
  const getFeeds = async () => {
    const dbFeeds = await dbService.collection('feeds').get();
    dbFeeds.forEach((document) => {
      const feedObject = {
        id: document.id,
        ...document.data(),
      };
      setFeeds((prev) => [feedObject, ...prev]);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('feeds').add({
      text: feed,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setFeed('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setFeed(value);
  };
  console.log(feeds);
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
      <div>
        {feeds.map((feed) => (
          <Feed key={feed.id} feedObj={feed} isOwner={feed.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
