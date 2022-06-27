const Discord = require("discord.js");
const lang = require("./lang");

module.exports = function(Message) {
	let Embed = new Discord.MessageEmbed();
	Embed.setDescription(Message.content);
	Embed.setColor(0xFFAC33);
	Embed.setAuthor({
		name: Message.author.tag,
		iconURL: Message.author.displayAvatarURL()
	});
	Embed.setTitle(lang.jumpTo);
	Embed.setURL(Message.url);
	Embed.setFooter({
		text: "#" + Message.channel.name
	});
	Embed.setTimestamp(Message.createdTimestamp);

	return {
		embeds: [ Embed ]
	}
}