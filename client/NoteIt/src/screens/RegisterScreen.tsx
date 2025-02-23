import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Define Zod validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterScreen = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      // const response = await axios.post("https://your-api.com/api/register", data);
      Alert.alert("Success", "Account created successfully!");
      reset(); // Clear form after success
    } catch (error) {
      Alert.alert("Error", "Registration failed. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={field.value}
              onChangeText={field.onChange}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={field.value}
              onChangeText={field.onChange}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegisterScreen;
