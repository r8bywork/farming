import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Button, Card } from "react-native-paper";

const HomePage = ({ route }) => {
	const { user } = route.params;
	const [jobs, setJobs] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null);
	const [completedWork, setCompletedWork] = useState("");
	const navigation = useNavigation();
	const [isAdmin, setIsAdmin] = useState("");

	// const getUserInfo = async (token) => {
	// 	try {
	// 		const response = await axios.get(
	// 			"http://192.168.0.115:3001/auth/findUser",
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		// console.log(response.data);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return null;
	// 	}
	// };
	// console.clear();
	// // getUserInfo(user.token);
	// const asd = getUserInfo(user.token);
	// console.log(asd);

	const getUserInfo = async (token) => {
		try {
			const response = await axios.get(
				"http://192.168.0.115:3001/auth/findUser",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	};
	const hadleLogin = async () => {
		const userInfo = await getUserInfo(String(user.token));
		setIsAdmin(userInfo);
		console.log(isAdmin);
	};

	useEffect(() => {
		axios
			.get("http://192.168.0.115:3001/jobs/getAllJobs")
			.then((response) => setJobs(response.data))
			.catch((error) => console.log(error));
		hadleLogin();
	}, []);

	const handleJobPress = (job) => {
		setSelectedJob(job);
		setCompletedWork(job.completedWork.toString());
	};

	const handleCompletedWorkChange = (text) => {
		setCompletedWork(text);
	};

	const handleSave = () => {
		if (completedWork > selectedJob.completedWork) {
			axios
				.put(`http://192.168.0.115:3001/jobs/updateJob/${selectedJob._id}`, {
					completedWork: parseInt(completedWork),
				})
				.then(() => {
					const updatedJobs = jobs.map((job) => {
						if (job._id === selectedJob._id) {
							return { ...job, completedWork: parseInt(completedWork) };
						}
						return job;
					});
					setJobs(updatedJobs);
					setSelectedJob(null);
					setCompletedWork("");
				})
				.catch((error) => console.log(error));
		} else {
			console.log("Kick");
		}
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity onPress={() => handleJobPress(item)}>
			<Card style={styles.card}>
				{/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
				<Card.Title
					title={item.responsibility}
					subtitle={
						"Выполненная работа за сегодня " +
						item.completedWork +
						" " +
						item.unit
					}
				/>
				{selectedJob && selectedJob._id === item._id && (
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							keyboardType="numeric"
							value={completedWork}
							onChangeText={handleCompletedWorkChange}
						/>
						<Button style={styles.button} onPress={handleSave}>
							Сохранить
						</Button>
					</View>
				)}
			</Card>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={jobs}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
			{isAdmin == "admin" ? (
				<Button
					style={styles.button1}
					mode="contained"
					onPress={() => navigation.navigate("CreateJob")}
				>
					Создать работу
				</Button>
			) : null}
			{isAdmin == "admin" ? (
				<Button mode="contained" onPress={() => navigation.navigate("RegPage")}>
					Зарегестрировать рабочего
				</Button>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	card: {
		marginVertical: 10,
	},
	separator: {
		height: 10,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	input: {
		flex: 1,
		height: 40,
		marginHorizontal: 10,
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: "#ccc",
		borderWidth: 1,
	},
	button: {
		marginLeft: 10,
	},
	button1: {
		marginBottom: 10,
	},
});

export default HomePage;
