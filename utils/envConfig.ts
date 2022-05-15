const envConfig = {
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  CONTRACT_DEPLOYED:
    process.env.NEXT_PUBLIC_CONTRACT_DEPLOYED === 'true' ? true : false,
  CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME || '',
  INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID || '',
  MAINNET: process.env.NEXT_PUBLIC_MAINNET === 'true' ? true : false,
};

export default envConfig;
