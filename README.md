# RPLDanger-Bot
> A Discord Bot, For RPL Danger Discord Sever.

Before you start please install the packages using yarn, and setup the `.env` config file.
## Step 1: Install yarn package manager
First, install Yarn globally using npm and then install the required packages:
```
npm i -g yarn
yarn install
```
## Step 2: Create the `.env` file
Next, create a `.env` file in the root directory of your project and add the following environment variables:
```
TOKEN="YOUR_DISCORD_BOT_TOKEN"
CLIENT_ID="YOUR_CLIENT_ID"
MONGODB_URI="YOUR_MONGODB_URI"
INSTAGRAM_USERNAME="YOUR_INSTAGRAM_USERNAME"
INSTAGRAM_PASSWORD="YOUR_INSTAGRAM_PASSWORD"
```
Replace the placeholder values with your actual credentials.

# Running the bot
## Run Development
```
yarn run dev
```
## Build and Run
```
yarn run build
yarn run app
```