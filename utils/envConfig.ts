const envConfig = {
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  CONTRACT_DEPLOYED:
    process.env.NEXT_PUBLIC_CONTRACT_DEPLOYED === 'true' ? true : false,
  CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME || '',
  INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID || '',
  MAINNET: process.env.NEXT_PUBLIC_MAINNET === 'true' ? true : false,
  PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY || '',
  SAFEZEN_CA: process.env.NEXT_PUBLIC_SAFEZEN_CA || '',
  GOVERNANCE_CA: process.env.NEXT_PUBLIC_GOVERNANCE_CA || '',
  STAKING_CA: process.env.NEXT_PUBLIC_STAKING_CA || '',
  PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
  PINATA_API_SECRET_KEY: process.env.NEXT_PUBLIC_PINATA_API_SECRET_KEY || '',
  PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT || '',
};

export default envConfig;
