import React from 'react';
import { Stack } from 'expo-router';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Navbar main={true} />,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          header: () => <Navbar />,
        }}
      />
      <Stack.Screen
        name="detail/[movieID]"
        options={{
          header: () => <Navbar />,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
