/*
INSTRUCTIONS / CONSIDERATIONS:


2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

import { useReducer } from "react";

const initialState = {
  deposit: null,
  withdraw: null,
  totalToan: 0,
  loanAmount: null,
  payingLoanAmount: null,
  balance: 0,
  isActive: false,
};

const reducer = (state, action) => {
  // opening account
  if (action.type === "openAccount")
    return { ...state, isActive: true, balance: 500 };
  // closing account
  if (action.type === "closeAccount") return { ...state, isActive: false };
  // handling deposit
  if (action.type === "deposit")
    return { ...state, balance: state.balance + state.deposit };
  if (action.type === "enterDeposit")
    return { ...state, deposit: action.payload };
  // handling withdraw
  if (action.type === "withdraw")
    return { ...state, balance: state.balance - state.withdraw };
  if (action.type === "enterWithdraw")
    return { ...state, withdraw: action.payload };
  // handling loan
  if (action.type === "getLoan")
    return {
      ...state,
      balance: state.balance + state.loanAmount,
      totalToan: state.totalToan + state.loanAmount,
    };
  if (action.type === "enterLoan")
    return {
      ...state,
      loanAmount: action.payload,
    };
  if (action.type === "payLoan")
    return {
      ...state,
      totalToan: state.totalToan - state.payingLoanAmount,
      balance: state.balance - state.payingLoanAmount,
    };
  if (action.type === "enterPayLoan")
    return {
      ...state,
      payingLoanAmount: action.payload,
    };
  // Handle unknown action types
  return state;
};

export default function App() {
  const [
    {
      balance,
      totalToan,
      isActive,
      deposit,
      withdraw,
      loanAmount,
      payingLoanAmount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}$ </p>
      <p>Total Loan: {totalToan}$ </p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "deposit" });
        }}
      >
        <input
          value={deposit}
          placeholder="type the money you want"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({
              type: "enterDeposit",
              payload: Number(e.target.value),
            })
          }
        />
        <button disabled={!isActive}>Deposit {deposit}$</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "withdraw", payload: e.target.value });
        }}
      >
        <input
          value={withdraw}
          placeholder="type the money you withdraw"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({
              type: "enterWithdraw",
              payload: Number(e.target.value),
            })
          }
        />
        <button disabled={!isActive}>Withdraw {withdraw}$</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "getLoan", payload: e.target.value });
        }}
      >
        <input
          value={loanAmount}
          placeholder="money you want loan"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({
              type: "enterLoan",
              payload: Number(e.target.value),
            })
          }
        />
        <button disabled={!isActive}>Loan {loanAmount}$</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "payLoan", payload: e.target.value });
        }}
      >
        <input
          value={payingLoanAmount}
          placeholder="pay loan"
          disabled={!isActive}
          onChange={(e) =>
            dispatch({
              type: "enterPayLoan",
              payload: Number(e.target.value),
            })
          }
        />
        <button disabled={!isActive}>Loan {payingLoanAmount}$</button>
      </form>

      {/* <p>
        <button
          onClick={() => {
            dispatch({ type: "getLoan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan", payload: loan });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p> */}
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
