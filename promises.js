const myPromise = new Promise((resolve, reject) => {
    let age = 16;
    if (age >= 18) {
        resolve("Eligible for vote");
    } else {
        reject("Not eligible for vote");
    }
})
//then-catch
    myPromise
    .then((msg) => {
        console.log(msg);
    })
    .catch((msg) => {
        console.log(msg);
    });
//async
/*async function checkVote() {
    try {
        const msg = await myPromise;
        console.log(msg);
    } catch (err) {
        console.log(err);
    }
}

checkVote();*/