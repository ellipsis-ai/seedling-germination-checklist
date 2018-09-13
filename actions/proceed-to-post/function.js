function(postChannel, summary, whenToUnload, ellipsis) {
  const moment = require('moment-timezone');
const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);

api.say({ message: 'Got it!' }).then(res => {
  setUpReminder().then(res => {
    postSummary().then(ellipsis.noResponse);                                 
  });
});

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
    args: [{ name: "summary", value: summary }],
    channel: postChannel
  });
}
}
