import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from "../services/services";
import List from "../components/List";
import Error from "../components/Error";

const dimensions = Dimensions.get("screen");

const Home = () => {
  const router = useRouter();
  const [moviesImages, setMoviesImages] = useState([]);
  const [moviesIDs, setMoviesIDs] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getPopularMovies(),
      getUpcomingMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          const moviesIDArray = [];

          upcomingMoviesData.forEach((movie) => {
            moviesImagesArray.push(
              "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            );
            moviesIDArray.push(movie.id);
          });

          setMoviesImages(moviesImagesArray);
          setMoviesIDs(moviesIDArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        console.log("Error fetching data");
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesImages?.length > 0 && (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.sliderContainer}
            >
              {moviesImages.map((image, index) => (
                <TouchableOpacity
                  key={`${moviesIDs[index]}-${index}`}
                  onPress={() => router.push(`/detail/${moviesIDs[index]}`)}
                >
                  <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={styles.sliderImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List title="Popular Movies" content={popularMovies} />
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List title="Popular TV Shows" content={popularTv} />
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List title="Popular Family Movies" content={familyMovies} />
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                title="Popular Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
  },
  sliderImage: {
    width: dimensions.width,
    height: dimensions.height / 2,
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
