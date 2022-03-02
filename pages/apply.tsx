import { Flex, Text } from '@chakra-ui/react';
import BackgroundContainer from 'components/BackgroundContainer';
import React from 'react';
// 4 sections
//
// Logo
// Text
// more logos
// Button
const MembershipPage: React.FC = () => {
  return (
    <BackgroundContainer>
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="3xl">
          The Trusted Seed is a group of trusted community members that hold the
          non-transferable CSTK tokens representing their reputation with the
          Common Stack
        </Text>
      </Flex>
    </BackgroundContainer>
  );
};

export default MembershipPage;
