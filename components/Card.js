import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {useRouter} from 'expo-router';
import PropTypes from 'prop-types';

const placeHolderImage = require('../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};

const Card = props => {
  const {item} = props;
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/detail/${item.id}`)}
      style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={
          item.poster_path
            ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
            : placeHolderImage
        }
      />
      {!item.poster_path && <Text style={styles.movieName}>{item.title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 5,
  },
  image: {
    height: 150,
    width: 110,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: '80%',
    textAlign: 'center',
    top: 20,
  },
});

Card.propTypes = propTypes;

export default Card;
