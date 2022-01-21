const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
    fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

const REGION = "eu-west-1"; //e.g., "us-east-1"
const BUCKET_NAME = "downloads.openhwgroup.org";
const IDENTITY_POOL_ID = "eu-west-1:ca66c297-2942-442e-842c-0de8834c82ce";
// TODO: Derive parameter from bucket description in the bucket itself.
const SUB_FOLDERS = [{ "id": "core-v-mcu", "title": "CORE-V MCU", "downloads": [] }, { "id": "cva6", "title": "CVA6", "downloads": [] }];

const s3 = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: IDENTITY_POOL_ID,
    }),
});

const get_content = async (prefix) => {
    try {
        const data = await s3.send(
            new ListObjectsCommand({ Bucket: BUCKET_NAME, Prefix: prefix })
        );

        return data.Contents.reduce((pv, cv) => {
            // remove the prefix
            cv.Key = cv.Key.substring(prefix.length + 1);
            console.log(cv);
            if (cv.Key) {
                return [...pv, cv];
            } else {
                return pv;
            }
        }, []);
    } catch (err) {
        return console.error("There was an error listing the bucket: " + err.message);
    }
}

var base = "https://s3.eu-west-1.amazonaws.com/downloads.openhwgroup.org/";
var app = new Vue({
    el: '#vapp',
    delimiters: ['[[', ']]'],
    data: {
        messages: SUB_FOLDERS,
        base: base
    }
})

SUB_FOLDERS.forEach((f, i) => {
    get_content(f.id).then(value => {
        console.log(value);
        app.messages[i] = f;
        app.messages[i].downloads = value;
    }, reason => {
        console.error(reason);
    });
});