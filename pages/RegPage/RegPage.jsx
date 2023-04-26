import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default RegPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	const handleRegistration = async () => {
		console.clear();
		try {
			const response = await axios.post(
				"http://192.168.0.115:3001/auth/register",
				{
					username,
					password,
				}
			);
			response.status === 200 ? navigation.navigate("LoginPage") : null;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				label="Ваш логин для регистрации"
				placeholder="Логин"
				style={styles.input}
				onChangeText={(username) => setUsername(username.toLowerCase())}
				value={username}
			/>
			<TextInput
				label="Пароль"
				placeholder="Введите ваш пароль"
				secureTextEntry={true}
				style={styles.input}
				onChangeText={(password) => setPassword(password.toLowerCase())}
				value={password}
			/>
			<Button mode="contained" onPress={handleRegistration}>
				Регистрация
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		width: 300,
		height: 75,
		marginBottom: 20,
	},
});
