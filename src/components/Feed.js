import React, { useState } from 'react';
import { dbService, storageService } from 'fBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Feed = ({ feedObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newFeed, setNewFeed] = useState(feedObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');
    console.log(ok);
    if (ok) {
      //delete
      await dbService.doc(`feeds/${feedObj.id}`).delete();
      await storageService.refFromURL(feedObj.attachmentUrl).delete();
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
    <div className="feed">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container feedEdit">
            <input type="text" placeholder="Edit your feed" value={newFeed} onChange={onChange} required autoFocus className="formInput" />
            <input type="submit" value="Update Feed" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          {feedObj.attachmentUrl && <img src={feedObj.attachmentUrl} />}
          <div className="feed__content">
            <h4>{feedObj.text}</h4>
            <div className="feed__info">
              <span>{new Date().toLocaleDateString().slice(0, -1) + ' ' + new Date().toLocaleTimeString().slice(0, -3)}</span>
              {/* <span>by {feedObj ? feedObj.creatorId : 'someone'}</span> */}
              <span>by anonymous</span>
              {isOwner && (
                <div className="feed__actions">
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;
