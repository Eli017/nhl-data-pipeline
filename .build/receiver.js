"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiver = void 0;
// Import the AWS SDK
var AWS = require("aws-sdk");
// Create an SQS instance
var sqs = new AWS.SQS();
// Initialize DynamoDB client
var dynamoDb = new AWS.DynamoDB.DocumentClient();
// Lambda handler function
var receiver = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, record, link, response, error_1, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _i = 0, _a = event.Records;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                record = _a[_i];
                link = JSON.parse(record.body);
                // TODO: Add your custom logic here to respond to the message
                //   // Delete the processed message from the SQS queue
                //   await sqs.deleteMessage({
                //     QueueUrl: record.eventSourceARN,
                //     ReceiptHandle: record.receiptHandle
                //   }).promise();
                //   console.log('Deleted message:', message);
                return [4 /*yield*/, saveLinkToDynamoDB(link)];
            case 2:
                // TODO: Add your custom logic here to respond to the message
                //   // Delete the processed message from the SQS queue
                //   await sqs.deleteMessage({
                //     QueueUrl: record.eventSourceARN,
                //     ReceiptHandle: record.receiptHandle
                //   }).promise();
                //   console.log('Deleted message:', message);
                _b.sent();
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'SQS Message received!',
                        input: event,
                    }),
                };
                callback(null, response);
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error('Error processing message:', error_1);
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: 'SQS Message Not Processed',
                        input: event,
                    }),
                };
                callback(null, response);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.receiver = receiver;
// Function to save the link to DynamoDB
var saveLinkToDynamoDB = function (link) { return __awaiter(void 0, void 0, void 0, function () {
    var params, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: 'Links',
                    Item: link,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamoDb.put(params).promise()];
            case 2:
                _a.sent();
                console.log('Link saved to DynamoDB:', link);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error saving link to DynamoDB:', error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=receiver.js.map