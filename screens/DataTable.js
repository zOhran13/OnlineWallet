import * as React from 'react';
import { StyleSheet } from 'react-native'; 
import { Button, DataTable, IconButton } from 'react-native-paper';
import * as SecureStorage from 'expo-secure-store';
import * as ClaimService from '../modules/claimsModule';

const optionsPerPage = [2, 3, 4];

const ClaimTable = ({ navigation }) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [token, setToken] = React.useState(null);
  const [claims, setClaims] = React.useState([]);

  const getToken = () => {
    return SecureStorage.getItemAsync("secure_token");
  }

  React.useEffect(() => {
    setPage(3);
  }, [itemsPerPage]);

  React.useEffect(() => {
    getToken().then(async token_ => {
      setToken(token_);
      const myClaims = await ClaimService.getAllClaims(token_);
      console.log("My all claims are: ");
      console.log(myClaims.data);
      setClaims(myClaims.data);
    })
	}, []);

  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Subject</DataTable.Title>
        <DataTable.Title>Description </DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>

      {
        claims.map((claim, index) => {
          return (<DataTable.Row onPress={ () => navigation.navigate('Chat', {claim, token}) }>
            <DataTable.Cell >{claim.id}</DataTable.Cell>
            <DataTable.Cell>{claim.subject}</DataTable.Cell>
            <DataTable.Cell>{claim.description}</DataTable.Cell>
            <DataTable.Cell><Button>{claim.status == 'Under_Investigation' ? 'UI' : claim.status}</Button></DataTable.Cell>
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