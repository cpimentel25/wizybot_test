<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Getting Started

To get started with this project, follow the steps below:

### Cloning the repository

```bash
$ git clone <repository-url>
$ cd <repository-directory>
```

## Installation

```bash
$ npm install
```

## Installing additional libraries
This project uses openai, openexchange, and axios libraries. You can install them using the following commands:

```bash
$ npm install openai
$ npm install openexchangerates
$ npm install axios
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Open Exchange

The free tier of Open Exchange Rate API only supports conversion from 'USD'. The implementation for currency conversion is as follows:


```javascript
const response = await axios.get('https://openexchangerates.org/api/latest.json', {
                params: {
                    app_id: process.env.OPEN_EXCHANGE_APP_ID,
                },
            });

const rates = response.data.rates;
const exchangeRate = rates[args.toCurrency]
const convertedAmount = args.amount * exchangeRate;
return JSON.stringify({ convertedAmount })
```

Or if you want to use the paid tier, the API call would be as follows:

```javascript
const convert = await axios.get(`https://openexchangerates.org/api/convert/${args.amount}/${args.fromCurrency}/${args.toCurrency}`, {
                params: {
                    app_id: process.env.OPEN_EXCHANGE_APP_ID,
                },
            });

```

## Chatbot Functionality

This project includes a chatbot that can help you find products based on your queries. The chatbot is accessible through the following endpoint:

### Endpoint

```bash
POST http://localhost:3000/chatbot
```


### Request

When running the application locally, you can send a POST request to the chatbot endpoint with a JSON body containing your query. For example:

```json
{
  "query": "I am looking for a phone"
}
```

### Example Response
The chatbot will respond with a list of product options. Here is an example response:

```json
Here are a couple of options you might be interested in:

1. **[iPhone 12
](https: //wizybot-demo-store.myshopify.com/products/iphone-12)**
   - **Price:** 900.0 USD (Discount available) 
   - **Colors Available:** Black, Blue, Red, Green, White
   - **Capacity Options:** 64GB,
128GB
   - ![iPhone 12
](https: //cdn.shopify.com/s/files/1/0779/8125/3922/files/ScreenShot2023-06-21at4.49.19PM.png?v=1687384318)

2. **[iPhone 13
](https: //wizybot-demo-store.myshopify.com/products/iphone-13)**
   - **Price:** 1099.0 USD (Discount available)
   - **Colors Available:** Black, Blue
   - **Capacity Options:** 256GB,
128GB
   - ![iPhone 13
](https: //cdn.shopify.com/s/files/1/0779/8125/3922/files/ScreenShot2023-06-21at5.00.26PM.png?v=1687384930)

You can check out more details and make a purchase through the provided links! If you need more information or further assistance, just let me know.

```

This response provides detailed information about the products, including prices, available colors, capacity options, and images.

## Example

Here are a couple of options you might be interested in:

#### iPhone 12
- Price: 900.0 USD (Discount available)
- Colors Available: Black, Blue, Red, Green, White
- Capacity Options: 64GB, 128GB

<img src="https://cdn.shopify.com/s/files/1/0779/8125/3922/files/ScreenShot2023-06-21at4.49.19PM.png?v=1687384318" alt="iPhone 12" width="300" />

#### iPhone 13
- Price: 1099.0 USD (Discount available)
- Colors Available: Black, Blue
- Capacity Options: 256GB, 128GB

<img src="https://cdn.shopify.com/s/files/1/0779/8125/3922/files/ScreenShot2023-06-21at5.00.26PM.png?v=1687384930" alt="iPhone 13" width="300" />

You can check out more details and make a purchase through the provided links! If you need more information or further assistance, just let me know.

## Chatbot Query Testing

A series of query tests were performed on the chatbot using various prompts to evaluate its functionality and response accuracy. Below are some examples of the queries used and the corresponding results obtained:

1. **Query:** "I am looking for a present for my dad"
   - **Result:** Great! Could you please provide me with some details about your dad's interests or any specific category you have in mind for the present? This will help narrow down the search and find something he'll love.

2. **Query:** "How much does a watch costs?"
   - **Result:** Sure, I can help you with that. Could you please specify the brand or type of watch you are interested in?

3. **Query:** "What is the price of the watch in Euros"
   - **Result:** Sure, I can help with that. Please provide the details of the watch you'd like to inquire about, including its name or any specific model information.
  
4. **Query:** "How many Canadian Dollars are 350 Euros"
   - **Result:** 350 Euros are equivalent to approximately 478.94 Canadian Dollars.

These tests helped validate the behavior and accuracy of the chatbot in product search and recommendation.

## Installation of CSV to JSON Conversion Library

To simulate a product database and conduct query tests on the chatbot, a library was utilized to convert a CSV file to JSON format. Below is the script used for this conversion:

```javascript
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';

const csvFilePath = path.resolve(__dirname, 'products_list.csv');
const jsonFilePath = path.resolve(__dirname, 'products_list.json');

const products = [];

fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    products.push(row);
  })
  .on('end', () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(products, null, 2));
    console.log('CSV file successfully converted to JSON');
  });
```

## Swagger Documentation
This project uses Swagger to provide interactive API documentation. Swagger is a powerful tool that helps visualize and interact with the API's resources without having to dig into the code.

### Accessing Swagger
To access the Swagger documentation for this project, follow these steps:

1. Ensure that the project is running locally.
2. Open a web browser.
3. Navigate to http://localhost:3000/api.

### Exploring Endpoints
Once you've accessed the Swagger documentation, you'll see a list of available endpoints along with their descriptions and request/response schemas. Here's how you can interact with the documentation:

- Explore Endpoints: Click on any endpoint to expand it and view its details, including available HTTP methods, parameters, and response examples.

-  Try it Out: For endpoints that accept request bodies, you can click on the "Try it out" button to interactively enter input data and execute the request.

- View Responses: After executing a request, you'll see the response status code, headers, and body. This helps you understand how the API behaves without writing any code.

#### Testing Endpoints
Swagger not only provides documentation but also allows you to test endpoints directly from the browser. You can experiment with different inputs and observe the responses in real-time.

### Conclusion
Swagger makes it easy to understand, test, and integrate with APIs. Whether you're a developer exploring the API for the first time or a tester validating endpoints, Swagger provides a user-friendly interface to interact with the API effortlessly.