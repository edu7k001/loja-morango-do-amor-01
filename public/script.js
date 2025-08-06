document.getElementById("pagarPix").addEventListener("click", async () => {
  const response = await fetch("/criar-pagamento", { method: "POST" });
  const data = await response.json();
  if (data.qr_code) {
    const img = document.createElement("img");
    img.src = data.qr_code;
    document.getElementById("qrcode").innerHTML = "";
    document.getElementById("qrcode").appendChild(img);
  } else {
    alert("Erro ao gerar Pix.");
  }
});
