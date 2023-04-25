import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Divider, Snackbar, TextInput } from "react-native-paper";

const CreateJob = () => {
	const navigation = useNavigation();
	const [responsibility, setResponsibility] = useState("");
	const [completedWork, setCompletedWork] = useState("");
	const [unit, setUnit] = useState("");
	const [snackbarVisible, setSnackbarVisible] = useState(false);

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				"http://192.168.0.115:3001/jobs/createJob",
				{
					responsibility,
					completedWork,
				}
			);

			response.status === 201 && navigation.navigate("HomePage");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<TextInput
				label="Responsibility"
				value={responsibility}
				onChangeText={(text) => setResponsibility(text)}
				style={styles.input}
			/>
			<TextInput
				label="Completed Work"
				value={completedWork}
				onChangeText={(text) => setCompletedWork(text)}
				style={styles.input}
			/>
			<TextInput
				label="Unit"
				value={unit}
				onChangeText={(text) => setUnit(text)}
				style={styles.input}
			/>
			<Divider style={styles.divider} />
			<Button mode="contained" onPress={handleSubmit} style={styles.button}>
				Submit
			</Button>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={3000}
			>
				Job submitted successfully!
			</Snackbar>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	input: {
		marginBottom: 16,
	},
	divider: {
		marginVertical: 24,
	},
	button: {
		marginTop: 16,
	},
	image: {
		width: "100%",
		height: 200,
		marginTop: 16,
		marginBottom: 24,
	},
});

export default CreateJob;
