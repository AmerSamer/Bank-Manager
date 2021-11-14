import React from "react";
const SpiAccountDetails = ({ accounts, cash, credit, passportId }) => {
    const [selectAccount, setSelectAccount] = React.useState(0)
    const [showAccount, setShowAccount] = React.useState(null)
    
    const selecterHandle = (e) => {
        setSelectAccount(parseInt(e.target.value))
        showSelecterHandle(parseInt(e.target.value))
    }
    const showSelecterHandle = (ee) => {
        const find = accounts.find((f) => f.passportId === ee)
        setShowAccount(find)
    }
    return (
        <div>
            <div>
                <br />
                <label htmlFor="accounts" style={{color: "black" , fontSize:"30px"}}>Choose an account:</label>
                <select name="accounts" id="accounts" value={selectAccount} onChange={selecterHandle} >
                     {
                        accounts ? accounts.map((acct) => {
                            return (
                                <option key={acct.passportId} value={acct.passportId} >{acct.passportId}</option>
                            )
                        }) : <div>Loading...</div>
                    } 
                </select>
            </div>
            <div style={{color: "blue" , fontSize:"20px"}}>
                {showAccount ? <div>passportId:{showAccount.passportId } , cash:{showAccount.cash} , credit:{showAccount.credit}</div>: ''}
            </div> 
        </div>
    )
}

export default SpiAccountDetails