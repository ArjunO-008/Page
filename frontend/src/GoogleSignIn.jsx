import { useEffect } from "react";

function GoogleSignIn() {
    const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    useEffect(() => {
        const handleCredentialResponse = (response) => {
            console.log("Encoded JWT:" + response.credential);
        }

        const initializeGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: clientID,
                    callback: handleCredentialResponse
                });

                window.google.accounts.id.renderButton(
                    document.getElementById("buttonDiv"),
                    { theme: "outline", size: "large" }
                );

                window.google.accounts.id.prompt();
            }
        };

        const scriptId = 'google-gsi-client';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.id = scriptId;
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            document.body.appendChild(script);
        } else {
            initializeGoogleSignIn();
        }

        return () => {
            const buttonDiv = document.getElementById("buttonDiv");
            if (buttonDiv) buttonDiv.innerHTML = "";
        };
    }, []);

    return (
        // The target container where Google will render the iframe button
        <div id="buttonDiv"></div>
    );
}

export default GoogleSignIn;