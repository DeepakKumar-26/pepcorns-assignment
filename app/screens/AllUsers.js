import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, DataTable} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const ListHeaderComponent = () => {
  return (
    <DataTable.Row style={{backgroundColor: 'lightgrey'}}>
      <DataTable.Title>User Id </DataTable.Title>
      <DataTable.Title>User Name</DataTable.Title>
      <DataTable.Title numeric>Age </DataTable.Title>
    </DataTable.Row>
  );
};
const ListItemUsers = ({item, index}) => {
  const navigation = useNavigation();
  const backgroundColor = index % 2 == 0 ? '#EFFFFD' : '#B8FFF9';

  const handleOpenUserId = () => {
    navigation.navigate('User', {user_id: item.user_id});
  };

  return (
    <DataTable.Row onPress={handleOpenUserId} style={{backgroundColor}}>
      <DataTable.Cell>{item.user_id}</DataTable.Cell>
      <DataTable.Cell>{item.name}</DataTable.Cell>
      <DataTable.Cell numeric>{item.age}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default function AllUsers() {
  const [users, setUsers] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://devapi.pepcorns.com/api/test/getAllUsers')
      .then(users => {
        setUsers(users.data.response);
        setLoading(false);
        console.log(users.data);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  if (error)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{alignSelf: 'center'}}>Some Error Occurred</Text>
      </View>
    );
  return (
    <DataTable>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<ListHeaderComponent />}
        renderItem={({item, index}) => (
          <ListItemUsers item={item} index={index} />
        )}
      />
    </DataTable>
  );
}

const styles = StyleSheet.create({});
