import React, { useState } from 'react';
import { dbService } from 'fBase';

const Feed = ({ feedObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newFeed, setNewFeed] = useState(feedObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this feed?');
    console.log(ok);
    if (ok) {
      //delete
      await dbService.doc(`feeds/${feedObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(feedObj, newFeed);
    await dbService.doc(`feeds/${feedObj.id}`).update({
      text: newFeed,
    });
    toggleEditing();
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewFeed(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your feed" value={newFeed} onChange={onChange} required />
            <input type="submit" value="Update Feed" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{feedObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Feed</button>
              <button onClick={toggleEditing}>Edit Feed</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
