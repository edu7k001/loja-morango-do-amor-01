const stripe = Stripe("pk_live_51RKBBQBfvEGz4zvMRPfyRnKLclo0TEcBbsp4JCptVh9O7LlHDqDQMZiTuN9m6YGGHaylhaKjibl7Yn081d5O3atK00vvkrB3Sp");

let elements;

initialize();

document.querySelector("#payment-form").addEventListener("submit", handleSubmit);

async function initialize() {
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: "Combo do Amor", preco: 49.90 })
  });
  const { clientSecret } = await response.json();

  elements = stripe.elements({ clientSecret });

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.href,
    },
  });

  if (error) {
    document.querySelector("#payment-message").textContent = error.message;
    document.querySelector("#payment-message").classList.remove("hidden");
  }
}