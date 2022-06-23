const User = require('../models/user');

const { google } = require('googleapis');
const url = require('url');
const people = google.people('v1');
const keys = require('../../../client_secret_71355468852-sn95i88abimod5lsnctrcsfpdopbmp9s.apps.googleusercontent.com.json').web;

const oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
);

google.options({ auth: oauth2Client });
const scopes = [
    'https://www.googleapis.com/auth/user.emails.read',
    'openid',
    'https://www.googleapis.com/auth/userinfo.profile',
];

const authorizedUrl = oauth2Client.generateAuthUrl({
    scope: scopes
});

class AuthenticationController {

    //[GET] /login
    async googleLogin(req, res) {
        res.redirect(authorizedUrl)
    }

    //[GET] /logout
    logout(req, res) {
        req.session = null;
        res.redirect('/index');
    }

    //[GET] /oauth2callback
    async googleCallback(req, res) {
        try {
            const qs = new url.URL(req.url, 'http://localhost:3000')
                .searchParams;
            const { tokens } = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens;
            const user = await people.people.get({
                resourceName: 'people/me',
                personFields: ['emailAddresses', 'names', 'photos'],
            });

            req.session = {
                email: user.data.emailAddresses[0].value,
                username: user.data.names[0].displayName,
                avatar: user.data.photos[0].url
            }
            
            console.log(req.session);
            res.redirect('todo')

        } catch (error) {
            console.log(error);
            res.redirect('index')
        }
    }
}

module.exports = new AuthenticationController;