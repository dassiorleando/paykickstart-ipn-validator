# PayKickStart IPN Validator 

[![Build Status](https://travis-ci.com/dassiorleando/paykickstart-ipn-validator.svg?branch=master)](https://travis-ci.com/dassiorleando/paykickstart-ipn-validator) ![npm](https://img.shields.io/npm/dt/paykickstart-ipn-validator) ![npm](https://img.shields.io/npm/v/paykickstart-ipn-validator)


A zero-dependency package that verifies incoming IPN notifications from PayKickStart.

To better the funel of your App sold via a third party service you often need to do further actions once payment/refund/subscribe/unsubscribe operations are made via your sales/dashboard/landing pages, doing this without confirming the validity of the notification will fail your workflow.


## Install

```
$ npm install paykickstart-ipn-validator --save
```


## Usage

```js
const paykickstartIPNValidator = require('paykickstart-ipn-validator');

paykickstartIPNValidator(ipn, secret);
// => true or false

paykickstartIPNValidator(ipn);  // Assuming the secret is defined by the env var
// => true or false
```

**Note:** The secret is optional, its default value is the env var *PAYKICKSTART_SECRET_KEY*. Good so that you keep your precious secretKey out of your your repo.

## License
MIT
