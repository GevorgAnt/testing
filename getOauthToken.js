const {google} = require('googleapis');

const express = require('express')
const app = express()
const port = 3000



const oauth2Client = new google.auth.OAuth2(
    "623612219733-qokuoa4p7mo917gmgnaeelj7bhiiab2s.apps.googleusercontent.com",
    "KWs4POGMLktHn0XIxC6HwUgL",
    "http://localhost:3000/oauth2callback"
);

const scopes = [
    "https://www.googleapis.com/auth/youtube",
];

async function getToken(code) {
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    console.log(tokens)
    return tokens;
}

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes
});
console.log(url)



app.get('/oauth2callback', (req, res) => {
    console.log(req.query.code)


    getToken(req.query.code)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

