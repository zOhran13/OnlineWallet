//  import React, { useState } from "react";
// import { Text, View, Image, StyleSheet, Pressable } from "react-native";
// import { getTemplates } from "../modules/templatesModule";


// const TemplateListScreen = ({ navigation }) => {
//   const templates=getTemplates();
  
//   const handlePress = (id) => {
//       navigation.navigate("Transaction", {id})
//   }
//   templates.then(data => {
//    // console.log("Evoo daatee: ", data);
//     return (
//       <View style={styles.container}>
//           {data.map(template => (
//                 <View style={styles.container1} key={template.id}>
//                   <Pressable
//                           onPress={() => handlePress(template.id)}
//                     >
//                      <Text style={styles.text}>{template.title}</Text>
//                     </Pressable>
//                   </View>
  
//             ))
//             }
  
//       </View>
//     );
//   })
  
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1B1938",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 0,
//     marginTop: 0,
//   },
//   listTemplatesButton: {
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     height: '2%',
//     width: '50%',
//     padding: 20,
//     backgroundColor: "#FFC021",
//   },
//   templateButtonContainer: {
//       width: '100%',
//       alignItems: 'center',
//       padding: 7,
//   },
//   text: {
//     fontSize: 18,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "black",
//   },
//   container1: {
//     alignItems: "center",
//     justifyContent: "center",
//     borderColor: "black",
//     borderRadius: 10,
//     backgroundColor: "#FFC021",
//     padding: 10,
//     width: "80%",
//     marginBottom: 10,
//   }
// });

// export default TemplateListScreen;


import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { getTemplates } from "../modules/templatesModule";

const TemplateListScreen = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getTemplates();
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  const handlePress = (id) => {
    navigation.navigate("Transaction", { id });
  };

  return (
    <View style={styles.container}>
      {templates.map((template) => (
        <View style={styles.container1} key={template.id}>
          <Pressable onPress={() => handlePress(template.id)}>
            <Text style={styles.text}>{template.title}</Text>
          </Pressable>
        </View>
      ))}
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
  listTemplatesButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: "2%",
    width: "50%",
    padding: 20,
    backgroundColor: "#FFC021",
  },
  templateButtonContainer: {
    width: "100%",
    alignItems: "center",
    padding: 7,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
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
});

export default TemplateListScreen;
