import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fBase';
import { useHistory } from 'react-router-dom';

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    // 사진 업로드도 해보기
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyFeeds = async () => {
    const feeds = await dbService.collection('feeds').where('creatorId', '==', userObj.uid).orderBy('createdAt').get();
  };
  useEffect(() => {
    getMyFeeds();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
