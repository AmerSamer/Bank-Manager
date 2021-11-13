import React from "react";
import axios from "axios";

const AccountsCredit = ({ cash, credit, passportId, depositOrWithdrawal, addItem }) => {
    const [creditAccount, setCreditAccount] = React.useState({
        passportId,
        credit,
        // depositOrWithdrawal,
    });
    const [msg, setMsg] = React.useState('')

    const addCreditHandler = (e) => {
        setCreditAccount({
            ...creditAccount,
            [e.target.name]: parseInt(e.target.value)
        })
    }
    const addAccountCreditHandler = () => {
        axios.put(`http://localhost:4001/put`, creditAccount)
            .then((res) => {
                if (res.status === 200) {
                    setMsg(`The credit is changed to NIS ${creditAccount.credit}, at ${new Date()}`)
                    addItem(creditAccount)
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
            Account Credit
            <div>
                <input type={'number'} name={'passportId'} onChange={addCreditHandler} />
                <input type={'number'} name={'credit'} onChange={addCreditHandler} />
                {/* <input type={'text'} name={'depositOrWithdrawal'} placeholder={'Enter "deposit" to deposit -- "withdrawal" to withdrawal'} onChange={addHandler} /> */}
                <input type={'button'} value={'Add Credit'} onClick={addAccountCreditHandler} />
            </div>
            <div style={{ color: 'green', fontSize: '20px' }}>
                {msg ? msg : ''}
            </div>
        </div>
    )
}

export default AccountsCredit