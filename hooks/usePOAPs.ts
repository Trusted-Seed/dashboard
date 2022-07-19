import { useEffect, useState } from 'react';
import {
  POAP_DELIVERY_ADDRESSES_URL,
  POAP_SCAN_ADDRESS,
} from 'utils/constants';
import { useWallet } from 'web3';

type DeliveryPoapInfo = {
  address: string;
  claimed: boolean;
  event_ids: string;
  events: Poap[];
};

type PoapInfo = {
  event: Poap;
  tokenId: string;
  owner: string;
  created: string;
  chain: string;
};

export type Poap = {
  claimed: boolean;
  id: string;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  created_date: string;
};

const fetchDeliveryPoapInfo = async (
  poapId: string,
  address: string,
): Promise<Poap> => {
  const response = await fetch(
    POAP_DELIVERY_ADDRESSES_URL.replace('{{POAP_ID}}', poapId).replace(
      '{{ADDRESS}}',
      address,
    ),
  );
  if (!response.ok)
    throw new Error(`POAP Delivery Address Info returned ${response.status}`);
  const data = (await response.json()) as DeliveryPoapInfo;
  const poap = data.events[0]; // <-- Can the response include more than one event?
  if (!poap) throw new Error('POAP event not found.');
  poap.claimed = data.claimed;
  return poap;
};

const fetchPoapInfo = async (
  poapIds: string[],
  address: string,
): Promise<Poap[]> => {
  const response = await fetch(
    POAP_SCAN_ADDRESS.replace('{{ADDRESS}}', address),
  );
  if (!response.ok)
    throw new Error(`POAP address scan returned ${response.status}`);
  const data = (await response.json()) as PoapInfo[];
  const poaps: Poap[] = [];
  poapIds.forEach(id => {
    const match = data.find(p => p.event.id === id);
    if (match) {
      const poap = match.event;
      poap.claimed = true;
      poap.created_date = match.created;
      poaps.push(poap);
    }
  });
  return poaps;
};

export const usePOAPs = (
  deliveryIds: string[],
  poapIds: string[],
): {
  fetching: boolean;
  error: unknown;
  poaps: Poap[];
} => {
  const [poaps, setPoaps] = useState<Poap[]>([]);

  const { address } = useWallet();
  const [fetchingPoaps, setFetchingPoaps] = useState<boolean>(false);
  const [poapFetchError, setPoapFetchError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      if (address) {
        try {
          setFetchingPoaps(true);
          setPoapFetchError(null);
          const deliveryPoaps = await Promise.all(
            deliveryIds.map(poapId => fetchDeliveryPoapInfo(poapId, address)),
          );
          const scanPoaps = await fetchPoapInfo(poapIds, address);
          setPoaps(deliveryPoaps.concat(scanPoaps));
        } catch (error) {
          setPoapFetchError(error);
        } finally {
          setFetchingPoaps(false);
        }
      }
    })();
  }, [deliveryIds, poapIds, address]);

  return {
    fetching: fetchingPoaps,
    error: poapFetchError,
    poaps: poaps,
  };
};
