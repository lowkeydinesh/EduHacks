const amountElement = document.getElementById("amount");
const paypalButtonContainer = document.getElementById("paypal-button-container");

paypal
    .Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: parseFloat(amountElement.value),
                    },
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Transaction completed by " + details.payer.name.given_name);
            });
        }
    })
    .render(paypalButtonContainer);

document.addEventListener("DOMContentLoaded", function () {
    const takeActionButton = document.getElementById("takeActionButton");
    const donationForm = document.querySelector(".donation-form");

    takeActionButton.addEventListener("click", function () {
        donationForm.classList.toggle("floating");
    });
});
