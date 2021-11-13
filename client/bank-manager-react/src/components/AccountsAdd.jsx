import React from "react";
import axios from "axios";

const AccountsAdd = ({ cash, credit, passportId, addItem }) => {
    const [addAccount, setAddAccount] = React.useState({
        passportId,
        cash: 0,
        credit: 0
    });
    const [msg, setMsg] = React.useState('')

    const addHandler = (e) => {
        setAddAccount({
            ...addAccount,
            [e.target.name]: parseInt(e.target.value)
        })
    }
    const addAccountHandler = () => {
        axios.post(`http://localhost:4001/`, addAccount)
            .then((res) => {
                if (res.status === 209) {
                    setMsg('Account Added Successfully :)')
                    addItem(addAccount)
                }
                else {
                    alert("Something went wrong")
                }
            }).catch((err) => {
                setMsg('Account Exist')
            })
    }
    return (
        <div>
            Add New Account
            <div>
                <input type={'number'} name={'passportId'} onChange={addHandler} />
                {/* <input type={'number'} name={'cash'} value={editItem.price} onChange={textHandler} /> */}
                {/* <input type={'text'} placeholder={'Enter "deposit" to deposit -- "withdrawal" to withdrawal'} onChange={textHandler} /> */}
                <input type={'button'} value={'Add'} onClick={addAccountHandler} />
            </div>
            <div>
                {msg ? msg : ''}
            </div>
        </div>
    )
}

export default AccountsAdd