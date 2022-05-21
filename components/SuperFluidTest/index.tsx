import { Framework } from '@superfluid-finance/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import useSuperFluid from '../../hooks/useSuperfluid';
import envConfig from '../../utils/envConfig';

const SuperFluidTest = async () => {
  const { account, active } = useWeb3React();

  const { MATICxContract, fUSDCxContract } = useSuperFluid();

  const createNewFlow = async () => {
    const recipient = '';
    const flowRate = '10000000000000000';
    const url =
      'https://polygon-mumbai.g.alchemy.com/v2/Bbxw0IqWm-oC5cx-Zx6rSpPYiLKHSyY3';
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

    const sf = await Framework.create({
      networkName: 'mumbai',
      provider: customHttpProvider,
    });

    const signer = sf.createSigner({
      privateKey: `${envConfig.PRIVATE_KEY}`,
      provider: customHttpProvider,
    });

    const MATICxContract = await sf.loadSuperToken('MATICx');
    const MATICx = MATICxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: flowRate,
        receiver: recipient,
        superToken: MATICx,
        // userData?: string
      });

      console.log('Creating your stream...');

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      console.log(
        `Congrats - you've just created a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: Kovan
      Super Token: DAIx
      Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
      Receiver: ${recipient},
      FlowRate: ${flowRate}
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  };

  return <div></div>;
};

export default SuperFluidTest;
