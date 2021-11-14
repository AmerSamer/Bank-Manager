import React from "react";
import axios from "axios";

const AccountsDepositOrWithdrawal = ({ accounts, cash, credit, passportId, depositOrWithdrawal, addItem }) => {
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
        if (addAccount.cash && addAccount.passportId) {
            const find = accounts.find((f) => f.passportId === addAccount.passportId)
            if (find) {
                if (addAccount.cash > 0) {
                    if (addAccount.depositOrWithdrawal === "deposit") {
                        axios.put(`http://localhost:4001/put`, addAccount)
                            .then((res) => {
                                if (res.status === 200) {
                                    setMsg(`A deposit of NIS ${addAccount.cash}, was made successfully, at ${new Date()}`)
                                    addItem(addAccount)
                                }
                                else {
                                    alert("Something went wrong")
                                }
                            }).catch((err) => {
                                setMsg('ERROR')
                            })
                    } else if (addAccount.depositOrWithdrawal === "withdrawal") {
                        const total = find.cash + find.credit - addAccount.cash
                        if(total >= 0){
                            axios.put(`http://localhost:4001/put`, addAccount)
                            .then((res) => {
                                if (res.status === 200) {
                                    setMsg(`A withdrawal of NIS ${addAccount.cash}, was made successfully, at ${new Date()}`)
                                    addItem(addAccount)
                                }
                                else {
                                    alert("Something went wrong")
                                }
                            }).catch((err) => {
                                setMsg('ERROR')
                            })
                        }else{
                            setMsg(`You does not have enught money in your account to withdrawal ${addAccount.cash} NIS`)
                        }                        
                    } else {
                        setMsg('You should put "deposit" or "withdrawal" To complete')
                    }
                } else {
                    setMsg('You should put a possitive credit amount')
                }
            } else {
                setMsg('passportId Does not Exist!')
            }
        } else {
            setMsg('You Should Fill in all the inputs')
        }

    }
    return (
        <div>
            <br />
            <span style={{color: "black" , fontSize:"30px"}}> Deposit Or Withdrawal</span>
           
            <div>
                passportId: <input type={'number'} name={'passportId'} onChange={addHandler} />
                cash: <input type={'number'} name={'cash'} onChange={addHandler} />
                deposit/withdrawal:<input type={'text'} name={'depositOrWithdrawal'} placeholder={'Enter "deposit"--"withdrawal"'} onChange={addHandler} />
                <input type={'button'} value={'Enter'} onClick={addAccountHandler} />
            </div>
            <div style={{ color: 'green', fontSize: '20px' }}>
                {msg ? msg : ''}
            </div>
        </div>
    )
}

export default AccountsDepositOrWithdrawal