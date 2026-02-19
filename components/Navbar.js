import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

const Navbar = ({ main }) => {
  const router = useRouter();

  return (
    <SafeAreaView>
      {main ? (
        <View style={styles.mainNav}>
          <Image
            style={styles.logo}
            source={require('../assets/images/movies.png')}
          />
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Ionicons name="search-outline" color={Colors.black} size={35} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={35} color={Colors.black} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
