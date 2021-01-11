import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService, dbService } from 'fBase';

const FeedFactory = ({ userObj }) => {
  const [feed, setFeed] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
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
    <form onSubmit={onSubmit}>
      <input value={feed} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Feed" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};
export default FeedFactory;
