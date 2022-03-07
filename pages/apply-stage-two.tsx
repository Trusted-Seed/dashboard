import { Flex } from '@chakra-ui/react';
import { Widget } from '@typeform/embed-react';
import BackgroundContainer from 'components/BackgroundContainer';
import React from 'react';

const ApplyStageTwoPage: React.FC = () => {
  return (
    <BackgroundContainer>
      <Flex
        width="100%"
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        height="100%"
        maxH="60rem"
      >
        <Widget
          id="nG7xc1"
          style={{
            width: '50%',
            maxHeight: '35rem',
            height: '100%',
            border: 'none',
          }}
          hideFooter={true}
          hideHeaders={true}
          autoResize={true}
          opacity={0}
        />
      </Flex>
    </BackgroundContainer>
  );
};

export default ApplyStageTwoPage;
