import { useReducer } from "react";

const initialState = {
  balance: 0,
  totalLoan: 0,
  loanAmount: null,
  isActive: false,
};

const reducer = (state, action) => {
  if (!state.isActive) {
    return state;
  }

  if (action.type === "openAccount") {
    return { ...state, isActive: true, balance: 500 };
  } else if (action.type === "closeAccount") {
    if (state.balance === 0 && state.loanAmount === null) {
      return { ...initialState };
    } else {
      return state;
    }
  } else if (action.type === "operate") {
    const { operation, amount } = action.payload;
    if (operation === "deposit") {
      return { ...state, balance: state.balance + amount };
    } else if (operation === "withdraw") {
      return { ...state, balance: state.balance - amount };
    } else {
      return state;
    }
  } else if (action.type === "requestLoan") {
    if (state.loanAmount === null) {
      return {
        ...state,
        balance: state.balance + action.payload,
        totalLoan: state.totalLoan + action.payload,
        loanAmount: action.payload,
      };
    } else {
      return state;
    }
  } else if (action.type === "payLoan") {
    if (state.loanAmount !== null) {
      return {
        ...state,
        balance: state.balance - action.payload,
        totalLoan: state.totalLoan - action.payload,
        loanAmount: null,
      };
    } else {
      return state;
    }
  } else {
    return state;
  }
};

export default function App() {
  const [
    { balance, totalLoan, isActive },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleOpenAccount = () => {
    dispatch({ type: "openAccount" });
  };

  const handleCloseAccount = () => {
    dispatch({ type: "closeAccount" });
  };

  const handleOperate = (operation, amount) => {
    dispatch({ type: "operate", payload: { operation, amount } });
  };

  const handleRequestLoan = (amount) => {
    dispatch({ type: "requestLoan", payload: amount });
  };

  const handlePayLoan = (amount) => {
    dispatch({ type: "payLoan", payload: amount });
  };

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}$</p>
      <p>Total Loan: {totalLoan}$</p>

      {!isActive && (
        <button onClick={handleOpenAccount}>Open account</button>
      )}

      {isActive && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOperate("deposit", Number(e.target.value));
            }}
          >
            <input placeholder="Type the deposit amount" />
            <button>Deposit</button>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOperate("withdraw", Number(e.target.value));
            }}
          >
            <input placeholder="Type the withdrawal amount" />
            <button>Withdraw</button>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRequestLoan(Number(e.target.value));
            }}
          >
            <input placeholder="Type the loan amount" />
            <button>Request Loan</button>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePayLoan(Number(e.target.value));
            }}
          >
            <input placeholder="Type the loan repayment amount" />
            <button>Pay Loan</button>
          </form>

          <button onClick={handleCloseAccount}>Close Account</button>
        </div>
      )}
    </div>
  );
}
