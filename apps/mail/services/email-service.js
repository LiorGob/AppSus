import {eventBusService} from '../services/eventBusService.js'
import {storageService} from '../../../services/storage-service.js'
export const emailService = {
    query,
    getById,
    convertToDate,
    remove,
    makeId,
    sendEmail,
    unreadMailCount,
    save,
    updateRead,
    getIdxById
   
}

var emails = [

    {
        id:'avc13',
        from: 'Shirly Aviv Zemach',
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        isStarred: false,
        sentAt: convertToDate(1551133930595)

    },

    {
        id:'tyk56',
        from: 'Zoom',
        subject: 'zoom meeting invitation',
        body: 'lior gobari has joined your Personal Meeting Room',
        isRead: false,
        sentAt: convertToDate(1551133930595)
    },

    {
        id:'egi26',
        from: 'Zoom Service',
        subject: 'Your meeting attendees are waiting!‏' ,
        body: 'Hi there,Please click this URL to start your Zoom meeting: Shirly Aviv zemach Personal Meeting Room, https://us04web.zoom.us/j/7695871766?pwd=eVJFUXA5QnFreVZOQ2FLT0lDNzU1QT09 as your participant lior gobari is waiting.',
        isRead: false, 
        isStarred: false,
        sentAt: convertToDate (1551133930591)
    },

    {
        id:'ekl30',
        from: 'Zara customer service',
        subject: 'Your order is on its way',
        body: 'Your order is on its way ORDER NO. 52213985568',
        isRead: false,
        isStarred: false,
        sentAt:convertToDate (1551133930692)
    },

    {
        id:'jm158',
        from: 'alondai1',
        subject: 'alondai1 invited you to Meme generator',
        body: 'Hola, alondai1 invited you as a teammate on Meme generator in Zeplin',
        isRead: false,
        isStarred: false,
        sentAt:convertToDate(1551133930681)
    },

    {
        id:'hm875',
        from: 'Ted',
        subject: 'TED Recommends',
        body: 'Shirly, what did you think of your last recommendation?',
        isRead: false,
        isStarred: false,
        sentAt: convertToDate(1551133930682)
    },

    {
        id:'imh91',
        from: 'Linkedin',
        subject: 'ori and Noa want to join your network‏',
        body: 'Here a summary of your latest invitations to connect.',
        isRead: false,
        isStarred: false,
        sentAt: convertToDate(1551133930684)
    }


]
const KEY = 'emails'

function convertToDate(date){
const dateObject = new Date(date)

const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
return humanDateFormat
}

function query (){
   const emailsFromStorage = loadFromStorage(KEY)
   if(emailsFromStorage) emails=emailsFromStorage
    return Promise.resolve(emails)
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getById(emailId){
 
        let email = emails.find(email=> email.id===emailId)
        return Promise.resolve(email)
   
}
function getIdxById(emailId) {
  
    return query()
        .then(emails => {
            var idx = emails.findIndex(email => email.id === emailId)
          
            return Promise.resolve(idx)
        })
}

function remove(emailId){
    emails=emails.filter(email=>email.id !==emailId)
}

function save(emailToSave){
  emails.unshift(emailToSave)
   
}

// function emailRead(emailRead) {
//     emails.forEach((email) => {
//         if (email.id === emailRead.id) {
//             if (email.isRead) return
//             email.isRead = !email.isRead
//         }
//     })
// }

function updateRead(mail, isRead = true) {
    
    return getIdxById(mail.id)
        .then((mailIdx) => query()
            .then(mails => {
                var currMail = mails[mailIdx]
                console.log("updateReaden -> isReadenClick", isRead)
                currMail.isRead = isRead;
               saveToStorage('emails', mails)
                return Promise.resolve()
            }))

}


function sendEmail(email){
    const emailToAdd ={
        ...email,
        id:makeId(),
        from,
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt: convertToDate(Date.now())

    }
    emails = [emailToAdd,...emails]
}
window.theEmails = emails



function unreadMailCount(){
    let count=emails.filter(function(email){ return !email.isRead}).length;
    if(!count) return 0;
    return count;
}

function _saveEmailsToStorage() {
    saveToStorage(KEY, books)
  }
/////////////////
  
  function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  }
  
  function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
  }
