import { getUsers } from "./userModule";

var link = 'https://processingserver.herokuapp.com'
export async function submitTransaction(amount, currency, paymentType, recipinetName, recipientAccountNumber, description) {
    try {
        /*checkTextInput();
        let flag = false;
        let users = getUsers();
        users.forEach((element) => {
          if (
            element.name == textInputName &&
            element.accountNumber == textInputNumber
          )
            flag = true;
        });*/
        flag = true;
        if (flag) {
            await fetch(link + '/Transaction/CreateTransaction?token=TEST', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(
                    {
                        amount: amount,
                        currency: currency,
                        paymentType: paymentType,
                        description: description,
                        recipientAccountNumber: recipientAccountNumber,
                        recipientName: recipinetName
                    }



              ),
            }).then((response) => {
                if (response.status == 200) {
                    alert("Transaction successful!");
                    return;
                } else {
                    alert("Transaction not successful!");
                    return;
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createTemplate(userId, title, recipientName, recipientAccountNumber, description, currency) {
    fetch(link + '/api/Template', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
            description: description,
            currency: currency,
            recipientName: recipientName,
            recipientAccountNumber: recipientAccountNumber
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
