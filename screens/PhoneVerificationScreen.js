import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const EmailVerificationScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text style={styles.title}>Verification code</Text>
				<Text style={styles.bodyText}>
					Enter the confirmation code sent to your phone numbers to complete
					the verification.
				</Text>
				<TextInput
					style={styles.inputText}
					placeholder='Enter code'
					placeholderTextColor={'#CADAFF73'}
				/>
				<Pressable
					style={styles.verifyButton}
					title='Verify'
					onPress={() => navigation.navigate("Home")}
				>
					<Text style={styles.verifyText}>VERIFY</Text>
				</Pressable>

				<Pressable
					style={styles.resendCode}
					title='SendToPhone'
					onPress={() => navigation.navigate("PhoneVerification")}
				>
					<Text style={styles.resendCode}> Send again.</Text>
				</Pressable>


				
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1B1938',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	box: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '70%',
		height: '40%',
		backgroundColor: '#312D65',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: '#645CD1',
	},
	title: {
		color: '#FFFFFF78',
		fontSize: 20,
		display: 'flex',
		alignItems: 'center',
		marginBottom: 32,
	},
	bodyText: {
		color: '#CADAFFBF',
		fontSize: 18,
		display: 'flex',
		textAlign: 'center',
		paddingHorizontal: 32,
	},
	inputText: {
		backgroundColor: '#23204D',
		color: '#ffffff',
		width: '78%',
		height: 45,
		textAlign: 'center',
		borderRadius: 20,
		marginTop: 22,
		fontSize: 18,
	},
	verifyButton: {
		marginTop: 13,
		backgroundColor: '#FFC022',
		width: 120,
		height: 35,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
	},
	verifyText: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	resendCode: {
		color: '#00D8FF',
		fontSize: 12,
		marginTop: 9,
	},
});

export default EmailVerificationScreen;
