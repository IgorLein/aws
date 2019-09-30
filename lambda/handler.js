'use strict';

const _ = require("lodash");
const sendmail = require('sendmail')();

module.exports.hello = async event => {
  const data = { a: { b: { c: 12345678 } } };
  const value = _.get(data, 'a.b.c', 0);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!' + ' ' + value,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.testPostRequest = async event => {
  const parsedBody = JSON.parse(event.body);
  const { param } = parsedBody;
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your POST request function executed successfully!',
        input: event,
        param
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.sendEmail = async event => {
  const parsedBody = JSON.parse(event.body);
  const { to, subject, data } = parsedBody;
  const { amount, invoiceId } = data;

  const { message } = await new Promise((resolve, reject) => {
      sendmail({
          from: 'igor.lein89@gmail.com',
          to,
          subject,
          html: `Invoice: ${invoiceId} Amount: ${amount}`
        }, function(err, reply) {
          if (err) {
              reject(err);
          }
          resolve({ message: 'Function sendEmail has been executed successfully!'});
      });
  });

  return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          message,
          input: event,
        },
        null,
        2
      ),
  };
}
