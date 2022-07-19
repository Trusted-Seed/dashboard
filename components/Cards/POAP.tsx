import { Image, Link, StackProps, Text } from '@chakra-ui/react';
import POAPImage from 'assets/poap.svg';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { usePOAPs } from 'hooks/usePOAPs';
import { POAP_CLAIM_URL } from 'utils/constants';

export const POAPCard: React.FC<
  StackProps & { poapDeliveries: string[]; poapIds: string[] }
> = ({ poapDeliveries, poapIds, ...props }) => {
  const { fetching, poaps } = usePOAPs(poapDeliveries, poapIds);

  const poapToClaimIndex = poaps.findIndex(p => !p.claimed);
  const poapInfo = poapToClaimIndex >= 0 ? poaps[poapToClaimIndex] : null;

  return (
    <Card p={8} spacing={6} isLoading={fetching} hasDot={!!poapInfo} {...props}>
      <Image src={poapInfo?.image_url ?? POAPImage.src} h="5rem" />
      <Text fontWeight="bold" textAlign="center" fontSize="xl">
        {poapInfo ? (
          <>
            {'You have unclaimed '}
            <Text as="span" color="ceruleanBlue">
              POAP
            </Text>
            {' badges!'}
          </>
        ) : (
          <>
            {'You have no '}
            <Text as="span" color="ceruleanBlue">
              POAP
            </Text>
            {' badges to claim'}
          </>
        )}
      </Text>
      {poapInfo && (
        <Link
          isExternal
          href={POAP_CLAIM_URL.replace('{{POAP_SLUG}}', poapInfo.fancy_id)}
          _hover={{}}
        >
          <Button size="sm" fontSize="md" px={10}>
            Claim
          </Button>
        </Link>
      )}
    </Card>
  );
};
