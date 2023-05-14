import * as React from 'react';
import { StyleSheet } from 'react-native'; 
import { Button, DataTable, IconButton } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const ClaimTable = ({ navigation }) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  const placeholderData = [
    { id: 1, subject: 'Loading...', lastUpdated: 'Loading...', status: 'Loading...' },
    { id: 2, subject: 'Loading...', lastUpdated: 'Loading...', status: 'Loading...' },
    { id: 3, subject: 'Loading...', lastUpdated: 'Loading...', status: 'Loading...' },
    { id: 4, subject: 'Test', lastUpdated: 'Loading...', status: 'Loading...' },
  ];


  React.useEffect(() => {
    setPage(3);
  }, [itemsPerPage]);

  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Subject</DataTable.Title>
        <DataTable.Title>Last updated</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>

      {
        placeholderData.map((item, index) => {
          return (<DataTable.Row>
            <DataTable.Cell onPress={
              () => {
                navigation.navigate('Claim')
              }
            }>{item.id}</DataTable.Cell>
            <DataTable.Cell>{item.subject}</DataTable.Cell>
            <DataTable.Cell>{item.lastUpdated}</DataTable.Cell>
            <DataTable.Cell><Button>CLAIM</Button></DataTable.Cell>

            {/* {
              Object.values(item).forEach(data => {
                <DataTable.Cell>nesto</DataTable.Cell>
              })
            } */}
          </DataTable.Row>)
        })
      }

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: 30
  }
})

export default ClaimTable;