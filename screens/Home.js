import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Network from "expo-network";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const { r: refreshParam } = useLocalSearchParams();
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

  const loadHomeData = useCallback(async () => {
    try {
      setLoaded(false);
      setError(false);
      const networkState = await Network.getNetworkStateAsync();
      const isConnected =
        networkState.isConnected &&
        networkState.isInternetReachable !== false;

      if (!isConnected) {
        setError(true);
        Alert.alert(
          "No Connection",
          "Check your internet connection and try again.",
        );
        return;
      }

      const [
        upcomingMoviesData,
        popularMoviesData,
        popularTvData,
        familyMoviesData,
        documentaryMoviesData,
      ] = await getData();

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
    } catch {
      setError(true);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData, refreshParam]);

  return (
    <>
      {loaded && !error && (
        <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
        </SafeAreaView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
      {error && (
        <Error
          errorText1="Connection error"
          errorText2="Check your internet connection and try again."
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
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
