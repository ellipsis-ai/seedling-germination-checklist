function(whenLoaded, chambersFull, postChannel, ellipsis) {
  const moment = require('moment-timezone');
const summary = require('summary')(ellipsis);

const whenLoadedMoment = summary.whenLoadedInPast(whenLoaded);
const whenToUnload = moment(whenLoadedMoment).add(1, 'day');
const whenToUnloadText = summary.formatTimestamp(whenToUnload);
const whenLoadedText = summary.formatTimestamp(whenLoadedMoment);

ellipsis.success(summary.summaryFor(whenLoaded, chambersFull, postChannel), {
  choices: [
    { 
      label: '👍 Post it',
      actionName: 'proceed-to-post',
      args: [
        { name: 'postChannel', value: postChannel },
        { name: 'whenLoaded', value: whenLoadedText },
        { name: 'chambersFull', value: chambersFull ? "Yes" : "No" },
        { name: 'whenToUnload', value: whenToUnloadText }
      ],
      allowMultipleSelections: true
    },
    {
      label: '🖊 Change my answers',
      actionName: 'collect-answers',
      args: [
        { name: 'postChannel', value: postChannel }
      ]
    }
  ]
});
}
