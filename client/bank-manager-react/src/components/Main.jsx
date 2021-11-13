import React from "react";
import axios from "axios";
import AccountsGet from "./AccountsGet";
import AccountsAdd from "./AccountsAdd";
import AccountsDepositOrWithdrawal from "./AccountsDepositOrWithdrawal";
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
        const accountsArrayHelper = [...accounts , acct]
        setAccounts(accountsArrayHelper)
    }
    const updateAcctHandler = (acct) => {
        const find = accounts.find((f)=> f.passportId === acct.passportId)
        if(acct.depositOrWithdrawal === "deposit"){
            find.cash = find.cash + acct.cash 
        }else if (acct.depositOrWithdrawal === "withdrawal") {
            find.cash = find.cash - acct.cash 
        }
        // console.log(acct.passportId);
        const accountsArrayHelper = [...accounts]
        setAccounts(accountsArrayHelper)
    }
    return (
        <div>
            {
                accounts ? accounts.map((item) => {
                    return <AccountsGet key={item.passportId} cash={item.cash} credit={item.credit} passportId={item.passportId} />
                }) : <div>Loading...</div>
            }
            {
                accounts ? <AccountsAdd addItem={addAcctHandler}/> : <div>Loading...</div>
            }
            {
                accounts ? <AccountsDepositOrWithdrawal addItem={updateAcctHandler}/> : <div>Loading...</div>
            }
            {
                // accounts.acounts ? accounts.acounts.map((item) => {
                //     return <AccountsAdd key={item.passportId} cash={item.cash} credit={item.credit} passportId={item.passportId} />
                // }) : <div>Loading...</div>
            }
        </div>
    )
}

export default Main