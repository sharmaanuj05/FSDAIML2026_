//function login 
function login(msg,error)
{
    if(error)
    console.log("Error: " + error);
    else
    console.log("Success: " + msg);
}
function loginverify(username,password,callback)
{
    if(username=="anujsharma4105" && password=="05012007")
    {
        callback("Login successful", null);
    }
    else
    {
        callback(null, "Invalid username or password");
    }
}
loginverify("anujsharma4105", "05012007",login);