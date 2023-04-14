[![Neopower logo](./public/images/neopower-logo.png)](https://www.neopower.digital/)

# ink!athon dApp

This is a repository with a base implementation for Polkadot projects using [use-inkathon](https://github.com/scio-labs/use-inkathon) react library that can be used as a template for creating a new project.

# Table of contents

1. [Running the template](#running-the-template)
2. [Use-inkathon library](#use-inkathon-library)
   1. [Initial configuration](#initial-configuration)
   2. [Wallet connection](#wallet-connection)
      1. [Extras](#📘-extras)

# Running the template

```python
#In first place we have to install the required dependencies
yarn

#Now we can run develompent server
yarn dev
#Open http://localhost:3000 to see the dApp
```

# Use-inkathon library

## Initial configuration

To install [use-inkathon](https://github.com/scio-labs/use-inkathon) library we have to run the following command

```
yarn add @scio-labs/use-inkathon
```

Then we have to set the **dApp name** and the **default chain**. The library provides configurations constants with some of the main Substrate chains

```tsx
import { alephzeroTestnet, UseInkathonProvider } from "@scio-labs/use-inkathon";

export default function myApp({ Component, pageProps }) {
  return (
    <UseInkathonProvider
      appName="inkathon-dApp"
      defaultChain={alephzeroTestnet}
    >
      <Component {...pageProps} />
    </UseInkathonProvider>
  );
}
```

With these configurations we are set to start using the library

<br>

## Wallet connection

The next button will allow you to connect/disconnect a wallet in the dApp using Substrate based wallets

<details>
<summary>🚧 Important considerations 🚧</summary>
<p>
 Intuetively we would think that to determine if the user is connected we should use "isConnected" property, until now this doesn't work as expected so we use "activeAccount" instead
</p>
</details>

```jsx
const { connect, disconnect, activeAccount, isConnected } = useInkathon();

<Button onClick={activeAccount ? disconnect : connect}>
  {activeAccount ? "Disconnect" : "Connect"}
</Button>;
```

### 📘 Extras

We can manage the connection status with `isConnecting` and show a loading spinner while the user is connecting the wallet.
This code block also includes code refactoring to have a more readable component

```jsx
const { connect, disconnect, activeAccount, isConnecting } = useInkathon();

const [connectionHandler, setConnectionHandler] = useState()

useEffect(() => {
  setConnectionHandler(
    {
      text: activeAccount ? "Disconnect" : "Connect",
      handler: activeAccount ? disconnect : connect,
    }
  )
}, [activeAccount, connect, disconnect])

<Button onClick={connectionHandler.handler} disabled={isConnecting}>
{isConnecting? <CircularProgress/> : connectionHandler.text}
</Button>
```
