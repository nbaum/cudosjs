window.onload = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        const chainId = "cudos-network";

        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);
    
        const offlineSigner = window.getOfflineSigner(chainId);
    
        // Initialize the gaia api with the offline signer that is injected by Keplr extension.
        const cudosJS = SigningCosmWasmClient.connectWithSigner(
            "http://localhost:26657",
            offlineSigner,
        );
    }
}