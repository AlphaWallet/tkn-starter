import { env } from "@/lib/env.mjs"

// we are using a function here so that we can use the window object
export const buildBcConfig = () => {
  return {
    collectionID: "DEMO",
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
    base64senderPublicKeys: {
      DEMO: env.NEXT_PUBLIC_SENDER_PUBLIC_KEY,
    },
    base64attestorPubKey:
      "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=",
  } as any
}
