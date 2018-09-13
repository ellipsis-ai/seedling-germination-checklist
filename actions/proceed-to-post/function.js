function(postChannel, summary, whenToUnload, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);

api.say({ message: 'Got it!' }).then(res => {
  postSummary().then(ellipsis.noResponse);                                 
});

function postSummary() {
  return api.run({
    actionName: "post-checklist-summary",
    args: [{ name: "summary", value: summary }],
    channel: postChannel
  });
}
}
