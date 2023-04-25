import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import CreateJob from "./pages/CreateJob/CreateJob";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

const Stack = createStackNavigator();

export default function App() {
	return (
		// <View style={styles.container}>
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="LoginPage" component={LoginPage} />
				<Stack.Screen name="HomePage" component={HomePage} />
				<Stack.Screen name="CreateJob" component={CreateJob} />
			</Stack.Navigator>
		</NavigationContainer>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
