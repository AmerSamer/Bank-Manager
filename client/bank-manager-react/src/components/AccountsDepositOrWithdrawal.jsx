import React from "react";
import axios from "axios";

const AccountsDepositOrWithdrawal = ({ cash, credit, passportId, depositOrWithdrawal, addItem }) => {
    const [addAccount, setAddAccount] = React.useState({
        passportId,
        cash,
        depositOrWithdrawal,
    });
    const [msg, setMsg] = React.useState('')

    const addHandler = (e) => {
        setAddAccount({
            ...addAccount,
            [e.target.name]: ((e.target.value === "deposit" || e.target.value === "withdrawal") ? e.target.value : parseInt(e.target.value))
        })
    }
    const addAccountHandler = () => {
        // console.log(addAccount);
        axios.put(`http://localhost:4001/put`, addAccount)
            .then((res) => {
                if (res.status === 200) {
                    setMsg('Account Edited Successfully :)')
                    addItem(addAccount)
                    // console.log('15');
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                setMsg('ERROR')
            })
    }
    return (
        <div>
            <div>
                <input type={'number'} name={'passportId'} onChange={addHandler} />
                <input type={'number'} name={'cash'} onChange={addHandler} />
                <input type={'text'} name={'depositOrWithdrawal'} placeholder={'Enter "deposit" to deposit -- "withdrawal" to withdrawal'} onChange={addHandler} />
                <input type={'button'} value={'Enter'} onClick={addAccountHandler} />
            </div>
            <div>
                {msg ? msg : ''}
            </div>
        </div>
    )
}

export default AccountsDepositOrWithdrawal