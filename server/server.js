const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const acounts = [
    { passportId: 1, cash: 0, credit: 0 },
    { passportId: 2, cash: 0, credit: 0 },
    { passportId: 3, cash: 0, credit: 0 },
];
const app = express();
require('dotenv').config()
// const mongoose = require('mongoose');
// const itemsModel = require('./models/Items.model').itemsModel;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    // itemsModel.find({}, (err, data) => {
    //     if (err) throw err;
    //     res.send(data);
    // })
    res.status(200).json({ "acounts": acounts })
})
app.post('/', (req, res) => {
    if (acounts.find((act) => { return req.body.passportId === act.passportId })) {
        return res.status(404).send('acount exist')
    }
    const acount = {
        passportId: req.body.passportId,
        cash: 0,
        credit: 0,
    }
    acounts.push(acount)
    return res.status(209).json({ acount: acount })
})
app.put('/put', (req, res) => {
    const { passportId, cash, credit, passportIdReciever, depositOrWithdrawal } = req.body;
    let item = acounts.find((item) => {
        return item.passportId === parseInt(passportId)
    })

    if ((!item)) {
        return res.status(400).json({ error: 'Account is not exist' })
    }

    if ((passportId) && (cash) && (cash > 0) && (!passportIdReciever) && (!credit)) {
        if (depositOrWithdrawal === "deposit") {
            item.cash = (item.cash + cash)
            return res.status(200).json({ success: item })
        } else if (depositOrWithdrawal === "withdrawal") {
            let total = item.cash + item.credit - cash
            if (total < 0) {
                return res.status(400).json({ error: 'Account does not have this cash in his account' })
            }
            item.cash = (item.cash - cash)
            return res.status(200).json({ success: item })
        }
        return res.status(400).json({ success: 'ERROR' })

    } else if ((passportId) && (credit) && (credit > 0) && (!passportIdReciever) && (!cash)) {
        item.credit = credit
        return res.status(200).json({ success: item })
    } else if ((passportId) && (cash) && (cash > 0) && (passportIdReciever) && (!credit)) {
        let itemRec = acounts.find((item) => {
            return item.passportId === parseInt(passportIdReciever)
        })
        if ((!itemRec)) {
            return res.status(400).json({ error: 'Account Reciever is not exist' })
        }
        let total = item.cash + item.credit - cash
        if (total < 0) {
            return res.status(400).json({ error: 'Account Sender does not have this cash in his account' })
        }
        item.cash = (item.cash - cash)
        itemRec.cash = (itemRec.cash + cash)
        return res.status(200).json({ success: 'ok' })
    }
    return res.status(400).json({ success: 'ERROR' })
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));