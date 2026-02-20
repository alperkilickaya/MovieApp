import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { searchMovie } from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = () => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    searchMovie(query)
      .then(data => {
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.fixedHeader}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Search Movies"
          />
        </View>
        <TouchableOpacity onPress={() => onSubmit(text)}>
          <Ionicons name="search-outline" color="#000" size={35} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <View style={styles.resultsGrid}>
              {searchResults.map(item => (
                <View key={item.id} style={styles.gridItem}>
                  <Card item={item} />
                </View>
              ))}
            </View>
          )}
          {searchResults && searchResults.length === 0 && (
            <View style={styles.messageBox}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}
          {!searchResults && !error && (
            <View style={styles.messageBox}>
              <Text>Type something to start searching.</Text>
            </View>
          )}
          {error && <Error />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  input: {
    borderRadius: 15,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchItems: {
    padding: 5,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '33.33%',
    padding: 4,
  },
  messageBox: {
    padding: 16,
  },
});

export default Search;
