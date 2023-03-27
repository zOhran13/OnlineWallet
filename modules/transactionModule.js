import { getUsers } from "./userModule";

export async function submitTransaction() {
    try {
      checkTextInput();
      let users=getUsers();
      let flag=false;
      users.forEach(element => {
        if(element.name==textInputName && element.accountNumber==textInputNumber) flag=true;
      });
      if(flag) {
        await fetch('url sa bekenda/transactions', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: textInputName,
            accountNumber: textInputNumber,
            currency: currency,
            amount: textInputAmount,
          }),
        })
          .then((response) => {
            if(response.status==200) {
              alert('Transaction successful!');
              return;
            } else {
              alert('Transaction not successful!');
              return;
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
