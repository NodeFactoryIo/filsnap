export interface GetPublicKeyRequest{
  method: "getPublicKey";
}

export interface GetAddressRequest {
  method: "getAddress";
}

export interface ExportSeedRequest {
  method: "exportPrivateKey";
}

export interface ConfigureRequest {
  method: "configure";
  params: {
    configuration: SnapConfig;
  };
}

export interface SignMessageRequest {
  method: "signMessage";
  params: {
    message: MessageRequest;
  };
}

export interface SignMessageRawRequest {
  method: "signMessageRaw";
  params: {
    message: string;
  };
}

export interface SendMessageRequest {
  method: "sendMessage";
  params: {
    signedMessage: SignedMessage;
  };
}

export interface GetBalanceRequest {
  method: "getBalance";
  params: {
    denomination: FilecoinDenomination;
  };
}

export interface GetMessagesRequest {
  method: "getMessages";
}

export interface GetGasForMessageRequest {
  method: "getGasForMessage";
  params: {
    message: MessageRequest;
  };
}

export type MetamaskFilecoinRpcRequest =
    GetPublicKeyRequest |
    GetAddressRequest |
    ExportSeedRequest |
    ConfigureRequest |
    GetBalanceRequest |
    GetMessagesRequest |
    SignMessageRequest |
    SignMessageRawRequest |
    SendMessageRequest |
    GetGasForMessageRequest;

type Method = MetamaskFilecoinRpcRequest["method"];

export interface WalletEnableRequest {
  method: "wallet_enable";
  params: object[];
}

export interface GetPluginsRequest {
  method: "wallet_getPlugins";
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskFilecoinRpcRequest];
}

export type MetamaskRpcRequest = WalletEnableRequest | GetPluginsRequest | SnapRpcMethodRequest;

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}

export interface SnapConfig {
  derivationPath: string;
  network: FilecoinNetwork;
  rpc: {
    token: string;
    url: string;
  };
  unit?: UnitConfiguration;
}

export type Callback<T> = (arg: T) => void;

// Filecoin types

export interface Message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gasfeecap: string;
  gaspremium: string;
  gaslimit: number;
  method: number;
  params?: [];
}

export interface SignedMessage {
  message: Message;
  signature: MessageSignature;
}

export interface MessageSignature {
  data: string;
  type: number;
}

export interface MessageRequest {
  to: string;
  value: string;
  gaslimit?: number;
  gasfeecap?: string;
  gaspremium?: string;
}

export interface MessageGasEstimate {
  gaslimit: number;
  gasfeecap: string;
  gaspremium: string;
}

export interface MessageStatus {
  message: Message;
  cid: string;
}

export type FilecoinNetwork = "f" | "t";

export type FilecoinDenomination = "fil" | "attofil";

export interface FilecoinEventApi {}

export interface FilecoinSnapApi {
  getPublicKey(): Promise<string>;
  getAddress(): Promise<string>;
  getBalance(denomination: FilecoinDenomination): Promise<string>;
  exportPrivateKey(): Promise<string>;
  configure(configuration: Partial<SnapConfig>): Promise<void>;
  signMessage(message: MessageRequest): Promise<SignedMessage>;
  signMessageRaw(message: string): Promise<string>;
  sendMessage(signedMessage: SignedMessage): Promise<MessageStatus>;
  getMessages(): Promise<MessageStatus[]>;
  calculateGasForMessage(message: MessageRequest): Promise<MessageGasEstimate>;
}

export interface KeyPair {
  address: string;
  privateKey: string;
  publicKey: string;
}