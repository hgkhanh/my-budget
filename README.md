## Flask + React + Heroku

## Getting started
### Flask server
```
pipenv shell
python app.py
```

### React client
```
cd client
yarn start
```

## Deploy
Build React Client
* Build client
```
cd client
yarn build
```
* Update `package.json -> proxy` with your app's public url (e.g. `abc-xys.heroku.com`)
* Remove `./client/build` from `.gitignore` (We use static file)
* Git commit the newly built `build` folder and package.json
* Run deploy (via github) on heroku/netlify 
