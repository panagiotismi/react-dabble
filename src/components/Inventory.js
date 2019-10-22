import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import base from '../base';

const Inventory = ({
  loadSamples,
  fishes,
  addFish,
  updateFish,
  removeFish,
  storeName,
}) => (
  <div className="inventory">
    <h2>Inventory</h2>
    {/* {Object.keys(fishes).map(this.renderInventory)} */}
    <AddFishForm addFish={addFish} />
    <button type="button" onClick={loadSamples}>
      Load Sample Fish
    </button>
  </div>
);

// class Inventory extends React.Component {
//   constructor() {
//     super();

//     this.handleChange = this.handleChange.bind(this);
//     this.authHandler = this.authHandler.bind(this);
//     this.authenticate = this.authenticate.bind(this);
//     this.logout = this.logout.bind(this);
//     this.renderLogin = this.renderLogin.bind(this);
//     this.renderInventory = this.renderInventory.bind(this);

//     this.state = {
//       uid: null,
//       owner: null,
//     };
//   }

//   componentDidMount() {
//     base.onAuth(user => {
//       if (user) {
//         this.authHandler(null, { user });
//       }
//     });
//   }

//   handleChange(e, key) {
//     const fish = this.props.fishes[key];
//     const updatedFish = {
//       ...fish,
//       [e.target.name]: e.target.value,
//     };
//     this.props.updateFish(key, updatedFish);
//   }

//   authHandler(err, authData) {
//     if (err) {
//       /* eslint-disable no-console */
//       console.error(err);
//       /* eslint-enable no-console */
//     }

//     // grab the store info
//     const storeRef = base.database().ref(this.props.storeName);

//     // query firebase once for store data
//     storeRef.once('value', snapshot => {
//       const data = snapshot.val() || {};
//       // claim it as our own if there is no owner already
//       if (!data.owner) {
//         storeRef.set({
//           owner: authData.user.uid,
//         });
//       }
//       this.setState({
//         uid: authData.user.uid,
//         owner: data.owner || authData.user.uid,
//       });
//     });
//   }

//   authenticate(provider) {
//     base.authWithOAuthPopup(provider, this.authHandler);
//   }

//   logout() {
//     base.unauth();
//     this.setState({ uid: null });
//   }

//   renderLogin() {
//     return (
//       <nav className="login">
//         <h2>Inventory</h2>
//         <p>Sign in to manage your store&apos;s inventory</p>
//         <button
//           type="button"
//           className="github"
//           onClick={() => this.authenticate('github')}
//         >
//           Log In with GitHub
//         </button>
//         <button
//           type="button"
//           className="twitter"
//           onClick={() => this.authenticate('twitter')}
//         >
//           Log In with Twitter
//         </button>
//       </nav>
//     );
//   }

//   renderInventory(key) {
//     const fish = this.props.fishes[key];
//     return (
//       <div className="fish-edit" key={key}>
//         <input
//           name="name"
//           value={fish.name}
//           type="text"
//           placeholder="Fish Name"
//           onChange={e => this.handleChange(e, key)}
//         />
//         <input
//           name="price"
//           value={fish.price}
//           type="text"
//           placeholder="Fish Price"
//           onChange={e => this.handleChange(e, key)}
//         />
//         <select
//           name="status"
//           value={fish.status}
//           placeholder="Fish Status"
//           onChange={e => this.handleChange(e, key)}
//         >
//           <option value="available">Fresh!</option>
//           <option value="unavailable">Sold Out</option>
//         </select>
//         <textarea
//           name="desc"
//           value={fish.desc}
//           placeholder="Fish Description"
//           onChange={e => this.handleChange(e, key)}
//         />
//         <input
//           name="image"
//           value={fish.image}
//           type="text"
//           placeholder="Fish Image"
//           onChange={e => this.handleChange(e, key)}
//         />
//         <button type="button" onClick={() => this.props.removeFish(key)}>
//           Remove Fish
//         </button>
//       </div>
//     );
//   }

//   render() {
//     const logoutButton = (
//       <button type="button" onClick={this.logout}>
//         Log Out
//       </button>
//     );

//     // check if there is anyone logged in at all
//     if (!this.state.uid) {
//       return <div>{this.renderLogin()}</div>;
//     }
//     // check if they are the owner of the current store
//     if (this.state.uid !== this.state.owner) {
//       return (
//         <div>
//           <p>Sorry you aren&apos;t the owner of this store!</p>
//           {logoutButton}
//         </div>
//       );
//     }
//     // default return
//     return (
//       <div>
//         <h2>Inventory</h2>
//         {logoutButton}
//         {Object.keys(this.props.fishes).map(this.renderInventory)}
//         <AddFishForm addFish={this.props.addFish} />
//         <button type="button" onClick={this.props.loadSamples}>
//           Load Sample Fish
//         </button>
//       </div>
//     );
//   }
// }

Inventory.propTypes = {
  fishes: PropTypes.objectOf(PropTypes.object).isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  storeName: PropTypes.string.isRequired,
};

export default Inventory;
