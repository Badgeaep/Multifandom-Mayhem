# Multifandom Mayhem Discord Bot

Welcome to your custom Discord bot! This bot is designed to enhance your "Multifandom Mayhem" community with games, roles, and automated setup.

## ✨ Features

- **/trivia**: Play a multifandom trivia game with 5 different categories and growing!
- **/rules**: Display a beautiful embed with your community rules.
- **/roles**: Let users pick their own fandom roles via a selection menu.
- **/setup**: Automatically create a category and "Fun Channels" (Admin only).

## 🚀 Setup Guide

### 1. Discord Developer Portal
1. Go to [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and name it "Multifandom Mayhem".
3. Under **Bot**, click **Reset Token** to get your **Bot Token**.
4. Enable **Message Content Intent** and **Guild Members Intent** under the Bot settings.
5. Under **OAuth2**, copy your **Client ID**.

### 2. Configuration
1. Open the `.env.example` file in the project folder.
2. Rename it to `.env`.
3. Fill in your `TOKEN` and `CLIENT_ID`.
4. (Optional) Provide `GUILD_ID` if you want to test commands only in one server.

### 3. Installation & Running
1. Open your terminal in this folder.
2. Run `npm install` to install dependencies.
3. Run `node deploy-commands.js` to register the slash commands.
4. Run `node index.js` to start the bot!

## 🛡️ Important Notes
- Make sure the bot has **Administrator** permissions (or at least Manage Channels, Manage Roles, and Send Messages).
- The bot's role should be higher than the fandom roles it needs to assign.
