import React, { useEffect } from 'react';
import { authService, dbService } from 'fBase';
import { useHistory } from 'react-router-dom';

export default ({ userObj }) => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };
  const getMyFeeds = async () => {
    const feeds = await dbService.collection('feeds').where('creatorId', '==', userObj.uid).orderBy('createdAt').get();
  };
  useEffect(() => {
    getMyFeeds();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
