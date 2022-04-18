import { useMemberInfoQuery } from 'graphql/autogen/types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FETCH_APPLICATION_ENDPOINT } from 'utils/constants';
import { useWallet } from 'web3';

export type ApplicationContextType = {
  applied: boolean;
  applicationDate: Date | null;
  signed: boolean;
  signatureDate: Date | null;
  duesPaid: number;
  balance: number;
  paymentDate: Date | null;
  expiryDate: Date | null;
  member: boolean;
};

type ProviderProps = {
  children?: ReactNode;
};

const initialContext: ApplicationContextType = {
  applied: false,
  applicationDate: null,
  signed: false,
  signatureDate: null,
  duesPaid: 0,
  balance: 0,
  paymentDate: null,
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
  const [signed] = useState(false);
  const [signatureDate] = useState<Date | null>(null);

  // TODO: get how much dues in DAI were paid and if membership is approved
  const [duesPaid] = useState<number>(250.0);
  const [member, setMember] = useState(false);

  const { address } = useWallet();

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

  const [{ data: memberData }] = useMemberInfoQuery({
    variables: { address: address?.toLowerCase() ?? '' },
    pause: !address,
  });
  const balance = Number(memberData?.member?.balance ?? 0);
  const paymentDate = new Date(memberData?.member?.startDate ?? 0);
  const expiryDate = new Date(memberData?.member?.expireDate ?? 0);

  return (
    <ApplicationContext.Provider
      value={{
        applied,
        applicationDate,
        signed,
        signatureDate,
        duesPaid,
        balance,
        paymentDate,
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
