# Toramaru
A discord.js bot that joins your stage channel and sings anime songs 24/7.

## What does it do?
It literally just joins the stage channel specified in `config.js` and starts playing random anime songs from `list.json`

## How to set it up?
You need NodeJS installed to make this work.

### Clone this repo
```sh
$ git clone https://github.com/retraigo/toramaru.git
```

### Install dependencies
```sh
$ npm i
```

### Setup the bot
Add your discord bot token, stage channel ID and the ID of a channel to log song names in. in `config.js`. Remove the `LogChannel` if you do not want to log the song names.
```js
module.exports = {
    Discord: "Discord token here",
    StageChannel: "Stage channel ID here",
    LogChannel: "ID of channel to log songs in", //optional
}
```

### Start up the bot
```sh
$ node index
```

**NOTE:** The bot crashes if an error occurs. So you are adviced to use something like `pm2` which restarts the bot whenever it dies.


## Credits
Anime songs list from [xLasercut/anime-quiz](https://github.com/xLasercut/anime-quiz)