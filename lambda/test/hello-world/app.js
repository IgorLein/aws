// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const _ = require("lodash");
const sendmail = require('sendmail')();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const data = { a: { b: { c: 123456 } } };
        const value = _.get(data, 'a.b.c', 0);
        console.log('test');
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                value
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

exports.sendEmail = async (event) => {
    console.log('send email');

    const { message } = await new Promise((resolve, reject) => {
        sendmail({
            from: 'igor.lein89@gmail.com',
            to: 'igor.lein@plannuh.com',
            subject: 'test sendmail',
            html: 'Mail of test sendmail ',
          }, function(err, reply) {
            if (err) {
                reject(err);
            }
            resolve({ message: 'Function sendEmail has been executed successfully 2!'});
        });
    });

    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message,
            input: event,
          },
          null,
          2
        ),
    };
};
