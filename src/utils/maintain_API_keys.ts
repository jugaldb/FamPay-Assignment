export const createMap = () => {
  let keys: Array<string> = process.env.GOOGLE_API_KEY!.split(",");
  let array = [];
  console.log(keys);
  for (let key of keys) {
    var obj = {
      key: key,
      uses: 0,
    };
    array.push(obj);
  }
  return array;
};

export const arrayOut = createMap();
console.log(arrayOut);
export const maintainAndGetKeys = (key?: string): string => {
  let return_key = arrayOut[0].key;
  for (let i = 0; i < arrayOut.length; i++) {
    if (key == arrayOut[i].key) {
      let num = arrayOut[i].uses;
      // console.log("previous uses -> " + num);
      num++;
      // console.log("current uses -> " + num);
      if (arrayOut[i].uses <= 2) {
        arrayOut[i].uses = num;
        return_key = arrayOut[i].key;
      } else if (i + 1 >= arrayOut.length) {
        return_key = arrayOut[0].key;
        arrayOut[0].uses = 1;
      } else {
        return_key = arrayOut[i + 1].key;
        arrayOut[i + 1].uses = 1;
      }
    }
  }
  console.log(" returned key: " + return_key);
  console.log(arrayOut);
  return return_key;
};
