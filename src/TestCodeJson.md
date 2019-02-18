var objMesg = {"sender":{"avatar":"https://avatars2.githubusercontent.com/u/45852397?v=4","pseudo":"Rominshky"},"receiver":"","date":"13:38:09","text":"salut"};
var json = JSON.stringify([ {"type": 0}, objMesg ] ) // a mettre dans Input.js sans "json = "

obj = JSON.parse(json);

console.log(obj[0].type);
// obj[0] correspond à l'objet : type
// si type 0 = messages
// si type 1 = users

console.log(obj[1]);
// ne lit pas l'objet "type";
