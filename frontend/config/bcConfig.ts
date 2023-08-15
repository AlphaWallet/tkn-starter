import { env } from "@/lib/env.mjs"

// we are using a function here so that we can use the window object
export const buildBcConfig = () => {
  return {
    collectionID: "tkn",
    onChain: false,
    title: "demo",
    signedTokenWhitelist: [
      "https://mail.google.com",
      "https://www.google.com",
      "android-app://com.google.android.gm",
    ],
    whitelistDialogRenderer: (
      message: string,
      acceptBtn: string,
      denyBtn: string
    ) => {
      // this is trying to solve the dialog showing unexpectedly, however, cross origin should be reviewed
      setTimeout(() => {
        const acceptBtnEl = document.getElementById("tn-access-accept")
        if (acceptBtnEl) {
          acceptBtnEl.click()
        }
      }, 0)
      return `<div style="display:none">${acceptBtn}${denyBtn}</div>`
    },
    image:
      "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg",
    tokenOrigin: window.location.origin + "/pass/",
    tokenIdName: "mail",
    attestationOrigin: "https://attestation.id/",
    unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
    base64attestorPubKey: env.NEXT_PUBLIC_ATTESTOR_PUBLIC_KEY,
  } as any
}
