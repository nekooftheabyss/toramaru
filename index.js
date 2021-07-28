const ytdl = require('ytdl-core');
const randumshit = require('./list.json')
const { Discord, StageChannel, LogChannel } = require('./config')
const discord = require('discord.js')
const fetch = require('node-fetch');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus,
} = require('@discordjs/voice');
const process = require('process')

const client = new discord.Client({ intents: ["GUILDS", "GUILD_VOICE_STATES"] })

client.login(Discord)

const player = createAudioPlayer();



async function connectToChannel(channel) {

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {

        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

        return connection;
    } catch (error) {

        connection.destroy();
        console.error(error)
        process.exit(1)
    }
}


async function playSong(queue) {


    let song = queue[Math.floor(Math.random() * queue.length)]
    let playshit


    if (song.src.includes("youtube")) {

        playshit = ytdl(song.src, {
            // filter: 'audio',
            quality: 'highestaudio',
            highWaterMark: 1024 * 1024 * 1024
        })



    }
    else {

        let playshiz = await fetch(song.src)
        playshit = playshiz.body

    }
    const playshit2 = createAudioResource(playshit, {
        inputType: StreamType.Arbitrary,
    });
    if (LogChannel) {
        var logger = client.channels.cache.get(LogChannel)

        logger.send(`Now playing: **${song.title}** from **${song.anime[0]}**`)
    }
    player.play(playshit2);


    return entersState(player, AudioPlayerStatus.Playing, 5e3);


}




client.on('ready', async () => {

    console.log("ready")


    let channel = client.channels.cache.get(StageChannel)
    try {
        await playSong(randumshit)
    }
    catch (e) {
        console.log("there was an error")
        console.error(e)
        process.exit(1)

    }
    try {
        const connection = await connectToChannel(channel);

        const dispatcher = connection.subscribe(player);

        dispatcher.player.on('stateChange', async (oldState, newState) => {

            if (oldState.status == "playing" && newState.status == "idle") {

                console.log("Playing next song")
                try {
                    await playSong(randumshit)
                }
                catch (e) {
                    console.log("there was an error")
                    console.error(e)
                    process.exit(1)

                }

            }

        });
        dispatcher.player.on('error', (error) => {

            console.error(error)

        });

    } catch (error) {

        console.error(error);
        console.log("restart")
        process.exit(1)
    }

})

process.on('uncaughtException', e => {
    console.error(e)
})

process.on('exit', e => {
    console.log(e)
})