# 🐦 tapi-sdk

**tapi-sdk** is a lightweight, modern, and fully-typed JavaScript/TypeScript SDK for interacting with the [twitterapi.io](https://docs.twitterapi.io/api-reference/endpoint) API.

Built with ❤️ by [codevisionevgen](https://github.com/codevisionevgen)

---

## 🚀 Features

- Supports all endpoints from [twitterapi.io](https://docs.twitterapi.io/api-reference/endpoint)
- Written in TypeScript
- Fully typed responses & requests
- Easy to use and well documented
- Works in Node.js and modern browsers

---

## 📦 Installation

```bash
npm install tapi-sdk
```

---

## 🔧 Usage

```ts
import { TapiSDK } from "tapi-sdk";

const client = new TapiSDK({
  apiKey: "YOUR_TWITTERAPI_IO_KEY",
});

const userTweets = await client.User.getUserLastTweets({
  userName: "test",
});
console.log(userTweets.data.data.tweets[0]);
```

Full documentation available at: https://docs.twitterapi.io/api-reference/endpoint
