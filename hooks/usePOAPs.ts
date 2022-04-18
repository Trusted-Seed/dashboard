import { useEffect, useState } from 'react';
import {
  POAP_DELIVERY_ADDRESSES_URL,
  POAP_DELIVERY_URL,
} from 'utils/constants';
import { useWallet } from 'web3';

type DeliveryInfo = {
  id: number;
  slug: string;
  card_title: string;
  card_text: string;
  metadata_title: string;
  metadata_description: string;
  page_title: string;
  page_title_image: string;
  page_text: string;
  event_ids: string;
  image: string;
  active: boolean;
  claimed_addresses: number;
  total_addresses: number;
};

export type DeliveryAddressInfo = {
  address: string;
  claimed: boolean;
  // TODO: find when it was claimed
  claimDate: Date | null;
  event_ids: string;
  poapInfo: DeliveryInfo;
};

const fetchDeliveryInfo = async (poapId: string): Promise<DeliveryInfo> => {
  const response = await fetch(
    POAP_DELIVERY_URL.replace('{{POAP_ID}}', poapId),
  );
  if (!response.ok)
    throw new Error(`POAP Delivery Info returned ${response.status}`);
  return response.json();
};

const fetchDeliveryAddressInfo = async (
  poapId: string,
  address: string,
  deliveryInfo: DeliveryInfo[],
) => {
  const response = await fetch(
    POAP_DELIVERY_ADDRESSES_URL.replace('{{POAP_ID}}', poapId).replace(
      '{{ADDRESS}}',
      address,
    ),
  );
  if (!response.ok)
    throw new Error(`POAP Delivery Address Info returned ${response.status}`);

  const data = await response.json();

  data.poapInfo = deliveryInfo.find(d => d.event_ids === data.event_ids);

  return response.json();
};

export const usePOAPs = (
  poapIds: string[],
): {
  fetching: boolean;
  error: unknown;
  deliveryAddressInfo: DeliveryAddressInfo[];
} => {
  const [fetchingDelivery, setFetchingDelivery] = useState<boolean>(false);
  const [deliveryError, setDeliveryError] = useState<unknown>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setFetchingDelivery(true);
        setDeliveryError(null);
        const data = await Promise.all(poapIds.map(fetchDeliveryInfo));
        setDeliveryInfo(data);
      } catch (error) {
        setDeliveryInfo([]);
        setDeliveryError(error);
      } finally {
        setFetchingDelivery(false);
      }
    })();
  }, [poapIds]);

  const { address } = useWallet();
  const [fetchingDeliveryAddress, setFetchingDeliveryAddress] =
    useState<boolean>(false);
  const [deliveryAddressError, setDeliveryAddressError] =
    useState<unknown>(null);
  const [deliveryAddressInfo, setDeliveryAddressInfo] = useState<
    DeliveryAddressInfo[]
  >([]);

  useEffect(() => {
    (async () => {
      if (address && deliveryInfo.length > 0) {
        try {
          setFetchingDeliveryAddress(true);
          setDeliveryAddressError(null);
          const data = await Promise.all(
            poapIds.map(poapId =>
              fetchDeliveryAddressInfo(poapId, address, deliveryInfo),
            ),
          );
          setDeliveryAddressInfo(data);
        } catch (error) {
          setDeliveryAddressInfo([]);
          setDeliveryAddressError(error);
        } finally {
          setFetchingDeliveryAddress(false);
        }
      }
    })();
  }, [poapIds, address, deliveryInfo]);

  return {
    fetching: fetchingDelivery || fetchingDeliveryAddress,
    error: deliveryError || deliveryAddressError,
    deliveryAddressInfo,
  };
};
