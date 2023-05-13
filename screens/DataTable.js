import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const DataTable = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulacija API poziva za dohvacanje podataka
    const fetchData = async () => {
      // Placeholderi
      const placeholderData = [
        { id: 1, subject: 'Loading...', lastUpdated: 'Loading...', status: 'Loading...' },
        { id: 2, subject: 'Loading...', lastUpdated: 'Loading...', status: 'Loading...' },
        { id: 3, subject: 'Loading...', lastUpdated: 'Loading...', status: 'Loading...' },
      ];

      // Moze a i ne mora
      await new Promise(resolve => setTimeout(resolve, 1000));

      setData(placeholderData);
    };

    fetchData();
  }, []);

  const handleRowPress = (id, subject) => {
    navigation.navigate('ChatScreen', { id, subject });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Subject</Text>
        <Text style={styles.headerCell}>Last Updated</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>
      {data.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.tableRow}
          onPress={() => handleRowPress(item.id, item.subject)}
        >
          <Text style={styles.tableCell}>{item.id}</Text>
          <Text style={styles.tableCell}>{item.subject}</Text>
          <Text style={styles.tableCell}>{item.lastUpdated}</Text>
          <Text style={styles.tableCell}>{item.status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
  },
});

export default DataTable;
