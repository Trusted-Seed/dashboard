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
  member: boolean;
};

type ProviderProps = {
  children?: ReactNode;
};

const initialContext = {
  applied: false,
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

  return (
    <ApplicationContext.Provider
      value={{
        applied: applied,
        member,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication: () => ApplicationContextType = () =>
  useContext(ApplicationContext);
