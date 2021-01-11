import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fBase';
import Feed from 'components/Feed';

const Home = ({ userObj }) => {
  const [feed, setFeed] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [attachment, setAttachment] = useState();

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
    let attachmentUrl = '';
    if (attachmentUrl != '') {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      const attachmentUrl = await response.ref.getDownloadURL();
    }

    const feedObj = {
      text: feed,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('feeds').add(feedObj);
    setFeed('');
    setAttachment('');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setFeed(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input onClick={onSubmit} type="submit" value="share" />
        {attachment && (
          <div>
            <img src={attachment} width="150px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
