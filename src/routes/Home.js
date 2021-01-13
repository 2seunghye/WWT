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
      console.log(userObj);
    });
  }, []);

  return (
    <div className="container">
      <FeedFactory userObj={userObj} />
      <div className="feed__container" style={{ marginTop: 30 }}>
        {feeds.map((feed) => (
          <Feed key={feed.id} feedObj={feed} isOwner={feed.creatorId === userObj.uid} userObj={userObj} />
        ))}
      </div>
    </div>
  );
};
export default Home;
