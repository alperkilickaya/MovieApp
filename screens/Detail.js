import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMovie } from '../services/services';
import dateFormat from 'dateformat';

const dimensions = Dimensions.get('screen');
const placeHolderImage = require('../assets/images/placeholder.png');

const StarRating = ({ rating }) => {
  const stars = [];
  const rounded = Math.round(rating);

  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <Ionicons
        key={`star-${i}`}
        name={i <= rounded ? 'star' : 'star-outline'}
        size={22}
        color="gold"
      />,
    );
  }

  return <View style={styles.starsContainer}>{stars}</View>;
};

const Detail = () => {
  const { movieID } = useLocalSearchParams();
  const movieId = Array.isArray(movieID) ? movieID[0] : movieID;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  return (
    <>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating rating={movieDetail.vote_average / 2} />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
    padding: 15,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  image: {
    height: dimensions.height / 2,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Detail;
