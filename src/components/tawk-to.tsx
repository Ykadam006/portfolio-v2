import Script from "next/script";

/** Tawk.to live chat — property ID from your Tawk dashboard */
const TAWK_EMBED_SRC = "https://embed.tawk.to/69bca9480031bd1c381bb7f6/1jk4fah49";

/**
 * Loads Tawk.to after the page is interactive (same behavior as the official snippet,
 * but compatible with Next.js App Router and avoids duplicate injection on navigation).
 */
export function TawkTo() {
    return (
        <Script id="tawk-to-init" strategy="afterInteractive">
            {`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src=${JSON.stringify(TAWK_EMBED_SRC)};
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
            `.trim()}
        </Script>
    );
}
