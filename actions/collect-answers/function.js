function(whenLoaded, chambersFull, postChannel, ellipsis) {
  const moment = require('moment-timezone');

const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;
const format = 'dddd, MMMM Do YYYY [at] h:mma z';
const whenLoadedMoment = whenLoadedInPast();
const whenToUnload = moment(whenLoadedMoment).add(1, 'day');
const whenToUnloadText = whenToUnload.format(format);
const whenLoadedText = whenLoadedMoment.format(format);

const summary = `
The Seedling Germination Checklist has been completed by <@${user}>:
:white_check_mark:  Germination chambers were loaded \`${whenLoadedText}\`
${checkFor(chambersFull)}   Germination chambers are full

:alarm_clock: I will remind ${postChannel} to unload the chambers \`${whenToUnloadText}\`.
`;

ellipsis.success(summary, {
  choices: [
    { 
      label: '👍 Post it',
      actionName: 'proceed-to-post',
      args: [
        { name: 'summary', value: summary },
        { name: 'postChannel', value: postChannel },
        { name: 'whenToUnload', value: whenToUnload.toISOString() }
      ]
    },
    {
      label: '🖊 Change my answers',
      actionName: 'collect-answers',
      args: [
        { name: 'postChannel', value: postChannel }
      ]
    }
  ]
})

function whenLoadedInPast() {
  const whenLoadedMoment = moment(whenLoaded).tz(ellipsis.teamInfo.timeZone);
  // ensure it is in the past
  while (whenLoadedMoment > moment()) {
    whenLoadedMoment.subtract(1, 'day');
  }
  return whenLoadedMoment;
}

function checkFor(bool) {
  return bool? ":white_check_mark:" : ":x:";
}
}
