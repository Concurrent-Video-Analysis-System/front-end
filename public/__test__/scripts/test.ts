// @ts-ignore
const testPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data");
    }, 500);
  })
    .then(async (data) => {
      console.log(data);
      return Promise.reject("no data");
    })
    .catch(async (error) => {
      console.log(error);
      return Promise.reject("no data");
    });
};

testPromise()
  .then((data) => console.log(`then => ${data}`))
  .catch((error) => console.log(`catch => ${error}`));
