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
  NOT_MEMBER,
  APPLIED_NOT_APPROVED,
  APPROVED_NOT_SIGNED,
  SIGNED_NOT_PAID,
  ACTIVE_MEMBER,
  INACTIVE_MEMBER,
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
  paymentDate: Date | null;
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
  paymentDate: null,
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

  const signDateCheck = (newDate: Date) => {
    setSignDate(oldDate => {
      if (!oldDate || oldDate <= newDate) {
        return newDate;
      }
      return oldDate;
    });
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
      signDateCheck(date);
    } else if (statutesSignatureDate) {
      signDateCheck(statutesSignatureDate);
    }
  }, [statutesSignatureDate, tandcSignatureDate]);

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

  const balance = Number(
    memberData?.member?.balance ? memberData?.member?.balance.slice(0, -18) : 0,
  );

  const { member, duesPaid, paymentDate, expiryDate } = useMemo(() => {
    if (!address) {
      return {
        member: false,
        duesPaid: 0,
        paymentDate: new Date(0),
        expiryDate: new Date(0),
      };
    }

    const oldMember = oldMembers.find(
      (member: OldMember) =>
        member.address.toLowerCase() === address.toLowerCase(),
    );
    if (oldMember) {
      return {
        member: true,
        duesPaid: oldMember.duesPaid,
        paymentDate: !Number.isNaN(Date.parse(oldMember.paymentDate))
          ? new Date(oldMember.paymentDate)
          : null,
        expiryDate: !Number.isNaN(Date.parse(oldMember.expireDate))
          ? new Date(oldMember.expireDate)
          : null,
      };
    }
    if (!memberData?.member) {
      return {
        member: false,
        duesPaid: 0,
        paymentDate: null,
        expiryDate: null,
      };
    }
    return {
      member: true,
      duesPaid: Number(memberData?.member?.duesPaid ?? 0),
      paymentDate: memberData?.member?.startDate
        ? new Date(memberData?.member?.startDate)
        : null,
      expiryDate: memberData.member?.expireDate
        ? new Date(memberData.member?.expireDate)
        : null,
    };
  }, [address, memberData]);

  const membershipStatus = useMemo(() => {
    if (!expiryDate) return MembershipStatus.NOT_MEMBER;

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
        paymentDate,
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
