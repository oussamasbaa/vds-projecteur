(() => {
  const phone = "+212660135768";
  const cardUrl = (window.VDS_CARD_URL || window.location.href).split("#")[0];
  const canvas = document.getElementById("qr-canvas");
  const qrLoading = document.getElementById("qr-loading");
  const qrUrl = document.getElementById("qr-url");
  const toast = document.getElementById("toast");
  let toastTimer;

  qrUrl.textContent = cardUrl;
  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    }
  };

  document.getElementById("save-contact").addEventListener("click", () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:PROJECTEUR;VDS;;;",
      "FN:VDS PROJECTEUR",
      "ORG:VDS PROJECTEUR",
      `TEL;TYPE=WORK,VOICE:${phone}`,
      "URL:https://www.instagram.com/vdsprojecteur/",
      "END:VCARD",
      ""
    ].join("\r\n");
    const file = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "vds-projecteur.vcf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
    notify("Contact file downloaded");
  });

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "VDS PROJECTEUR", text: "Connect with VDS PROJECTEUR", url: cardUrl });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    const copied = await copyText(cardUrl);
    notify(copied ? "Card link copied to clipboard" : "Could not copy card link");
  };
  document.getElementById("share-card").addEventListener("click", shareCard);
  document.getElementById("copy-link").addEventListener("click", async () => {
    const copied = await copyText(cardUrl);
    notify(copied ? "Card link copied to clipboard" : "Could not copy card link");
  });

  const renderQr = () => {
    if (!window.QRCode) {
      qrLoading.textContent = "QR library unavailable";
      return;
    }
    window.QRCode.toCanvas(canvas, cardUrl, {
      width: 300,
      margin: 1,
      errorCorrectionLevel: "H",
      color: { dark: "#07182d", light: "#ffffff" }
    }, (error) => {
      if (error) {
        qrLoading.textContent = "Could not create QR code";
        return;
      }
      qrLoading.remove();
    });
  };
  renderQr();
  document.getElementById("download-qr").addEventListener("click", () => {
    if (!window.QRCode) {
      notify("QR code is not ready yet");
      return;
    }
    window.QRCode.toDataURL(cardUrl, {
      width: 900,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#07182d", light: "#ffffff" }
    }).then((url) => {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "vds-projecteur-qr.png";
      anchor.click();
    }).catch(() => notify("Could not generate QR code"));
  });
})();
