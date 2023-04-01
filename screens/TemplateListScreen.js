import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import AccountBalance from "../components/AccountBalance";
/*import getTemplates from './modules/userModule';
import { FlatList } from "react-native-web";*/

/*
const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const templateList = await getTemplates();
      setTemplates(templateList);
    };

    fetchTemplates();
  }, []);

  return (
    <FlatList
      data={templates}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
};
*/
//NE RADI NE RADI NE RADI NE RADI NE RADI NE RADI

const TemplateListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.container1}>
        <Pressable
          style={styles.listTemplatesButton}
          onPress={() => navigation.navigate("Transaction")}
          //umjesto Transaction ide templejt koji zlata i naida rade
        >
          <Text style={styles.text}>Template 1</Text>
        </Pressable>
      </View>

  
      <View style={styles.container2}>
        <Pressable
          style={styles.listTemplatesButton}
          onPress={() => navigation.navigate("Transaction")}
        >
          <Text style={styles.text}>Template 2</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1938",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    marginTop: 0,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#FFC021",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#FFC021",
    padding: 10,
    width: "80%",
  }
});

export default TemplateListScreen;