function doGet() {
  const ws = SpreadsheetApp.getActiveSpreadsheet();
  const ss = ws.getSheetByName("Queued Flips");
  const data = ss.getRange("A1").getDataRegion().getValues();
  const headers = data.shift();

  const jsonArray = data.map(r => {
    let obj = {};
    headers.forEach((h,i) => {
      obj[h] = r[i];
    });
    return obj;      
  });
 
  const response = jsonArray;
  return ContentService
  .createTextOutput(JSON.stringify(response))
  .setMimeType(ContentService.MimeType.JSON);

}


function myComparitor() {
  const ws = SpreadsheetApp.getActiveSpreadsheet();
  const ss = ws.getSheetByName("Flips");
  for (var i = 2; i <= ss.getLastRow(); i++) {
    const status = ss.getRange(i, 15).getValue();
    const post_time_cst = ss.getRange(i,14,).getValue();
    const now = new Date()
    if (status == "Ready" && now > post_time_cst){
    const title = ss.getRange(i,2,).getValue();
    const details = ss.getRange(i,3,).getValue();
    const retail = ss.getRange(i,4,).getValue();
    const resell = ss.getRange(i,5,).getValue();
    const risk = ss.getRange(i,6,).getValue();
    const ebay_link = ss.getRange(i,7,).getValue();
    const website = ss.getRange(i,8,).getValue();
    const event_date_time = ss.getRange(i,9,).getValue();
    const image_url = ss.getRange(i,10,).getValue();
    const webhook_url = ss.getRange(i,11,).getValue();
    const role_id = ss.getRange(i,12,).getValue();
    const created_by = ss.getRange(i,13,).getValue();


  var params = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
    "username": "○ △ □ flip™",
    "avatar_url": "https://cdn.discordapp.com/attachments/597604981193048094/661661086470111243/ihofava.gif",
    "content": role_id,
    "embeds": [
      {
        "title": title,
        "color": 9768112,
        "timestamp": "",
        "author": {},
        "image": {
          "url": image_url,
        },
        "thumbnail": {},
        "footer": {
          "text": ("created by" + " " + created_by),
          "icon_url": "https://cdn.discordapp.com/attachments/597604981193048094/661661086470111243/ihofava.gif"
                  },
                "fields": [
                    {
                        "name": "Details",
                        "value": details,
                        "inline": false
                    },
                    {
                        "name": "Retail",
                        "value": retail,
                        "inline": false
                    },
                    {
                        "name": "Resell",
                        "value": resell,
                        "inline": false
                    },
                    {
                        "name": "Risk",
                        "value": risk,
                        "inline": true
                    },
                    {
                        "name": "Search ebay",
                        "value": ebay_link,
                        "inline": true
                    },
                    {
                        "name": "Website",
                        "value": website,
                        "inline": false
                    },
                    {
                        "name": "Date & Time",
                        "value": event_date_time,
                        "inline": false
                    },
                    ]
      }
    ],
    })
  }
  const sendMsg = UrlFetchApp.fetch(webhook_url, params)
  var res = sendMsg.getResponseCode()


    ss.getRange(i,15).setValue("Posted");
    }
  }
}
