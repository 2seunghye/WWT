import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../fBase';
import Feed from 'components/Feed';
import FeedFactory from 'components/FeedFactory';

const Home = ({ userObj }) => {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    dbService.collection('feeds').onSnapshot((snapshot) => {
      const feedArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeeds(feedArray);
    });
  }, []);
  return (
    <div>
      <FeedFactory userObj={userObj} />
      <div>
        {feeds.map((feed) => (
          <Feed key={feed.id} feedObj={feed} isOwner={feed.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
