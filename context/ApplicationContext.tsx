import { useMemberInfoQuery } from 'graphql/autogen/types';
import { useMaxTrustScore } from 'hooks/useMaxTrustScore';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FETCH_APPLICATION_ENDPOINT, SIGNING_URL } from 'utils/constants';
import { OldMember, oldMembers } from 'utils/oldMembers';
import { config, useWallet } from 'web3';

export enum MembershipStatus {
  ACTIVE_MEMBER,
  INACTIVE_MEMBER,
  NOT_MEMBER,
  APPLIED_NOT_APPROVED,
  APPROVED_NOT_SIGNED,
  SIGNED_NOT_PAID,
}

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
  maxTrustScore: number;
  membershipStatus: MembershipStatus;
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
  membershipStatus: MembershipStatus.NOT_MEMBER,
  maxTrustScore: 0,
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

export const ApplicatonContextProvider: React.FC = ({
  children,
}: ProviderProps) => {
  const [applied, setApplied] = useState(false);
  const [applicationDate, setApplicationDate] = useState<Date | null>(null);

  const [signDate, setSignDate] = useState<Date | null>(null);

  const [statutesSigned, setStatutesSigned] = useState(false);
  const [statutesSignatureDate, setStatutesSignatureDate] =
    useState<Date | null>(null);

  const [tandcSigned, setTandcSigned] = useState(false);
  const [tandcSignatureDate, setTandcSignatureDate] = useState<Date | null>(
    null,
  );

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
        setStatutesSignatureDate(null);
      }
    };
    if (address) {
      f(address);
    }
  }, [address]);

  // Fetch tandc Signature
  useEffect(() => {
    const f = async (address: string) => {
      const resp = await fetchSignature(address, 'tandc');
      if (resp) {
        setTandcSigned(true);
        setTandcSignatureDate(new Date(resp?.updatedAt || ''));
      } else {
        setTandcSigned(false);
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

  const [{ data: memberData }] = useMemberInfoQuery({
    variables: {
      id: (address?.toLowerCase() ?? '').concat(
        config.TRUST.address.toLowerCase().slice(2),
      ),
    },
    pause: !address,
  });

  const { maxTrustScore } = useMaxTrustScore();

  const balance = Number(memberData?.member?.balance ?? 0);
  const startDate = new Date(memberData?.member?.startDate ?? 0);
  const duesPaid = Number(memberData?.member?.duesPaid ?? 0);

  const { member, expiryDate } = useMemo(() => {
    if (!address) {
      return {
        member: false,
        expiryDate: new Date(0),
      };
    }

    const oldMember = oldMembers.find(
      (member: OldMember) => member.id.toLowerCase() === address.toLowerCase(),
    );
    if (oldMember) {
      return {
        member: true,
        expiryDate: new Date(oldMember.expireDate),
      };
    }
    if (!memberData) {
      return {
        member: false,
        expiryDate: new Date(0),
      };
    }
    return {
      member: true,
      expiryDate: new Date(memberData.member?.expireDate ?? 0),
    };
  }, [address, memberData]);

  const membershipStatus = useMemo(() => {
    if (expiryDate.getTime() > new Date().getTime()) {
      return MembershipStatus.ACTIVE_MEMBER;
    }
    if (member) {
      return MembershipStatus.INACTIVE_MEMBER;
    }
    if (maxTrustScore > 0) {
      if (statutesSigned && tandcSigned) {
        return MembershipStatus.SIGNED_NOT_PAID;
      }
      return MembershipStatus.APPROVED_NOT_SIGNED;
    }
    if (applied) {
      return MembershipStatus.APPLIED_NOT_APPROVED;
    }
    return MembershipStatus.NOT_MEMBER;
  }, [member, expiryDate, maxTrustScore, applied, tandcSigned, statutesSigned]);

  return (
    <ApplicationContext.Provider
      value={{
        applied,
        applicationDate,
        applicationAccepted: maxTrustScore > 0,
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
        membershipStatus,
        maxTrustScore,
        postSignature,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication: () => ApplicationContextType = () =>
  useContext(ApplicationContext);
