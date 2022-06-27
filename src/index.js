// Import configuration files
const config = require("./config");
const embed = require("./embed");
const lang = require("./lang");

// Import libraries
const util = require("util");
const discord = require("discord.js");

// Create Discord Bot
let Client = new discord.Client({
	intents: [
		discord.Intents.FLAGS.GUILDS,
		discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		discord.Intents.FLAGS.GUILD_MEMBERS,
		discord.Intents.FLAGS.GUILD_MESSAGES,
		discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]
});

// Login to the bot
Client.login(config.token);

Client.on("ready", () => {
	// Set the activity
	Client.user.setActivity({
		name: util.format(lang.statusInfo, config.emoji)
	});
});

// Listen for a reaction
Client.on("messageReactionAdd", Reaction => {
	// Discard if its not the star emoji
	if (Reaction.emoji.name !== config.emoji) return false;
	// Notify and discard if the guild is not configured
	if (config.guilds[Reaction.message.guild.id] === undefined) {
		Reaction.message.reply(lang.notConfigured);
		return false;
	};
	// If it has more than one reaction discard so we don't send it twice
	if (Reaction.count !== 1) return false;
	// If the author is the bot discard
	if (Reaction.message.author.id === Client.user.id) return false;
	// If the channel is the starboard channel discard
	if (Reaction.message.channel.id === config.guilds[Reaction.message.guild.id]) return false;
	// Fetch the channel and send the message to the starboard
	Reaction.message.guild.channels.cache.get(
		config.guilds[Reaction.message.guild.id]
	).send(
		embed(Reaction.message)
	).catch(Error => {
		// Notify incase of an error
		Reaction.message.reply({
			embeds: [{
				title: lang.starboardError,
				color: 0xFF0000,
				description: "```js\n" + Error + "\n```"
			}]
		});
	});
});