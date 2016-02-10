/* eslint-env browser, jquery */
/**
 * Side comments for paragraphs and figures.
 */

import Firebase from 'firebase'

const fbRef = new Firebase('https://kodeklubben-comments.firebaseio.com/')
const path = urlPath(window.location.href)
const commentsRef = fbRef.child(path)

// login is persistent (stored in local storage)
let auth = fbRef.getAuth()
if (!auth) {
  fbRef.authAnonymously((err, authData) => {
    if (err) {
      console.log('Login to firebase comments db failed.', err)
    } else {
      // assume comment-clicks comes after firebase have had time to authenticate
      auth = authData
    }
  })
}

$('p, figure').each((i, p) => {
  p.hashCode = hashCode(p.innerHTML)
  commentsRef.child(p.hashCode).on('value', (snap) => {
    console.log(getComments(snap))
  })
}).click(function () {
  commentsRef.child(this.hashCode).child(auth.uid).push({
    time: Firebase.ServerValue.TIMESTAMP,
    comment: 'asdf'
  })
})

function hashCode (str) {
  if (typeof str !== 'string' || str.length === 0) {
    return 0
  }
  const len = str.length
  let hash = 0
  for (let i = 0; i < len; i++) {
    let chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0  // Convert to 32bit integer
  }
  return hash
}

function urlPath (url) {
  let a = document.createElement('a')
  a.href = url
  return a.pathname.replace(/[\.\#\$\[\]]/g, '')
}

function getComments (snap) {
  const commentsRoot = snap.val()
  let comments = []
  if (commentsRoot) {
    for (const userKey in commentsRoot) {
      const userComments = commentsRoot[userKey]
      for (const commentKey in userComments) {
        const comment = userComments[commentKey]
        comments.push(comment)
      }
    }
    comments.sort((a, b) => {
      if (a.time < b.time) {
        return -1
      } else if (a.time > b.time) {
        return 1
      }
      return 0
    })
  }
  return comments
}
