
import inquirer from 'inquirer';
//const inquirer = require('inquirer');
export const optActions = async (): Promise<string> => {
    const { optActions } = await inquirer.prompt<{ optActions: string }>( {
        name: 'optActions',
        type: 'list',
        message: 'What do you want to do?',
        choices: [

            {
                name: 'Get accounts',
                value: 'getAccounts',
            },
            {
                name: 'Get chainId',
                value: 'getChainId',
            },
            {
                name: 'Get networkId',
                value: 'getNetworkId',
            },
            {
                name: 'Get balance',
                value: 'getBalance',
            },
            {
                name: 'Get transaction history',
                value: 'getTransactionHistory',
            },
            {
                name: 'Sign message',
                value: 'signMessage',
            },
            {
                name: 'Send transaction',
                value: 'sendTransaction',
            },
            
        ]
    } );
    return await optActions;
};
