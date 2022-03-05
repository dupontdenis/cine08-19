const fetch = require('node-fetch')
const _ = require('lodash');
const path = require('path');
const fs = require('fs');


async function main() {
  const response = await fetch("https://cine0819-demo.go-on-web.net/demo/bordeaux.json");
  const json = await response.json();


  const sorted = _.orderBy(json, ["place_nb"], ['desc']);
  const top5 = _.take(sorted, 5);

  const filePrefix = new Date().toISOString().split('T')[0];
  fs.writeFileSync(path.join(__dirname, `${filePrefix}-top5.json`), JSON.stringify(top5, null, 2));


  const groupBy = (arr, key) =>
  arr.reduce((acc, i) => {
    (acc[i[key]] = acc[i[key]] || [] ).push(i.name);
    return acc;
  }, {});


  // console.log(test)
  let cat = groupBy(json,"date_from");

  console.log( new Map(
    Object.entries(cat)
    .sort(([a] , [b]) => a<b?-1:1)))

  fs.writeFileSync(path.join(__dirname, `${filePrefix}-groupBy.json`), JSON.stringify(cat, null, 2));

  //console.log(_.pullAllWith(json, [{ 'id': 1912 }], _.isEqual));

}



main()
