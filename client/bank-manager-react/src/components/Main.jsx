import React from "react";
import axios from "axios";
import AccountsGet from "./AccountsGet";
import AccountsAdd from "./AccountsAdd";
import AccountsDepositOrWithdrawal from "./AccountsDepositOrWithdrawal";
import AccountsCredit from "./AccountsCredit";
import FromAccountTo from "./FromAccountTo";
import SpiAccountDetails from "./SpiAccountDetails";
const Main = () => {
    const [accounts, setAccounts] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:4001/").then((res) => {
            if (res.status === 200) {
                setAccounts(res.data.acounts);
            }
        });
    }, [])

    const addAcctHandler = (acct) => {
        const accountsArrayHelper = [...accounts, acct]
        setAccounts(accountsArrayHelper)
    }
    const updateAcctHandler = (acct) => {
        const find = accounts.find((f) => f.passportId === acct.passportId)
        if (acct.depositOrWithdrawal === "deposit") {
            find.cash = find.cash + acct.cash
        } else if (acct.depositOrWithdrawal === "withdrawal") {
            find.cash = find.cash - acct.cash
        }
        const accountsArrayHelper = [...accounts]
        setAccounts(accountsArrayHelper)
    }
    const creditAccountHandler = (acct) => {
        const find = accounts.find((f) => f.passportId === acct.passportId)
        find.credit = acct.credit
        const accountsArrayHelper = [...accounts]
        setAccounts(accountsArrayHelper)
    }
    const TransferAccountHandler = (acct) => {
        const find = accounts.find((f) => f.passportId === acct.passportId)
        const find2 = accounts.find((f) => f.passportId === acct.passportIdReciever)
        find.cash = find.cash - acct.cash
        find2.cash = find2.cash + acct.cash
        const accountsArrayHelper = [...accounts]
        setAccounts(accountsArrayHelper)
    }
    return (
        <div>
            <span style={{color: "black" , fontSize:"30px"}}> All Accounts</span>
            {
                
                accounts ? accounts.map((item) => {
                    return <AccountsGet key={item.passportId} cash={item.cash} credit={item.credit} passportId={item.passportId} />
                }) : <div>Loading...</div>
            }
            {
                accounts ? <AccountsAdd accounts={accounts} addItem={addAcctHandler} /> : <div>Loading...</div>
            }
            {
                accounts ? <AccountsDepositOrWithdrawal accounts={accounts} addItem={updateAcctHandler} /> : <div>Loading...</div>
            }
            {
                accounts ? <AccountsCredit accounts={accounts} addItem={creditAccountHandler} /> : <div>Loading...</div>
            }
            {
                accounts ? <FromAccountTo accounts={accounts} addItem={TransferAccountHandler} /> : <div>Loading...</div>
            }
           {
                accounts ? <SpiAccountDetails accounts={accounts} addItem={TransferAccountHandler} /> : <div>Loading...</div>
            }
        </div>
    )
}

export default Main