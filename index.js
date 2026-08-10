const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde con Pong para verificar que el bot funciona'),
];

client.once('clientReady', async () => {
    console.log(`¡Bot encendido exitosamente como ${client.user.tag}!`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Registrando comandos instantáneos para tu servidor...');
        
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, '1481110551101833268'),
            { body: commands },
        );

        console.log('¡Comandos registrados en el servidor al instante!');
    } catch (error) {
        console.error('Error al registrar comandos:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('¡Pong! El bot está online y funcionando.');
    }
});

client.login(process.env.DISCORD_TOKEN);
