// -------------------------------------------------------------------------------------------------
// redux-example
// -------------------------------------------------------------------------------------------------
// Redux example using an analogy to an insurance company
// -------------------------------------------------------------------------------------------------
// Originally authored by StephenGrider (Stephen Grider, rallycoding.com)
// Small tweaks by jsfanboy (Lucas Baerenfaenger, jsfanboy.com)
// -------------------------------------------------------------------------------------------------

import {createStore, combineReducers} from 'redux';

// -------------------------------------------------------------------------------------------------
// Action creators returning actions
// -------------------------------------------------------------------------------------------------

// People dropping off a form (action creator)
const createPolicy = (name, amount) => {
  return { // A form (action)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount,
    },
  };
};

// People dropping off a form (action creator)
const deletePolicy = (name) => {
  return { // A form (action)
    type: 'DELETE_POLICY',
    payload: {
      name: name,
    },
  };
};

// People dropping off a form (action creator)
const createClaim = (name, amountOfMoneyToCollect) => {
  return { // A form (action)
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  };
};

// -------------------------------------------------------------------------------------------------
// Reducers
// -------------------------------------------------------------------------------------------------

// Claims History Department (reducer)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }

  return oldListOfClaims;
};

// Accounting Department (reducer)
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }

  return bagOfMoney;
};

// Policies Department (reducer)
const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }

  return listOfPolicies;
};

// -------------------------------------------------------------------------------------------------
// Store & dispatch
// -------------------------------------------------------------------------------------------------

const departments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies,
});

const store = createStore(departments);

const createPolicyAction1 = createPolicy('Lucas', 120);
const createPolicyAction2 = createPolicy('Maria', 150);
const createPolicyAction3 = createPolicy('Bjarne', 80);

const deletePolicyAction1 = deletePolicy('Bjarne');

const createClaimAction1 = createClaim('Maria', 50);
const createClaimAction2 = createClaim('Maria', 50);

store.dispatch(createPolicyAction1);
store.dispatch(createPolicyAction2);
store.dispatch(createPolicyAction3);

store.dispatch(deletePolicyAction1);

store.dispatch(createClaimAction1);
store.dispatch(createClaimAction2);

console.log(store.getState());
