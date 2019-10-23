import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp, getAuthProvider } from '../base';

const Inventory = ({
  loadSamples,
  fishes,
  addFish,
  updateFish,
  deleteFish,
  storeName,
}) => {
  const [uid, setUid] = useState(null);
  const [owner, setOwner] = useState(null);

  const handleAuth = useCallback(
    async authData => {
      const ref = base.ref(storeName);
      const snapshot = await ref.once('value');
      const store = snapshot.val() || {};
      if (!store.owner) {
        ref.update({ owner: authData.user.uid });
      }
      setUid(authData.user.uid);
      setOwner(store.owner || authData.user.uid);
    },
    [storeName]
  );

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => user && handleAuth({ user }));
  }, [handleAuth]);

  const authenticate = provider => {
    const authProvider = getAuthProvider(provider);
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(handleAuth);
  };

  const logout = async () => {
    await firebaseApp.auth().signOut();
    setUid(null);
  };

  const logoutBtn = (
    <button type="button" onClick={logout}>
      Log Out
    </button>
  );

  if (!uid) {
    return <Login authenticate={authenticate} />;
  }
  if (uid !== owner) {
    return (
      <div>
        <p>Sorry, you are not the owner of the Store!</p>
        {logoutBtn}
      </div>
    );
  }
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logoutBtn}
      {Object.keys(fishes).map(
        key =>
          fishes[key] && (
            <EditFishForm
              key={key}
              index={key}
              fish={fishes[key]}
              updateFish={updateFish}
              deleteFish={deleteFish}
            />
          )
      )}
      <AddFishForm addFish={addFish} />
      <button type="button" onClick={loadSamples}>
        Load Sample Fish
      </button>
    </div>
  );
};

Inventory.propTypes = {
  fishes: PropTypes.objectOf(PropTypes.object).isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  storeName: PropTypes.string.isRequired,
};

export default Inventory;
