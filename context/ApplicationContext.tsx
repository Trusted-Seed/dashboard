import { ethers } from 'ethers';
import { useMemberInfoQuery } from 'graphql/autogen/types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FETCH_APPLICATION_ENDPOINT, SIGNING_URL } from 'utils/constants';
import { getCstkBalance } from 'utils/cstk';
import { useWallet } from 'web3';

export type ApplicationContextType = {
  applied: boolean;
  applicationDate: Date | null;
  statutesSigned: boolean;
  statutesSignatureDate: Date | null;
  tandcSigned: boolean;
  tandcSignatureDate: Date | null;
  duesPaid: number;
  balance: number;
  startDate: Date | null;
  expiryDate: Date | null;
  member: boolean;
};

type ProviderProps = {
  children?: ReactNode;
};

// applied
// applicationDate - need to get that from the webhook
//
// signed - from signer
// signatureDate
// https://github.com/commons-stack/swissmem-dapp/blob/67cfa2467b619068f2bcfa88b63886e3808d140e/src/pages/contribute/components/Statutes.js#L30
// https://github.com/commons-stack/swissmem-dapp/blob/52933f0e7a051e31f7461fb67ac0c550cb2fbea0/src/util/api.js
//
// balance
// latest member snapshot
const initialContext: ApplicationContextType = {
  applied: false,
  applicationDate: null,
  statutesSigned: false,
  statutesSignatureDate: null,
  tandcSigned: false,
  tandcSignatureDate: null,
  duesPaid: 0,
  balance: 0,
  startDate: null,
  expiryDate: null,
  member: false,
};

const ApplicationContext =
  createContext<ApplicationContextType>(initialContext);

const fetchApplication = async (address: string) => {
  try {
    const resp = await fetch(FETCH_APPLICATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ethereumAddress: address }),
    });
    return resp.json();
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

const fetchSignature = async (address: string, type: 'statutes' | 'tandc') => {
  try {
    const resp = await fetch(`${SIGNING_URL}signature/${address}_${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return resp.json();
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};

// TODO: stubbed for minter contract
const checkMember = () => {
  return false;
};

export const ApplicatonContextProvider: React.FC = ({
  children,
}: ProviderProps) => {
  const [applied, setApplied] = useState(false);
  // TODO: get application date
  const [applicationDate] = useState<Date | null>(null);

  // TODO: get if signed and signature date
  const [statutesSigned, setStatutesSigned] = useState(false);
  const [statutesSignatureDate, setStatutesSignatureDate] =
    useState<Date | null>(null);

  const [tandcSigned, setTandcSigned] = useState(false);
  const [tandcSignatureDate, setTandcSignatureDate] = useState<Date | null>(
    null,
  );

  // TODO: get how much dues in DAI were paid and if membership is approved
  const [duesPaid, setDuesPaid] = useState<number>(250.0); // Will continue to be blank
  const [member, setMember] = useState(false);

  const { address, provider } = useWallet();

  // Fetch application
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchApplication(address);
      setApplied(resp?.exists || false);
    };
    if (address) {
      f(address);
      const member = checkMember();
      setMember(member);
    }
  }, [address]);

  // Fetch statues Signature
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchSignature(address, 'statutes');
      setStatutesSigned(resp);
      setStatutesSignatureDate(resp);
    };
    if (address) {
      f(address);
    }
  }, [address]);

  // Fetch statues Signature
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchSignature(address, 'tandc');
      setTandcSigned(resp);
      setTandcSignatureDate(resp);
    };
    if (address) {
      f(address);
    }
  }, [address]);

  useEffect(() => {
    const f = async (address: string) => {
      const balance = await getCstkBalance(address, provider);
      if (balance.gt(0)) {
        setDuesPaid(Number(ethers.utils.formatEther(balance)));
      }
    };
    if (address && provider) {
      f(address);
    }
  }, [address, provider]);

  const [{ data: memberData }] = useMemberInfoQuery({
    variables: { address: address?.toLowerCase() ?? '' },
    pause: !address,
  });

  const balance = Number(memberData?.member?.balance ?? 0);
  const startDate = new Date(memberData?.member?.startDate ?? 0);
  const expiryDate = new Date(memberData?.member?.expireDate ?? 0);

  return (
    <ApplicationContext.Provider
      value={{
        applied,
        applicationDate,
        statutesSigned,
        statutesSignatureDate,
        tandcSigned,
        tandcSignatureDate,
        duesPaid,
        balance,
        startDate,
        expiryDate,
        member,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication: () => ApplicationContextType = () =>
  useContext(ApplicationContext);
