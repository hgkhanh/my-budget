## Flask + React + Heroku

## Getting started
### Flask server
```
pipenv install -r requirements.txt
pipenv shell
python app.py
```

See api at `127.0.0.1:5000`, e.g.
`http://127.0.0.1:5000/api/year/2022`

#### Troubleshooting

```
## --system is intended to be used for pre-existing Pipfile installation
# Check where virtual venv is
pipenv --venv
> /home/0816keisuke/.local/share/virtualenvs/dir_python-5Rka8dPB

# Remove existing virtualenv
cd ~/.local/share/virtualenvs
rm -rf dir_python-5Rka8dPB

# Then restart the steps above
```

### React client
```
cd client/
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
* Run deploy (via github) on heroku 

## API specs

