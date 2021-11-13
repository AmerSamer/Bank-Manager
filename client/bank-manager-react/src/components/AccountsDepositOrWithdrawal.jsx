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
        axios.put(`http://localhost:4001/put`, addAccount)
            .then((res) => {
                if (res.status === 200) {
                    if(addAccount.depositOrWithdrawal === "deposit"){
                        setMsg(`A deposit of NIS ${addAccount.cash}, was made successfully, at ${new Date()}`)
                    }else if(addAccount.depositOrWithdrawal === "withdrawal"){
                        setMsg(`A withdrawal of NIS ${addAccount.cash}, was made successfully, at ${new Date()}`)
                    }
                    addItem(addAccount)
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
            Deposit Or Withdrawal
            <div>
                <input type={'number'} name={'passportId'} onChange={addHandler} />
                <input type={'number'} name={'cash'} onChange={addHandler} />
                <input type={'text'} name={'depositOrWithdrawal'} placeholder={'Enter "deposit"--"withdrawal"'} onChange={addHandler} />
                <input type={'button'} value={'Enter'} onClick={addAccountHandler} />
            </div>
            <div style={{color: 'green' , fontSize:'20px'}}>
                {msg ? msg : ''}
            </div>
        </div>
    )
}

export default AccountsDepositOrWithdrawal