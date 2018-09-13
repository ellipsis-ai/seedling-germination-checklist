/*
@exportId RLUpoF-hTZu1V5OOKRRzHw
*/
module.exports = (function() {
const moment = require('moment-timezone');
const format = 'dddd, MMMM Do YYYY [at] h:mma z';

return ellipsis => {
  return {
    summaryFor: summaryFor,
    whenLoadedInPast: whenLoadedInPast,
    formatTimestamp: formatTimeStamp
  };
  
  function formatTimeStamp(ts) {
    return ts.format(format);
  }
  
  function summaryFor(whenLoaded, chambersFull, postChannel) {
    const channel = ellipsis.userInfo.messageInfo.channel;
    const user = ellipsis.userInfo.messageInfo.userId;
    const format = 'dddd, MMMM Do YYYY [at] h:mma z';
    const whenLoadedMoment = whenLoadedInPast(whenLoaded);
    const whenToUnload = moment(whenLoadedMoment).add(1, 'day');
    const whenToUnloadText = whenToUnload.format(format);
    const whenLoadedText = whenLoadedMoment.format(format);

    return `
The Seedling Germination Checklist has been completed by <@${user}>:
:white_check_mark:  Germination chambers were loaded \`${whenLoadedText}\`
${checkFor(chambersFull)}   Germination chambers are full

:alarm_clock: I will remind ${postChannel} to unload the chambers \`${whenToUnloadText}\`.
    `;
  }
  
  function whenLoadedInPast(whenLoaded) {
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
};
})()
     