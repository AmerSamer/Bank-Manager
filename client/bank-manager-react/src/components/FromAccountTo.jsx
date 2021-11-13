import React from "react";
import axios from "axios";

const FromAccountTo = ({ accounts, cash, credit, passportId, depositOrWithdrawal, addItem, passportIdReciever }) => {
    const [transferenceAccount, setTransferenceAccount] = React.useState({
        passportId,
        passportIdReciever,
        cash,
    });
    const [msg, setMsg] = React.useState('')

    const transferenceHandler = (e) => {
        setTransferenceAccount({
            ...transferenceAccount,
            [e.target.name]: parseInt(e.target.value)
        })
    }
    const fromAccountToHandler = () => {
        if (transferenceAccount.passportIdReciever && transferenceAccount.cash && transferenceAccount.passportId) {
            const find = accounts.find((f) => f.passportId === transferenceAccount.passportId)
            const find2 = accounts.find((f) => f.passportId === transferenceAccount.passportIdReciever)
            if (find) {
                if (find2) {
                    if(transferenceAccount.cash > 0){
                        axios.put(`http://localhost:4001/put`, transferenceAccount)
                        .then((res) => {
                            if (res.status === 200) {
                                setMsg(`The transfer from ${transferenceAccount.passportId} ID to ${transferenceAccount.passportIdReciever} ID card was successful, at ${new Date()}`)
                                addItem(transferenceAccount)
                            }
                            else {
                                alert("Something went wrong")
                            }
                        }).catch((err) => {
                            setMsg('ERROR')
                        })
                    }else{
                        setMsg('You should transfer a possitive amount')
                    }
                } else {
                    setMsg('passportIdReciever Does not Exist!')
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
            From Account To
            <div>
                <input type={'number'} name={'passportId'} onChange={transferenceHandler} />
                <input type={'number'} name={'passportIdReciever'} onChange={transferenceHandler} />
                <input type={'number'} name={'cash'} onChange={transferenceHandler} />
                <input type={'button'} value={'Enter'} onClick={fromAccountToHandler} />
            </div>
            <div style={{ color: 'green', fontSize: '20px' }}>
                {msg ? msg : ''}
            </div>
        </div>
    )
}

export default FromAccountTo