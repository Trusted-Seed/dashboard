import { ethers } from 'ethers';
import { useMemberInfoQuery } from 'graphql/autogen/types';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  FETCH_APPLICATION_ENDPOINT,
  REGISTRY_CONTRACT_ADDRESS,
  SIGNING_URL,
} from 'utils/constants';
import { useWallet } from 'web3';

export type ApplicationContextType = {
  applied: boolean;
  applicationDate: Date | null;
  applicationAccepted: boolean;
  statutesSigned: boolean;
  statutesSignatureDate: Date | null;
  tandcSigned: boolean;
  tandcSignatureDate: Date | null;
  signDate: Date | null;
  duesPaid: number;
  balance: number;
  startDate: Date | null;
  expiryDate: Date | null;
  member: boolean;
  postSignature:
    | ((arg0: {
        message: string;
        type: 'statutes' | 'tandc';
        address: string;
      }) => Promise<void>)
    | null;
};

type ProviderProps = {
  children?: ReactNode;
};

const initialContext: ApplicationContextType = {
  applied: false,
  applicationDate: null,
  applicationAccepted: false,
  statutesSigned: false,
  statutesSignatureDate: null,
  tandcSigned: false,
  tandcSignatureDate: null,
  signDate: null,
  duesPaid: 0,
  balance: 0,
  startDate: null,
  expiryDate: null,
  member: false,
  postSignature: null,
};

const ApplicationContext =
  createContext<ApplicationContextType>(initialContext);

const fetchApplication = async (address: string) => {
  try {
    const resp = await fetch(FETCH_APPLICATION_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ethereumAddress: address }),
    });
    return await resp.json();
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

const fetchSignature = async (address: string, type: 'statutes' | 'tandc') => {
  try {
    const resp = await fetch(`${SIGNING_URL}/signature/${address}_${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return await resp.json();
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

const fetchApplicationAccepted = async (address: string) => {
  const abi = [
    'function getPendingBalance(address name) view returns (uint256)',
  ];
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.gnosischain.com',
  );
  const contract = new ethers.Contract(
    REGISTRY_CONTRACT_ADDRESS,
    abi,
    provider,
  );
  const balance = await contract.getPendingBalance(address);
  return balance > 0;
};

// TODO: stubbed for minter contract
const checkMember = () => {
  return false;
};

export const ApplicatonContextProvider: React.FC = ({
  children,
}: ProviderProps) => {
  const [applied, setApplied] = useState(false);
  const [applicationAccepted, setApplicationAccepted] = useState(false);
  // TODO: get application date
  const [applicationDate, setApplicationDate] = useState<Date | null>(null);

  const [signDate, setSignDate] = useState<Date | null>(null);

  const [statutesSigned, setStatutesSigned] = useState(false);
  const [statutesSignatureDate, setStatutesSignatureDate] =
    useState<Date | null>(null);

  const [tandcSigned, setTandcSigned] = useState(false);
  const [tandcSignatureDate, setTandcSignatureDate] = useState<Date | null>(
    null,
  );

  // TODO: get how much dues in DAI were paid and if membership is approved
  const [duesPaid] = useState<number>(250.0); // Will continue to be blank
  const [member, setMember] = useState(false);

  const { address, provider } = useWallet();
  const signDateCheck = (signDate: Date | null, newDate: Date) => {
    if (!signDate || signDate <= newDate) {
      setSignDate(newDate);
      return;
    }
    return;
  };

  // Fetch application
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchApplication(address);
      setApplied(resp?.exists || false);
      setApplicationDate(resp?.applyDate);
    };
    if (address) {
      f(address);
      const member = checkMember();
      setMember(member);
    }
  }, [address]);

  // Fetch application accepted
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchApplicationAccepted(address);
      setApplicationAccepted(resp || false);
    };
    if (address) {
      f(address);
    }
  }, [address]);

  // Fetch statues Signature
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchSignature(address, 'statutes');
      if (resp) {
        setStatutesSigned(true);
        setStatutesSignatureDate(new Date(resp?.updatedAt || ''));
      } else {
        setStatutesSigned(false);
        setTandcSignatureDate(null);
      }
    };
    if (address) {
      f(address);
    }
  }, [address]);

  // Fetch statues Signature
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchSignature(address, 'tandc');
      if (resp) {
        setTandcSigned(true);
        setTandcSignatureDate(new Date(resp?.updatedAt || ''));
      } else {
        setStatutesSigned(false);
        setTandcSignatureDate(null);
      }
    };
    if (address) {
      f(address);
    }
  }, [address]);

  // Set sign date
  useEffect(() => {
    if (statutesSignatureDate && tandcSignatureDate) {
      const date =
        statutesSignatureDate > tandcSignatureDate
          ? statutesSignatureDate
          : tandcSignatureDate;
      signDateCheck(signDate, date);
    } else if (statutesSignatureDate) {
      signDateCheck(signDate, statutesSignatureDate);
    }
  }, [statutesSignatureDate, tandcSignatureDate, signDate]);

  const [{ data: memberData }] = useMemberInfoQuery({
    variables: { address: address?.toLowerCase() ?? '' },
    pause: !address,
  });
  const signConsent = useCallback(
    async (message: string) => {
      if (!provider) {
        return '';
      }
      const signer = provider.getSigner();
      try {
        const signature = await signer.signMessage(message);
        return signature;
      } catch (err) {
        // TODO change to toast
        console.error(err); // eslint-disable-line no-console
      }
    },
    [provider],
  );

  const postSignature = async ({
    message,
    type,
    address,
  }: {
    message: string;
    type: 'statutes' | 'tandc';
    address: string;
  }) => {
    const signature = await signConsent(message);
    try {
      await fetch(`${SIGNING_URL}/signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          type,
          message,
          address,
          signature,
        }),
      });
      if (type === 'statutes') {
        setStatutesSigned(true);
        setStatutesSignatureDate(new Date());
      }
      if (type === 'tandc') {
        setTandcSigned(true);
        setTandcSignatureDate(new Date());
      }
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  };

  const balance = Number(memberData?.member?.balance ?? 0);
  const startDate = new Date(memberData?.member?.startDate ?? 0);
  const expiryDate = new Date(memberData?.member?.expireDate ?? 0);

  return (
    <ApplicationContext.Provider
      value={{
        applied,
        applicationDate,
        applicationAccepted,
        statutesSigned,
        statutesSignatureDate,
        tandcSigned,
        tandcSignatureDate,
        signDate,
        duesPaid,
        balance,
        startDate,
        expiryDate,
        member,
        postSignature,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication: () => ApplicationContextType = () =>
  useContext(ApplicationContext);
