function(postChannel, whenToUnload, whenLoaded, chambersFull, ellipsis) {
  const moment = require('moment-timezone');
const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const client = require('google-client')(ellipsis);
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const summary = require('summary')(ellipsis);

api.say({ message: 'Got it!' })
  .then(saveToGoogleSheet)
  .then(setUpReminder)
  .then(postSummary)
  .then(ellipsis.noResponse);

function saveToGoogleSheet() {
  const format = 'YYYY-MM-DD hh:mm:ss a';
  const timestamp = moment.tz(ellipsis.teamInfo.timeZone).format(format);
  const chambersLoadedTimestamp = moment(whenLoaded).tz(ellipsis.teamInfo.timeZone).format(format)
  const slackHandle = ellipsis.userInfo.messageInfo.details.name;
  const slackUserId = ellipsis.userInfo.messageInfo.userId;
  const values = [
    [timestamp, chambersLoadedTimestamp, chambersFull, slackHandle, slackUserId]
  ];
  const sheetId = ellipsis.env.SEEDLING_GERMINATION_CHECKLIST_SHEET_ID;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=0`;

  return client.authorize().then(() => {
    const request = {
      spreadsheetId: sheetId,
      range: ellipsis.env.SEEDLING_GERMINATION_CHECKLIST_SHEET_NAME,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values
      },
      auth: client,
    };
    return sheets.spreadsheets.values.append(request).then(res => console.log(JSON.stringify(res.data.updated, 2)));
  });
}

function setUpReminder() {
  const recurrence = `every day at ${moment(whenToUnload).tz(ellipsis.teamInfo.timeZone).format('h:mma')} once`;
  return api.schedule({
    actionName: 'remind-to-unload',
    channel: postChannel,
    recurrence: recurrence
  });
}

function postSummary() {
  return api.run({
    actionName: "post-checklist-summary",
    args: [{ name: "summary", value: summary.summaryFor(whenLoaded, chambersFull, postChannel) }],
    channel: postChannel
  });
}
}
