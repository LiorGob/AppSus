import eventBus from '../services/eventBusService.js'
import { storageService } from '../../../services/storage-service.js'
export const emailService = {
    query,
    getById,
    convertToDate,
    // remove,
    makeId,
    sendEmail,
    unreadMailCount,
    save,
    updateMail,
    getIdxById,
    toggleRead,
   

}

var emails = [

    {
        id: 'avc13',
        from: 'Shirly Aviv Zemach',
        subject: 'Wassap?',
        body: 'Pick up!',
        type: 'outcome',
        isRead: false,
        isStarred: false,
        isDeleted: true,
        sentAt: convertToDate(1551133930595)

    },

    {
        id: 'tyk56',
        from: 'Zoom',
        subject: 'zoom meeting',
        body: 'lior gobari has joined your Personal Meeting Room',
        type: 'income',
        isRead: false,
        isStarred: true,
        isDeleted: false,
        sentAt: convertToDate(1551133930595)
    },
    {
        id: 'ttk86',
        from: 'Hilla',
        subject: 'Did you finish the project?',
        body: 'Please send me the last version',
        type: 'income',
        isRead: false,
        isStarred: true,
        isDeleted: false,
        sentAt: convertToDate(1551133930595)
    },

    {
        id: 'egi26',
        from: 'Zoom Service',
        subject: 'attendees are waiting!‏',
        body: 'Hi there,Please click this URL to start your Zoom meeting: Shirly Aviv zemach Personal Meeting Room, https://us04web.zoom.us/j/7695871766?pwd=eVJFUXA5QnFreVZOQ2FLT0lDNzU1QT09 as your participant lior gobari is waiting.',
        type: 'income',
        isRead: false,
        isStarred: true,
        isDeleted: false,
        sentAt: convertToDate(1551133930591)
    },

    {
        id: 'ekl30',
        from: 'Zara customer service',
        subject: 'Your order is on its way',
        body: 'Your order is on its way ORDER NO. 52213985568',
        type: 'income',
        isRead: false,
        isStarred: false,
        isDeleted: false,
        sentAt: convertToDate(1551133930692)
    },

    {
        id: 'jm158',
        from: 'alondai1',
        subject: 'Meme generator',
        body: 'Hola, alondai1 invited you as a teammate on Meme generator in Zeplin',
        type: 'income',
        isRead: false,
        isStarred: false,
        isDeleted: false,
        sentAt: convertToDate(1551133930681)
    },

    {
        id: 'hm875',
        from: 'Ted',
        subject: 'TED Recommends',
        body: 'Shirly, what did you think of your last recommendation?',
        type: 'income',
        isRead: false,
        isStarred: false,
        isDeleted: false,
        sentAt: convertToDate(1551133930682)
    },

    {
        id: 'imh91',
        from: 'Linkedin',
        subject: 'Noa want to join your network‏',
        body: 'Here a summary of your latest invitations to connect.',
        type: 'income',
        isRead: false,
        isStarred: false,
        isDeleted: false,
        sentAt: convertToDate(1551133930684)
    },
    {
        id: 'iah21',
        from: 'Shirly Aviv Zemach',
        subject: 'Try',
        body: 'I started to write a letter but didn\'t finish',
        type: 'outcome',
        isRead: false,
        isStarred: false,
        isDeleted: false,
        sentAt: convertToDate(1551133930684)
    },


]
const KEY = 'emails'

function convertToDate(date) {
    const dateObject = new Date(date)
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    return humanDateFormat
}

function query() {
    let mails = loadFromStorage(KEY)
    if (!mails || mails.length ===0){
        mails = emails  
        saveToStorage(KEY,mails)
    }
    return Promise.resolve(mails)
}



function getById(emailId) {
return query()
.then(emails=>{
    let email = emails.find(email => email.id === emailId)
    return Promise.resolve(email)
})
    

}
function getIdxById(emailId) {

    return query()
        .then(emails => {
            var idx = emails.findIndex(email => email.id === emailId)

            return Promise.resolve(idx)
        })
}



function save(emailToSave) {
    emails.unshift(emailToSave)
    eventBus.emit('notify', { msg: 'Email sent', type: 'success' })
    console.log('not')
}

function updateMail(emailId,paramToChange,isUnReadClick=true) {
    return getIdxById(emailId)
        .then((emailIdx) => query()
            .then(emails => {
                var currMail = emails[emailIdx]
                if (paramToChange === 'toggleStar') {
                    currMail.isStarred = !currMail.isStarred;
                }
                else if (paramToChange === 'removeMail') {
                    if (currMail.type === 'trash') emails = emails.filter(email => email.id !== emailId);
                    else currMail.type = 'trash';
                }
                else if (paramToChange === 'setRead') {
                    currMail.isRead = isUnReadClick;
                }
                saveToStorage(KEY, emails)
                return Promise.resolve()
            })
        )
}

function toggleRead(emailRead){
    emails.forEach((email)=>{
        if(email.id===emailRead.id){
            emailRead=!emailRead
        }
    })
}


function sendEmail(email) {
    const newMailIncome = {
        id: makeId(),
        type: 'income',
        from: 'Shirly Aviv Zemach',
        subject: email.subject,
        body: email.body,
        isStarred: false,
        isRead: false,
        sentAt:convertToDate(Date.now())
    }

    const newMailOutcome = {
        id:makeId(),
        type: 'outcome',
        from:email.from,
        subject:email.subject,
        body:email.body,
        isStarred: false,
        isRead: true,
        sentAt:convertToDate(Date.now())
    }

    return query()
        .then(emails => {
            emails.unshift(newMailIncome);
            emails.unshift(newMailOutcome);
            saveToStorage(KEY, emails);
            return Promise.resolve();
        })
}


function unreadMailCount() {
let counter = 0
return query()
.then(emails=>{
    emails.forEach(email=>{
        if(!email.isRead) counter++
    })
    return Promise.resolve(counter)
})
}



// UTILS

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
