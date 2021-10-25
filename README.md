# Facebook-Messenger-JSON-viewer
This tool lets you read the chats of your downloaded Facebook data. 
Useful if you’ve deleted Facebook, but downloaded your JSON data.

The inspiration came from [this repo](https://github.com/vdavid/facebook-messenger-json-viewer).
They also offer a [hosted version](https://simonwong.io/fb_chat_viewer/) of their tool to let you try it. All the data is processed client-side, so don’t about anyone reading your chats. 😁

Raw JSON is hard to read, and it’s in reverse chronological order:
![raw json](img/rawjson.png)

Using this tool, it looks better:
![viewer](img/viewer.png)

## How to use

A quick demo:

![demo](img/demo.gif)

### Step 1.
Clone this repo and host it via a web server.

### Step 2.
Open `index.html` in your browser.

### Step 3
Choose your JSON file.

### Step 4
Select which participant you are. This makes your messages blue bubbles on the right side, and everyone else’s grey on the left.

## Ideas to further develop this tool
* Do some advanced searching/filtering on the chat data in JSON format using my [Facebook Messenger tool](https://github.com/simonwongwong/Facebook-Messenger-Statistics/) and then view the messages using this viewer
* Add a slider or calendar picker to filter dates in the chat (not supported by Facebook Messenger unless you want to spend hours scrolling and loading).
* Functionality for viewing images/files sent in chat

## Bugs
* text decoding symbols and emojis currently not working
