function(channel, ellipsis) {
  const intro = `
:seedling: Hello, this is the Seedling Germination Checklist reminder. 

Anyone in this channel can respond. Start by clicking below.`;

ellipsis.success(intro, {
  choices: [
    { 
      actionName: "collect-answers",
      label: "Start",
      args: [{ name: "postChannel", value: channel }],
      allowOthers: true
    }
  ]
});
}
